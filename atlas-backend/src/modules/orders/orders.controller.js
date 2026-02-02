const orderService = require('./orders.service');

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body, req.user);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders(req.user);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id, req.user);
        res.json(order);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 :
            error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

const updateStatus = async (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        const order = await orderService.updateOrderStatus(req.params.id, status, req.user);
        res.json(order);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 :
            error.message.includes('Invalid transition') ? 400 :
                error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateStatus
};
