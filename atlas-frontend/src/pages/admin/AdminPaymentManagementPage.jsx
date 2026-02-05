import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, ArrowLeft, CreditCard, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export function AdminPaymentManagementPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isSuperAdmin = user?.role === 'Super Admin';

    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({
        totalAmount: 0,
        completedCount: 0,
        pendingCount: 0
    });
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        pages: 1
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [isLoading, setIsLoading] = useState(true);

    const fetchPayments = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                status: statusFilter,
                search: searchTerm
            };
            const response = await api.get('/finance/superadmin/payments', { params });
            setPayments(response.data.data);
            setStats(response.data.stats);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Failed to fetch payments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [pagination.page, statusFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        fetchPayments();
    };

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
                    {!isSuperAdmin && (
                        <button
                            onClick={() => navigate('/admin/finance/payments/add')}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Payment
                        </button>
                    )}
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
                        <h3 className="text-xl font-bold text-gray-900">{isLoading ? '...' : pagination.total}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <span className="text-xl font-bold text-blue-600">AED</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                        <h3 className="text-xl font-bold text-gray-900">{isLoading ? '...' : formatCurrency(stats.totalAmount)}</h3>
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
                        <h3 className="text-xl font-bold text-gray-900">{isLoading ? '...' : stats.completedCount}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending</p>
                        <h3 className="text-xl font-bold text-gray-900">{isLoading ? '...' : stats.pendingCount}</h3>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-orange-800 font-bold mb-4">Search & Filter</h3>
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select
                            className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Statuses</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CREATED">Pending</option>
                            <option value="CANCELLED">Failed</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
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
                    <div className="flex items-end">
                        <button type="submit" className="w-full flex items-center justify-center px-4 py-2 bg-[#E15B2D] text-white rounded-lg hover:bg-[#c44e26] transition-colors">
                            <Search className="w-4 h-4 mr-2" />
                            Filter
                        </button>
                    </div>
                </form>
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
                                    <th className="px-6 py-3">Seller</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Method</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-12 text-center text-gray-500">Loading payments...</td>
                                    </tr>
                                ) : payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate(`/admin/orders/${payment.id.split('-')[1]}`)}>
                                                {payment.orderId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.customer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.seller}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</td>
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
                                                <button className="text-blue-600 hover:text-blue-900" onClick={() => navigate(`/admin/orders/${payment.id.split('-')[1]}`)}>View</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                            No payments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
