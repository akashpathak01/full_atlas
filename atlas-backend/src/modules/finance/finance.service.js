const prisma = require('../../utils/prisma');

const getSummary = async (user) => {
    const { role, userId } = user;

    // Define scope based on role
    let where = { status: 'DELIVERED' };

    if (role === 'SELLER') {
        // Sellers only see their own delivered orders
        const seller = await prisma.seller.findUnique({ where: { userId } });
        if (!seller) throw new Error('Seller profile not found');
        where.sellerId = seller.id;
    } else if (['SUPER_ADMIN', 'ADMIN'].includes(role)) {
        // Admins see all delivered orders
        // No additional filter needed
    } else {
        throw new Error('Forbidden: No access to financial data');
    }

    // Aggregate stats
    const orders = await prisma.order.findMany({
        where,
        include: { items: true }
    });

    const totalRevenue = orders.reduce((sum, order) => {
        const orderTotal = order.items.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
        return sum + orderTotal;
    }, 0);

    const totalOrders = orders.length;

    return {
        totalRevenue,
        totalOrders
    };
};

const getFinancialOrders = async (user, page = 1, limit = 50) => {
    const { role, userId } = user;
    const skip = (page - 1) * limit;

    // Define scope based on role
    let where = { status: 'DELIVERED' };

    if (role === 'SELLER') {
        const seller = await prisma.seller.findUnique({ where: { userId } });
        if (!seller) throw new Error('Seller profile not found');
        where.sellerId = seller.id;
    } else if (['SUPER_ADMIN', 'ADMIN'].includes(role)) {
        // Admins see all
    } else {
        throw new Error('Forbidden: No access to financial data');
    }

    const [total, orders] = await prisma.$transaction([
        prisma.order.count({ where }),
        prisma.order.findMany({
            where,
            skip,
            take: parseInt(limit),
            orderBy: { updatedAt: 'desc' }, // Delivered date usually corresponds to last update
            include: {
                items: true,
                seller: { include: { user: { select: { name: true } } } }
            }
        })
    ]);

    const formattingOrders = orders.map(order => {
        const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return {
            orderNumber: order.orderNumber,
            status: order.status,
            totalAmount,
            deliveredAt: order.updatedAt,
            sellerName: order.seller.user.name
        };
    });

    return {
        data: formattingOrders,
        meta: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

module.exports = {
    getSummary,
    getFinancialOrders
};
