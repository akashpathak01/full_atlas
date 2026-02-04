import React, { useState, useEffect } from 'react';
import {
    PieChart,
    TrendingUp,
    ArrowLeft,
    Download,
    ShoppingCart,
    Calendar,
    CheckCircle,
    DollarSign,
    LayoutGrid,
    ChevronDown,
    Trophy,
    Lightbulb,
    Clock,
    AlertCircle,
    PlusCircle,
    Check,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function ManagerStatisticsPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [statisticsData, setStatisticsData] = useState(null);
    const [timeRange, setTimeRange] = useState('This Week');
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            const response = await api.get('/call-center/order-statistics');
            setStatisticsData(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        if (!statisticsData) return;
        setIsExporting(true);
        
        try {
            const doc = new jsPDF();
            const dateStr = new Date().toLocaleString();
            const { stats, ordersByStatus } = statisticsData;

            // Header
            doc.setFontSize(22);
            doc.setTextColor(234, 88, 12);
            doc.text("ATLAS - Order Statistics Report", 14, 20);
            
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Generated on: ${dateStr}`, 14, 28);
            doc.line(14, 32, 196, 32);

            // Summary Section
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text("Executive Summary", 14, 42);

            const summaryData = [
                ["Metric", "Value", "Trend"],
                ["Total Orders", stats.totalOrders, stats.totalOrdersChange],
                ["This Month", stats.thisMonth, stats.thisMonthChange],
                ["Completion Rate", stats.completionRate, stats.completionRateChange],
                ["Avg Order Value", stats.avgOrderValue, stats.avgOrderValueChange]
            ];

            autoTable(doc, {
                startY: 46,
                head: [summaryData[0]],
                body: summaryData.slice(1),
                theme: 'striped',
                headStyles: { fillColor: [59, 130, 246] }
            });

            // Status Table
            doc.setFontSize(14);
            doc.text("Orders by Status", 14, doc.lastAutoTable.finalY + 15);

            const statusHeaders = [["Status", "Count", "Percentage", "Revenue", "Avg Proc. Time"]];
            const statusBody = Object.entries(ordersByStatus).map(([key, val]) => [
                key.charAt(0).toUpperCase() + key.slice(1),
                val.count,
                val.percentage,
                val.revenue,
                val.avgTime
            ]);

            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 20,
                head: statusHeaders,
                body: statusBody,
                headStyles: { fillColor: [234, 88, 12] }
            });

            doc.save(`Atlas_Order_Statistics_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('PDF Export Error:', error);
            alert('Failed to generate PDF');
        } finally {
            setIsExporting(false);
        }
    };

    const handleTimeSelect = (option) => {
        setTimeRange(option);
        setShowTimeDropdown(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Calculating Statistics...</p>
                </div>
            </div>
        );
    }

    if (!statisticsData) {
        return (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 m-8 shadow-sm">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-slate-900 font-black text-lg">Failed to load statistics.</p>
                <button onClick={fetchStatistics} className="mt-4 text-blue-600 font-bold hover:underline">Try Again</button>
            </div>
        );
    }

    const { stats, ordersByStatus, topAgents } = statisticsData;

    const timeOptions = ['Today', 'This Week', 'This Month', 'This Year', 'All Time'];

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 text-left">
                    <div className="bg-orange-100 p-2.5 rounded-xl flex-shrink-0">
                        <PieChart className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Order Statistics</h1>
                        <p className="text-sm font-medium text-slate-500">Comprehensive order analytics and reporting</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => navigate('/manager/dashboard')}
                        className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm text-sm font-black text-slate-600 active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-[#3b82f6] text-white rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(59,130,246,0.3)] text-sm font-black disabled:opacity-70"
                    >
                        {isExporting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
                    </button>
                </div>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* Total Orders */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                            <ShoppingCart className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] mb-1">Total Orders</p>
                            <h3 className="text-3xl font-black text-slate-900 leading-none">{stats.totalOrders}</h3>
                            <p className="text-green-500 text-[10px] font-black mt-2.5 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stats.totalOrdersChange}
                            </p>
                        </div>
                    </div>
                </div>

                {/* This Month */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                            <Calendar className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] mb-1">This Month</p>
                            <h3 className="text-3xl font-black text-slate-900 leading-none">{stats.thisMonth}</h3>
                            <p className="text-green-500 text-[10px] font-black mt-2.5 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stats.thisMonthChange}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Completion Rate */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                            <CheckCircle className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] mb-1">Completion Rate</p>
                            <h3 className="text-3xl font-black text-slate-900 leading-none">{stats.completionRate}</h3>
                            <p className="text-orange-500 text-[10px] font-black mt-2.5 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stats.completionRateChange}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Avg Order Value */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                            <DollarSign className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] mb-1">Avg Order Value</p>
                            <h3 className="text-3xl font-black text-slate-900 leading-none">{stats.avgOrderValue}</h3>
                            <p className="text-purple-500 text-[10px] font-black mt-2.5 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stats.avgOrderValueChange}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                {/* Orders Trend */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[350px] flex flex-col">
                    <div className="flex items-center space-x-2 text-slate-900 mb-8 px-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        <h3 className="font-extrabold tracking-tight">Orders Trend (Weekly)</h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-end px-4 pb-4">
                        <div className="flex items-end justify-between h-40 gap-2">
                            {[45, 62, 58, 75, 90, 82, 88].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div 
                                        className="w-full bg-blue-100 group-hover:bg-blue-500 rounded-t-lg transition-all duration-500 relative"
                                        style={{ height: `${val}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {val}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[350px] flex flex-col">
                    <div className="flex items-center space-x-2 text-slate-900 mb-8 px-2">
                        <PieChart className="w-5 h-5 text-green-500" />
                        <h3 className="font-extrabold tracking-tight">Status Distribution</h3>
                    </div>
                    <div className="flex-1 flex flex-col p-4 space-y-6">
                        {Object.entries(ordersByStatus).map(([key, val], i) => (
                            <div key={key} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
                                    <span className="text-slate-600">{key}</span>
                                    <span className="text-slate-900">{val.percentage}</span>
                                </div>
                                <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100">
                                    <div 
                                        className={`h-full transition-all duration-1000 delay-${i * 100} ${
                                            key === 'completed' ? 'bg-green-500' : 
                                            key === 'processing' ? 'bg-blue-500' : 
                                            key === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: val.percentage }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Order Statistics Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden text-left">
                <div className="px-8 py-6 bg-[#f8fafc]/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 p-2.5 rounded-xl shadow-lg shadow-blue-100">
                            <LayoutGrid className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">Order Statistics by Status</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1.5 uppercase tracking-wider">Comprehensive Data Breakdown</p>
                        </div>
                    </div>

                    {/* Interactive Time Range Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                            className="flex items-center space-x-3 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                        >
                            <span>{timeRange}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showTimeDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showTimeDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                {timeOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleTimeSelect(option)}
                                        className={`w-full text-left px-5 py-2.5 text-xs font-bold transition-colors hover:bg-slate-50 ${timeRange === option ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#fffbeb]/50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#fef3c7]">Status</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#fef3c7]">Count</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#fef3c7]">Percentage</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#fef3c7]">Revenue</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#fef3c7]">Avg Processing Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {/* Pending */}
                            <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="bg-[#fff7ed] text-[#9a3412] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tight">Pending</span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.pending.count}</td>
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-[#f97316] h-full rounded-full transition-all duration-1000" style={{ width: ordersByStatus.pending.percentage }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500">{ordersByStatus.pending.percentage}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.pending.revenue}</td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700 italic opacity-80">{ordersByStatus.pending.avgTime}</td>
                            </tr>
                            {/* Processing */}
                            <tr className="bg-[#fffbeb]/20 hover:bg-[#fffbeb]/40 transition-colors">
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="bg-[#eff6ff] text-[#1d4ed8] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tight">Processing</span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.processing.count}</td>
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-[#3b82f6] h-full rounded-full transition-all duration-1000" style={{ width: ordersByStatus.processing.percentage }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500">{ordersByStatus.processing.percentage}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.processing.revenue}</td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700 italic opacity-80">{ordersByStatus.processing.avgTime}</td>
                            </tr>
                            {/* Completed */}
                            <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="bg-[#f0fdf4] text-[#166534] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tight">Completed</span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.completed.count}</td>
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-[#22c55e] h-full rounded-full transition-all duration-1000" style={{ width: ordersByStatus.completed.percentage }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500">{ordersByStatus.completed.percentage}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.completed.revenue}</td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700 italic opacity-80">{ordersByStatus.completed.avgTime}</td>
                            </tr>
                            {/* Cancelled */}
                            <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="bg-[#fef2f2] text-[#991b1b] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tight">Cancelled</span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.cancelled.count}</td>
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-[#ef4444] h-full rounded-full transition-all duration-1000" style={{ width: ordersByStatus.cancelled.percentage }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500">{ordersByStatus.cancelled.percentage}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700">{ordersByStatus.cancelled.revenue}</td>
                                <td className="px-8 py-5 whitespace-nowrap font-black text-slate-700 italic opacity-80">{ordersByStatus.cancelled.avgTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12 text-left">
                {/* Top Agents */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center space-x-4 mb-10">
                        <div className="bg-[#fff7ed] p-2.5 rounded-xl">
                            <Trophy className="w-5 h-5 text-[#f97316]" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Top Agents</h3>
                    </div>
                    <div className="flex-grow flex flex-col items-center justify-center py-6">
                        {topAgents && topAgents.length > 0 ? (
                            <div className="w-full space-y-4">
                                {topAgents.map((agent, index) => (
                                    <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'}`}>
                                                {index + 1}
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm">{agent.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                            {agent.orders} Orders
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border-2 border-dashed border-slate-200">
                                    <Trophy className="w-10 h-10 text-slate-300" />
                                </div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No agent data available</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Order Insights */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center space-x-4 mb-10">
                        <div className="bg-[#eff6ff] p-2.5 rounded-xl">
                            <Lightbulb className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Order Insights</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-6 bg-[#eff6ff]/40 rounded-3xl border border-[#dbeafe] group hover:bg-[#eff6ff]/60 transition-colors cursor-default">
                            <h4 className="text-[10px] font-black text-[#1d4ed8] uppercase tracking-[0.2em] mb-2">Peak Hours</h4>
                            <p className="text-sm font-extrabold text-[#1e40af] leading-relaxed">Most orders are placed between <span className="bg-white/60 px-2 py-0.5 rounded-lg shadow-sm">2-4 PM</span> local time.</p>
                        </div>
                        <div className="p-6 bg-[#f0fdf4]/40 rounded-3xl border border-[#dcfce7] group hover:bg-[#f0fdf4]/60 transition-colors cursor-default">
                            <h4 className="text-[10px] font-black text-[#166534] uppercase tracking-[0.2em] mb-2">Best Day</h4>
                            <p className="text-sm font-extrabold text-[#14532d] leading-relaxed"><span className="bg-white/60 px-2 py-0.5 rounded-lg shadow-sm">Tuesday</span> holds the record for highest order volume this month.</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center space-x-4 mb-10">
                        <div className="bg-[#f5f3ff] p-2.5 rounded-xl">
                            <Clock className="w-5 h-5 text-[#7c3aed]" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Activity</h3>
                    </div>
                    <div className="space-y-7 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
                        <div className="flex items-start space-x-5 relative z-10">
                            <div className="mt-1 bg-[#22c55e] p-2 rounded-full ring-4 ring-[#f0fdf4]">
                                <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900">50 Orders Completed</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status: Verified Today</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-5 relative z-10">
                            <div className="mt-1 bg-[#3b82f6] p-2 rounded-full ring-4 ring-[#eff6ff]">
                                <PlusCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900">25 New Orders</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Received Last Hour</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-5 relative z-10">
                            <div className="mt-1 bg-[#f59e0b] p-2 rounded-full ring-4 ring-[#fffbeb]">
                                <AlertCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900">3 Orders Delayed</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Requires Priority Attention</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Loader for actions */}
            {isExporting && (
                <div className="fixed inset-0 bg-white/40 backdrop-blur-[2px] z-[100] flex items-center justify-center animate-in fade-in duration-300">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-slate-50">
                        <div className="w-16 h-16 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Generating PDF...</p>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #e2e8f0;
                }
                @keyframes slideIn {
                    from { transform: translateY(-10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out forwards;
                }
            `}} />
        </div>
    );
}


