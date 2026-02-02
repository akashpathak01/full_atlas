
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, BarChart2, DollarSign, FileText, Download, Printer, Filter, Calendar } from 'lucide-react';

export function AdminFinancialReportsPage() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [reportType, setReportType] = useState('Revenue Analysis');
    const [groupBy, setGroupBy] = useState('Daily');

    // Dummy data for the report
    const reportData = [
        { date: '2024-03-20', orders: 45, revenue: 12450, fees: 450, total: 12000, avgOrder: 276, topSeller: 'TechStore' },
        { date: '2024-03-19', orders: 38, revenue: 9800, fees: 380, total: 9420, avgOrder: 257, topSeller: 'FashionHub' },
        { date: '2024-03-18', orders: 52, revenue: 15600, fees: 600, total: 15000, avgOrder: 300, topSeller: 'GadgetWorld' },
        { date: '2024-03-17', orders: 30, revenue: 8500, fees: 300, total: 8200, avgOrder: 283, topSeller: 'HomeDecor' },
        { date: '2024-03-16', orders: 42, revenue: 11200, fees: 420, total: 10780, avgOrder: 266, topSeller: 'TechStore' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-600">Financial Reports & Analytics</h1>
                        <p className="text-sm text-gray-600">Comprehensive financial analysis and reporting</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/finance')}
                        className="flex items-center px-4 py-2 bg-[#4b5563] text-white rounded-lg hover:bg-[#374151] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Finance
                    </button>
                </div>
            </div>

            {/* Quick Reports */}
            <div className="bg-orange-50 rounded-xl border border-orange-100 p-6">
                <h2 className="text-lg font-bold text-orange-800 mb-4">Quick Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2 group">
                        <BarChart2 className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-700">Daily Revenue</span>
                    </button>
                    <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2 group">
                        <DollarSign className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-700">Payment Summary</span>
                    </button>
                    <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2 group">
                        <FileText className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-700">Fee Analysis</span>
                    </button>
                    <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2 group">
                        <Home className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-700">Seller Report</span>
                    </button>
                </div>
            </div>

            {/* Custom Report Builder */}
            <div className="bg-orange-50 rounded-xl border border-orange-100 p-6">
                <h2 className="text-lg font-bold text-orange-800 mb-4">Custom Report Builder</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option>Revenue Analysis</option>
                            <option>Order Summary</option>
                            <option>Payment Methods</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                        <div className="relative">
                            <input type="date" className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                        <div className="relative">
                            <input type="date" className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
                        <select
                            value={groupBy}
                            onChange={(e) => setGroupBy(e.target.value)}
                            className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filters</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
                            <option>All Sellers</option>
                            <option>Top Sellers Only</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-6 py-2 bg-[#E15B2D] text-white font-medium rounded-lg hover:bg-[#c44e26] transition-colors">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Report Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-orange-50">
                    <h2 className="text-lg font-bold text-orange-800">{reportType} - Real Data from Database</h2>
                    <div className="flex gap-2">
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </button>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-yellow-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Orders</th>
                                    <th className="px-6 py-3">Revenue</th>
                                    <th className="px-6 py-3">Fees</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Avg Order</th>
                                    <th className="px-6 py-3">Top Seller</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reportData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.orders}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AED {row.revenue.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">- AED {row.fees}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">AED {row.total.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AED {row.avgOrder}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{row.topSeller}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-4">No revenue data available. Please create some orders and payments first.</p>
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="bg-orange-50 rounded-xl border border-orange-100 p-6">
                <h2 className="text-lg font-bold text-orange-800 mb-6">Summary Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-orange-600">AED 0.00</h3>
                        <button className="text-xs text-blue-500 hover:underline mt-1">Click to view payments &rarr;</button>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                        <h3 className="text-2xl font-bold text-blue-600">0</h3>
                        <button className="text-xs text-blue-500 hover:underline mt-1">Click to view orders &rarr;</button>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Average Order</p>
                        <h3 className="text-2xl font-bold text-green-600">AED 0.00</h3>
                        <button className="text-xs text-blue-500 hover:underline mt-1">View all orders &rarr;</button>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Fees</p>
                        <h3 className="text-2xl font-bold text-purple-600">AED</h3>
                        <button className="text-xs text-blue-500 hover:underline mt-1">Manage fees &rarr;</button>
                    </div>
                </div>
                <div className="mt-8 text-center text-xs text-gray-400">
                    Real data from database | Last updated:
                </div>
            </div>

            {/* Fee Breakdown Chart (Mock) */}
            <div className="bg-orange-50 rounded-xl border border-orange-100 p-6">
                <h2 className="text-lg font-bold text-orange-800 mb-6">Fee Breakdown Chart</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-32">Shipping (%)</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[75%]"></div>
                        </div>
                        <span className="text-sm text-gray-600">%</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-32">Fulfillment (%)</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[60%]"></div>
                        </div>
                        <span className="text-sm text-gray-600">%</span>
                    </div>
                </div>
            </div>

            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
