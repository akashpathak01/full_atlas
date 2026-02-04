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
            data: { status: 'IN_PACKAGING' }
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
    const { role, id: userId } = user;

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
    const { role, id: userId } = user;
    
    // Scoping for Packaging Agent
    let agentScope = {};
    if (role === 'PACKAGING_AGENT') {
        const agent = await prisma.user.findUnique({
            where: { id: userId },
            select: { createdById: true }
        });
        
        if (agent?.createdById) {
            agentScope = { 
                seller: { adminId: agent.createdById } 
            };
        }
    } else if (role === 'ADMIN') {
        agentScope = {
            seller: { adminId: userId }
        };
    }

    // 1. Pending Packaging (Orders Confirmed but not yet assigned/in packaging)
    const pendingCount = await prisma.order.count({
        where: {
            status: 'CONFIRMED',
            ...agentScope
        }
    });

    // 2. In Progress (Orders currently being packed)
    const inProgressCount = await prisma.order.count({
        where: {
            status: 'IN_PACKAGING',
            ...agentScope
        }
    });

    // 3. Completed Today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const completedTodayCount = await prisma.packagingTask.count({
        where: {
            completedAt: { gte: startOfDay },
            ...(role === 'PACKAGING_AGENT' ? { agentId: userId } : {})
        }
    });

    // 4. Total Records (All completed packaging tasks)
    const totalRecords = await prisma.packagingTask.count({
        where: {
            ...(role === 'PACKAGING_AGENT' ? { agentId: userId } : {})
        }
    });

    // 5. Recent Packaging Tasks
    const recentPackaging = await prisma.packagingTask.findMany({
        where: {
            ...(role === 'PACKAGING_AGENT' ? { agentId: userId } : {})
        },
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
        where: { 
            status: 'CONFIRMED',
            ...agentScope
        },
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

const listMaterials = async (user) => {
    const { role, id: userId } = user;
    
    let where = {};
    if (role === 'PACKAGING_AGENT') {
        const agent = await prisma.user.findUnique({
            where: { id: userId },
            select: { createdById: true }
        });
        where = { adminId: agent?.createdById || null };
    } else if (role === 'ADMIN') {
        where = { adminId: userId };
    }

    return await prisma.packagingMaterial.findMany({
        where,
        orderBy: { name: 'asc' }
    });
};

const createMaterial = async (data, user) => {
    const { role, id: userId } = user;
    
    let adminId = userId;
    if (role === 'PACKAGING_AGENT') {
        const agent = await prisma.user.findUnique({
            where: { id: userId },
            select: { createdById: true }
        });
        adminId = agent?.createdById;
    }

    return await prisma.packagingMaterial.create({
        data: {
            name: data.name,
            type: data.type,
            stock: parseInt(data.stock) || 0,
            minLevel: parseInt(data.minLevel) || 0,
            cost: parseFloat(data.cost) || 0,
            adminId
        }
    });
};

const updateMaterial = async (id, data, user) => {
    // Basic ownership check could be added here
    return await prisma.packagingMaterial.update({
        where: { id: parseInt(id) },
        data: {
            ...data,
            cost: data.cost ? parseFloat(data.cost) : undefined,
            stock: data.stock !== undefined ? parseInt(data.stock) : undefined,
            minLevel: data.minLevel !== undefined ? parseInt(data.minLevel) : undefined
        }
    });
};

const deleteMaterial = async (id, user) => {
    // Basic ownership check could be added here
    return await prisma.packagingMaterial.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    assignOrder,
    listTasks,
    completeTask,
    getDashboardStats,
    listMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial
};
