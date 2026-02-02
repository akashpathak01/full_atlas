const inventoryService = require('./inventory.service');

// --- Warehouse Controllers ---

const createWarehouse = async (req, res) => {
    try {
        const warehouse = await inventoryService.createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listWarehouses = async (req, res) => {
    try {
        const warehouses = await inventoryService.listWarehouses();
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- Inventory Controllers ---

const getInventory = async (req, res) => {
    try {
        const inventory = await inventoryService.getInventory(req.user);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const stockIn = async (req, res) => {
    try {
        const inventory = await inventoryService.stockIn(req.body, req.user);
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const stockOut = async (req, res) => {
    try {
        const inventory = await inventoryService.stockOut(req.body, req.user);
        res.json(inventory);
    } catch (error) {
        const status = error.message.includes('Insufficient') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

const getMovementHistory = async (req, res) => {
    try {
        const history = await inventoryService.getMovementHistory();
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createWarehouse,
    listWarehouses,
    getInventory,
    stockIn,
    stockOut,
    getMovementHistory
};
