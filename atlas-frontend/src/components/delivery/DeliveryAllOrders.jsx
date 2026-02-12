import React, { useState, useEffect } from 'react';
import { ArrowLeft, ScanLine, Search, Filter } from 'lucide-react';
import api from '../../lib/api';

export function DeliveryAllOrders({ onNavigate }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/delivery/orders/all');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching all orders:', error);
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
                <div>
                    <h1 className="text-xl font-bold text-gray-900">All Orders</h1>
                    <p className="text-sm text-gray-500">Filter and view all orders</p>
                </div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>

            {/* Scan Barcode */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ScanLine className="w-8 h-8 text-blue-600" />
                    <div>
                        <h3 className="font-bold text-blue-900">Scan Order Barcode</h3>
                        <p className="text-sm text-blue-700">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <ScanLine className="w-4 h-4" /> Open Scanner
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Orders ({orders.length})</h3>
                </div>
                <div className="overflow-x-auto min-h-[200px]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-yellow-200 text-gray-800 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-4 py-3">Order Code</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Qty</th>
                                <th className="px-4 py-3">Seller</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-blue-600">{order.orderNumber}</td>
                                        <td className="px-4 py-3">{order.customerName}</td>
                                        <td className="px-4 py-3">{order.customerPhone}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'OUT_FOR_DELIVERY' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'PACKED' ? 'bg-yellow-100 text-yellow-800' :
                                                            order.status === 'DELIVERY_FAILED' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{order.totalAmount} AED</td>
                                        <td className="px-4 py-3">{order.items?.length || 0}</td>
                                        <td className="px-4 py-3">{order.seller?.shopName || 'N/A'}</td>
                                        <td className="px-4 py-3 text-xs">{order.shippingAddress?.substring(0, 30)}...</td>
                                        <td className="px-4 py-3 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
