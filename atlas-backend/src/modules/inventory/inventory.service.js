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
    return await prisma.warehouse.findMany({
        orderBy: { name: 'asc' }
    });
};

// --- Inventory Operations ---

const getInventory = async (user) => {
    const { role, id: userId, sellerId } = user;

    let where = {};
    if (role === 'SELLER') {
        if (!sellerId) return [];
        where = { product: { sellerId } };
    } else if (role === 'ADMIN') {
        where = { product: { seller: { adminId: userId } } };
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

const getMovementHistory = async () => {
    return await prisma.stockMovement.findMany({
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

module.exports = {
    createWarehouse,
    listWarehouses,
    getInventory,
    stockIn,
    stockOut,
    getMovementHistory
};
