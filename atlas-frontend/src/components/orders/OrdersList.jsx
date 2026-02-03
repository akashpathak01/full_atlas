import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import {
    Search, Filter, Plus, Download, Printer, RefreshCw,
    ChevronDown, ShoppingCart, Clock, CheckCircle, Package,
    XCircle, Eye, MoreVertical, Calendar, User, MapPin,
    CreditCard, Layout, DollarSign, Activity
} from 'lucide-react';

export function OrdersList({ onAddNewOrder }) {
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState('All Orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setError('Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate real stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const processingOrders = orders.filter(o => o.status === 'IN_PROGRESS').length; // Ensure backend enum match
    const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;

    const stats = [
        { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
        { label: 'Pending', value: pendingOrders.toString(), icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
        { label: 'Processing', value: processingOrders.toString(), icon: Activity, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
        { label: 'Delivered', value: deliveredOrders.toString(), icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    ];

    const quickFilters = [
        { label: 'All Orders', count: 0, icon: Layout, color: 'bg-[#E15B2D]' },
        { label: 'Pending', count: 0, icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
        { label: 'Confirmed', count: 0, icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
        { label: 'Processing', count: 0, icon: Activity, color: 'bg-purple-100 text-purple-700' },
        { label: 'Delivered', count: 0, icon: CheckCircle, color: 'bg-green-100 text-green-700' },
        { label: 'Cancelled', count: 0, icon: XCircle, color: 'bg-red-100 text-red-700' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-[#E15B2D]">Order Management</h1>
                    <p className="text-gray-500 mt-1">Manage and track all orders with advanced filtering</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onAddNewOrder}
                        className="flex items-center gap-2 bg-[#E15B2D] text-white px-4 py-2 rounded-lg hover:bg-[#d05026] transition-colors shadow-sm font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Order
                    </button>
                    <button className="flex items-center gap-2 bg-[#28a745] text-white px-4 py-2 rounded-lg hover:bg-[#218838] transition-colors shadow-sm font-medium">
                        <Download className="w-5 h-5" />
                        Import Orders
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-white p-6 rounded-xl border-l-4 ${stat.borderColor} shadow-sm flex items-center gap-4`}>
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Status Filters */}
            <div className="bg-[#FFF3EC] p-6 rounded-xl border border-[#FFE0CE]">
                <h3 className="text-[#E15B2D] font-bold mb-4 text-lg">Quick Status Filters</h3>
                <div className="flex flex-wrap gap-3">
                    {quickFilters.map((filter, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStatus(filter.label)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeStatus === filter.label
                                ? 'bg-[#E15B2D] text-white shadow-md'
                                : filter.color + ' border border-transparent hover:border-current'
                                }`}
                        >
                            <filter.icon className="w-4 h-4" />
                            {filter.label} ({filter.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#FFF3EC] p-4 border-b border-[#FFE0CE]">
                    <h3 className="text-[#E15B2D] font-bold">Advanced Filters</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search Bar */}
                        <div className="lg:col-span-3 space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by order code, customer, phone, product..."
                                    className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                                <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#E15B2D] text-white rounded-md flex items-center gap-2 text-sm font-medium">
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Order Status */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Layout className="w-3.5 h-3.5" /> Order Status
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Statuses</option>
                            </select>
                        </div>

                        {/* Workflow Status */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5" /> Workflow Status
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Workflow Statuses</option>
                            </select>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> Date Range
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Dates</option>
                            </select>
                        </div>

                        {/* Emirate */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> Emirate
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Emirates</option>
                            </select>
                        </div>

                        {/* Seller */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Plus className="w-3.5 h-3.5" /> Seller
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Sellers</option>
                            </select>
                        </div>

                        {/* Call Center Agent */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" /> Call Center Agent
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Agents</option>
                            </select>
                        </div>

                        {/* Amount Range */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <DollarSign className="w-3.5 h-3.5" /> Amount Range (AED)
                            </label>
                            <input
                                type="text"
                                placeholder="Min Amount"
                                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                            />
                        </div>

                        {/* Payment Status */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5" /> Payment Status
                            </label>
                            <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                <option>All Payment Statuses</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-[#E15B2D] text-white px-6 py-2.5 rounded-lg hover:bg-[#d05026] transition-colors font-semibold shadow-sm">
                                <Filter className="w-4 h-4" />
                                Apply Filters
                            </button>
                            <button className="flex items-center gap-2 bg-[#6c757d] text-white px-6 py-2.5 rounded-lg hover:bg-[#5a6268] transition-colors font-semibold shadow-sm">
                                <XCircle className="w-4 h-4" />
                                Reset
                            </button>
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {orders.length} orders
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg">Orders List</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#E15B2D]">
                                <option>Newest First</option>
                            </select>
                        </div>
                        <button className="flex items-center gap-1.5 bg-[#28a745] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#218838]">
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                        <button className="flex items-center gap-1.5 bg-[#343a40] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#23272b]">
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                        <button className="flex items-center gap-1.5 bg-[#E15B2D] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#d05026]">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>
                {!loading && !error && orders.length === 0 && (
                    <div className="overflow-x-auto text-center py-20 bg-gray-50/50">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-bold text-gray-800">No orders found</h4>
                                <p className="text-gray-500 text-sm">Create your first order to get started</p>
                            </div>
                            <button
                                onClick={onAddNewOrder}
                                className="bg-[#E15B2D] text-white px-8 py-2.5 rounded-lg font-bold shadow-md hover:bg-[#d05026] mt-2"
                            >
                                + Add New Order
                            </button>
                        </div>
                    </div>
                )}

                {/* Table Structure */}
                {(loading || error || orders.length > 0) && (
                    <table className="w-full text-left">
                        <thead className="bg-[#FFF8F1] border-b border-[#FFE0CE]">

                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider"># Order Code</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Qty</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Unit Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#A44D2A] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-sm">
                            {loading ? (
                                <tr><td colSpan="9" className="p-8 text-center text-gray-500">Loading orders...</td></tr>
                            ) : error ? (
                                <tr><td colSpan="9" className="p-8 text-center text-red-500">{error}</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan="9" className="p-8 text-center text-gray-500">No orders found.</td></tr>
                            ) : (
                                orders
                                    .filter(o => activeStatus === 'All Orders' || o.status === activeStatus.toUpperCase() || (activeStatus === 'Confirmed' && o.status === 'CONFIRMED'))
                                    .map(order => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                                        >
                                            <td className="px-6 py-4">#{order.orderNumber || order.id}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-800">{order.customerName}</td>
                                            <td className="px-6 py-4 text-gray-500">{order.customerPhone}</td>
                                            <td className="px-6 py-4">{order.items?.[0]?.product || 'Item'}</td>
                                            <td className="px-6 py-4">{order.items?.reduce((a, b) => a + b.quantity, 0)}</td>
                                            <td className="px-6 py-4">{order.items?.[0]?.unitPrice || 0}</td>
                                            <td className="px-6 py-4 font-bold text-[#E15B2D]">{order.totalAmount} AED</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-[#E15B2D]">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
