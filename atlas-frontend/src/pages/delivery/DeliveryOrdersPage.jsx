
import React, { useState, useEffect } from 'react';
import { Home, Truck, Search, Box, X, Check, Scan, Layout, Filter, Settings, Ghost, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function DeliveryOrdersPage() {
    const navigate = useNavigate();

    // Data States
    const [stats, setStats] = useState({
        ready: 0,
        inDelivery: 0,
        delivered: 0,
        failed: 0
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [completeDeliveryOrder, setCompleteDeliveryOrder] = useState(null); // For Complete Delivery Modal
    const [receiverName, setReceiverName] = useState('');
    const [deliveryNotes, setDeliveryNotes] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [statsRes, ordersRes] = await Promise.all([
                axios.get('http://localhost:5000/api/delivery/stats', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('http://localhost:5000/api/orders/delivery', { headers: { Authorization: `Bearer ${token}` } })
            ]);

            setStats({
                ready: statsRes.data.readyForDelivery,
                inDelivery: statsRes.data.inDelivery,
                delivered: statsRes.data.delivered,
                failed: statsRes.data.failed
            });

            setOrders(ordersRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching delivery data:", error);
            setLoading(false);
        }
    };

    const handleStartDelivery = async (order) => {
        if (!confirm(`Start delivery for ${order.orderNumber}?`)) return;
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:5000/api/orders/${order.id}/status`,
                { status: 'OUT_FOR_DELIVERY' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (error) {
            alert("Failed: " + (error.response?.data?.message || error.message));
        }
    };

    const handleOpenCompleteModal = (order) => {
        setCompleteDeliveryOrder(order);
        setReceiverName('');
        setDeliveryNotes('');
    };

    const confirmCompleteDelivery = async (status, orderToComplete = null) => {
        const targetOrder = orderToComplete || completeDeliveryOrder;

        if (!targetOrder) return;

        if (status === 'DELIVERED' && !receiverName.trim()) {
            alert("Receiver name is required for successful delivery.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:5000/api/orders/${targetOrder.id}/status`,
                {
                    status: status,
                    receiverName: receiverName,
                    notes: deliveryNotes
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCompleteDeliveryOrder(null);
            fetchData();
        } catch (error) {
            alert("Failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-gray-400 gap-2 mb-2">
                <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Home</span>
                </div>
                <span>&gt;</span>
                <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span className="font-medium">Delivery</span>
                </div>
                <span>&gt;</span>
                <span className="text-gray-500 font-medium">Orders</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500 rounded-xl">
                        <Truck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">Delivery Orders</h1>
                        <p className="text-sm text-gray-500">Manage orders ready for delivery or in transit.</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/delivery/dashboard')}
                    className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 shadow-sm transition-all active:scale-95 text-sm"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                            <Box className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Ready for Delivery</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">{stats.ready}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-yellow-50 rounded-xl">
                            <Truck className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">In Delivery</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">{stats.inDelivery}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-green-50 rounded-xl">
                            <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Delivered</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">{stats.delivered}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-red-50 rounded-xl">
                            <X className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Failed Deliveries</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">{stats.failed}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barcode Section */}
            <div className="bg-[#EFF6FF] p-6 rounded-xl border border-blue-100 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <Scan className="w-8 h-8 text-blue-500" />
                    <div>
                        <h3 className="text-lg font-bold text-blue-900">Scan Order Barcode</h3>
                        <p className="text-sm text-blue-600">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsScannerOpen(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md transition-all active:scale-95 text-sm"
                >
                    <Scan className="w-4 h-4" /> Open Scanner
                </button>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <Layout className="w-5 h-5 text-blue-600" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Orders List</h3>
                        <p className="text-xs font-bold text-gray-400">Showing {orders.length} orders</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 text-xs font-bold text-gray-600 uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left">Order #</th>
                                <th className="px-6 py-4 text-left">Customer</th>
                                <th className="px-6 py-4 text-left">Address</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{order.orderNumber}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="font-medium">{order.customerName}</div>
                                        <div className="text-xs text-gray-400">{order.customerPhone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{order.shippingAddress}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${order.status === 'PACKED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            order.status === 'OUT_FOR_DELIVERY' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                                                    'bg-red-50 text-red-600 border-red-100'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {order.status === 'PACKED' && (
                                            <button
                                                onClick={() => handleStartDelivery(order)}
                                                className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-xs"
                                            >
                                                Start Delivery
                                            </button>
                                        )}
                                        {order.status === 'OUT_FOR_DELIVERY' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenCompleteModal(order)}
                                                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-xs"
                                                >
                                                    Complete
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Mark order ${order.orderNumber} as FAILED?`)) {
                                                            confirmCompleteDelivery('DELIVERY_FAILED', order);
                                                        }
                                                    }}
                                                    className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs border border-red-200"
                                                >
                                                    Fail
                                                </button>
                                            </div>
                                        )}
                                        {['DELIVERED', 'DELIVERY_FAILED'].includes(order.status) && (
                                            <span className="text-gray-400 italic text-xs">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Complete Delivery Modal */}
            {completeDeliveryOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-900">Complete Delivery</h3>
                            <button onClick={() => setCompleteDeliveryOrder(null)} className="p-1 rounded-full hover:bg-gray-100"><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Receiver Name *</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm"
                                    placeholder="Who received the package?"
                                    value={receiverName}
                                    onChange={(e) => setReceiverName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Notes (Optional)</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm"
                                    placeholder="Any delivery notes..."
                                    rows="3"
                                    value={deliveryNotes}
                                    onChange={(e) => setDeliveryNotes(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setCompleteDeliveryOrder(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                                <button onClick={() => confirmCompleteDelivery('DELIVERED')} className="flex-1 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">Confirm</button>
                                <button onClick={() => confirmCompleteDelivery('DELIVERY_FAILED')} className="px-4 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 border border-red-200">Fail</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Scanner Modal Simulation */}
            {isScannerOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-xl text-gray-900 tracking-tight">Scanner</h3>
                            <button onClick={() => setIsScannerOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="aspect-square bg-black rounded-3xl mb-6 relative overflow-hidden group">
                            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-bounce"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs font-bold uppercase tracking-widest">Awaiting Barcode...</div>
                        </div>
                        <button
                            onClick={() => setIsScannerOpen(false)}
                            className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg"
                        >
                            Close Scanner
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
