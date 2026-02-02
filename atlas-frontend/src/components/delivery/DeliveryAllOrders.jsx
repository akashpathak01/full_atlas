import React from 'react';
import { ArrowLeft, ScanLine, Search, Filter } from 'lucide-react';

export function DeliveryAllOrders({ onNavigate }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">All Orders</h1>
                    <p className="text-sm text-gray-500">Filter and view all orders</p>
                </div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>

            {/* Scan Barcode */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ScanLine className="w-8 h-8 text-blue-600" />
                    <div>
                        <h3 className="font-bold text-blue-900">Scan Order Barcode</h3>
                        <p className="text-sm text-blue-700">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <ScanLine className="w-4 h-4" /> Open Scanner
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-900">Search Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Shipping Company</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Companies</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Location</label>
                        <input type="text" placeholder="City/Emirate/Area" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Seller</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Sellers</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Min Price</label>
                        <input type="text" placeholder="AED" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Max Price</label>
                        <input type="text" placeholder="AED" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Min Quantity</label>
                        <input type="text" placeholder="Quantity" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Max Quantity</label>
                        <input type="text" placeholder="Quantity" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Order Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Types</option>
                        </select>
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Search</label>
                        <input type="text" placeholder="Order Code/Customer/Phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Search
                    </button>
                    <button className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Reset
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Orders</h3>
                </div>
                <div className="overflow-x-auto min-h-[200px]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-yellow-200 text-gray-800 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-4 py-3">Order Code</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Workflow</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Qty</th>
                                <th className="px-4 py-3">Products</th>
                                <th className="px-4 py-3">Seller</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Shipping Co.</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden max-w-md">
                        <div className="h-full bg-gray-300 w-1/3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
