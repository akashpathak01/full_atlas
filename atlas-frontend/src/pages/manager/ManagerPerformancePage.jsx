import React, { useState } from 'react';
import { Home, TrendingUp, Download, Users, Percent, Trophy, ShoppingCart, BarChart, Table, Star, ArrowLeft, Eye, FileText, CheckCircle2, Layout, Lightbulb, Award, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ManagerPerformancePage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-4">
                    <div className="p-2.5">
                        <TrendingUp className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-600">Agent Performance</h1>
                        <p className="text-sm text-gray-500 font-medium">Performance reports and analytics for call center agents</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                        onClick={() => navigate('/manager/dashboard')}
                        className="px-6 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 flex items-center gap-2 border border-gray-100 shadow-sm transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-100 transition-all text-sm">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Total Agents</p>
                        <h3 className="text-2xl font-black text-gray-900 leading-none">1</h3>
                        <p className="text-[10px] font-bold text-green-500 mt-1 flex items-center gap-0.5">↑ Active</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <Percent className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Avg Performance</p>
                        <h3 className="text-2xl font-black text-gray-900 leading-none">87%</h3>
                        <p className="text-[10px] font-bold text-green-500 mt-1 flex items-center gap-0.5">↑ This Month</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 rounded-xl">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Top Performer</p>
                        <h3 className="text-xl font-black text-gray-900 leading-none">Call Center Agent</h3>
                        <p className="text-[10px] font-bold text-yellow-600 mt-1 flex items-center gap-0.5">↑ This Week</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-xl">
                        <ShoppingCart className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Total Orders</p>
                        <h3 className="text-2xl font-black text-gray-900 leading-none">0</h3>
                        <p className="text-[10px] font-bold text-purple-600 mt-1 flex items-center gap-0.5">↑ All Time</p>
                    </div>
                </div>
            </div>

            {/* Trends and Comparison Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 min-h-[400px] flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <BarChart className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-bold text-gray-800">Performance Trends</h3>
                    </div>
                    <div className="flex-1 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center flex-col gap-4">
                        <TrendingUp className="w-12 h-12 text-gray-300" />
                        <p className="text-sm font-bold text-gray-400 italic">Performance chart will be displayed here</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 min-h-[400px] flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <Layout className="w-5 h-5 text-green-500" />
                        <h3 className="text-lg font-bold text-gray-800">Agent Comparison</h3>
                    </div>
                    <div className="flex-1 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center flex-col gap-4">
                        <Table className="w-12 h-12 text-gray-300" />
                        <p className="text-sm font-bold text-gray-400 italic">Comparison chart will be displayed here</p>
                    </div>
                </div>
            </div>

            {/* Agent Performance Details Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Layout className="w-6 h-6 text-blue-500" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Agent Performance Details</h3>
                            <p className="text-xs font-bold text-gray-400">Detailed performance metrics for each agent</p>
                        </div>
                    </div>
                    <select className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer">
                        <option>This Week</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-yellow-100/50">
                            <tr>
                                <th className="px-8 py-4 text-left text-[11px] font-black text-yellow-700 uppercase tracking-widest">AGENT</th>
                                <th className="px-8 py-4 text-left text-[11px] font-black text-yellow-700 uppercase tracking-widest">ORDERS HANDLED</th>
                                <th className="px-8 py-4 text-left text-[11px] font-black text-yellow-700 uppercase tracking-widest">SUCCESS RATE</th>
                                <th className="px-8 py-4 text-left text-[11px] font-black text-yellow-700 uppercase tracking-widest">AVG RESPONSE TIME</th>
                                <th className="px-8 py-4 text-left text-[11px] font-black text-yellow-700 uppercase tracking-widest">CUSTOMER RATING</th>
                                <th className="px-8 py-4 text-left text-[11px] font-black text-yellow-700 uppercase tracking-widest">PERFORMANCE SCORE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <tr className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100">
                                            <Users className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">Call Center Agent</h4>
                                            <p className="text-xs font-medium text-gray-400">callcenter@atlas.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="font-black text-gray-900">0</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-gray-300 h-full w-0"></div>
                                        </div>
                                        <span className="text-xs font-black text-gray-900">0%</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="font-bold text-gray-600 text-sm">2.5 min</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 text-gray-200" />
                                        <span className="ml-2 text-sm font-black text-gray-900">4.2</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-[11px] font-black border border-red-100">10%</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Grid: Top Performers, Tips, Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Performers */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        <h3 className="text-lg font-bold text-gray-800">Top Performers</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center font-black text-yellow-700">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Call Center Agent</h4>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">0 orders</p>
                                </div>
                            </div>
                            <span className="text-sm font-black text-yellow-600">10%</span>
                        </div>
                    </div>
                </div>

                {/* Performance Tips */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <Lightbulb className="w-6 h-6 text-blue-500" />
                        <h3 className="text-lg font-bold text-gray-800">Performance Tips</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm shadow-blue-50">
                            <h4 className="text-sm font-bold text-blue-900 mb-2">Improve Response Time</h4>
                            <p className="text-[11px] font-medium text-blue-600 leading-relaxed">Focus on quick customer responses to increase satisfaction scores.</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm shadow-green-50">
                            <h4 className="text-sm font-bold text-green-900 mb-2">Order Completion</h4>
                            <p className="text-[11px] font-medium text-green-600 leading-relaxed">Ensure all assigned orders are completed on time.</p>
                        </div>
                        <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 shadow-sm shadow-yellow-50">
                            <h4 className="text-sm font-bold text-yellow-900 mb-2">Customer Communication</h4>
                            <p className="text-[11px] font-medium text-yellow-600 leading-relaxed">Maintain clear and professional communication with customers.</p>
                        </div>
                    </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <Award className="w-6 h-6 text-purple-600" />
                        <h3 className="text-lg font-bold text-gray-800">Recent Achievements</h3>
                    </div>
                    <div className="space-y-8 mt-4">
                        <div className="flex items-start gap-5">
                            <div className="p-3 bg-green-50 rounded-full">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">100 Orders Completed</h4>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight mt-1">This month</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            <div className="p-3 bg-blue-50 rounded-full">
                                <Star className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">95% Customer Rating</h4>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight mt-1">This week</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            <div className="p-3 bg-purple-50 rounded-full">
                                <Timer className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Fastest Response</h4>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight mt-1">1.2 min average</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
