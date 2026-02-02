
// Call Center Dummy Data matches the user's screenshots exactly

export const callCenterDashboardData = {
    currentTime: "17:11",
    currentDate: "January 20, 2026",
    lastLogin: "Jan 20, 2026 05:39",
    stats: {
        assignedOrders: 17,
        confirmedOrders: 0,
        postponedOrders: 0,
        cancelledOrders: 0,
        totalCalls: 0
    },
    priorityOrders: [
        {
            id: '67',
            customer: 'dummy',
            product: 'sgsdgdsg',
            units: 1,
            date: 'Jan 17, 2026 01:31',
            isUrgent: true
        },
        {
            id: '66',
            customer: 'عميل تجريبي 5',
            product: 'sgsdgdsg',
            units: 1,
            date: 'Jan 17, 2026 01:30',
            isUrgent: true
        }
    ]
};

export const callCenterOrdersData = {
    stats: {
        totalAssigned: 17,
        pending: 6,
        confirmed: 0,
        cancelled: 0
    },
    orders: [
        {
            id: '#67',
            customer: 'dummy',
            phone: '123456785',
            product: 'sgsdgdsg',
            price: 'AED 654.00',
            address: 'Abu Dhabi Gate City, AE , أبوظبي',
            status: 'Pending',
            statusAr: 'في الانتظار',
            date: 'Jan 17, 2026'
        },
        {
            id: '#66',
            customer: 'عميل تجريبي 5',
            phone: '0501234564',
            product: 'sgsdgdsg',
            price: 'AED 100.00',
            address: 'No address',
            status: 'Pending',
            statusAr: 'في الانتظار',
            date: 'Jan 17, 2026'
        }
    ]
};
