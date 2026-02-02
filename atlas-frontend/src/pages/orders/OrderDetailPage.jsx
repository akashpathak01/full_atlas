import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import {
    Home, ShoppingCart, User, Phone, MapPin, Calendar,
    Package, FileText, ArrowLeft, Clock, CheckCircle,
    XCircle, DollarSign, Tag, Info, ChevronRight
} from 'lucide-react';

export function OrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/orders/${id}`);
                setOrder(response.data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch order details:', err);
                setError(err.response?.data?.message || 'Order not found');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <XCircle className="w-16 h-16 text-red-100 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
                <p className="text-gray-500 mb-6">{error || "The order you're looking for doesn't exist or you don't have access."}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const getStatusStyle = (status) => {
        if (!status) return 'bg-gray-50 text-gray-600 border-gray-100';
        switch (status.toUpperCase()) {
            case 'PENDING_REVIEW': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'CONFIRMED': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'PICKED': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'PACKED': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'DELIVERED': return 'bg-green-50 text-green-600 border-green-100';
            case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="cursor-pointer hover:text-orange-500" onClick={() => navigate('/admin/dashboard')}>Home</span>
                <ChevronRight className="w-3 h-3 mx-2" />
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="cursor-pointer hover:text-orange-500" onClick={() => navigate(-1)}>Orders</span>
                <ChevronRight className="w-3 h-3 mx-2" />
                <span className="font-medium text-gray-900">#{order.orderNumber || order.id}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500 rounded-xl shadow-lg shadow-orange-200">
                        <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber || order.id}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-black border ${getStatusStyle(order.status)} uppercase tracking-wider`}>
                                {(order.status || 'UNKNOWN').replace('_', ' ')}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-all font-bold text-sm active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                            <Package className="w-5 h-5 text-orange-500" />
                            <h3 className="font-bold text-gray-800">Order Items</h3>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Variant</th>
                                        <th className="px-6 py-4 text-center">Qty</th>
                                        <th className="px-6 py-4 text-right">Price</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.items?.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{item.product || 'Product'}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5 font-medium italic">ID: {item.productId}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.variant || '-'}</td>
                                            <td className="px-6 py-4 text-center font-bold text-gray-700">{item.quantity || 0}</td>
                                            <td className="px-6 py-4 text-right text-gray-600 font-medium">{item.price || 0} AED</td>
                                            <td className="px-6 py-4 text-right font-black text-orange-600">{((item.quantity || 0) * (item.price || 0)).toFixed(2)} AED</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-orange-50/30 flex justify-end items-center gap-8">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Total Amount</p>
                                <p className="text-2xl font-black text-orange-600 tracking-tight">{order.totalAmount || 0} AED</p>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Shipping Summary for Mobile/Tablet */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                        <CustomerInfo order={order} />
                        <ShippingInfo order={order} />
                    </div>

                    {/* Notes Section */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                            <FileText className="w-5 h-5 text-orange-500" />
                            <h3 className="font-bold text-gray-800">Order Notes</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                    <User className="w-3 h-3 mr-1.5" /> Customer Notes
                                </h4>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[100px] text-sm text-gray-600 italic">
                                    {order.customerNotes || 'No specific notes from the customer.'}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                    <Info className="w-3 h-3 mr-1.5" /> Internal Notes
                                </h4>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[100px] text-sm text-gray-600">
                                    {order.internalNotes || 'No internal notes found for this order.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar Info (Large Screens) */}
                <div className="hidden lg:block space-y-6">
                    <CustomerInfo order={order} />
                    <ShippingInfo order={order} />

                    {/* Activity Timeline (Simple Placeholder) */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                            <Clock className="w-4 h-4 mr-2" /> Recent Activity
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="w-0.5 h-full bg-gray-100 my-2"></div>
                                </div>
                                <div className="pb-2">
                                    <p className="text-xs font-bold text-gray-900">Order Placed</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Status updated to {order.status}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{new Date(order.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CustomerInfo({ order }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                <User className="w-4 h-4 mr-2" /> Customer Information
            </h3>
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Full Name</p>
                        <p className="text-sm font-bold text-gray-900">{order.customerName}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <Phone className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Phone Number</p>
                        <p className="text-sm font-bold text-gray-900">{order.customerPhone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShippingInfo({ order }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Shipping Details
            </h3>
            <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Standard Delivery</p>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                        {order.shippingAddress}
                    </p>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Order ID</span>
                <span className="font-mono font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">#{order.id}</span>
            </div>
        </div>
    );
}
