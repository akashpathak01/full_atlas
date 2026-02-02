import React, { useState } from 'react';
import { Home, Truck, Search, Box, X, Check, Scan, Layout, Filter, Settings, Ghost } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DeliveryOrdersPage() {
    const navigate = useNavigate();

    // States
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-gray-400 gap-2 mb-2">
                <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Home</span>
                </div>
                <span>&gt;</span>
                <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span className="font-medium">Delivery</span>
                </div>
                <span>&gt;</span>
                <span className="text-gray-500 font-medium">Orders</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500 rounded-xl">
                        <Truck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">Delivery Orders</h1>
                        <p className="text-sm text-gray-500">Manage orders ready for delivery or in transit.</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/delivery/dashboard')}
                    className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 shadow-sm transition-all active:scale-95 text-sm"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                            <Box className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Ready for Delivery</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">0</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-yellow-50 rounded-xl">
                            <Truck className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">In Delivery</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">0</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-green-50 rounded-xl">
                            <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Delivered</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">0</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-28 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-red-50 rounded-xl">
                            <X className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Failed Deliveries</p>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">0</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barcode Section */}
            <div className="bg-[#EFF6FF] p-6 rounded-xl border border-blue-100 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <Scan className="w-8 h-8 text-blue-500" />
                    <div>
                        <h3 className="text-lg font-bold text-blue-900">Scan Order Barcode</h3>
                        <p className="text-sm text-blue-600">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsScannerOpen(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md transition-all active:scale-95 text-sm"
                >
                    <Scan className="w-4 h-4" /> Open Scanner
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <label className="text-xs font-bold text-gray-800 mb-2 block">Search</label>
                        <input
                            type="text"
                            placeholder="Order Code, Customer, Phone..."
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-gray-300 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-800 mb-2 block">Status</label>
                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                            <option>All Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-800 mb-2 block">Date Filter</label>
                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                            <option>All Dates</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95 text-sm">
                        <Search className="w-4 h-4" /> Apply Filters
                    </button>
                    <button className="px-8 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-all active:scale-95 text-sm">
                        <X className="w-4 h-4 text-red-500" /> Clear Filters
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <Layout className="w-5 h-5 text-blue-600" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Orders List</h3>
                        <p className="text-xs font-bold text-gray-400">Showing 0-0 of 0 orders</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-24 bg-gray-50/20">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50 mb-6 group hover:scale-110 transition-transform">
                        <Truck className="w-10 h-10 text-gray-200 group-hover:text-blue-200 transition-colors" />
                    </div>
                    <p className="text-gray-400 font-bold text-sm tracking-widest uppercase opacity-40">No activity data available</p>
                </div>
            </div>

            {/* Scanner Modal Simulation */}
            {isScannerOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-xl text-gray-900 tracking-tight">Scanner</h3>
                            <button onClick={() => setIsScannerOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="aspect-square bg-black rounded-3xl mb-6 relative overflow-hidden group">
                            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-bounce"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs font-bold uppercase tracking-widest">Awaiting Barcode...</div>
                        </div>
                        <button
                            onClick={() => setIsScannerOpen(false)}
                            className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg"
                        >
                            Close Scanner
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
