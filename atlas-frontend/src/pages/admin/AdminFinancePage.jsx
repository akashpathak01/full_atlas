
import React from 'react';
import { adminFinanceStats } from '../../data/adminDummyData';
import { DollarSign, FileText, TrendingUp, Clock, CreditCard, Plus, ArrowRight, Plug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminFinancePage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Billing and Invoicing</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage finances and accounting operations</p>
                </div>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{adminFinanceStats.totalRevenue}</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Today's Sales</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{adminFinanceStats.todaysSales}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Payments</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{adminFinanceStats.pendingPayments}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Monthly Growth</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{adminFinanceStats.monthlyGrowth}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-orange-500 bg-orange-50 p-3 rounded-lg">Quick Actions</h2>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/admin/finance/payments')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                    <CreditCard className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Payment Management</h3>
                                    <p className="text-sm text-gray-500">Manage payments and transactions</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>

                        <button
                            onClick={() => navigate('/admin/finance/payments/add')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                    <Plus className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Add Payment</h3>
                                    <p className="text-sm text-gray-500">Create new payment record</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>

                        <button
                            onClick={() => navigate('/admin/finance/platforms')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                    <Plug className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Payment Platforms</h3>
                                    <p className="text-sm text-gray-500">Connect online stores</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>


                        <button
                            onClick={() => navigate('/admin/finance/payments')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">View Payments</h3>
                                    <p className="text-sm text-gray-500">Manage all payment transactions</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>

                        <button
                            onClick={() => navigate('/admin/finance/reports')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Sales Reports</h3>
                                    <p className="text-sm text-gray-500">Generate sales and revenue reports</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>

                        <button
                            onClick={() => navigate('/admin/finance/invoices/create')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Create Invoice</h3>
                                    <p className="text-sm text-gray-500">Generate new invoices</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>

                        <button
                            onClick={() => navigate('/admin/finance/reports')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                    <FileText className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Financial Reports</h3>
                                    <p className="text-sm text-gray-500">View comprehensive financial reports</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-orange-500 bg-orange-50 p-3 rounded-lg">Recent Transactions</h2>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[400px] flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                            <FileText className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-gray-500 font-medium">No recent transactions</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
