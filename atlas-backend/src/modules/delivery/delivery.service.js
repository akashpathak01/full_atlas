const prisma = require('../../utils/prisma');
const { validateAssignment, validateCompletion } = require('./delivery.helper');
const { logAction } = require('../../utils/auditLogger');

const assignOrder = async (orderId, agentId, user) => {
    await validateAssignment(orderId, agentId);

    const task = await prisma.$transaction(async (tx) => {
        // 1. Create Delivery Task
        const task = await tx.deliveryTask.create({
            data: {
                orderId: parseInt(orderId),
                agentId: parseInt(agentId)
            }
        });

        // 2. Update Order status to OUT_FOR_DELIVERY
        await tx.order.update({
            where: { id: parseInt(orderId) },
            data: { status: 'OUT_FOR_DELIVERY' }
        });

        return task;
    });

    await logAction({
        actionType: 'DELIVERY_ASSIGNED',
        entityType: 'ORDER',
        entityId: parseInt(orderId),
        user,
        metadata: { agentId }
    });

    return task;
};

const listTasks = async (user) => {
    const { role, userId } = user;

    let where = {};
    if (role === 'DELIVERY_AGENT') {
        where = { agentId: userId };
    }

    return await prisma.deliveryTask.findMany({
        where,
        include: {
            order: {
                include: {
                    customer: true,
                    items: true,
                    seller: { include: { user: { select: { name: true } } } }
                }
            },
            agent: { select: { name: true, email: true } }
        },
        orderBy: { assignedAt: 'desc' }
    });
};

const startDelivery = async (taskId, agentId) => {
    const task = await prisma.deliveryTask.findUnique({
        where: { id: parseInt(taskId) },
        include: { order: true }
    });

    if (!task) throw new Error('Delivery task not found');
    if (task.agentId !== parseInt(agentId)) throw new Error('Forbidden: Not your task');

    return await prisma.deliveryTask.update({
        where: { id: parseInt(taskId) },
        data: { startedAt: new Date() }
    });
};

const completeDelivery = async (taskId, agentId, proof, user) => {
    const task = await validateCompletion(taskId, agentId);
    const { receiverName, notes } = proof;

    if (!receiverName) throw new Error('Receiver name is required for proof of delivery');

    const updatedTask = await prisma.$transaction(async (tx) => {
        // 1. Mark Delivery Task as completed
        const updatedTask = await tx.deliveryTask.update({
            where: { id: parseInt(taskId) },
            data: {
                completedAt: new Date(),
                receiverName,
                notes
            }
        });

        // 2. Update Order status to DELIVERED
        await tx.order.update({
            where: { id: task.orderId },
            data: { status: 'DELIVERED' }
        });

        return updatedTask;
    });

    await logAction({
        actionType: 'DELIVERY_COMPLETED',
        entityType: 'ORDER',
        entityId: task.orderId,
        user,
        metadata: { taskId: updatedTask.id, receiverName }
    });

    return updatedTask;
};


const getDeliveryOrders = async (user) => {
    const { role, id: userId } = user;

    // 1. Get agent's admin
    const agent = await prisma.user.findUnique({
        where: { id: userId },
        select: { createdById: true }
    });

    if (!agent || !agent.createdById) {
        return [];
    }
    const adminId = agent.createdById;

    // 2. Fetch orders
    // - PACKED (Unassigned) -> Available to pick up (scoped to Admin's tenants)
    // - OUT_FOR_DELIVERY / DELIVERED / DELIVERY_FAILED -> Assigned to THIS agent
    const orders = await prisma.order.findMany({
        where: {
            OR: [
                {
                    status: 'PACKED',
                    seller: { adminId: adminId }
                },
                {
                    status: { in: ['OUT_FOR_DELIVERY', 'DELIVERED', 'DELIVERY_FAILED'] },
                    deliveryTask: { agentId: userId }
                }
            ]
        },
        include: {
            customer: true,
            deliveryTask: true,
            seller: { include: { user: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return orders;
};

const getStats = async (user) => {
    const { id: userId } = user;

    // Agent's performance stats from DeliveryTasks
    const tasks = await prisma.deliveryTask.findMany({
        where: { agentId: userId },
        include: { order: { select: { status: true } } }
    });

    // Also need count of PACKED orders available to pick up (scoped to admin)
    const agent = await prisma.user.findUnique({ where: { id: userId }, select: { createdById: true } });
    let readyCount = 0;

    if (agent && agent.createdById) {
        readyCount = await prisma.order.count({
            where: {
                status: 'PACKED',
                seller: { adminId: agent.createdById }
            }
        });
    }

    const inDelivery = tasks.filter(t => t.order.status === 'OUT_FOR_DELIVERY').length;
    const delivered = tasks.filter(t => t.order.status === 'DELIVERED').length;
    const failed = tasks.filter(t => t.order.status === 'DELIVERY_FAILED').length;

    return {
        readyForDelivery: readyCount,
        inDelivery,
        delivered,
        failed,
        totalAssigned: tasks.length
    };
};

module.exports = {
    assignOrder,
    listTasks,
    startDelivery,
    completeDelivery,
    getDeliveryOrders,
    getStats
};
