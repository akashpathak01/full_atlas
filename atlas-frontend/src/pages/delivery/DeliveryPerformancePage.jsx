
import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle, Zap, FileText, Box, Clock, Shield, AlertTriangle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export function DeliveryPerformancePage() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalAssigned: 0,
        readyForDelivery: 0,
        inDelivery: 0,
        delivered: 0,
        failed: 0
    });
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/delivery/stats');
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Derived stats
    const totalCompleted = stats.delivered + stats.failed;
    const passRate = totalCompleted > 0 ? Math.round((stats.delivered / totalCompleted) * 100) : 0;
    const failRate = totalCompleted > 0 ? Math.round((stats.failed / totalCompleted) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">My Performance Dashboard</h1>
                    <p className="text-sm text-gray-500">Track your delivery performance and achievements</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Current Time</p>
                    <p className="text-xl font-black text-gray-900 leading-none">{currentTime.toLocaleTimeString()}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-xl border border-gray-100 p-1 w-fit shadow-sm">
                <button
                    onClick={() => navigate('/delivery/dashboard')}
                    className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-gray-900 rounded-lg transition-all"
                >
                    Dashboard
                </button>
                <button className="px-6 py-2 text-sm font-bold text-blue-600 bg-blue-50/50 rounded-lg">
                    Performance
                </button>
                <button
                    onClick={() => navigate('/delivery/settings')}
                    className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-gray-900 rounded-lg transition-all"
                >
                    Settings
                </button>
            </div>

            {/* Date Section */}
            <div className="flex justify-end p-2 px-1">
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Today's Date</p>
                    <p className="text-base font-black text-gray-700">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Order Statistics for Delivery */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800">Order Statistics for Delivery</h3>
                    <p className="text-sm text-gray-500">Current order status in delivery workflow</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-gray-50 rounded-xl mr-4 group-hover:bg-gray-100 transition-colors">
                            <FileText className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-500 block">Total Assigned</span>
                            <span className="text-2xl font-black text-gray-900">{stats.totalAssigned}</span>
                        </div>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-green-50 rounded-xl mr-4 group-hover:bg-green-100 transition-colors">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-500 block">Ready for Delivery</span>
                            <span className="text-2xl font-black text-gray-900">{stats.readyForDelivery}</span>
                        </div>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors">
                            <Zap className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-500 block">In Delivery</span>
                            <span className="text-2xl font-black text-gray-900">{stats.inDelivery}</span>
                        </div>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-purple-50 rounded-xl mr-4 group-hover:bg-purple-100 transition-colors">
                            <CheckCircle className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-500 block">Delivered</span>
                            <span className="text-2xl font-black text-gray-900">{stats.delivered}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* This Week Overview */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800">This Week Overview</h3>
                    <p className="text-sm text-gray-500">Your performance metrics (Lifetime)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-green-50 rounded-xl mr-4">
                            <Box className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-gray-900">{stats.delivered}</h4>
                            <span className="text-sm font-bold text-gray-500">Packages Completed</span>
                        </div>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-blue-50 rounded-xl mr-4">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-gray-900">{stats.avgDuration} {stats.avgDuration !== '--' ? 'min' : ''}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Avg Duration</p>
                        </div>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-yellow-50 rounded-xl mr-4">
                            <Shield className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-gray-900">{stats.delivered + stats.failed}</h4>
                            <span className="text-sm font-bold text-gray-500">Total Checks</span>
                        </div>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-6 flex items-center group hover:shadow-md transition-all">
                        <div className="p-3 bg-purple-50 rounded-xl mr-4 flex items-center justify-center">
                            <span className="text-purple-600 font-black text-xl">%</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-gray-900">{passRate}%</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quality Check Results */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-8 tracking-tight">Quality Check Results</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 px-6 bg-green-50/50 rounded-xl border border-green-50 transition-all hover:bg-green-50">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-bold text-green-900">Passed ({stats.delivered})</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 px-6 bg-red-50/50 rounded-xl border border-red-50 transition-all hover:bg-red-50">
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-bold text-red-900">Failed ({stats.failed})</span>
                    </div>
                </div>
            </div>

            {/* Daily Activity */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-lg font-bold text-gray-800 mb-8 tracking-tight">Daily Activity</h3>
                <div className="overflow-x-auto rounded-xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-yellow-100/50">
                                <th className="px-6 py-4 text-[10px] font-black text-yellow-600 uppercase tracking-widest">DATE</th>
                                <th className="px-6 py-4 text-[10px] font-black text-yellow-600 uppercase tracking-widest">PACKAGES</th>
                                <th className="px-6 py-4 text-[10px] font-black text-yellow-600 uppercase tracking-widest">CHECKS</th>
                                <th className="px-6 py-4 text-[10px] font-black text-yellow-600 uppercase tracking-widest">AVG TIME</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stats.dailyHistory && stats.dailyHistory.length > 0 ? (
                                stats.dailyHistory.map((day, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700">{day.date}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{day.delivered}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{day.total}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-blue-600">{day.avgTime} {day.avgTime !== '--' ? 'min' : ''}</td>
                                    </tr>
                                ))
                            ) : null}
                        </tbody>
                    </table>
                </div>
                {(!stats.dailyHistory || stats.dailyHistory.length === 0) && (
                    <div className="flex justify-center items-center py-10 bg-gray-50/30 rounded-b-xl border border-gray-50 border-t-0">
                        <p className="text-xs font-bold text-gray-300 italic uppercase tracking-widest leading-loose">No activity data available</p>
                    </div>
                )}
            </div>
        </div>
    );
}
