const prisma = require('../../utils/prisma');
const { logAction } = require('../../utils/auditLogger');

const getCustomers = async () => {
    // Assuming customers are users with specific role or distinct customers on orders
    // Based on schema, Order has 'customer' relation (Customer model? or just fields?)
    // Schema line 135: customer Customer? @relation...
    // Let's fetch from Customer model if it exists, otherwise Order fields.
    // I recall simplified schema sometimes. Let's assume Customer model based on routes.
    return await prisma.customer.findMany({
        orderBy: { createdAt: 'desc' }
    });
};

const getCustomerById = async (id) => {
    return await prisma.customer.findUnique({
        where: { id: parseInt(id) },
        include: { orders: true }
    });
};

const getOrders = async () => {
    return await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            customer: true,
            items: true
        }
    });
};

const updateOrderStatus = async (orderId, status, user) => {
    // Validate status transition if needed (Helper has isAllowedCallCenterStatus)
    // For now, implementing basic update

    // Check role permissions in controller usually, but here we just do the update
    const updatedOrder = await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status }
    });

    await logAction({
        actionType: 'ORDER_STATUS_UPDATE',
        entityType: 'ORDER',
        entityId: parseInt(orderId),
        user,
        metadata: { status }
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
        include: { agent: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
    });
};

const getAgents = async () => {
    return await prisma.user.findMany({
        where: { role: { name: 'CALL_CENTER_AGENT' } },
        select: { id: true, name: true, email: true, status: true }
    });
};

const getPerformanceMetrics = async () => {
    // Basic mock implementation for now as we don't have detailed performance tracking tables
    return {
        approvalRate: 0,
        avgResponseTime: 0,
        customerSatisfaction: 0,
        callsHandled: 0
    };
};

const getDashboardStats = async () => {
    // 1. Total Orders
    const totalOrders = await prisma.order.count();

    // 2. Pending Approval (PENDING_REVIEW status)
    const pendingApproval = await prisma.order.count({
        where: { status: 'PENDING_REVIEW' }
    });

    // 3. Active Agents
    const activeAgents = await prisma.user.count({
        where: {
            role: { name: 'CALL_CENTER_AGENT' },
            isActive: true
        }
    });

    // 4. Approved Today (Status CONFIRMED, updated today)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // This is an approximation. Ideally we check AuditLog for 'ORDER_CONFIRMED' today.
    const approvedToday = await prisma.order.count({
        where: {
            status: 'CONFIRMED',
            updatedAt: { gte: startOfDay }
        }
    });

    // 5. Orders Awaiting Approval (List)
    const awaitingApprovalOrders = await prisma.order.findMany({
        where: { status: 'PENDING_REVIEW' },
        take: 5,
        orderBy: { createdAt: 'asc' },
        include: { customer: true }
    });

    // 6. Recently Approved (List)
    const recentlyApproved = await prisma.order.findMany({
        where: { status: 'CONFIRMED' },
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { customer: true }
    });

    return {
        stats: {
            totalOrders,
            pendingApproval,
            activeAgents,
            approvedToday
        },
        awaitingApprovalOrders: awaitingApprovalOrders.map(o => ({
            id: o.id,
            orderNumber: o.orderNumber,
            customerName: o.customerName || o.customer?.name,
            createdAt: o.createdAt
        })),
        recentlyApprovedOrders: recentlyApproved.map(o => ({
            id: o.id,
            orderNumber: o.orderNumber,
            customerName: o.customerName || o.customer?.name,
            approvedAt: o.updatedAt
        })),
        // Mock assignment data as we lack call center assignment schema
        assignedOrders: [],
        unassignedOrders: []
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
    getPerformanceMetrics,
    getDashboardStats
};
