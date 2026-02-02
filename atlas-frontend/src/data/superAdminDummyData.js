// Super Admin Dummy Data
// All static data for Super Admin pages

// Users Page Data
export const usersData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15', lastLogin: '2026-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', joinDate: '2024-02-20', lastLogin: '2026-01-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Call Center Agent', status: 'Active', joinDate: '2024-03-10', lastLogin: '2026-01-20' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Stock Keeper', status: 'Inactive', joinDate: '2024-04-05', lastLogin: '2026-01-15' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Delivery Agent', status: 'Active', joinDate: '2024-05-12', lastLogin: '2026-01-20' },
];

// Sellers Page Data
export const sellersData = [
    { id: 1, name: 'Tech Store LLC', email: 'contact@techstore.com', phone: '+971-50-123-4567', products: 45, revenue: 'AED 125,000', status: 'Active', joinDate: '2024-01-10' },
    { id: 2, name: 'Fashion Hub', email: 'info@fashionhub.com', phone: '+971-50-234-5678', products: 120, revenue: 'AED 89,500', status: 'Active', joinDate: '2024-02-15' },
    { id: 3, name: 'Home Essentials', email: 'sales@homeessentials.com', phone: '+971-50-345-6789', products: 78, revenue: 'AED 67,200', status: 'Pending', joinDate: '2024-03-20' },
    { id: 4, name: 'Sports World', email: 'support@sportsworld.com', phone: '+971-50-456-7890', products: 92, revenue: 'AED 54,800', status: 'Active', joinDate: '2024-04-25' },
];

// Orders Page Data
export const ordersData = [
    { id: '#ORD-2601-001', customer: 'Ahmed Ali', items: 3, total: 'AED 450', status: 'Processing', date: '2026-01-20', seller: 'Tech Store LLC' },
    { id: '#ORD-2601-002', customer: 'Fatima Hassan', items: 1, total: 'AED 120', status: 'Shipped', date: '2026-01-20', seller: 'Fashion Hub' },
    { id: '#ORD-2601-003', customer: 'Mohammed Khalid', items: 5, total: 'AED 890', status: 'Delivered', date: '2026-01-19', seller: 'Home Essentials' },
    { id: '#ORD-2601-004', customer: 'Layla Ibrahim', items: 2, total: 'AED 340', status: 'Pending', date: '2026-01-19', seller: 'Sports World' },
    { id: '#ORD-2601-005', customer: 'Omar Saeed', items: 4, total: 'AED 670', status: 'Cancelled', date: '2026-01-18', seller: 'Tech Store LLC' },
];

export const orderStats = {
    total: 1247,
    pending: 45,
    processing: 89,
    shipped: 234,
    delivered: 856,
    cancelled: 23
};

// Products Page Data
export const productsData = [
    { id: 'PRD-001', name: 'Wireless Headphones', category: 'Electronics', price: 'AED 299', stock: 45, seller: 'Tech Store LLC', status: 'In Stock' },
    { id: 'PRD-002', name: 'Cotton T-Shirt', category: 'Fashion', price: 'AED 89', stock: 120, seller: 'Fashion Hub', status: 'In Stock' },
    { id: 'PRD-003', name: 'Kitchen Blender', category: 'Home', price: 'AED 199', stock: 5, seller: 'Home Essentials', status: 'Low Stock' },
    { id: 'PRD-004', name: 'Running Shoes', category: 'Sports', price: 'AED 349', stock: 0, seller: 'Sports World', status: 'Out of Stock' },
    { id: 'PRD-005', name: 'Smart Watch', category: 'Electronics', price: 'AED 599', stock: 78, seller: 'Tech Store LLC', status: 'In Stock' },
];

// Inventory Page Data
export const inventoryData = [
    { id: 'INV-001', product: 'Wireless Headphones', sku: 'WH-2024-001', quantity: 45, location: 'Warehouse A', lastUpdated: '2026-01-20' },
    { id: 'INV-002', product: 'Cotton T-Shirt', sku: 'CT-2024-002', quantity: 120, location: 'Warehouse B', lastUpdated: '2026-01-20' },
    { id: 'INV-003', product: 'Kitchen Blender', sku: 'KB-2024-003', quantity: 5, location: 'Warehouse A', lastUpdated: '2026-01-19' },
    { id: 'INV-004', product: 'Running Shoes', sku: 'RS-2024-004', quantity: 0, location: 'Warehouse C', lastUpdated: '2026-01-18' },
];

export const inventoryStats = {
    totalItems: 2456,
    lowStock: 12,
    outOfStock: 5,
    totalValue: 'AED 1,245,000'
};

// Finance Page Data
export const financeData = {
    revenue: {
        today: 'AED 12,450',
        thisWeek: 'AED 89,340',
        thisMonth: 'AED 345,670',
        total: 'AED 2,456,890'
    },
    transactions: [
        { id: 'TXN-001', type: 'Sale', amount: 'AED 450', status: 'Completed', date: '2026-01-20 14:30' },
        { id: 'TXN-002', type: 'Refund', amount: 'AED -120', status: 'Processed', date: '2026-01-20 13:15' },
        { id: 'TXN-003', type: 'Sale', amount: 'AED 890', status: 'Completed', date: '2026-01-20 11:45' },
        { id: 'TXN-004', type: 'Sale', amount: 'AED 340', status: 'Pending', date: '2026-01-20 10:20' },
    ]
};

export const financeStats = {
    totalRevenue: 'AED 1,245,000',
    todaysSales: 'AED 12,450',
    pendingPayments: 12,
    monthlyGrowth: '15%'
};

export const paymentsData = [
    { id: 'PAY-001', orderId: '#ORD-001', customer: 'Ahmed Ali', amount: 'AED 450', method: 'Credit Card', status: 'Completed', date: '2024-03-20' },
    { id: 'PAY-002', orderId: '#ORD-002', customer: 'Sarah Smith', amount: 'AED 1,200', method: 'Bank Transfer', status: 'Pending', date: '2024-03-19' },
    { id: 'PAY-003', orderId: '#ORD-003', customer: 'John Doe', amount: 'AED 850', method: 'Cash', status: 'Completed', date: '2024-03-18' },
    { id: 'PAY-004', orderId: '#ORD-004', customer: 'Fatima Omar', amount: 'AED 3,400', method: 'Credit Card', status: 'Failed', date: '2024-03-17' },
    { id: 'PAY-005', orderId: '#ORD-005', customer: 'Mike Ross', amount: 'AED 220', method: 'Wallet', status: 'Completed', date: '2024-03-16' },
];

export const paymentPlatformsData = [
    { id: 1, name: 'Stripe', type: 'Payment Gateway', status: 'Active', transactions: 1250, volume: 'AED 450,000' },
    { id: 2, name: 'PayPal', type: 'Wallet', status: 'Active', transactions: 850, volume: 'AED 220,000' },
    { id: 3, name: 'Bank Transfer', type: 'Offline', status: 'Active', transactions: 45, volume: 'AED 1,500,000' },
    { id: 4, name: 'Cash on Delivery', type: 'Offline', status: 'Active', transactions: 2200, volume: 'AED 180,000' },
];

// Sourcing Page Data
export const sourcingData = [
    { id: 'SRC-001', product: 'Wireless Earbuds', supplier: 'Global Tech Suppliers', quantity: 500, status: 'Pending', requestDate: '2026-01-18', expectedDate: '2026-02-15' },
    { id: 'SRC-002', product: 'Yoga Mats', supplier: 'Fitness Wholesale', quantity: 200, status: 'Approved', requestDate: '2026-01-15', expectedDate: '2026-02-10' },
    { id: 'SRC-003', product: 'Coffee Maker', supplier: 'Kitchen Supplies Co', quantity: 100, status: 'In Transit', requestDate: '2026-01-10', expectedDate: '2026-01-25' },
];

export const sourcingStats = {
    totalRequests: 45,
    pending: 12,
    approved: 18,
    inTransit: 10,
    completed: 5
};

// Packaging Page Data
export const packagingData = {
    stats: {
        readyToPack: 23,
        inProgress: 15,
        packed: 156,
        shipped: 234
    },
    orders: [
        { id: '#ORD-2601-001', items: 3, status: 'Ready', assignedTo: 'Packer 1', priority: 'High' },
        { id: '#ORD-2601-002', items: 1, status: 'In Progress', assignedTo: 'Packer 2', priority: 'Normal' },
        { id: '#ORD-2601-003', items: 5, status: 'Packed', assignedTo: 'Packer 1', priority: 'Normal' },
    ],
    materials: [
        { name: 'Small Boxes', quantity: 450, unit: 'pcs', status: 'Sufficient' },
        { name: 'Medium Boxes', quantity: 89, unit: 'pcs', status: 'Low' },
        { name: 'Bubble Wrap', quantity: 12, unit: 'rolls', status: 'Critical' },
    ]
};

// Call Center Page Data
export const callCenterData = {
    stats: {
        totalCalls: 234,
        activeAgents: 12,
        avgWaitTime: '2:34',
        satisfaction: '94%'
    },
    agents: [
        { id: 1, name: 'Agent 1', status: 'On Call', calls: 23, avgTime: '5:12' },
        { id: 2, name: 'Agent 2', status: 'Available', calls: 18, avgTime: '4:45' },
        { id: 3, name: 'Agent 3', status: 'Break', calls: 15, avgTime: '6:20' },
    ]
};

// Delivery Page Data
export const deliveryData = {
    stats: {
        totalDeliveries: 456,
        inTransit: 89,
        delivered: 345,
        failed: 12,
        pending: 10
    },
    shipments: [
        { id: 'SHIP-001', order: '#ORD-2601-001', driver: 'Driver 1', status: 'In Transit', eta: '2026-01-20 18:00', location: 'Dubai' },
        { id: 'SHIP-002', order: '#ORD-2601-002', driver: 'Driver 2', status: 'Delivered', deliveredAt: '2026-01-20 14:30', location: 'Abu Dhabi' },
        { id: 'SHIP-003', order: '#ORD-2601-003', driver: 'Driver 3', status: 'Pending', eta: '2026-01-21 10:00', location: 'Sharjah' },
    ],
    companies: [
        { name: 'Emirates Post', activeShipments: 45, onTimeRate: '96%', status: 'Active' },
        { name: 'Aramex', activeShipments: 32, onTimeRate: '94%', status: 'Active' },
        { name: 'DHL', activeShipments: 12, onTimeRate: '98%', status: 'Active' },
    ]
};

// Subscribers Page Data
export const subscribersData = [
    { id: 1, email: 'subscriber1@example.com', name: 'Ali Ahmed', subscribed: '2024-06-15', status: 'Active', plan: 'Premium' },
    { id: 2, email: 'subscriber2@example.com', name: 'Sara Mohammed', subscribed: '2024-07-20', status: 'Active', plan: 'Basic' },
    { id: 3, email: 'subscriber3@example.com', name: 'Khalid Hassan', subscribed: '2024-08-10', status: 'Inactive', plan: 'Premium' },
    { id: 4, email: 'subscriber4@example.com', name: 'Noor Fatima', subscribed: '2024-09-05', status: 'Active', plan: 'Basic' },
];

// Roles Page Data
export const rolesData = [
    { id: 1, name: 'Super Admin', users: 2, permissions: ['All'], description: 'Full system access', status: 'Active' },
    { id: 2, name: 'Admin', users: 5, permissions: ['Users', 'Orders', 'Products', 'Reports'], description: 'Administrative access', status: 'Active' },
    { id: 3, name: 'Seller', users: 45, permissions: ['Products', 'Orders', 'Finance'], description: 'Seller portal access', status: 'Active' },
    { id: 4, name: 'Call Center Agent', users: 12, permissions: ['Orders', 'Customers'], description: 'Customer support access', status: 'Active' },
    { id: 5, name: 'Stock Keeper', users: 8, permissions: ['Inventory', 'Products'], description: 'Inventory management', status: 'Active' },
];

// Warehouses Page Data
export const superAdminWarehousesData = [
    { id: 1, name: 'Dubai Main Warehouse', location: 'Dubai Investment Park', description: 'Main distribution center for Dubai region', status: 'Active' },
    { id: 2, name: 'Abu Dhabi Hub', location: 'Mussafah Industrial Area', description: 'Regional hub for Abu Dhabi and Al Ain', status: 'Active' },
    { id: 3, name: 'Sharjah Storage', location: 'Sharjah Industrial Area', description: 'Overflow storage and returns processing', status: 'Inactive' },
    { id: 4, name: 'Northern Emirates Depot', location: 'Ras Al Khaimah', description: 'Serving Northern Emirates', status: 'Active' },
];
