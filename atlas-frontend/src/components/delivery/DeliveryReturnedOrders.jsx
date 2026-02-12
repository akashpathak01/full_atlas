import React, { useState, useEffect } from 'react';
import { ArrowLeft, ScanLine, RotateCcw, Calendar, Search } from 'lucide-react';
import api from '../../lib/api';

export function DeliveryReturnedOrders({ onNavigate }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/delivery/orders/returned');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching returned orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <RotateCcw className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-red-600">Returned Orders</h1>
                        <p className="text-sm text-gray-500">Manage and Process Returned Orders</p>
                    </div>
                </div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>

            {/* Scan Barcode */}
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ScanLine className="w-8 h-8 text-red-600" />
                    <div>
                        <h3 className="font-bold text-red-900">Scan Order Barcode</h3>
                        <p className="text-sm text-red-700">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center gap-2">
                    <ScanLine className="w-4 h-4" /> Open Scanner
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-red-100 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-red-50 rounded-lg"><RotateCcw className="w-6 h-6 text-red-600" /></div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase">Total Returned</h3>
                        <p className="text-2xl font-bold text-red-600">{orders.length}</p>
                    </div>
                </div>
                <div className="bg-white border border-orange-100 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-lg"><Calendar className="w-6 h-6 text-orange-600" /></div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase">Today</h3>
                        <p className="text-2xl font-bold text-orange-600">0</p>
                    </div>
                </div>
                <div className="bg-white border border-yellow-100 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 rounded-lg"><Calendar className="w-6 h-6 text-yellow-600" /></div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase">This Week</h3>
                        <p className="text-2xl font-bold text-yellow-600">0</p>
                    </div>
                </div>
                <div className="bg-white border border-blue-100 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg"><Calendar className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase">This Month</h3>
                        <p className="text-2xl font-bold text-blue-600">0</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Search</label>
                        <input type="text" placeholder="Order Number / Customer / Phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Dates</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Carrier</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Carriers</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Delivery Company</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Companies</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Search
                    </button>
                    <button className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                </div>
            </div>

            {/* Returned Orders List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Returned Orders</h3>
                    <span className="text-sm text-gray-500">Total: {orders.length} orders</span>
                </div>
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading...</div>
                ) : orders.length === 0 ? (
                    <div className="p-20 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1">No returned orders</h3>
                        <p className="text-gray-500 text-sm">No returned orders match the specified search criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-red-100 text-gray-800 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-4 py-3">Order Code</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Agent</th>
                                    <th className="px-4 py-3">Address</th>
                                    <th className="px-4 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-blue-600">{order.orderNumber}</td>
                                        <td className="px-4 py-3">{order.customerName}</td>
                                        <td className="px-4 py-3">{order.customerPhone}</td>
                                        <td className="px-4 py-3">{order.deliveryTask?.agent?.name || 'Unassigned'}</td>
                                        <td className="px-4 py-3 text-xs">{order.shippingAddress?.substring(0, 40)}...</td>
                                        <td className="px-4 py-3 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
