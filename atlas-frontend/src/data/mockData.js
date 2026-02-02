import { Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export const stats = [
    {
        title: "Total Orders",
        value: "1,234",
        change: "+12.5%",
        trend: "up",
        icon: ShoppingCart,
        color: "blue"
    },
    {
        title: "Total Products",
        value: "845",
        change: "+5.2%",
        trend: "up",
        icon: Package,
        color: "green"
    },
    {
        title: "Total Users",
        value: "15.2k",
        change: "+8.1%",
        trend: "up",
        icon: Users,
        color: "purple"
    },
    {
        title: "Total Revenue",
        value: "$45,231",
        change: "+15.3%",
        trend: "up",
        icon: TrendingUp,
        color: "indigo"
    }
];

export const recentOrders = [
    {
        id: "#ORD-001",
        customer: "John Doe",
        product: "Premium Headphones",
        amount: "$299.00",
        status: "Delivered",
        date: "2024-03-15"
    },
    {
        id: "#ORD-002",
        customer: "Sarah Smith",
        product: "Wireless Keyboard",
        amount: "$129.00",
        status: "Processing",
        date: "2024-03-14"
    },
    {
        id: "#ORD-003",
        customer: "Mike Johnson",
        product: "Gaming Mouse",
        amount: "$89.00",
        status: "Pending",
        date: "2024-03-14"
    },
    {
        id: "#ORD-004",
        customer: "Emily Davis",
        product: "USB-C Hub",
        amount: "$45.00",
        status: "Cancelled",
        date: "2024-03-13"
    },
    {
        id: "#ORD-005",
        customer: "Alex Wilson",
        product: "Monitor Stand",
        amount: "$65.00",
        status: "Shipped",
        date: "2024-03-13"
    }
];

export const systemHealth = [
    { name: "Database Server", status: "online", progress: 98 },
    { name: "API Gateway", status: "online", progress: 100 },
    { name: "Storage Service", status: "warning", progress: 85 },
    { name: "Email Service", status: "online", progress: 95 }
];
