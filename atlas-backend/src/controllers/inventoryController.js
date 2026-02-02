const prisma = require('../utils/prisma');

const getInventory = async (req, res) => {
    try {
        const inventory = await prisma.inventory.findMany({
            include: { product: true, warehouse: true }
        });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory' });
    }
};

const updateStock = async (req, res) => {
    const { productId, warehouseId, quantity } = req.body;
    const { role } = req.user;

    if (role !== 'STOCK_KEEPER' && role !== 'ADMIN') {
        return res.status(403).json({ message: 'Only Stock Keepers can update inventory' });
    }

    try {
        const updated = await prisma.inventory.upsert({
            where: {
                productId_warehouseId: { productId, warehouseId }
            },
            update: { quantity },
            create: { productId, warehouseId, quantity }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Stock update failed' });
    }
};

module.exports = { getInventory, updateStock };
