import React from 'react';
import {
    Shield,
    Package,
    Key,
    CheckCircle,
    Search,
    Filter,
    ArrowLeft,
    Settings,
    AlertCircle
} from 'lucide-react';

export function PermissionsManagement({ onBack }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-orange-600">Permissions Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage system permissions and access controls</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 font-bold rounded-lg hover:bg-gray-100 transition-all text-sm flex items-center gap-2 shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Roles
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Total Permissions</p>
                        <h4 className="text-2xl font-black text-gray-900">0</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center border border-green-100 shadow-inner">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Modules</p>
                        <h4 className="text-2xl font-black text-gray-900">0</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-100 shadow-inner">
                        <Key className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Permission Types</p>
                        <h4 className="text-2xl font-black text-gray-900">10</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100 shadow-inner">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Active Permissions</p>
                        <h4 className="text-2xl font-black text-gray-900">0</h4>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div>
                    <h3 className="font-black text-gray-900 text-lg">Search & Filter</h3>
                    <p className="text-xs text-gray-500 font-medium tracking-tight mt-0.5">Find and filter permissions by module, type, or name</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-1">
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Search Permissions</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name, code, or desc"
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Module</label>
                        <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium">
                            <option>All Modules</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Permission Type</label>
                        <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium">
                            <option>All Types</option>
                        </select>
                    </div>
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 uppercase text-xs tracking-widest">
                        <Search className="w-4 h-4" /> Apply Filters
                    </button>
                </div>
            </div>

            {/* Permissions Content */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">System Permissions</h3>
                        <p className="text-xs text-gray-500 font-medium">Manage and view all system permissions</p>
                    </div>
                    <span className="text-xs text-gray-400 font-bold tracking-tighter uppercase">Showing 0 of 0 permissions</span>
                </div>

                {/* Empty State as per Screenshot 2 */}
                <div className="p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center mb-6 ring-8 ring-gray-50">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">No permissions found</h4>
                    <p className="text-gray-500 text-sm font-medium mb-8 max-w-xs">Try adjusting your search or filter criteria to find the permissions you're looking for.</p>
                    <button className="px-10 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 uppercase text-xs tracking-widest">
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
