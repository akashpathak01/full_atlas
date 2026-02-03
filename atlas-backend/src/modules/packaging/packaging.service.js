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

const getDashboardStats = async (user) => {
    // 1. Pending Packaging (Orders Confirmed but not yet assigned/in packaging)
    const pendingCount = await prisma.order.count({
        where: {
            status: 'CONFIRMED'
        }
    });

    // 2. In Progress (Orders currently being packed)
    const inProgressCount = await prisma.order.count({
        where: {
            status: 'IN_PACKAGING'
        }
    });

    // 3. Completed Today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const completedTodayCount = await prisma.packagingTask.count({
        where: {
            completedAt: {
                gte: startOfDay
            }
        }
    });

    // 4. Total Records (All completed packaging tasks)
    const totalRecords = await prisma.packagingTask.count();

    // 5. Recent Packaging Tasks
    const recentPackaging = await prisma.packagingTask.findMany({
        take: 5,
        orderBy: { completedAt: 'desc' },
        include: {
            order: {
                select: {
                    orderNumber: true,
                    customerName: true
                }
            },
            agent: {
                select: { name: true }
            }
        }
    });

    // 6. Confirmed Orders (Ready for packaging)
    const confirmedOrders = await prisma.order.findMany({
        where: { status: 'CONFIRMED' },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            orderNumber: true,
            customerName: true,
            status: true,
            createdAt: true
        }
    });

    return {
        stats: {
            pending: pendingCount,
            inProgress: inProgressCount,
            completedToday: completedTodayCount,
            total: totalRecords
        },
        recentPackaging: recentPackaging.map(task => ({
            id: task.id,
            orderNumber: task.order?.orderNumber,
            customerName: task.order?.customerName,
            agentName: task.agent?.name,
            completedAt: task.completedAt || task.updatedAt
        })),
        confirmedOrders
    };
};

module.exports = {
    assignOrder,
    listTasks,
    completeTask,
    getDashboardStats
};
