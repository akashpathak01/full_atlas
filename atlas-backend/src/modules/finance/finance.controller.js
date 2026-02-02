const financeService = require('./finance.service');

const getSummary = async (req, res) => {
    try {
        const summary = await financeService.getSummary(req.user);
        res.json(summary);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 : 500;
        res.status(status).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const result = await financeService.getFinancialOrders(req.user, page, limit);
        res.json(result);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 : 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getSummary,
    getOrders
};
