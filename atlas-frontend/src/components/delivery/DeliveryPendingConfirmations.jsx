import React from 'react';
import { ArrowLeft, ScanLine, Clock, Search, RotateCcw } from 'lucide-react';

export function DeliveryPendingConfirmations({ onNavigate }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-600">Pending Delivery Confirmations</h1>
                        <p className="text-sm text-gray-500">Review and confirm deliveries submitted by agents</p>
                    </div>
                </div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>

            {/* Scan Barcode */}
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ScanLine className="w-8 h-8 text-orange-600" />
                    <div>
                        <h3 className="font-bold text-orange-900">Scan Order Barcode</h3>
                        <p className="text-sm text-orange-700">Use barcode scanner to quickly find orders</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 flex items-center gap-2">
                    <ScanLine className="w-4 h-4" /> Open Scanner
                </button>
            </div>

            {/* Stats Card */}
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl inline-block min-w-[300px]">
                <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-gray-600">Pending Confirmations</span>
                </div>
                <h2 className="text-3xl font-bold text-orange-600">0</h2>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Search</label>
                        <input type="text" placeholder="Order Code/Customer/Phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Delivery Agent</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Agents</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Date Filter</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Dates</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
                            <Search className="w-4 h-4" /> Search
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Pending List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Pending Confirmations</h3>
                </div>
                <div className="p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">No pending confirmations</h3>
                    <p className="text-gray-500 text-sm">All deliveries have been confirmed or there are no deliveries pending confirmation.</p>
                </div>
            </div>
        </div>
    );
}

// Helper icons
function CheckCircle({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    );
}
