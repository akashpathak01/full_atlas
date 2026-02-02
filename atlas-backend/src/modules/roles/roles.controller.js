const rolesService = require('./roles.service');

const listRoles = async (req, res) => {
    try {
        const roles = await rolesService.listRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
};

const getPermissions = async (req, res) => {
    try {
        const permissions = await rolesService.getPermissions();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching permissions', error: error.message });
    }
};

module.exports = {
    listRoles,
    getPermissions
};
