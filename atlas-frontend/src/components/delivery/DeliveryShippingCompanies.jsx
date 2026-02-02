import React from 'react';
import { ArrowLeft, Plus, Filter, Building2, CheckSquare } from 'lucide-react';

export function DeliveryShippingCompanies({ onNavigate }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-green-600">Shipping Companies</h1>
                        <p className="text-sm text-gray-500">Manage shipping companies and their statistics</p>
                    </div>
                </div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>

            {/* Add New Company Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Add New Shipping Company</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Arabic)</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Base Cost</label>
                            <input type="text" defaultValue="10.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex items-center h-full pt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className="w-5 h-5 bg-orange-500 text-white rounded flex items-center justify-center">
                                    <CheckSquare className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Company
                    </button>
                </div>
            </div>

            {/* Companies List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Shipping Companies List</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-yellow-200 text-gray-700 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-3">Company Name</th>
                                <th className="px-6 py-3">Total Orders</th>
                                <th className="px-6 py-3">Completed</th>
                                <th className="px-6 py-3">Completion Rate</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">Default Delivery Company</div>
                                    <div className="text-xs text-gray-500">شركة التوصيل الافتراضية</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-blue-600">0</td>
                                <td className="px-6 py-4 font-medium text-green-600">0</td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-0"></div>
                                    </div>
                                    <span className="text-xs text-gray-600">0.0%</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1">
                                        <Filter className="w-3 h-3" /> Filter
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
