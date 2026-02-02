import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerData } from '../../data/customerDummyData';
import {
    Home,
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Package,
    FileText,
    ArrowLeft,
    ChevronRight,
    MessageSquare
} from 'lucide-react';

export function CustomerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const customer = customerData.find(c => c.id === id);

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <p className="text-xl font-bold mb-4">Customer Not Found</p>
                <button
                    onClick={() => navigate('/call-center/customers')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Back to Customers
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2 cursor-pointer hover:text-gray-900" onClick={() => navigate('/call-center/dashboard')}>Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2 cursor-pointer hover:text-gray-900" onClick={() => navigate('/call-center/customers')}>Customers</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">{customer.name}</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                        <p className="text-gray-500 text-sm font-medium">{customer.id}</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/call-center/customers')}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-bold transition-all shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Customer Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Phone</p>
                                    <p className="text-sm text-gray-900 font-bold">{customer.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                                    <p className="text-sm text-gray-900 font-bold">{customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Address</p>
                                    <p className="text-sm text-gray-900 font-bold">{customer.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Join Date</p>
                                    <p className="text-sm text-gray-900 font-bold">{customer.joinDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Section (Read Only) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Call Notes
                        </h3>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {customer.notes.length > 0 ? (
                                customer.notes.map((note, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                                                {note.agent}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium">
                                                {note.date}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed italic">
                                            "{note.text}"
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 text-center py-4">No previous call notes for this customer.</p>
                            )}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-50">
                            <textarea
                                placeholder="Add a quick note about this call..."
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none h-20"
                                disabled
                            ></textarea>
                            <p className="text-[10px] text-gray-400 mt-2 italic">* Note saving is disabled in read-only mode.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                                <Package className="w-4 h-4 mr-2" />
                                Order History
                            </h3>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                                {customer.totalOrders} Total Orders
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {customer.orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => navigate('/call-center/orders')}>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {order.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-500 whitespace-nowrap">
                                                {order.date}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-600">
                                                {order.items}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${order.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                                        order.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                                            'bg-red-50 text-red-600'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-blue-50/30 border-t border-blue-50 text-center">
                            <p className="text-xs text-blue-600 font-medium">Click on an order to view full details in the Orders module.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
