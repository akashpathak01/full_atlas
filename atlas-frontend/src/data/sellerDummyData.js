
// Seller Dummy Data matches the user's screenshots exactly

export const sellerDashboardData = {
    stats: {
        totalSales: 'AED 22,412',
        salesGrowth: '+12.5%',
        totalOrders: 61,
        ordersGrowth: '+8.3%',
        products: 31,
        productsGrowth: '+15.2%',
        pendingOrders: 28,
        pendingLabel: '28 orders waiting'
    },
    topProducts: [
        { name: 'Test Product for Delivery', count: 10 },
        { name: 'Car Phone Mount Pro 9', count: 9 },
        { name: 'Smart Watch Pro 2', count: 8 },
        { name: 'Phone Case Pro 5', count: 7 },
        { name: 'Bluetooth Speaker Pro 3', count: 6 },
    ],
    salesChart: [
        { month: 'Aug', value: 0 },
        { month: 'Sep', value: 2000 },
        { month: 'Oct', value: 2500 },
        { month: 'Nov', value: 5000 },
        { month: 'Dec', value: 16000 },
        { month: 'Jan', value: 6000 },
    ]
};

export const sellerOrdersData = [
    { id: '#260117007', customer: 'dummy', phone: '123456785', product: 'sgsdgdsg', qty: 1, address: 'No address', amount: 'AED 654.00', status: 'Pending', payment: 'Pending' },
    { id: '#310736', customer: 'Hassan Al Ketbi', phone: '+971557890123', product: 'Phone Case Pro 5', qty: 1, address: 'Building 29, Street 76', amount: 'AED 19.99', status: 'Cancelled', payment: 'Pending' },
    { id: '#250125', customer: 'Ahmed Al Mansouri', phone: '+971501234567', product: 'Test Product for Delivery', qty: 2, address: 'Building 16, Street 39', amount: 'AED 598.00', status: 'Packaged', payment: 'Pending' },
];

export const sellerInventoryData = [
    { name: 'Cable Organizer Pro 10', model: 'منتج 10', sku: 'SKU-1767695078-1AB728AA', price: 'AED 9.99', stock: 467, stockStatus: 'Good', status: 'Active', warehouse: 'Restricted', lastUpdated: 'Jan 06, 2026' },
    { name: 'Car Phone Mount Pro 9', model: 'منتج 9', sku: 'SKU-1767695078-BBC240BA', price: 'AED 24.99', stock: 298, stockStatus: 'Good', status: 'Active', warehouse: 'Restricted', lastUpdated: 'Jan 06, 2026' },
];

export const sellerProductsData = [
    { name: 'Cable Organizer Pro 10', model: 'منتج 10', code: 'SKU-1767695078-1AB728AA', price: 'AED 9.99', stock: 467, status: 'In Stock', approval: 'Approved' },
    { name: 'Car Phone Mount Pro 9', model: 'منتج 9', code: 'SKU-1767695078-BBC240BA', price: 'AED 24.99', stock: 298, status: 'In Stock', approval: 'Approved' },
    { name: 'Wireless Charger Pro 8', model: 'منتج 8', code: 'SKU-1767695078-EAC21339', price: 'AED 29.99', stock: 362, status: 'In Stock', approval: 'Approved' },
    { name: 'Power Bank Pro 7', model: 'منتج 7', code: 'SKU-1767695078-EC80EB42', price: 'AED 39.99', stock: 225, status: 'In Stock', approval: 'Approved' },
    { name: 'Screen Protector Pro 6', model: 'منتج 6', code: 'SKU-1767695077-AE1A4326', price: 'AED 14.99', stock: 351, status: 'In Stock', approval: 'Approved' },
];

export const sellerFinanceData = {
    stats: {
        totalRevenue: 'AED 42,850.00',
        monthlyRevenue: 'AED 12,400.00',
        pendingPayments: 'AED 5,200.00',
        commission: 'AED 3,640.00'
    },
    transactions: [
        { id: 'TXN-100234', date: 'Jan 20, 2026', desc: 'Order #260117007 Payout', type: 'Payout', amount: 'AED 654.00', status: 'Completed' },
        { id: 'TXN-100233', date: 'Jan 18, 2026', desc: 'Order #250125 Payment Received', type: 'Incoming', amount: 'AED 598.00', status: 'Completed' },
        { id: 'TXN-100232', date: 'Jan 17, 2026', desc: 'Monthly Subscription Fee', type: 'Expense', amount: '-AED 99.00', status: 'Completed' },
        { id: 'TXN-100231', date: 'Jan 15, 2026', desc: 'Bulk Import Service Fee', type: 'Service', amount: '-AED 250.00', status: 'Pending' },
        { id: 'TXN-100230', date: 'Jan 12, 2026', desc: 'Referral Bonus', type: 'Bonus', amount: 'AED 100.00', status: 'Completed' }
    ]
};
