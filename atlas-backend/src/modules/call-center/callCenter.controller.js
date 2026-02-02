const callCenterService = require('./callCenter.service');

const getCustomers = async (req, res) => {
    try {
        const customers = await callCenterService.getCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await callCenterService.getCustomerById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await callCenterService.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await callCenterService.updateOrderStatus(req.params.id, status, req.user);
        res.json(order);
    } catch (error) {
        const statusCode = error.message.includes('Forbidden') ? 403 : 400;
        res.status(statusCode).json({ message: error.message });
    }
};

const addNote = async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Note content is required' });

    try {
        const note = await callCenterService.addCallNote(req.params.id, req.user.userId, content);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await callCenterService.getCallNotes(req.params.id);
        res.json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAgents = async (req, res) => {
    try {
        const agents = await callCenterService.getAgents();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPerformance = async (req, res) => {
    try {
        const metrics = await callCenterService.getPerformanceMetrics();
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    getOrders,
    updateStatus,
    addNote,
    getNotes,
    getAgents,
    getPerformance
};
