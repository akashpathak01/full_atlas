import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import {
    Home,
    Phone,
    ShoppingCart,
    Clock,
    Users,
    CheckCircle,
    AlertTriangle,
    Play,
    Settings,
    X,
    Loader2,
    Sparkles,
    UserPlus,
    RefreshCw,
    PlusCircle,
    Star,
    TrendingUp,
    ChevronRight,
    Search,
    Wrench,
    Check,
    User
} from 'lucide-react';

export function ManagerDashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        user: 'Super Admin',
        stats: {
            totalOrders: 0,
            pendingApproval: 0,
            activeAgents: 0,
            approvedToday: 0
        },
        ordersAwaitingApproval: [],
        recentlyApprovedOrders: [],
        assignedOrders: [],
        unassignedOrders: []
    });
    const [isLoading, setIsLoading] = useState({
        autoAssign: false,
        fixUnassigned: false
    });

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.get('/call-center/manager-dashboard');
            // Transform response if necessary to match the structure expected by render
            // Backend returns: { stats, awaitingApprovalOrders, recentlyApprovedOrders, assignedOrders, unassignedOrders }
            // Frontend currently expects: { user, stats, ordersAwaitingApproval, ... }
            
            const data = response.data;
            setDashboardData({
                user: 'Super Admin', // Could be dynamic if user info is in response
                stats: data.stats,
                ordersAwaitingApproval: data.awaitingApprovalOrders || [],
                recentlyApprovedOrders: data.recentlyApprovedOrders || [],
                assignedOrders: data.assignedOrders || [],
                unassignedOrders: data.unassignedOrders || []
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAction = async (action) => {
        setIsLoading(prev => ({ ...prev, [action]: true }));
        
        try {
            let endpoint = '';
            if (action === 'autoAssign') endpoint = '/call-center/auto-assign';
            else if (action === 'fixUnassigned') endpoint = '/call-center/fix-unassigned';

            if (endpoint) {
                const res = await api.post(endpoint);
                alert(res.data.message);
                fetchDashboardData();
            }
        } catch (error) {
            console.error(`Error performing ${action}:`, error);
            alert(`Failed to perform ${action}`);
        } finally {
            setIsLoading(prev => ({ ...prev, [action]: false }));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 space-y-6 font-sans">
            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-gray-500 font-medium">
                <Home className="w-3.5 h-3.5 mr-2" />
                <span>Home</span>
                <span className="mx-2 text-gray-400 font-normal">›</span>
                <span>Call Center</span>
                <span className="mx-2 text-gray-400 font-normal">›</span>
                <span className="text-gray-900 font-semibold">Manager Dashboard</span>
            </div>

            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-5">
                        <div className="bg-[#fff7ed] p-4 rounded-2xl shadow-sm border border-orange-50">
                            <Phone className="w-8 h-8 text-[#f97316]" fill="currentColor" fillOpacity="0.1" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-[#1e293b] tracking-tight">Call Center Manager</h1>
                            <p className="text-[#64748b] text-sm mt-0.5 font-medium flex items-center">
                                Manager: <span className="text-[#334155] ml-1">{dashboardData.user}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm text-sm font-bold text-[#334155]">
                            <Home className="w-4 h-4" />
                            <span>Main Dashboard</span>
                        </button>
                        <div className="text-right border-l pl-6 border-gray-100">
                            <div className="text-[10px] text-[#94a3b8] font-black uppercase tracking-[0.1em] mb-0.5">Live Operations</div>
                            <div className="text-xl font-black text-[#1e293b] tabular-nums">{currentTime}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Orders */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="flex items-center justify-between">
                        <div className="bg-[#eff6ff] p-3 rounded-xl group-hover:scale-110 transition-transform">
                            <ShoppingCart className="w-6 h-6 text-[#3b82f6]" />
                        </div>
                        <div className="text-right">
                            <p className="text-[#64748b] text-xs font-bold uppercase tracking-wider mb-1">Total Orders</p>
                            <p className="text-3xl font-black text-[#1e293b]">{dashboardData.stats.totalOrders}</p>
                        </div>
                    </div>
                </div>

                {/* Pending Approval */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="flex items-center justify-between">
                        <div className="bg-[#fff7ed] p-3 rounded-xl group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6 text-[#f97316]" />
                        </div>
                        <div className="text-right">
                            <p className="text-[#64748b] text-xs font-bold uppercase tracking-wider mb-1">Pending Approval</p>
                            <p className="text-3xl font-black text-[#f97316]">{dashboardData.stats.pendingApproval}</p>
                        </div>
                    </div>
                </div>

                {/* Active Agents */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="flex items-center justify-between">
                        <div className="bg-[#f0fdf4] p-3 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-[#22c55e]" />
                        </div>
                        <div className="text-right">
                            <p className="text-[#64748b] text-xs font-bold uppercase tracking-wider mb-1">Active Agents</p>
                            <p className="text-3xl font-black text-[#1e293b]">{dashboardData.stats.activeAgents}</p>
                        </div>
                    </div>
                </div>

                {/* Approved Today */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="flex items-center justify-between">
                        <div className="bg-[#f0fdf4] p-3 rounded-xl group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-6 h-6 text-[#22c55e]" />
                        </div>
                        <div className="text-right">
                            <p className="text-[#64748b] text-xs font-bold uppercase tracking-wider mb-1">Approved Today</p>
                            <p className="text-3xl font-black text-[#22c55e]">{dashboardData.stats.approvedToday}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section: Orders status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Awaiting Approval */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 bg-[#fff7ed] border-b border-[#ffedd5] flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-[#9a3412]">
                            <AlertTriangle className="w-5 h-5" />
                            <h3 className="font-extrabold tracking-tight">Orders Awaiting Approval</h3>
                        </div>
                        <span className="bg-[#ffedd5] text-[#9a3412] text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                            {dashboardData.ordersAwaitingApproval.length} orders
                        </span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col space-y-4">
                        {dashboardData.ordersAwaitingApproval.length > 0 ? (
                            dashboardData.ordersAwaitingApproval.map((order, idx) => (
                                <div key={idx} className="bg-white border border-[#f1f5f9] rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] hover:border-orange-200 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-[#fff7ed] p-3 rounded-xl">
                                            <ShoppingCart className="w-6 h-6 text-[#f97316]" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#1e293b] text-sm">Order {order.orderNumber}</h4>
                                            <p className="text-[#64748b] text-[11px] font-medium mt-0.5">Customer: {order.customerName}</p>
                                            <p className="text-[#94a3b8] text-[10px] mt-0.5 uppercase tracking-wide">Created: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-[#fef9c3] text-[#854d0e] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tight">
                                            Pending
                                        </span>
                                        <button className="flex items-center space-x-1 px-4 py-2 bg-white border border-[#f97316] text-[#f97316] text-[11px] font-black rounded-lg hover:bg-[#fff7ed] transition-all">
                                            <Settings className="w-3.5 h-3.5" />
                                            <span>Review</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center py-10 opacity-60">
                                <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-4">
                                    <Check className="w-8 h-8 text-[#22c55e]" />
                                </div>
                                <h4 className="text-sm font-black text-[#1e293b]">All Orders Approved</h4>
                                <p className="text-xs text-[#64748b] mt-1">No orders currently awaiting approval</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recently Approved Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 bg-[#f0fdf4] border-b border-[#dcfce7] flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-[#166534]">
                            <CheckCircle className="w-5 h-5" />
                            <h3 className="font-extrabold tracking-tight">Recently Approved Orders</h3>
                        </div>
                        <span className="bg-[#dcfce7] text-[#166534] text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                            {dashboardData.recentlyApprovedOrders.length} today
                        </span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col items-center justify-center min-h-[220px]">
                         {dashboardData.recentlyApprovedOrders.length > 0 ? (
                             <div className="w-full space-y-4">
                                {dashboardData.recentlyApprovedOrders.map((order, idx) => (
                                    <div key={idx} className="bg-white border border-[#f1f5f9] rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-green-100 transition-colors w-full">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#f0fdf4] p-3 rounded-xl">
                                                <CheckCircle className="w-6 h-6 text-[#22c55e]" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-[#1e293b] text-sm">Order {order.orderNumber}</h4>
                                                <p className="text-[#64748b] text-[11px] font-medium mt-0.5">Customer: {order.customerName}</p>
                                                <p className="text-[#94a3b8] text-[10px] mt-0.5 uppercase tracking-wide">Approved: {new Date(order.approvedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-4 text-[#94a3b8]">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h4 className="text-sm font-black text-[#1e293b]">No Recent Approvals</h4>
                                <p className="text-xs text-[#64748b] mt-1">No orders have been approved recently</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Assignment Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 bg-[#f8fafc] border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#eff6ff] p-2 rounded-lg">
                            <Users className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <h3 className="text-lg font-black text-[#1e293b] tracking-tight">Order Assignment Management</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            onClick={() => handleAction('autoAssign')}
                            disabled={isLoading.autoAssign}
                            className="flex items-center space-x-2 px-5 py-2.5 bg-[#2563eb] text-white text-[11px] font-black rounded-xl hover:bg-[#1d4ed8] shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Play className="w-3.5 h-3.5" />
                            <span>{isLoading.autoAssign ? 'ASSIGNING...' : 'AUTO ASSIGN ORDERS'}</span>
                        </button>
                        <button
                            onClick={() => handleAction('fixUnassigned')}
                            disabled={isLoading.fixUnassigned}
                            className="flex items-center space-x-2 px-5 py-2.5 bg-[#059669] text-white text-[11px] font-black rounded-xl hover:bg-[#047857] shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Wrench className="w-3.5 h-3.5" />
                            <span>{isLoading.fixUnassigned ? 'FIXING...' : 'FIX UNASSIGNED ORDERS'}</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Assigned Orders */}
                    <div className="space-y-4">
                        <h4 className="text-[13px] font-black text-[#1e293b] uppercase tracking-wide">Assigned Orders</h4>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {dashboardData.assignedOrders.length > 0 ? (
                                dashboardData.assignedOrders.map((order, idx) => (
                                    <div key={idx} className="bg-white border border-[#f1f5f9] rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-blue-100 transition-colors">
                                        <div>
                                            <h5 className="font-black text-[#1e293b] text-xs">Order {order.orderNumber}</h5>
                                            <div className="flex items-center mt-1 text-[10px] text-[#64748b] font-medium opacity-80">
                                                <span>Customer: {order.customer}</span>
                                                <span className="mx-2">•</span>
                                                <span>Agent: {order.agent}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="bg-[#ebf5ff] text-[#1d4ed8] text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tight">
                                                {order.status || 'ASSIGNED'}
                                            </span>
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-[#f8fafc] border-2 border-dashed border-[#e2e8f0] rounded-2xl opacity-60">
                                    <UserPlus className="w-8 h-8 mx-auto mb-2 text-[#94a3b8]" />
                                    <p className="text-xs font-bold text-[#64748b]">No assigned orders</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Unassigned Orders */}
                    <div className="space-y-4">
                        <h4 className="text-[13px] font-black text-[#1e293b] uppercase tracking-wide">Unassigned Orders</h4>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {dashboardData.unassignedOrders.length > 0 ? (
                                dashboardData.unassignedOrders.map((order, idx) => (
                                    <div key={idx} className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-[#fde68a] transition-colors">
                                        <div>
                                            <h5 className="font-black text-[#854d0e] text-xs">Order {order.orderNumber}</h5>
                                            <p className="text-[#92400e] text-[10px] font-medium mt-1 opacity-70">
                                                Customer: {order.customer} <br />
                                                <span className="text-[9px] opacity-60 uppercase tracking-tighter">Created: {order.created}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="bg-[#fef3c7] text-[#92400e] text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tight">
                                                Unassigned
                                            </span>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-[#f0fdf4] border-2 border-dashed border-[#dcfce7] rounded-2xl">
                                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#22c55e]" />
                                    <p className="text-xs font-bold text-[#166534]">All orders are assigned</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-8 border-b pb-5">
                    <div className="bg-[#f8fafc] p-2 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-[#334155]" />
                    </div>
                    <h3 className="text-lg font-black text-[#1e293b] tracking-tight text-left">Performance Overview</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Approval Rate */}
                    <div className="text-center group p-4 rounded-3xl hover:bg-gray-50 transition-all">
                        <div className="w-16 h-16 bg-[#f0fdf4] rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Check className="w-8 h-8 text-[#22c55e]" />
                        </div>
                        <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1 opacity-60">Approval Rate</p>
                        <p className="text-3xl font-black text-[#1e293b]">0%</p>
                    </div>

                    {/* Avg Response Time */}
                    <div className="text-center group p-4 rounded-3xl hover:bg-gray-50 transition-all">
                        <div className="w-16 h-16 bg-[#eff6ff] rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Clock className="w-8 h-8 text-[#3b82f6]" />
                        </div>
                        <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1 opacity-60">Avg Response Time</p>
                        <p className="text-3xl font-black text-[#1e293b]">0 min</p>
                    </div>

                    {/* Customer Satisfaction */}
                    <div className="text-center group p-4 rounded-3xl hover:bg-gray-50 transition-all">
                        <div className="w-16 h-16 bg-[#f5f3ff] rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Star className="w-8 h-8 text-[#7c3aed]" fill="currentColor" />
                        </div>
                        <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1 opacity-60">Customer Satisfaction</p>
                        <p className="text-3xl font-black text-[#1e293b]">0/5</p>
                    </div>

                    {/* Calls Handled */}
                    <div className="text-center group p-4 rounded-3xl hover:bg-gray-50 transition-all">
                        <div className="w-16 h-16 bg-[#fff7ed] rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Phone className="w-8 h-8 text-[#f97316]" />
                        </div>
                        <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1 opacity-60">Calls Handled</p>
                        <p className="text-3xl font-black text-[#1e293b]">0</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}} />
        </div>
    );
}
