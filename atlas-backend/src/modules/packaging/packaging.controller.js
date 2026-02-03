const packagingService = require('./packaging.service');

const assignOrder = async (req, res) => {
    const { orderId, agentId } = req.body;

    if (!orderId || !agentId) {
        return res.status(400).json({ message: 'OrderId and AgentId are required' });
    }

    try {
        const task = await packagingService.assignOrder(orderId, agentId, req.user);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listTasks = async (req, res) => {
    try {
        const tasks = await packagingService.listTasks(req.user);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const completeTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await packagingService.completeTask(id, req.user.id, req.user);

        res.json(task);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 :
            error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const stats = await packagingService.getDashboardStats(req.user);
        res.json(stats);
    } catch (error) {
        console.error("Error fetching packaging dashboard stats:", error);
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
};

module.exports = {
    assignOrder,
    listTasks,
    completeTask,
    getDashboardStats
};
