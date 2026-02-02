const prisma = require('../../utils/prisma');

const listSellers = async (user) => {
    const { role, id: userId } = user;
    let where = {};

    if (role === 'ADMIN') {
        where.adminId = userId;
    }

    const sellers = await prisma.seller.findMany({
        where,
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    isActive: true,
                    createdAt: true
                }
            },
            _count: {
                select: {
                    products: true,
                    orders: true
                }
            }
        }
    });

    return sellers.map(seller => ({
        id: seller.id,
        name: seller.shopName || seller.user.name,
        email: seller.user.email,
        phone: '+971 50 123 4567', // Placeholder as not in schema
        products: seller._count.products,
        revenue: '0.00 AED', // To be calculated or fetched from finance
        status: seller.user.isActive ? 'Active' : 'Inactive',
        joinDate: seller.createdAt.toLocaleDateString(),
    }));
};

const onboardSeller = async (data, requester) => {
    const {
        name,
        email,
        password,
        shopName,
        phone,
        storeLink,
        bankName,
        accountHolder,
        accountNumber,
        ibanConfirmation,
        idFrontImage,
        idBackImage
    } = data;
    const { role: requesterRole, id: requesterId } = requester;

    const actualRole = await prisma.role.findFirst({
        where: { name: { in: ['SELLER', 'Seller'] } }
    });

    if (!actualRole) throw new Error('Seller role not found in system');

    const result = await prisma.$transaction(async (tx) => {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await tx.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                phone,
                roleId: actualRole.id,
                storeLink,
                bankName,
                accountHolder,
                accountNumber,
                ibanConfirmation,
                idFrontImage,
                idBackImage,
                isActive: true,
                createdById: requesterId // Link user creator
            }
        });

        const seller = await tx.seller.create({
            data: {
                shopName: shopName || name,
                userId: user.id,
                adminId: requesterRole === 'ADMIN' ? requesterId : null
            }
        });

        return { user, seller };
    });

    return result;
};



module.exports = {
    listSellers,
    onboardSeller
};
