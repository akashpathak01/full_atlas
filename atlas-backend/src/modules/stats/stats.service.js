const prisma = require('../../utils/prisma');

const getAdminStats = async () => {
    const [userCount, sellerCount, orderCount, revenue] = await Promise.all([
        prisma.user.count({ where: { isActive: true } }),
        prisma.seller.count(),
        prisma.order.count(),
        prisma.order.aggregate({
            _sum: {
                totalAmount: true
            }
        })
    ]);

    return {
        activeUsers: userCount,
        totalSellers: sellerCount,
        totalOrders: orderCount,
        totalRevenue: revenue?._sum?.totalAmount || 0,
        // Mocking performance for now
        systemPerformance: '98%',
        alerts: 0
    };
};

module.exports = {
    getAdminStats
};
