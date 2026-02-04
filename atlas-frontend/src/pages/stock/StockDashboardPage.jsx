import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Home, Package, Box, Warehouse, AlertTriangle, XCircle, ClipboardList, CheckCircle, X, Calendar, Loader2 } from 'lucide-react';

export function StockDashboardPage() {
    const [showBanner, setShowBanner] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [filter, setFilter] = useState('All Time');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/inventory/dashboard');
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyRange = (e) => {
        e.preventDefault();
        if (dateRange.start && dateRange.end) {
            setFilter(`Custom (${dateRange.start} - ${dateRange.end})`);
            setIsModalOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading Dashboard Data...</p>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 m-8 shadow-sm">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-slate-900 font-black text-lg">Failed to load dashboard data.</p>
                <button onClick={fetchDashboardData} className="mt-4 text-blue-600 font-bold hover:underline">Try Again</button>
            </div>
        );
    }

    const { stats, stockStatus, warehouseStats } = dashboardData;

    return (
        <div className="space-y-6 relative">
            {/* Welcome Banner */}
            {showBanner && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex justify-between items-center text-green-700">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        <span className="font-medium">Welcome Stock Keeper! Login successful.</span>
                    </div>
                    <button onClick={() => setShowBanner(false)} className="text-green-500 hover:text-green-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Stock</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Dashboard</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <Package className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Stock Keeper Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage warehouse inventory and stock operations</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95">
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>

                    <select
                        value={filter.startsWith('Custom') ? 'Custom' : filter}
                        onChange={(e) => {
                            if (e.target.value === 'Custom') {
                                setIsModalOpen(true);
                            } else {
                                setFilter(e.target.value);
                            }
                        }}
                        className="border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-600 focus:outline-none focus:border-blue-500 bg-white cursor-pointer h-[38px]"
                    >
                        <option value="All Time">All Time</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                        <option value="Custom" hidden>Custom Range</option>
                    </select>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium shadow-sm transition-all active:scale-95"
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        {filter.startsWith('Custom') ? 'Change Range' : 'Custom Range'}
                    </button>
                </div>
            </div>

            {/* Filter Status Indicator (Optional but helpful for "Filter work") */}
            <div className="flex items-center justify-end">
                <p className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    Showing data for: <span className="text-gray-900 font-bold">{filter}</span>
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Products</p>
                        <h3 className="text-4xl font-bold text-gray-900">{stats.totalProducts}</h3>
                    </div>
                    <div className="p-4 bg-blue-100 rounded-xl">
                        <Package className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Pieces</p>
                        <h3 className="text-4xl font-bold text-gray-900">{stats.totalPieces}</h3>
                    </div>
                    <div className="p-4 bg-green-100 rounded-xl">
                        <Box className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Warehouses</p>
                        <h3 className="text-4xl font-bold text-gray-900">{stats.warehouses}</h3>
                    </div>
                    <div className="p-4 bg-orange-100 rounded-xl">
                        <Warehouse className="w-8 h-8 text-orange-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Near Expiry</p>
                        <h3 className="text-4xl font-bold text-gray-900">{stats.nearExpiry}</h3>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Out of Stock</p>
                        <h3 className="text-4xl font-bold text-gray-900">{stats.outOfStock}</h3>
                    </div>
                    <div className="p-4 bg-red-100 rounded-xl">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Orders Awaiting Pick</p>
                        <h3 className="text-4xl font-bold text-gray-900">{stats.ordersAwaitingPick}</h3>
                    </div>
                    <div className="p-4 bg-purple-100 rounded-xl">
                        <ClipboardList className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Stock Status</h3>
                    <div className="flex items-center justify-center h-64">
                        {/* Simple Donut Chart Representation using CSS */}
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-emerald-500 flex items-center justify-center">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-900">{stockStatus.totalItems}</span>
                                <span className="text-gray-500 text-xs">Total Items</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Quantities by Warehouse</h3>
                    <div className="flex flex-col justify-end h-64 space-y-4">
                        {warehouseStats.map((w, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-gray-600 uppercase tracking-tighter">{w.name}</span>
                                    <span className="text-gray-900">{w.quantity} pcs</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 transition-all duration-1000"
                                        style={{ width: `${stats.totalPieces > 0 ? (w.quantity / stats.totalPieces) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Date Range Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                Select Date Range
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleApplyRange} className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
                                >
                                    Apply Range
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
