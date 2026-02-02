
import React, { useState } from 'react';
import { Home, Truck, Layout, BarChart, Settings, ShoppingCart, Search, Filter, Scan, Package, Eye, Clock, List, Box, X, MapPin, Phone, User, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { deliveryDashboardData } from '../../data/deliveryDummyData';
import { useNavigate } from 'react-router-dom';

export function DeliveryDashboardPage() {
    const navigate = useNavigate();

    // Modal States
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); // For View Order Modal
    const [isStartDeliveryOpen, setIsStartDeliveryOpen] = useState(false); // For Start Delivery Modal

    // Filter State
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [filterDate, setFilterDate] = useState('All Time');
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenScanner = () => {
        setIsScannerOpen(true);
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleStartDelivery = (order) => {
        setSelectedOrder(order);
        setIsStartDeliveryOpen(true);
    };

    const confirmStartDelivery = () => {
        alert(`Delivery started for Order #${selectedOrder?.id}! (Simulation)`);
        setIsStartDeliveryOpen(false);
        setSelectedOrder(null);
    };

    const handleFilter = () => {
        alert(`Filters applied: ${filterStatus}, ${filterDate}, "${searchQuery}"`);
        setIsFilterPanelOpen(false); // Close panel after applying
    };

    return (
        <div className="space-y-6 relative">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <Truck className="w-4 h-4 mr-2" />
                <span className="mr-2">Delivery</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Dashboard</span>
            </div>

            {/* Header with Actions */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center w-full md:w-auto">
                    <div className="p-3 bg-orange-100 rounded-full mr-4">
                        <Truck className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Delivery Management</h1>
                        <p className="text-gray-500 text-sm">Manage and track your delivery assignments</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                        className={`px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95 ${isFilterPanelOpen ? 'bg-orange-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {isFilterPanelOpen ? 'Close Filter' : 'Filter'}
                    </button>
                    <button onClick={() => navigate('/delivery/dashboard')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95">
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/delivery/performance')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95">
                        <BarChart className="w-4 h-4 mr-2" />
                        Performance
                    </button>
                    <button onClick={() => navigate('/delivery/settings')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-4 bg-orange-100/50 rounded-xl mr-4">
                        <ShoppingCart className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total</p>
                        <h3 className="text-3xl font-bold text-gray-900">{deliveryDashboardData.stats.total}</h3>
                        <p className="text-gray-400 text-xs flex items-center mt-1">
                            <span className="text-green-500 mr-1">↑</span> All orders
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-4 bg-blue-100/50 rounded-xl mr-4">
                        <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Pending</p>
                        <h3 className="text-3xl font-bold text-gray-900">{deliveryDashboardData.stats.pending}</h3>
                        <p className="text-gray-400 text-xs flex items-center mt-1">
                            <span className="text-blue-500 mr-1">↑</span> Awaiting delivery
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-4 bg-purple-100/50 rounded-xl mr-4">
                        <Settings className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Processing</p>
                        <h3 className="text-3xl font-bold text-gray-900">{deliveryDashboardData.stats.processing}</h3>
                        <p className="text-gray-400 text-xs flex items-center mt-1">
                            <span className="text-purple-500 mr-1">↑</span> In progress
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-4 bg-green-100/50 rounded-xl mr-4">
                        <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Shipped</p>
                        <h3 className="text-3xl font-bold text-gray-900">{deliveryDashboardData.stats.shipped}</h3>
                        <p className="text-gray-400 text-xs flex items-center mt-1">
                            <span className="text-green-500 mr-1">↑</span> Ready for delivery
                        </p>
                    </div>
                </div>
            </div>

            {/* Scan Barcode */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-4">
                        <Scan className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-blue-900">Scan Order Barcode</h3>
                        <p className="text-blue-600 text-sm">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button
                    onClick={handleOpenScanner}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center font-bold shadow-sm transition-all active:scale-95"
                >
                    <Scan className="w-4 h-4 mr-2" />
                    Open Scanner
                </button>
            </div>


            {/* Filter & Search - Collapsible */}
            {isFilterPanelOpen && (
                <div className="bg-yellow-500 p-6 rounded-xl shadow-sm text-white animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Search className="w-5 h-5 mr-2" />
                            <h3 className="font-bold text-lg">Filter & Search</h3>
                        </div>
                        <button onClick={() => setIsFilterPanelOpen(false)} className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 opacity-90">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full bg-white text-gray-700 rounded-lg p-2.5 focus:outline-none text-sm cursor-pointer"
                            >
                                <option>All Statuses</option>
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 opacity-90">Date Range</label>
                            <select
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="w-full bg-white text-gray-700 rounded-lg p-2.5 focus:outline-none text-sm cursor-pointer"
                            >
                                <option>All Time</option>
                                <option>Today</option>
                                <option>Yesterday</option>
                                <option>Last 7 Days</option>
                            </select>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold mb-1 opacity-90">Search</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search orders..."
                                className="w-full bg-white text-gray-700 rounded-lg p-2.5 focus:outline-none text-sm placeholder-gray-400"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleFilter}
                                className="w-full bg-white text-yellow-600 font-bold py-2.5 rounded-lg hover:bg-yellow-50 transition-all active:scale-95 shadow-sm"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">All Orders</h3>
                        <p className="text-gray-500 text-sm">All delivery orders with pagination</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-yellow-100/50 text-xs font-bold text-gray-600 uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left">Order ID</th>
                                <th className="px-6 py-4 text-left">Customer</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Priority</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {deliveryDashboardData.orders.map((order, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                                order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                                    'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.priority}</td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <button onClick={() => handleViewOrder(order)} className="text-blue-600 hover:text-blue-800 mr-3 transition-colors">View</button>
                                        <button onClick={() => handleStartDelivery(order)} className="text-green-600 hover:text-green-800 transition-colors">Start Delivery</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Scanner Modal */}
            {isScannerOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Scan className="w-5 h-5 mr-2 text-blue-600" /> Barcode Scanner</h3>
                            <button onClick={() => setIsScannerOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 text-center">
                            <div className="bg-black rounded-lg h-48 w-full mb-4 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 border-2 border-green-500 opacity-50 animate-pulse"></div>
                                <span className="text-white text-xs">Camera View (Simulated)</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Point your camera at a shipping label barcode.</p>
                            <button onClick={() => setIsScannerOpen(false)} className="w-full px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md">Close Scanner</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Order Modal */}
            {selectedOrder && !isStartDeliveryOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Package className="w-5 h-5 mr-2 text-orange-500" /> Order Details: {selectedOrder.id}</h3>
                            <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Customer</p>
                                    <p className="text-lg font-bold text-gray-900">{selectedOrder.customer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</p>
                                    <p className="text-sm font-bold text-gray-700">{selectedOrder.date}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                    <span className={`inline-block text-xs px-2 py-1 rounded-md font-medium border ${selectedOrder.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                            selectedOrder.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                                'bg-green-50 text-green-600 border-green-100'
                                        }`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Priority</p>
                                    <p className="text-sm font-bold text-gray-700">{selectedOrder.priority}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <div className="flex items-center text-sm text-gray-700">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>1234 Delivery Lane, Logistics City</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>+971 50 123 4567</span>
                                </div>
                            </div>

                            <button onClick={() => setSelectedOrder(null)} className="w-full px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Start Delivery Modal */}
            {isStartDeliveryOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Truck className="w-5 h-5 mr-2 text-green-600" /> Start Delivery</h3>
                            <button onClick={() => setIsStartDeliveryOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 text-sm mb-4">
                                Are you sure you want to start the delivery for order <strong>{selectedOrder.id}</strong>? This will update the status to "In Transit".
                            </p>

                            <div className="flex gap-3">
                                <button onClick={() => setIsStartDeliveryOpen(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button onClick={confirmStartDelivery} className="flex-1 px-4 py-3 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-md">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
