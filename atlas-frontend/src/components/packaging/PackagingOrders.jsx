import React, { useState, useEffect } from 'react';
import { Search, Filter, ScanLine, Info, HelpCircle, Package, ArrowRight, Eye, Printer, CheckSquare, Home, List, Box, RefreshCw, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

function CompletePackagingModal({ order, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        weight: '',
        qualityCheck: 'PASSED',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.patch(`/orders/${order.id}/status`, { 
                status: 'PACKED',
                ...formData 
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to complete packaging:', error);
            alert('Failed to complete packaging. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center text-orange-600">
                    <div className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5" />
                        <h2 className="text-xl font-bold">Complete Packaging</h2>
                    </div>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Package Weight (kg)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            placeholder="e.g. 1.5"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Quality Check</label>
                        <select 
                            value={formData.qualityCheck}
                            onChange={(e) => setFormData({ ...formData, qualityCheck: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                        >
                            <option value="PASSED">Passed ✅</option>
                            <option value="CONDITIONAL">Conditional ⚠️</option>
                            <option value="FAILED">Failed ❌</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (Optional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-20 resize-none"
                            placeholder="Add any specific notes about the packaging..."
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 font-bold hover:bg-gray-100 rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 shadow-md active:scale-95 transition-all"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Complete Packaging
                    </button>
                </div>
            </form>
        </div>
    );
}

export function PackagingOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.get('/orders/packaging');
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Failed to fetch packaging orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus, data = {}) => {
        try {
            await api.patch(`/orders/${orderId}/status`, { status: newStatus, ...data });
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error(`Failed to update status to ${newStatus}:`, error);
            alert(`Failed to update status: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <List className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-600">Orders List</h1>
                        <p className="text-sm text-gray-500">Manage orders for packaging</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/packaging/dashboard')}
                    className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 flex items-center gap-2 shadow-sm transition-all text-sm"
                >
                    <Home className="w-4 h-4" /> Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Orders List Section */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Orders List</h2>
                        </div>

                        {/* Search Bar Code Section */}
                        <div className="p-6 bg-blue-50/50 border-b border-blue-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <ScanLine className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <h3 className="font-bold text-blue-900">Scan Order Barcode</h3>
                                        <p className="text-xs text-blue-700 italic">Use barcode scanner or enter order code manually</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm">
                                    Open Scanner
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter order code (e.g., ORD-2025-001)"
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <button className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm text-sm">
                                    <Search className="w-4 h-4" /> Search
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-100">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Status</label>
                                <select
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    value={filterStatus}
                                >
                                    <option value="ALL">All Statuses</option>
                                    <option value="CONFIRMED">Ready (Confirmed)</option>
                                    <option value="IN_PACKAGING">In Progress</option>
                                    <option value="PACKED">Packed (Completed)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Time Period</label>
                                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500">
                                    <option>All Time</option>
                                    <option>Today</option>
                                    <option>This Week</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Search</label>
                                <input
                                    type="text"
                                    placeholder="Search by ID or Customer"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-yellow-50 text-gray-600 font-bold uppercase text-[10px] tracking-widest border-b border-yellow-100">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Address</th>
                                        <th className="px-6 py-4">Quantity</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                                                    <h3 className="text-gray-900 font-bold">Loading orders...</h3>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 border-b border-gray-50">
                                                <td className="px-6 py-4 font-bold text-blue-600">{order.orderNumber || order.id}</td>
                                                <td className="px-6 py-4 font-medium">
                                                    {order.items?.length > 0 ? order.items[0].product : 'Order Items'}
                                                </td>
                                                <td className="px-6 py-4">{order.customerName}</td>
                                                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{order.shippingAddress || 'No address'}</td>
                                                <td className="px-6 py-4 font-bold">{order.items?.length || 0}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => navigate(`/packaging/orders/${order.id}`)}
                                                            className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>

                                                        {order.status === 'CONFIRMED' && (
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, 'IN_PACKAGING')}
                                                                className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-lg hover:bg-yellow-600 shadow-sm transition-colors flex items-center gap-1"
                                                            >
                                                                <Box className="w-3 h-3" /> Start
                                                            </button>
                                                        )}

                                                        {order.status === 'IN_PACKAGING' && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setShowCompleteModal(true);
                                                                }}
                                                                className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 shadow-sm transition-colors flex items-center gap-1"
                                                            >
                                                                <CheckSquare className="w-3 h-3" /> Done
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="p-6 bg-gray-50 rounded-2xl mb-4">
                                                        <Box className="w-12 h-12 text-gray-200" />
                                                    </div>
                                                    <h3 className="text-gray-900 font-bold text-lg mb-1">No orders need packaging at the moment</h3>
                                                    <p className="text-gray-500 text-sm max-w-sm mx-auto">Orders will appear here when they're ready for packaging.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Packaging Guide</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Shipping Illustration</p>
                        </div>
                        <div className="p-4">
                            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">
                                <Box className="w-12 h-12" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Info className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900 text-sm">Packaging Process</h4>
                                <p className="text-xs text-blue-700 mt-2 leading-relaxed">
                                    Click on the box icon to start processing an order. Make sure to verify all items before confirming.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50/50 p-6 rounded-xl border border-yellow-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <HelpCircle className="w-4 h-4 text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-yellow-900 text-sm">Need Help?</h4>
                                <p className="text-xs text-yellow-700 mt-2 leading-relaxed">
                                    For assistance with the packaging process, contact the support team or check the documentation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCompleteModal && selectedOrder && (
                <CompletePackagingModal 
                    order={selectedOrder} 
                    onClose={() => {
                        setShowCompleteModal(false);
                        setSelectedOrder(null);
                    }} 
                    onSuccess={fetchOrders} 
                />
            )}
        </div>
    );
}

