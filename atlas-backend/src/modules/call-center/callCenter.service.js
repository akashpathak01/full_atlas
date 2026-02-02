const prisma = require('../../utils/prisma');
const { isAllowedCallCenterStatus } = require('./callCenter.helper');
const { logAction } = require('../../utils/auditLogger');

const getCustomers = async () => {
    return await prisma.customer.findMany({
        orderBy: { name: 'asc' }
    });
};

const getCustomerById = async (customerId) => {
    return await prisma.customer.findUnique({
        where: { id: parseInt(customerId) },
        include: {
            orders: {
                orderBy: { createdAt: 'desc' },
                take: 10
            }
        }
    });
};

const getOrders = async () => {
    return await prisma.order.findMany({
        include: {
            customer: { select: { name: true, phone: true } },
            seller: { include: { user: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

const updateOrderStatus = async (orderId, status, user) => {
    if (!isAllowedCallCenterStatus(status)) {
        throw new Error(`Forbidden: Call Center Agents can only set status to CONFIRMED or CANCELLED. Requested: ${status}`);
    }

    const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
    });

    if (!order) throw new Error('Order not found');

    // Basic lifecycle check: Only CREATED orders can be confirmed/cancelled by CC
    if (order.status !== 'CREATED') {
        throw new Error(`Cannot update status of order in state: ${order.status}`);
    }

    const updatedOrder = await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status }
    });

    await logAction({
        actionType: 'ORDER_STATUS_UPDATE',
        entityType: 'ORDER',
        entityId: updatedOrder.id,
        user,
        metadata: { previousStatus: order.status, nextStatus: status, source: 'CALL_CENTER' }
    });

    return updatedOrder;
};

const addCallNote = async (orderId, agentId, content) => {
    return await prisma.callNote.create({
        data: {
            orderId: parseInt(orderId),
            agentId: parseInt(agentId),
            content
        }
    });
};

const getCallNotes = async (orderId) => {
    return await prisma.callNote.findMany({
        where: { orderId: parseInt(orderId) },
        include: {
            agent: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

const getAgents = async () => {
    return await prisma.user.findMany({
        where: { role: { name: 'CALL_CENTER_AGENT' } },
        select: { id: true, name: true, email: true, _count: { select: { callNotes: true } } }
    });
};

const getPerformanceMetrics = async () => {
    const totalNotes = await prisma.callNote.count();
    const confirmedOrders = await prisma.order.count({ where: { status: 'CONFIRMED' } });
    const cancelledOrders = await prisma.order.count({ where: { status: 'CANCELLED' } });

    return {
        totalNotes,
        confirmedOrders,
        cancelledOrders
    };
};

module.exports = {
    getCustomers,
    getCustomerById,
    getOrders,
    updateOrderStatus,
    addCallNote,
    getCallNotes,
    getAgents,
    getPerformanceMetrics
};
