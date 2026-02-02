const prisma = require('../../utils/prisma');

const listRoles = async () => {
    const roles = await prisma.role.findMany({
        include: {
            _count: {
                select: { users: true }
            }
        }
    });

    // Mapping to match frontend expected structure if needed
    return roles.map(role => ({
        id: role.id,
        name: role.name,
        users: role._count.users,
        // Mock permissions and description for now as they are not in schema yet
        // In a real app, these would be in the Role model or a Permissions model
        permissions: ['READ', 'WRITE'],
        description: `Manage ${role.name.toLowerCase()} operations`,
        status: 'Active'
    }));
};

const getPermissions = async () => {
    // Return all available permissions in the system
    return [
        'DASHBOARD_VIEW',
        'USERS_MANAGE',
        'ROLES_MANAGE',
        'SELLERS_MANAGE',
        'ORDERS_VIEW',
        'ORDERS_MANAGE',
        'PRODUCTS_MANAGE',
        'INVENTORY_MANAGE',
        'FINANCE_VIEW',
        'AUDIT_LOGS_VIEW',
        'SYSTEM_CONFIG_MANAGE'
    ];
};

module.exports = {
    listRoles,
    getPermissions
};
