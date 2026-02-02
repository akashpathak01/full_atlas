const statsService = require('./stats.service');

const getAdminStats = async (req, res) => {
    try {
        const stats = await statsService.getAdminStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

module.exports = {
    getAdminStats
};
