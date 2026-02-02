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

module.exports = {
    assignOrder,
    listTasks,
    startDelivery,
    completeDelivery
};
