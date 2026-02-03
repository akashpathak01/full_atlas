import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, BarChart2, Search, ArrowRight, AlertCircle, RefreshCw, Home, LayoutGrid, FileText, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export function PackagingDashboard() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.get('/orders/packaging');
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Failed to fetch dashboard orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Stats matching the screenshot values (dynamic)
    const stats = [
        { label: 'Pending Packaging', value: orders.length.toString(), icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'In Progress', value: '0', icon: LayoutGrid, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Completed Today', value: '0', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Total Records', value: orders.length.toString(), icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
            </div>

            {/* Header Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Package className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-orange-600">Pick and Pack</h1>
                            <p className="text-sm text-gray-500">Manage packaging operations and materials</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/packaging/dashboard')}
                            className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 flex items-center gap-2 shadow-sm transition-all"
                        >
                            <Home className="w-4 h-4" /> Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/packaging/orders')}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm transition-all"
                        >
                            <LayoutGrid className="w-4 h-4" /> View Orders
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Order Code, Customer, Phone..."
                        className="w-full pl-4 pr-32 py-3 bg-white border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-700 font-medium"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-all">
                        <Search className="w-4 h-4" /> Search
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 leading-none">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/packaging/orders')}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-green-300 transition-all text-left group"
                >
                    <div className="p-3 bg-green-50 rounded-lg group-hover:scale-110 transition-transform">
                        <Package className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Packaging Orders</h3>
                        <p className="text-sm text-gray-500">View all packaging orders</p>
                    </div>
                </button>

                <button
                    onClick={() => navigate('/packaging/materials')}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-purple-300 transition-all text-left group"
                >
                    <div className="p-3 bg-purple-50 rounded-lg group-hover:scale-110 transition-transform">
                        <RefreshCw className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Materials</h3>
                        <p className="text-sm text-gray-500">Manage packaging materials</p>
                    </div>
                </button>

                <button
                    onClick={() => navigate('/packaging/management')}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-300 transition-all text-left group"
                >
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Reports</h3>
                        <p className="text-sm text-gray-500">View packaging reports</p>
                    </div>
                </button>
            </div>

            {/* Update Pending */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/packaging/orders')}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-yellow-300 transition-all text-left group"
                >
                    <div className="p-3 bg-yellow-50 rounded-lg group-hover:scale-110 transition-transform">
                        <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Update Pending</h3>
                        <p className="text-sm text-gray-500">Mark old orders as postponed</p>
                    </div>
                </button>
            </div>

            {/* Recent Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                {/* Recent Packaging */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-900">Recent Packaging</h2>
                    </div>
                    <div className="h-48 flex items-center justify-center text-gray-400 text-sm italic">
                        No recent packaging records
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders (Confirmed)</h2>
                        <button onClick={() => navigate('/packaging/orders')} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="h-48 flex items-center justify-center">
                                <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {orders.slice(0, 5).map((order) => (
                                    <div
                                        key={order.id}
                                        onClick={() => navigate(`/packaging/orders/${order.id}`)}
                                        className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-sm text-gray-900">{order.orderNumber || order.id}</p>
                                            <p className="text-xs text-gray-500">{order.customerName}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider">
                                                {order.status}
                                            </span>
                                            <p className="text-[10px] text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-48 flex items-center justify-center text-gray-400 text-sm italic">
                                No confirmed orders found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

