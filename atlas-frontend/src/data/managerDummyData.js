
// Manager Dummy Data - Matches Provided Screenshots

export const managerDashboardData = {
    user: "Manager User",
    liveOperations: "05:18:48 PM",
    stats: {
        totalOrders: 67,
        pendingApproval: 1,
        activeAgents: 1,
        approvedToday: 0
    },
    ordersAwaitingApproval: [
        {
            id: '##260117001',
            customer: 'dummy',
            created: 'Jan 17, 2026 00:46',
            status: 'Callcenter_Review'
        }
    ],
    recentlyApprovedOrders: [], // Empty as per screenshot
    assignedOrders: [
        {
            id: '##260117007',
            customer: 'dummy',
            agent: 'Call Center Agent',
            status: 'Seller_Submitted'
        },
        {
            id: '##260117001',
            customer: 'dummy',
            agent: 'Call Center Agent',
            status: 'Callcenter_Review'
        }
    ],
    unassignedOrders: [
        {
            id: '##305537',
            customer: 'Mohammed Al Ahmed',
            created: 'Nov 11, 2025 04:24'
        },
        {
            id: '##313273',
            customer: 'Mohammed Al Ahmed',
            created: 'Nov 11, 2025 04:24' // Assuming same date for simplicity or placeholder
        }
    ]
};

export const managerOrdersData = {
    stats: {
        totalOrders: 67,
        pending: 6,
        processing: 13,
        completed: 0,
        activeAgents: 1,
        todaysRevenue: 0
    },
    orders: [
        {
            id: '##260117007',
            amount: '654.00 AED',
            customer: 'dummy',
            customerPhone: '123456785',
            status: 'Pending',
            agent: 'Call Center Agent',
            created: 'Jan 17, 2026 01:33'
        },
        {
            id: '##260117006',
            amount: '100.00 AED',
            customer: 'عميل تجريبي 5',
            customerPhone: '0501234564',
            status: 'Pending',
            agent: 'Unassigned',
            created: 'Jan 17, 2026 01:30'
        }
    ]
};

export const managerAgentsData = [
    {
        name: 'Call Center Agent',
        email: 'callcenter@atlas.com',
        phone: '+971 50 123 4567',
        status: 'Active',
        role: 'Senior Agent',
        joined: 'Jan 12, 2024',
        performance: '92%'
    },
    {
        name: 'Ahmed Hassan',
        email: 'ahmed.h@atlas.com',
        phone: '+971 55 987 6543',
        status: 'Active',
        role: 'Agent',
        joined: 'Mar 05, 2024',
        performance: '85%'
    },
    {
        name: 'Sarah Khan',
        email: 'sarah.k@atlas.com',
        phone: '+971 56 444 3322',
        status: 'Offline',
        role: 'Agent',
        joined: 'Jun 20, 2024',
        performance: '78%'
    }
];

export const managerPerformanceData = {
    stats: {
        totalAgents: 1,
        activeAgents: 'Active',
        avgPerformance: '87%',
        performanceChange: '↑ This Month',
        topPerformer: 'Call Center Agent',
        topPerformerPeriod: 'This Week',
        totalOrders: 2,
        ordersPeriod: '↑ All Time'
    },
    agentDetails: [
        {
            agent: 'Call Center Agent',
            email: 'callcenter@atlas.com',
            ordersHandled: 124,
            successRate: '94.2%',
            avgResponseTime: '1.8 min',
            rating: 4.8,
            performanceScore: '92.0%',
            totalCalls: 450,
            missedCalls: 12
        },
        {
            agent: 'Ahmed Hassan',
            email: 'ahmed.h@atlas.com',
            ordersHandled: 98,
            successRate: '88.5%',
            avgResponseTime: '2.4 min',
            rating: 4.5,
            performanceScore: '85.0%',
            totalCalls: 380,
            missedCalls: 24
        },
        {
            agent: 'Sarah Khan',
            email: 'sarah.k@atlas.com',
            ordersHandled: 76,
            successRate: '82.0%',
            avgResponseTime: '3.1 min',
            rating: 4.1,
            performanceScore: '78.0%',
            totalCalls: 310,
            missedCalls: 45
        }
    ]
};

export const managerStatisticsData = {
    stats: {
        totalOrders: 7,
        totalOrdersChange: '↑ All Time',
        thisMonth: 67,
        thisMonthChange: '↑ vs Last Month',
        completionRate: '0.0%',
        completionRateChange: '↑ This Month',
        avgOrderValue: '172 AED',
        avgOrderValueChange: '↑ This Month'
    },
    ordersByStatus: {
        pending: { count: 6, percentage: '25%', revenue: '1154 AED', avgTime: '2.5 hours' },
        processing: { count: 1, percentage: '30%', revenue: '50 AED', avgTime: '4.2 hours' },
        completed: { count: 0, percentage: '40%', revenue: '0 AED', avgTime: '6.8 hours' },
        cancelled: { count: 0, percentage: '5%', revenue: '0 AED', avgTime: '1.2 hours' }
    }
};
