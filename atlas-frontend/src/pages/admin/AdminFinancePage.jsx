import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, TrendingUp, Clock, CreditCard, Plus, ArrowRight, Plug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export function AdminFinancePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isSuperAdmin = user?.role === 'Super Admin';

    const [stats, setStats] = useState({
        totalRevenue: 0,
        todaySales: 0,
        pendingPayments: 0,
        monthlyGrowth: 0
    });
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFinanceData = async () => {
            setIsLoading(true);
            try {
                // Fetch stats and transactions in parallel
                const [statsRes, transRes] = await Promise.all([
                    api.get('/finance/superadmin/stats'),
                    api.get('/finance/superadmin/transactions')
                ]);

                setStats(statsRes.data);
                setTransactions(transRes.data.data || []);
            } catch (error) {
                console.error('Failed to fetch finance data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isSuperAdmin) {
            fetchFinanceData();
        }
    }, [isSuperAdmin]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

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
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {isLoading ? '...' : formatCurrency(stats.totalRevenue)}
                        </h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Today's Sales</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {isLoading ? '...' : formatCurrency(stats.todaySales)}
                        </h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Payments</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {isLoading ? '...' : stats.pendingPayments}
                        </h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Monthly Growth</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {isLoading ? '...' : `${stats.monthlyGrowth}%`}
                        </h3>
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

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
                        {isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                        ) : transactions.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${tx.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-900">{tx.sellerName}</span>
                                                    <span className="text-xs text-gray-400">({tx.orderId})</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tx.type === 'Incoming' ? 'bg-blue-50 text-blue-600' :
                                                            tx.type === 'Fee' ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600'
                                                        }`}>
                                                        {tx.type}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(tx.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{formatCurrency(tx.amount)}</p>
                                            <p className={`text-xs font-medium ${tx.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                                                {tx.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                    <FileText className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-gray-500 font-medium">No recent transactions</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
