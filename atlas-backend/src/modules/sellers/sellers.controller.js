const sellersService = require('./sellers.service');

const listSellers = async (req, res) => {
    try {
        const sellers = await sellersService.listSellers(req.user);
        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sellers', error: error.message });
    }
};

const onboardSeller = async (req, res) => {
    try {
        const result = await sellersService.onboardSeller(req.body, req.user);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error onboarding seller', error: error.message });
    }
};

module.exports = {
    listSellers,
    onboardSeller
};
