const deliveryService = require('./delivery.service');

const assignOrder = async (req, res) => {
    const { orderId, agentId } = req.body;

    if (!orderId || !agentId) {
        return res.status(400).json({ message: 'OrderId and AgentId are required' });
    }

    try {
        const task = await deliveryService.assignOrder(orderId, agentId, req.user);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listTasks = async (req, res) => {
    try {
        const tasks = await deliveryService.listTasks(req.user);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const startDelivery = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await deliveryService.startDelivery(id, req.user.userId);
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const completeDelivery = async (req, res) => {
    const { id } = req.params;
    const { receiverName, notes } = req.body;

    try {
        const task = await deliveryService.completeDelivery(id, req.user.userId, { receiverName, notes }, req.user);
        res.json(task);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 :
            error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    assignOrder,
    listTasks,
    startDelivery,
    completeDelivery
};
