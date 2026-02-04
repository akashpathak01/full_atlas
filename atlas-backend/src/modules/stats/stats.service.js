const prisma = require('../../utils/prisma');

const getAdminStats = async () => {
    // 1. Basic Counts & Revenue
    const [userCount, sellerCount, orderCount, revenue] = await Promise.all([
        prisma.user.count({ where: { isActive: true } }),
        prisma.seller.count(),
        prisma.order.count(),
        prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: 'DELIVERED' }
        })
    ]);

    // 2. Alerts (Low Stock, Failed Deliveries, Pending Orders)
    const [lowStock, failedDelivery, pendingOrders] = await Promise.all([
        prisma.product.count({ where: { stock: { lte: 10 } } }),
        prisma.order.count({ where: { status: 'DELIVERY_FAILED' } }),
        prisma.order.count({ where: { status: 'PENDING_REVIEW' } })
    ]);
    const alertsCount = lowStock + failedDelivery + pendingOrders;

    // 3. System Performance (Delivered vs Total Orders %)
    const deliveredCount = await prisma.order.count({ where: { status: 'DELIVERED' } });
    const performance = orderCount > 0 ? Math.round((deliveredCount / orderCount) * 100) : 0;

    // 4. Weekly Performance Metrics (Last 7 Days Completed Orders)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentOrders = await prisma.order.findMany({
        where: {
            createdAt: { gte: sevenDaysAgo },
            status: 'DELIVERED'
        },
        select: { createdAt: true }
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-orange-400', 'bg-rose-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500'];
    const dailyStats = {};

    recentOrders.forEach(o => {
        const d = days[new Date(o.createdAt).getDay()];
        dailyStats[d] = (dailyStats[d] || 0) + 1;
    });

    // Generate last 7 days array dynamically
    const performanceMetrics = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayName = days[d.getDay()];
        const count = dailyStats[dayName] || 0;

        // Scaling for UI (max height 100%) - simple visual scaling
        // If count is 0, height 10%. If count > 0, scale it up.
        const heightVal = count === 0 ? 5 : Math.min(count * 15 + 10, 100);

        performanceMetrics.push({
            day: dayName,
            val: heightVal,
            rawCount: count, // Pass real count for tooltip if needed
            color: colors[i] || 'bg-blue-500'
        });
    }

    return {
        activeUsers: userCount,
        totalSellers: sellerCount,
        totalOrders: orderCount,
        totalRevenue: revenue?._sum?.totalAmount || 0,
        systemPerformance: `${performance}%`,
        alerts: alertsCount,
        performanceMetrics
    };
};

module.exports = {
    getAdminStats
};
