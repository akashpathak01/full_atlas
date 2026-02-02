const prisma = require('../utils/prisma');

const getOrders = async (req, res) => {
    const { role, id: userId, sellerId: userSellerId } = req.user;
    const { status } = req.query;

    try {
        let where = {};

        if (status) {
            where.status = status;
        }

        if (role === 'SELLER') {
            let sellerId = userSellerId;
            if (!sellerId) {
                const seller = await prisma.seller.findUnique({ where: { userId: userId } });
                sellerId = seller?.id;
            }
            if (!sellerId) return res.json([]);
            where.sellerId = sellerId;
        } else if (role === 'CALL_CENTER_AGENT' || role === 'CALL_CENTER_MANAGER') {
            where.status = 'PENDING_REVIEW';
        } else if (role === 'PACKAGING_AGENT') {
            // See only CONFIRMED orders that need packaging
            where.status = 'CONFIRMED';
        } else if (role === 'DELIVERY_AGENT') {
            // See only PACKED orders that need delivery
            where.status = 'PACKED';
        } else if (role === 'STOCK_KEEPER') {
            // Stock keepers see everything for inventory purposes
            where = {};
        } else if (role === 'ADMIN') {
            // Admin sees ONLY orders where order.seller.adminId === logged-in admin id
            where.seller = {
                adminId: userId
            };
        } else if (role === 'SUPER_ADMIN') {
            // Full access, no additional filtering
        } else {

            return res.status(403).json({ message: 'Unauthorized access' });
        }


        const orders = await prisma.order.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                orderNumber: true,
                customerName: true,
                customerPhone: true,
                orderDate: true,
                status: true,
                totalAmount: true,
                createdAt: true
            }
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    const { role, id: userId, sellerId: userSellerId } = req.user;

    const numericId = parseInt(id);
    if (isNaN(numericId)) {
        return res.status(400).json({ message: 'Invalid order ID format' });
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: numericId },
            include: { items: true }
        });

        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Access Control
        if (role === 'SELLER') {
            let sellerId = userSellerId;
            if (!sellerId) {
                const seller = await prisma.seller.findUnique({ where: { userId: userId } });
                sellerId = seller?.id;
            }
            if (order.sellerId !== sellerId) {
                return res.status(403).json({ message: 'Unauthorized access to this order' });
            }
        } else if (role === 'ADMIN') {
            // Fetch seller details to check adminId
            const seller = await prisma.seller.findUnique({
                where: { id: order.sellerId }
            });
            if (seller?.adminId !== userId) {
                return res.status(403).json({ message: 'Unauthorized access: This order belongs to another tenant' });
            }
        }
        // Call center roles and super admins can see any order (within their scope if defined)


        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error: error.message });
    }
};

const createOrder = async (req, res) => {
    const {
        customerName,
        customerPhone,
        orderDate,
        status,
        items,
        totalAmount,
        shippingAddress,
        customerNotes,
        internalNotes
    } = req.body;
    const { role, id: userId, sellerId: userSellerId } = req.user;

    // 1. Validation
    if (!customerName || !customerPhone) {
        return res.status(400).json({ message: 'customerName and customerPhone are required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'items must be a non-empty array' });
    }

    try {
        // 2. Resolve Seller ID
        let sellerId = userSellerId;
        if (!sellerId && role === 'SELLER') {
            const seller = await prisma.seller.findUnique({ where: { userId: userId } });
            sellerId = seller?.id;
        }

        if (!sellerId && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
            return res.status(400).json({ message: 'Seller profile required' });
        }

        // If Admin is creating and no sellerId provided, fallback to a default or error
        // For now, assume if not SELLER, we might need a default seller or it's an error.
        // But let's check if the payload has a sellerId? No, payload doesn't mention it.
        // Assuming the logged-in user is a Seller.

        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const newOrder = await prisma.order.create({
            data: {
                orderNumber,
                customerName,
                customerPhone,
                orderDate,
                status: status || 'PENDING_REVIEW',
                totalAmount: totalAmount ? parseFloat(totalAmount) : 0,
                shippingAddress,
                customerNotes,
                internalNotes,
                seller: {
                    connect: { id: parseInt(sellerId) }
                },
                items: {
                    create: items.map(item => ({
                        productId: item.productId ? parseInt(item.productId) : null,
                        variant: item.variant || null,
                        quantity: parseInt(item.quantity) || 1,
                        price: parseFloat(item.price) || 0,
                        product: item.productName || `Product #${item.productId}`
                    }))
                }
            },
            include: {
                items: true
            }
        });

        res.status(201).json({
            message: 'Order created successfully',
            orderId: newOrder.id,
            orderNumber: newOrder.orderNumber
        });

    } catch (error) {
        console.error('Order Creation Error:', error);
        res.status(500).json({ message: 'Internal server error during order creation', error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { id: orderId } = req.params;
    const { status: nextStatus } = req.body;
    const { role } = req.user;

    // 1. Strict status validation
    const allowedStatuses = ['CONFIRMED', 'CANCELLED', 'PACKED'];
    if (!allowedStatuses.includes(nextStatus)) {
        return res.status(400).json({ message: 'Invalid status requested.' });
    }

    try {
        const order = await prisma.order.findUnique({ where: { id: parseInt(orderId) } });

        if (!order) return res.status(404).json({ message: 'Order not found' });

        // 2. Role & Transition Logic
        if (role === 'CALL_CENTER_AGENT' || role === 'CALL_CENTER_MANAGER') {
            if (order.status !== 'PENDING_REVIEW') {
                return res.status(400).json({ message: 'Call Center can only process PENDING_REVIEW orders.' });
            }
            if (!['CONFIRMED', 'CANCELLED'].includes(nextStatus)) {
                return res.status(400).json({ message: 'Call Center can only CONFIRM or CANCEL.' });
            }
        } else if (role === 'PACKAGING_AGENT') {
            if (order.status !== 'CONFIRMED') {
                return res.status(400).json({ message: 'Packaging can only process CONFIRMED orders.' });
            }
            if (nextStatus !== 'PACKED') {
                return res.status(400).json({ message: 'Packaging can only set status to PACKED.' });
            }
        } else {
            return res.status(403).json({ message: 'Unauthorized. Role not allowed for this status update.' });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status: nextStatus }
        });

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error: error.message });
    }
};

const getPackagingOrders = async (req, res) => {
    const { role } = req.user;

    if (role !== 'PACKAGING_AGENT') {
        return res.status(403).json({ message: 'Unauthorized. Only Packaging Agents can access this endpoint.' });
    }

    try {
        const orders = await prisma.order.findMany({
            where: { status: 'CONFIRMED' },
            orderBy: { createdAt: 'asc' },
            include: { items: true }
        });

        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packaging orders', error: error.message });
    }
};

module.exports = { getOrders, getOrderById, createOrder, updateOrderStatus, getPackagingOrders };
