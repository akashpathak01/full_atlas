const prisma = require('../../utils/prisma');
const { canDeductStock } = require('./inventory.helper');
const { logAction } = require('../../utils/auditLogger');

// --- Warehouse Operations ---

const createWarehouse = async (warehouseData) => {
    const { name, location } = warehouseData;
    return await prisma.warehouse.create({
        data: { name, location }
    });
};

const listWarehouses = async () => {
    const warehouses = await prisma.warehouse.findMany({
        include: {
            inventory: {
                select: {
                    quantity: true,
                    productId: true
                }
            }
        },
        orderBy: { name: 'asc' }
    });

    return warehouses.map(w => {
        const totalUnits = w.inventory.reduce((sum, item) => sum + item.quantity, 0);
        const uniqueProductsCount = new Set(w.inventory.map(item => item.productId)).size;
        const capacity = 25000; // Placeholder until capacity is in schema

        return {
            id: w.id,
            name: w.name,
            location: w.location,
            products: uniqueProductsCount,
            current: totalUnits,
            capacity: capacity,
            utilization: totalUnits / capacity,
            createdAt: w.createdAt,
            updatedAt: w.updatedAt
        };
    });
};

// --- Inventory Operations ---

const getInventory = async (user, filters = {}) => {
    const { role, id: userId, sellerId } = user;
    const { search, category } = filters;

    let where = {};
    if (role === 'SELLER') {
        if (!sellerId) return [];
        where = { product: { sellerId } };
    } else if (role === 'ADMIN') {
        where = { product: { seller: { adminId: userId } } };
    }

    if (search) {
        where.OR = [
            { product: { name: { contains: search } } },
            { product: { sku: { contains: search } } }
        ];
    }

    if (category && category !== 'All') {
        where.product = { ...where.product, category };
    }


    return await prisma.inventory.findMany({
        where,
        include: {
            product: {
                select: { name: true, sku: true, price: true, seller: { select: { shopName: true } } }
            },
            warehouse: { select: { name: true } }
        },
        orderBy: { product: { name: 'asc' } }
    });
};

const stockIn = async (data, user) => {
    const { productId, warehouseId, quantity, reason } = data;

    // Upsert Inventory record
    const inventory = await prisma.inventory.upsert({
        where: {
            productId_warehouseId: { productId: parseInt(productId), warehouseId: parseInt(warehouseId) }
        },
        update: {
            quantity: { increment: parseInt(quantity) }
        },
        create: {
            productId: parseInt(productId),
            warehouseId: parseInt(warehouseId),
            quantity: parseInt(quantity)
        }
    });

    // Log movement
    await prisma.stockMovement.create({
        data: {
            inventoryId: inventory.id,
            quantity: parseInt(quantity),
            type: 'IN',
            reason
        }
    });

    await logAction({
        actionType: 'STOCK_IN',
        entityType: 'INVENTORY',
        entityId: inventory.id,
        user,
        metadata: { quantity, reason, productId, warehouseId }
    });

    return inventory;
};

const stockOut = async (data, user) => {
    const { productId, warehouseId, quantity, reason } = data;

    const inventory = await prisma.inventory.findUnique({
        where: {
            productId_warehouseId: { productId: parseInt(productId), warehouseId: parseInt(warehouseId) }
        }
    });

    if (!inventory || !canDeductStock(inventory.quantity, parseInt(quantity))) {
        throw new Error('Insufficient stock levels for this operation');
    }

    const updatedInventory = await prisma.inventory.update({
        where: { id: inventory.id },
        data: {
            quantity: { decrement: parseInt(quantity) }
        }
    });

    // Log movement
    await prisma.stockMovement.create({
        data: {
            inventoryId: inventory.id,
            quantity: -parseInt(quantity),
            type: 'OUT',
            reason
        }
    });

    await logAction({
        actionType: 'STOCK_OUT',
        entityType: 'INVENTORY',
        entityId: updatedInventory.id,
        user,
        metadata: { quantity: -parseInt(quantity), reason, productId, warehouseId }
    });

    return updatedInventory;
};

const getMovementHistory = async (currentUser, filters = {}) => {
    const { role, id: userId, createdById } = currentUser;
    const { search, type } = filters;
    let where = {};

    // 1. Scoping Logic
    if (role === 'ADMIN') {
        where.inventory = { product: { adminId: userId } };
    } else if (role === 'STOCK_KEEPER') {
        if (createdById) {
            where.inventory = { product: { adminId: createdById } };
        }
        // If no createdById (global), Stock Keeper sees all allowed movements
    }

    // 2. Type Filter
    if (type && type !== 'All') {
        where.type = type === 'Stock In' ? 'IN' : 'OUT';
    }

    // 3. Search Filter
    if (search) {
        where.OR = [
            { id: isNaN(parseInt(search)) ? undefined : parseInt(search) },
            { 
                inventory: { 
                    OR: [
                        { product: { name: { contains: search } } },
                        { product: { sku: { contains: search } } }
                    ]
                }
            }
        ];
    }

    return await prisma.stockMovement.findMany({
        where,
        include: {
            inventory: {
                include: {
                    product: { select: { name: true, sku: true } },
                    warehouse: { select: { name: true } }
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};

const getDashboardStats = async (period = 'All Time') => {
    const where = {};
    const now = new Date();

    if (period === 'Today') {
        where.createdAt = { gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (period === 'This Week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        where.createdAt = { gte: new Date(startOfWeek.setHours(0, 0, 0, 0)) };
    } else if (period === 'This Month') {
        where.createdAt = { gte: new Date(now.getFullYear(), now.getMonth(), 1) };
    }

    // Note: Since we reverted createdAt in Inventory, we might need to filter StockMovements instead for "new" items
    // For now, we'll keep the dashboard stats as overall, or filter by movements if period is set

    const totalProducts = await prisma.product.count();
    const totalInventory = await prisma.inventory.aggregate({
        _sum: { quantity: true }
    });
    const totalPieces = totalInventory._sum.quantity || 0;

    const warehousesCount = await prisma.warehouse.count();

    const outOfStockCount = await prisma.inventory.count({
        where: { quantity: 0 }
    });

    const ordersAwaitingPick = await prisma.packagingTask?.count({
        where: { status: 'PENDING' }
    }) || 0;

    // For "Stock Status" chart - breakdown by quantity categories
    const inventoryData = await prisma.inventory.findMany({
        select: { quantity: true }
    });

    const stockStatus = {
        totalItems: totalPieces,
        available: inventoryData.filter(i => i.quantity > 0).length,
        outOfStock: inventoryData.filter(i => i.quantity === 0).length
    };

    // Quantities by Warehouse
    const warehouseStats = await prisma.inventory.groupBy({
        by: ['warehouseId'],
        _sum: { quantity: true }
    });
    
    // Fetch warehouse names for grouping
    const warehouses = await prisma.warehouse.findMany();
    const chartData = warehouses.map(w => ({
        name: w.name,
        quantity: warehouseStats.find(s => s.warehouseId === w.id)?._sum.quantity || 0
    }));

    return {
        stats: {
            totalProducts,
            totalPieces,
            warehouses: warehousesCount,
            nearExpiry: 0, // No field in schema yet
            outOfStock: outOfStockCount,
            ordersAwaitingPick
        },
        stockStatus,
        warehouseStats: chartData
    };
};

module.exports = {
    createWarehouse,
    listWarehouses,
    getInventory,
    stockIn,
    stockOut,
    getMovementHistory,
    getDashboardStats
};
