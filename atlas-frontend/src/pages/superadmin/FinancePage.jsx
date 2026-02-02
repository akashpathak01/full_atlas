import React from 'react';
import { DollarSign, TrendingUp, CreditCard, FileText } from 'lucide-react';
import { financeData } from '../../data/superAdminDummyData';

export function FinancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Finance & Billing</h1>
                <p className="text-sm text-gray-600 mt-1">Monitor revenue and transactions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm opacity-90">Today's Revenue</div>
                            <div className="text-2xl font-bold mt-1">{financeData.revenue.today}</div>
                        </div>
                        <DollarSign className="w-10 h-10 opacity-80" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm opacity-90">This Week</div>
                            <div className="text-2xl font-bold mt-1">{financeData.revenue.thisWeek}</div>
                        </div>
                        <TrendingUp className="w-10 h-10 opacity-80" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm opacity-90">This Month</div>
                            <div className="text-2xl font-bold mt-1">{financeData.revenue.thisMonth}</div>
                        </div>
                        <CreditCard className="w-10 h-10 opacity-80" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm opacity-90">Total Revenue</div>
                            <div className="text-2xl font-bold mt-1">{financeData.revenue.total}</div>
                        </div>
                        <FileText className="w-10 h-10 opacity-80" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {financeData.transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${txn.type === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {txn.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{txn.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            txn.status === 'Processed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
