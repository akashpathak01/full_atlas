
import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Home, List, ShoppingCart, Clock, Settings, CheckCircle, Users, DollarSign, Filter, Search, X, Eye, Edit, Save, ArrowLeft, Package, User, Phone, MapPin, Tag, Info, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ManagerOrdersPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        activeAgents: 0,
        todaysRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [agentFilter, setAgentFilter] = useState('All Agents'); // Added agent filter state
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, ordersRes] = await Promise.all([
                api.get('/call-center/manager-order-stats'),
                api.get('/call-center/manager-orders', {
                    params: {
                        search: searchTerm,
                        status: statusFilter,
                        agentId: agentFilter
                    }
                })
            ]);
            setStats(statsRes.data);
            setOrders(ordersRes.data);
        } catch (error) {
            console.error('Failed to fetch orders data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, statusFilter, agentFilter]);

    // Initial load
    useEffect(() => {
        // fetchData is called by the debounce effect initially too if deps change, 
        // but we might want an explicit immediate load or just rely on the effect.
        // relying on effect is fine.
    }, []);

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('All Statuses');
        setAgentFilter('All Agents');
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const handleEdit = (order) => {
        setSelectedOrder({ ...order }); // Clone order for editing
        setShowEditModal(true);
    };

    const handleUpdateOrder = async () => {
        if (!selectedOrder) return;
        setIsUpdating(true);
        try {
            await api.patch(`/call-center/manager-orders/${selectedOrder.id}`, {
                status: selectedOrder.status,
                agentId: selectedOrder.callCenterAgentId || selectedOrder.agentId || (selectedOrder.callCenterAgent ? selectedOrder.callCenterAgent.id : null), // Handle agent selection logic properly
                amount: selectedOrder.totalAmount || selectedOrder.amount, // backend expects 'amount'
                managerNotes: selectedOrder.managerNotes // backend expects 'managerNotes'
            });
            setShowEditModal(false);
            alert('Order updated successfully!');
            fetchData(); // Refresh list
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update order');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading && orders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading Orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative min-h-screen bg-[#f8fafc] p-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Orders Management</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
                <div className="flex items-center w-full md:w-auto">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <List className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Orders Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage and track all orders</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                        className={`px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95 border ${isFilterPanelOpen ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {isFilterPanelOpen ? 'Close Filter' : 'Filter List'}
                    </button>
                    <button
                        onClick={() => navigate('/manager/dashboard')}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <ShoppingCart className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                        <h3 className="text-xl font-bold text-gray-900">{stats.totalOrders}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-2 bg-yellow-50 rounded-lg mr-3">
                        <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Pending</p>
                        <h3 className="text-xl font-bold text-gray-900">{stats.pending}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                        <Settings className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Processing</p>
                        <h3 className="text-xl font-bold text-gray-900">{stats.processing}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-2 bg-green-50 rounded-lg mr-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Completed</p>
                        <h3 className="text-xl font-bold text-gray-900">{stats.completed}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                        <Users className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Active Agents</p>
                        <h3 className="text-xl font-bold text-gray-900">{stats.activeAgents}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-2 bg-green-50 rounded-lg mr-3">
                        <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Today's Revenue</p>
                        <h3 className="text-xl font-bold text-gray-900">AED {stats.todaysRevenue}</h3>
                    </div>
                </div>
            </div>

            {/* Filters Section - Collapsible */}
            {isFilterPanelOpen && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <Filter className="w-5 h-5 text-blue-500 mr-2" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Filters & Search</h3>
                                <p className="text-xs text-gray-500">Refine your order list with filtering options</p>
                            </div>
                        </div>
                        <button onClick={() => setIsFilterPanelOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Order code, customer..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                            >
                                <option>All Statuses</option>
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Agent</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                                value={agentFilter}
                                onChange={(e) => setAgentFilter(e.target.value)}
                            >
                                <option>All Agents</option>
                                {/* Agents could be fetched dynamically too, but sticking to basics for now */}
                                <option value="Unassigned">Unassigned</option>
                            </select>
                        </div>
                        {/* Date range omitted for simplicity unless requested */}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        {/* Apply is handled by effects, but we can keep button for explicit feel or complex filters */}
                        <button
                            onClick={handleClearFilters}
                            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-lg flex items-center text-sm font-medium shadow-sm transition-all active:scale-95"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Orders List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-4 border-b border-gray-100 flex items-center">
                    <div className="p-1.5 bg-blue-100 rounded mr-2">
                        <List className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Orders List</h3>
                        <p className="text-xs text-gray-500">Showing {orders.length} orders</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-yellow-100/50">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-600">ORDER CODE</th>
                                <th className="px-6 py-4 font-bold text-gray-600">CUSTOMER</th>
                                <th className="px-6 py-4 font-bold text-gray-600">STATUS</th>
                                <th className="px-6 py-4 font-bold text-gray-600">AGENT</th>
                                <th className="px-6 py-4 font-bold text-gray-600">CREATED</th>
                                <th className="px-6 py-4 font-bold text-gray-600">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length > 0 ? (
                                orders.map((order, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{order.orderNumber || order.id}</div>
                                            <div className="text-xs text-gray-500">{order.totalAmount ? `AED ${order.totalAmount}` : 'AED 0'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{order.customerName || (order.customer ? order.customer.name : 'Unknown')}</div>
                                            <div className="text-xs text-gray-500">{order.customer ? order.customer.contactNumber : 'No Contact'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${order.status === 'COMPLETED' || order.status === 'CONFIRMED' || order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'REJECTED' || order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 italic">
                                            {order.callCenterAgent ? order.callCenterAgent.name : 'Unassigned'}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            <div className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</div>
                                            <div className="text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleView(order)}
                                                    className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200 hover:bg-blue-100 transition-all active:scale-95"
                                                >
                                                    <Eye className="w-3 h-3 mr-1" /> View
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(order)}
                                                    className="flex items-center px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded border border-green-200 hover:bg-green-100 transition-all active:scale-95"
                                                >
                                                    <Edit className="w-3 h-3 mr-1" /> Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <Package className="w-12 h-12 text-gray-200 mb-2" />
                                            <p className="font-medium text-lg text-gray-400">No orders found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Order Modal */}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Order Details - {selectedOrder.orderNumber || selectedOrder.id}</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Full transaction information and status history</p>
                                </div>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-600 shadow-sm"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                            <User className="w-3 h-3 mr-1.5" /> Customer Information
                                        </h4>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <p className="text-sm font-bold text-gray-900">{selectedOrder.customerName || (selectedOrder.customer ? selectedOrder.customer.name : 'Unknown')}</p>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center"><Phone className="w-3 h-3 mr-1.5" /> {selectedOrder.customer ? selectedOrder.customer.contactNumber : 'N/A'}</p>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-1.5" /> {selectedOrder.deliveryAddress || 'No Address'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                            <Info className="w-3 h-3 mr-1.5" /> Assignment Details
                                        </h4>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Handling Agent:</span>
                                                <span className="font-bold text-gray-900">{selectedOrder.callCenterAgent ? selectedOrder.callCenterAgent.name : 'Unassigned'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                            <Tag className="w-3 h-3 mr-1.5" /> Order Snapshot
                                        </h4>
                                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Total Amount:</span>
                                                <span className="text-lg font-black text-blue-700">AED {selectedOrder.totalAmount || selectedOrder.amount}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs mt-3">
                                                <span className="text-gray-500">Current Status:</span>
                                                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">{selectedOrder.status}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs mt-2">
                                                <span className="text-gray-500">Created At:</span>
                                                <span className="text-gray-700 font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => setShowViewModal(false)} className="px-12 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black hover:bg-black transition-all active:scale-95 shadow-lg">Close Details</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {showEditModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg mr-3">
                                    <Edit className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Edit Order - {selectedOrder.orderNumber || selectedOrder.id}</h2>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Modify Status</label>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none font-bold text-gray-700"
                                >
                                    <option>PENDING_REVIEW</option>
                                    <option>IN_PROGRESS</option>
                                    <option>CONFIRMED</option>
                                    <option>COMPLETED</option>
                                    <option>REJECTED</option>
                                    <option>Pending</option>
                                    <option>Processing</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Assign To Agent (ID)</label>
                                    {/* Ideally this would be a dropdown of agents fetched from API, using text input for ID or name for now or static unassigned */}
                                    <select
                                        value={selectedOrder.callCenterAgentId || (selectedOrder.callCenterAgent ? selectedOrder.callCenterAgent.id : '') || 'Unassigned'}
                                        onChange={(e) => {
                                            // Handle special 'Unassigned' case
                                            const val = e.target.value;
                                            setSelectedOrder({ ...selectedOrder, callCenterAgentId: val === 'Unassigned' ? null : val });
                                        }}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none font-medium text-gray-700"
                                    >
                                        <option value="Unassigned">Unassigned</option>
                                        {/* In a real app we map available agents here. For now allowing Unassigned or keeping current. */}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Total Amount</label>
                                    <input
                                        type="number"
                                        value={selectedOrder.totalAmount || selectedOrder.amount}
                                        onChange={(e) => setSelectedOrder({ ...selectedOrder, totalAmount: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none font-black text-blue-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Manager Notes</label>
                                <textarea
                                    rows="3"
                                    placeholder="Add any operational notes here..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all resize-none"
                                    value={selectedOrder.managerNotes || ''}
                                    onChange={(e) => setSelectedOrder({ ...selectedOrder, managerNotes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowEditModal(false)} className="px-6 py-2  text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">Discard Changes</button>
                            <button onClick={handleUpdateOrder} disabled={isUpdating} className="px-10 py-2.5 bg-green-600 text-white rounded-xl text-sm font-black hover:bg-green-700 active:scale-95 transition-all shadow-lg border-b-2 border-green-800 flex items-center">
                                {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                {isUpdating ? 'Saving...' : 'Commit Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
