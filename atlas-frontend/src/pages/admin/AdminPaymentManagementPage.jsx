
import React, { useState } from 'react';
import { adminPaymentsData } from '../../data/adminDummyData';
import { Search, Filter, Download, Plus, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminPaymentManagementPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');

    const filteredPayments = adminPaymentsData.filter(payment => {
        const matchesSearch =
            payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Statuses' || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalAmount = filteredPayments.reduce((sum, payment) => {
        const amount = parseFloat(payment.amount.replace(/[^0-9.-]+/g, ""));
        return sum + amount;
    }, 0);

    const completedCount = filteredPayments.filter(p => p.status === 'Completed').length;
    const pendingCount = filteredPayments.filter(p => p.status === 'Pending').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <CreditCard className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
                        <p className="text-sm text-gray-600">Manage all payment transactions</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/finance')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/finance/payments/add')}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <CreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Payments</p>
                        <h3 className="text-xl font-bold text-gray-900">{filteredPayments.length}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <span className="text-xl font-bold text-blue-600">$</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                        <h3 className="text-xl font-bold text-gray-900">AED {totalAmount.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                            <span className="text-green-700 text-xs">✓</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Completed</p>
                        <h3 className="text-xl font-bold text-gray-900">{completedCount}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending</p>
                        <h3 className="text-xl font-bold text-gray-900">{pendingCount}</h3>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-orange-800 font-bold mb-4">Search & Filter</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select
                            className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Statuses</option>
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Failed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                        <input type="date" className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                        <input type="date" className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Order ID, Customer..."
                                className="w-full pl-10 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="flex items-center px-4 py-2 bg-[#E15B2D] text-white rounded-lg hover:bg-[#c44e26] transition-colors">
                        <Search className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                    <div className="w-4"></div>
                    <div className="w-full md:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
                            <option>All Methods</option>
                            <option>Credit Card</option>
                            <option>Bank Transfer</option>
                            <option>Cash</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-orange-50">
                    <h2 className="text-lg font-bold text-orange-800">Payments</h2>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-500 mb-4">A list of all payments in your account including their status, amount, and payment method.</p>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-yellow-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="px-6 py-3">Payment ID</th>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Method</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPayments.length > 0 ? (
                                    filteredPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">{payment.orderId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.customer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button className="text-blue-600 hover:text-blue-900">View</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                            No payments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <span>Showing {filteredPayments.length} of {adminPaymentsData.length} results</span>
                        <button className="flex items-center px-4 py-2 bg-[#4b5563] text-white rounded-lg hover:bg-[#374151] transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Help Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}

// Icon component needed for stats
function Clock({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
