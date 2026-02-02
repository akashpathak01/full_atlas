
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShoppingCart, Clock, CheckCircle, DollarSign, Filter, Search, RotateCcw, Download, Printer, RefreshCw, Plus, Scan } from 'lucide-react';

export function AdminCreateInvoicePage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <ShoppingCart className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-600">Billing and Invoicing</h1>
                        <p className="text-sm text-gray-600">Manage orders, generate invoices, and track financial transactions</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/finance')}
                        className="flex items-center px-4 py-2 bg-[#4b5563] text-white rounded-lg hover:bg-[#374151] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Finance
                    </button>
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Order
                    </button>
                </div>
            </div>

            {/* Scanner Bar */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Scan className="w-6 h-6 text-blue-600" />
                    <div>
                        <h3 className="font-bold text-blue-900 text-sm">Scan Order Barcode</h3>
                        <p className="text-xs text-blue-700">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <Scan className="w-4 h-4 mr-2" />
                    Open Scanner
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-blue-600 font-bold uppercase">Total Orders</p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-1">0</h3>
                    </div>
                    <div className="p-2 bg-blue-200 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-blue-700" />
                    </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-orange-600 font-bold uppercase">Pending Orders</p>
                        <h3 className="text-2xl font-bold text-orange-900 mt-1">0</h3>
                    </div>
                    <div className="p-2 bg-orange-200 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-700" />
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-green-600 font-bold uppercase">Completed Orders</p>
                        <h3 className="text-2xl font-bold text-green-900 mt-1">0</h3>
                    </div>
                    <div className="p-2 bg-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-700" />
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-purple-600 font-bold uppercase">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-purple-900 mt-1">AED 0</h3>
                    </div>
                    <div className="p-2 bg-purple-200 rounded-lg">
                        <DollarSign className="w-5 h-5 text-purple-700" />
                    </div>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="space-y-3">
                <div className="bg-[#E15B2D] text-white px-4 py-2 rounded-t-lg font-bold flex items-center gap-2 w-full">
                    <Filter className="w-4 h-4" />
                    Quick Filters
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-[#E15B2D] text-white rounded-md text-sm font-medium">All Orders (0)</button>
                    <button className="px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Pending (0)</button>
                    <button className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed (0)</button>
                    <button className="px-4 py-1.5 bg-purple-100 text-purple-800 rounded-md text-sm font-medium flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Processing (0)</button>
                    <button className="px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-md text-sm font-medium flex items-center gap-1">Packaged (0)</button>
                    <button className="px-4 py-1.5 bg-teal-100 text-teal-800 rounded-md text-sm font-medium flex items-center gap-1">Shipped (0)</button>
                    <button className="px-4 py-1.5 bg-green-100 text-green-800 rounded-md text-sm font-medium flex items-center gap-1">Delivered (0)</button>
                    <button className="px-4 py-1.5 bg-red-100 text-red-800 rounded-md text-sm font-medium flex items-center gap-1">Cancelled (0)</button>
                    <button className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm font-medium flex items-center gap-1">Postponed (0)</button>
                    <button className="px-4 py-1.5 bg-green-100 text-green-800 rounded-md text-sm font-medium flex items-center gap-1">Paid (0)</button>
                    <button className="px-4 py-1.5 bg-orange-100 text-orange-800 rounded-md text-sm font-medium flex items-center gap-1">Payment Pending (0)</button>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                <div className="bg-[#E15B2D] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 w-full">
                    <Filter className="w-4 h-4" />
                    Advanced Filters
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search by order number, customer name, phone, product..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                        <button className="px-6 py-2 bg-[#E15B2D] text-white font-medium rounded-lg hover:bg-[#c44e26] transition-colors flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Search
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Status</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Workflow Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Dates</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Emirate</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Emirates</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Sellers</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Call Center Agent</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Agents</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range (AED)</label>
                            <input type="text" placeholder="Min Amount" className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm px-3 py-2" />
                        </div>
                        <div className="flex-1 pt-6">
                            <input type="text" placeholder="Max Amount" className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm px-3 py-2" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm">
                            <option>All Payment Statuses</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <button className="px-6 py-2 bg-[#E15B2D] text-white font-medium rounded-lg hover:bg-[#c44e26] transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Apply Filters
                    </button>
                    <button className="px-6 py-2 bg-[#4b5563] text-white font-medium rounded-lg hover:bg-[#374151] transition-colors flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div>
                <div className="bg-[#E15B2D] text-white px-6 py-3 rounded-t-xl font-bold flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Orders
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-blue-600 rounded text-sm flex items-center gap-1 hover:bg-blue-700"><Download className="w-3 h-3" /> Export Data</button>
                        <button className="px-3 py-1.5 bg-gray-600 rounded text-sm flex items-center gap-1 hover:bg-gray-700"><Printer className="w-3 h-3" /> Print</button>
                        <button className="px-3 py-1.5 bg-green-600 rounded text-sm flex items-center gap-1 hover:bg-green-700"><RefreshCw className="w-3 h-3" /> Update</button>
                    </div>
                </div>

                <div className="bg-yellow-100 border-x border-b border-gray-200 p-2 flex text-xs font-bold text-gray-600 uppercase">
                    <div className="w-1/6 pl-4">Order</div>
                    <div className="w-1/6">Customer</div>
                    <div className="w-1/6">Product</div>
                    <div className="w-1/6">Amount</div>
                    <div className="w-1/6">Status</div>
                    <div className="w-1/6">Date</div>
                    <div className="w-1/6">Actions</div>
                </div>

                <div className="bg-yellow-50 border-x border-b border-gray-200 p-12 flex flex-col items-center justify-center text-center rounded-b-xl min-h-[300px]">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
                    <p className="text-gray-500 mt-1 mb-6">Create your first order to get started</p>
                    <button className="flex items-center px-6 py-2.5 bg-[#E15B2D] text-white rounded-lg hover:bg-[#c44e26] transition-colors font-medium">
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Order
                    </button>
                </div>
            </div>

            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
