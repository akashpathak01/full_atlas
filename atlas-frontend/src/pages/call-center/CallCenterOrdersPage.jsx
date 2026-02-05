
import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Home, List, Filter, Search, X, Check, Clock, Plus, Eye, User, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CallCenterOrdersPage() {
    const navigate = useNavigate();

    // State for filtering
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [priorityFilter, setPriorityFilter] = useState('All Priorities');
    const [searchQuery, setSearchQuery] = useState('');

    // State for Modal
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetch all assigned orders for this agent
                const response = await api.get('/call-center/orders');
                setOrders(response.data);
            } catch (err) {
                console.error('Failed to fetch call center orders:', err);
            }
        };
        fetchOrders();
    }, []);

    // Filter Logic
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
        // Priority filter logic (assuming we added priority to data)
        const matchesPriority = priorityFilter === 'All Priorities' || order.priority === priorityFilter;
        const matchesSearch =
            String(order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.orderNumber || '').toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesPriority && matchesSearch;
    });

    const handleApplyFilters = () => {
        // In a real app with server-side filtering, this would trigger a fetch.
        // Here, the filtering is reactive/live, so this button might be redundant 
        // strictly for logic, but we can keep it as a 'confirmation' or just let 
        // the user know filters are applied.
        // For this implementation, the render already uses the state variables, 
        // so this can just be a visual feedback or no-op if we want live filtering.
        // To make it behave like a "submit" form, we could separate 'filterState' from 'activeFilters'.
        // But for simplicity/snappiness, live filtering (already happening) is acceptable.
        // If strict "Apply" behavior is needed:
        // We can move the filtering logic to this function and store the result in a 'displayedOrders' state.
        // I will stick to reactive filtering as it's better UX, but usually "Apply" implies manual trigger.
        // I'll make the button just a visual "good to go" or maybe scroll to top.
    };

    const handleClearFilters = () => {
        setStatusFilter('All Status');
        setPriorityFilter('All Priorities');
        setSearchQuery('');
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Call Center</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Agent Order List</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <List className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Assigned Orders</h1>
                        <p className="text-gray-500 text-sm mt-1">View and manage your assigned orders</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/call-center/dashboard')}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
                >
                    ← Back to Dashboard
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mr-4">
                        <List className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Total Assigned</p>
                        <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-orange-50 rounded-lg mr-4">
                        <Clock className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Pending</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {orders.filter(o => ['PENDING_REVIEW', 'PENDING', 'IN_PROGRESS'].includes(o.status)).length}
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-green-50 rounded-lg mr-4">
                        <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Confirmed</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {orders.filter(o => ['CONFIRMED', 'COMPLETED', 'DELIVERED', 'SHIPPED'].includes(o.status)).length}
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-red-50 rounded-lg mr-4">
                        <X className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Cancelled</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {orders.filter(o => ['CANCELLED', 'REJECTED', 'FAILED'].includes(o.status)).length}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Filters & Search</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm text-gray-600"
                            >
                                <option>All Status</option>
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Cancelled</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <div className="relative">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm text-gray-600"
                            >
                                <option>All Priorities</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search orders..."
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                            />
                            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleApplyFilters}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center text-sm font-medium shadow-sm transition-colors"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Apply Filters
                    </button>
                    <button
                        onClick={handleClearFilters}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center text-sm font-medium shadow-sm transition-colors"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Clear
                    </button>
                    {/* Assign Orders hidden for Agent - Reserved for Manager */}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden run-in">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Orders</h3>
                    <p className="text-sm text-gray-500">Total: {filteredOrders.length} orders</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-yellow-100/50">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-600">ORDER ID</th>
                                <th className="px-6 py-4 font-bold text-gray-600">CUSTOMER</th>
                                <th className="px-6 py-4 font-bold text-gray-600">PRODUCT</th>
                                <th className="px-6 py-4 font-bold text-gray-600">PRICE</th>
                                <th className="px-6 py-4 font-bold text-gray-600">ADDRESS</th>
                                <th className="px-6 py-4 font-bold text-gray-600">PRIORITY</th>
                                <th className="px-6 py-4 font-bold text-gray-600">STATUS</th>
                                <th className="px-6 py-4 font-bold text-gray-600">DATE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, idx) => (
                                    <tr
                                        key={order.id || idx}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => navigate(`/call-center/orders/${order.id}`)}
                                    >
                                        <td className="px-6 py-4 font-bold text-gray-900">#{order.orderNumber || order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{order.customerName}</div>
                                            <div className="text-xs text-gray-500">{order.customerPhone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {order.items?.[0]?.productName || 'Order'}
                                            {order.items?.length > 1 && ` (+${order.items.length - 1} more)`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-green-600">{order.totalAmount} AED</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start text-xs text-gray-500 max-w-xs">
                                                <MapPin className="w-3 h-3 text-gray-400 mr-1 mt-0.5" />
                                                <span className="truncate">{order.shippingAddress}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                Medium
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
                                                <Clock className="w-3 h-3 text-yellow-500 mr-1.5" />
                                                <div>
                                                    <div className="font-bold text-gray-900">{order.status}</div>
                                                </div>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No orders found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AssignOrdersModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
            />
        </div>
    );
}

function AssignOrdersModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">Assign Orders</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Assign Orders to Agents</h3>
                    <p className="text-gray-500 text-sm mb-6">
                        This feature allows you to manually or automatically assign pending orders to available agents.
                    </p>

                    <div className="space-y-3">
                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
                            Auto-Assign All Pending
                        </button>
                        <button className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors">
                            Manual Assignment
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
