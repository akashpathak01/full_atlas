export const customerData = [
    {
        id: 'CUST-001',
        name: 'Ahmed Hassan',
        phone: '+971 50 123 4567',
        email: 'ahmed.h@example.com',
        totalOrders: 12,
        address: 'Downtown Dubai, Burj Vista, Dubai, UAE',
        joinDate: 'Jan 15, 2024',
        orders: [
            { id: '#67', date: 'Jan 17, 2026', status: 'Pending', amount: 'AED 654.00', items: 'Wireless Headphones (1)' },
            { id: '#45', date: 'Dec 12, 2025', status: 'Completed', amount: 'AED 299.00', items: 'Smart Watch (1)' },
            { id: '#12', date: 'Oct 05, 2025', status: 'Completed', amount: 'AED 1,200.00', items: 'Gaming Console (1)' }
        ],
        notes: [
            { date: 'Jan 17, 2026', agent: 'Agent Sarah', text: 'Customer called to check delivery status for #67. Informed them it is in process.' },
            { date: 'Dec 15, 2025', agent: 'Agent Sarah', text: 'Customer verified address for future deliveries.' }
        ]
    },
    {
        id: 'CUST-002',
        name: 'Mariam Ali',
        phone: '+971 52 987 6543',
        email: 'mariam.ali@example.com',
        totalOrders: 5,
        address: 'Khalifa City, Al Forsan Village, Abu Dhabi, UAE',
        joinDate: 'May 20, 2024',
        orders: [
            { id: '#66', date: 'Jan 17, 2026', status: 'Pending', amount: 'AED 100.00', items: 'USB-C Cable (2)' },
            { id: '#34', date: 'Aug 10, 2025', status: 'Cancelled', amount: 'AED 750.00', items: 'Mechanical Keyboard (1)' }
        ],
        notes: [
            { date: 'Jan 10, 2026', agent: 'Agent John', text: 'Interested in bulk purchase discounts for corporate office.' }
        ]
    },
    {
        id: 'CUST-003',
        name: 'John Smith',
        phone: '+971 55 456 7890',
        email: 'john.smith@example.com',
        totalOrders: 23,
        address: 'Jumeirah Lake Towers, Cluster X, Dubai, UAE',
        joinDate: 'Feb 10, 2023',
        orders: [
            { id: '#22', date: 'Dec 20, 2025', status: 'Completed', amount: 'AED 540.00', items: 'Eco-friendly Yoga Mat (3)' }
        ],
        notes: []
    }
];
