
import React from 'react';
import { Package, AlertTriangle, DollarSign, CheckCircle, Plus, FileText, LayoutGrid, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PackagingMaterialsManagement() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
            </div>

            {/* Header / Back Button */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/packaging/dashboard')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="p-4 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                        <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-gray-900 leading-none">0</span>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Materials</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="p-4 bg-yellow-50 rounded-xl group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-gray-900 leading-none">0</span>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Low Stock Alerts</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="p-4 bg-green-50 rounded-xl group-hover:scale-110 transition-transform">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-gray-900 leading-none">$0.00</span>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Inventory Value</p>
                    </div>
                </div>
            </div>

            {/* Low Stock & Out of Stock Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[300px]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-lg font-black text-gray-800 tracking-tight">Low Stock Alerts</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">0 items</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-gray-400 text-sm font-bold italic tracking-tight">No low stock alerts at the moment.</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[300px]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-lg font-black text-gray-800 tracking-tight">Out of Stock</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">0 items</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-gray-400 text-sm font-bold italic tracking-tight">All materials are in stock.</p>
                    </div>
                </div>
            </div>

            {/* Most Used Materials Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-gray-800 tracking-tight mb-10">Most Used Materials</h3>
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group hover:scale-110 transition-transform">
                        <Package className="w-10 h-10 text-gray-200" />
                    </div>
                    <p className="text-gray-400 text-sm font-bold italic tracking-tight uppercase tracking-widest opacity-50">No material usage data available.</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-gray-800 tracking-tight mb-8">Quick Actions</h3>
                <div className="flex flex-wrap justify-end gap-4 mt-4">
                    <button
                        onClick={() => navigate('/packaging/materials')}
                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 text-sm"
                    >
                        <LayoutGrid className="w-4 h-4" /> View All Materials
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-md active:scale-95 text-sm">
                        <Plus className="w-4 h-4" /> Add Material
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition-all shadow-md active:scale-95 text-sm">
                        <FileText className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>
        </div>
    );
}

