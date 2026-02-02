const prisma = require('../../utils/prisma');
const { validateAssignment, validateCompletion } = require('./packaging.helper');
const { logAction } = require('../../utils/auditLogger');

const assignOrder = async (orderId, agentId, user) => {
    await validateAssignment(orderId, agentId);

    // Use a transaction to ensure atomic update and creation
    const task = await prisma.$transaction(async (tx) => {
        // 1. Create the Packaging Task
        const task = await tx.packagingTask.create({
            data: {
                orderId: parseInt(orderId),
                agentId: parseInt(agentId)
            }
        });

        // 2. Update Order status to PACKING
        await tx.order.update({
            where: { id: parseInt(orderId) },
            data: { status: 'PACKING' }
        });

        return task;
    });

    await logAction({
        actionType: 'PACKAGING_ASSIGNED',
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
    if (role === 'PACKAGING_AGENT') {
        where = { agentId: userId };
    }

    return await prisma.packagingTask.findMany({
        where,
        include: {
            order: {
                include: {
                    customer: true,
                    items: true
                }
            },
            agent: { select: { name: true, email: true } }
        },
        orderBy: { assignedAt: 'desc' }
    });
};

const completeTask = async (taskId, agentId, user) => {
    const task = await validateCompletion(taskId, agentId);

    const updatedTask = await prisma.$transaction(async (tx) => {
        // 1. Mark task as completed
        const updatedTask = await tx.packagingTask.update({
            where: { id: parseInt(taskId) },
            data: { completedAt: new Date() }
        });

        // 2. Update Order status to PACKED
        await tx.order.update({
            where: { id: task.orderId },
            data: { status: 'PACKED' }
        });

        return updatedTask;
    });

    await logAction({
        actionType: 'PACKAGING_COMPLETED',
        entityType: 'ORDER',
        entityId: task.orderId,
        user,
        metadata: { taskId: updatedTask.id }
    });

    return updatedTask;
};

module.exports = {
    assignOrder,
    listTasks,
    completeTask
};
