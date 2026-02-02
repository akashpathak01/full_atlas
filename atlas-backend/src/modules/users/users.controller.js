const userService = require('./users.service');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body, req.user.role);
        res.status(201).json(user);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 : 400;
        res.status(status).json({ message: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await userService.listUsers(req.user.role);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'isActive status is required as boolean' });
    }

    try {
        const user = await userService.updateUserStatus(id, isActive, req.user.role);
        res.json(user);
    } catch (error) {
        const status = error.message.includes('Forbidden') ? 403 :
            error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    listUsers,
    updateStatus
};
