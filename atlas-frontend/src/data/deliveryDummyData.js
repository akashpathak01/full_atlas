
// Delivery Agent Dummy Data - Matches Provided Screenshots

export const deliveryDashboardData = {
    stats: {
        total: 67,
        pending: 1,
        processing: 12,
        shipped: 4
    },
    orders: [
        { id: "#250128", customer: "Khalid Al Fujairah", date: "Dec 28, 2025", status: "Packaged", priority: "Normal" },
        { id: "#337238", customer: "Mariam Al Hosani", date: "Dec 23, 2025", status: "Packaged", priority: "Normal" },
        { id: "#250122", customer: "Fatima Al Zahra", date: "Dec 20, 2025", status: "Packaged", priority: "Normal" }
    ]
};

export const deliveryOrdersData = {
    stats: {
        ready: 8,
        inDelivery: 12,
        delivered: 10,
        failed: 0
    },
    orders: [
        { code: "##260117001", customer: "dummy", phone: "12345678952", address: "دبي, Abu Baker Al Siddique Road AE", amount: "24.99 AED", status: "Processing" },
        { code: "##250125", customer: "Ahmed Al Mansouri", phone: "+971501234567", address: "Dubai, Dubai UAE", amount: "299.00 AED", status: "Packaged" },
        { code: "##399786", customer: "Hassan Al Ketbi", phone: "+971509876543", address: "Umm Al Quwain, UAQ UAE", amount: "29.00 AED", status: "Packaged" },
    ]
};

export const deliveryPerformanceData = {
    currentDate: "Tuesday, January 20, 2026",
    currentTime: "18:27:35",
    stats: {
        totalOrders: 0, // Placeholder as no number shown in card
        readyForDelivery: 0,
        inDelivery: 0,
        delivered: 0
    },
    weekOverview: {
        packagesCompleted: 0,
        avgDuration: "min",
        qualityChecks: 0,
        passRate: "%"
    }
};

export const deliverySettingsData = {
    agents: [] // Empty state "No delivery agents found"
};
