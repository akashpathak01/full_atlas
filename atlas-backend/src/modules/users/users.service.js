const bcrypt = require('bcryptjs');
const prisma = require('../../utils/prisma');
const { logAction } = require('../../utils/auditLogger');

const ROLE_SCOPES = {
    SUPER_ADMIN: ['ADMIN'], // Super Admin can ONLY create Admins
    ADMIN: [ // Admin can create operational roles ONLY
        'SELLER',
        'CALL_CENTER_AGENT',
        'CALL_CENTER_MANAGER',
        'STOCK_KEEPER',
        'PACKAGING_AGENT',
        'DELIVERY_AGENT'
    ]
};


const getAllowedRoles = (requesterRole) => {
    return ROLE_SCOPES[requesterRole] || [];
};

const createUser = async (userData, requester) => {
    const requesterRole = requester.role;
    const requesterId = requester.id;

    const {
        email,
        password,
        name,
        roleName,
        phone,
        storeLink,
        bankName,
        accountHolder,
        accountNumber,
        ibanConfirmation,
        idFrontImage,
        idBackImage
    } = userData;

    // 1. Role Boundary Check
    const allowedRoles = getAllowedRoles(requesterRole);
    if (!allowedRoles.includes(roleName)) {
        throw new Error(`Forbidden: You cannot create users with the role ${roleName}`);
    }

    // 2. Role Existence Check
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new Error('Invalid role specified');

    // 3. User Existence Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User with this email already exists');

    // 4. Create User
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            phone,
            roleId: role.id,
            isActive: true,
            storeLink,
            bankName,
            accountHolder,
            accountNumber,
            ibanConfirmation,
            idFrontImage,
            idBackImage,
            createdById: requesterId // Track who created this user
        },
        include: { role: true }
    });

    // 5. If role is SELLER, create a Seller entry and link to Admin
    if (roleName === 'SELLER') {
        await prisma.seller.create({
            data: {
                userId: user.id,
                shopName: name, // Default to user name
                adminId: requesterRole === 'ADMIN' ? requesterId : null // Link to admin
            }
        });
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};


const listUsers = async (requester) => {
    const requesterRole = requester.role;
    const requesterId = requester.id;
    const allowedRoles = getAllowedRoles(requesterRole);

    let where = {
        role: {
            name: { in: allowedRoles }
        }
    };

    // Admin only sees users they created
    if (requesterRole === 'ADMIN') {
        where.createdById = requesterId;
    }

    return await prisma.user.findMany({
        where,
        select: {
            id: true,
            email: true,
            name: true,
            isActive: true,
            createdAt: true,
            role: {
                select: { name: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};


const updateUserStatus = async (userId, isActive, requesterRole, adminUserId) => { // Added adminUserId for logging
    const userToUpdate = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: { role: true }
    });

    if (!userToUpdate) throw new Error('User not found');

    // Role Boundary Check for the target user
    const allowedRoles = getAllowedRoles(requesterRole);
    if (!allowedRoles.includes(userToUpdate.role.name)) {
        throw new Error('Forbidden: You do not have permission to manage this user');
    }

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { isActive },
        include: { role: true } // Include role to get name for logging
    });

    await logAction({
        actionType: 'USER_STATUS_UPDATE',
        entityType: 'USER',
        entityId: updatedUser.id,
        user: adminUserId, // Assuming adminUserId is passed for logging
        metadata: { newStatus: isActive ? 'ACTIVE' : 'INACTIVE', targetUser: updatedUser.email }
    });

    // Return a subset of fields as originally intended by the select block
    const { password, ...userWithoutPassword } = updatedUser;
    return {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        isActive: userWithoutPassword.isActive,
        role: { name: userWithoutPassword.role.name }
    };
};

module.exports = {
    createUser,
    listUsers,
    updateUserStatus,
    getAllowedRoles
};
