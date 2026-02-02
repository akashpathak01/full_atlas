import React from 'react';
import { Truck, CheckCircle, XCircle, Clock, AlertCircle, RotateCcw, List, Users, Play } from 'lucide-react';

export function DeliveryDashboard({ onNavigate }) {
    // Mock data for dashboard
    const stats = [
        { label: 'Total Orders', value: '0', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Completed', value: '0', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Cancelled', value: '0', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
        { label: 'Pending', value: '0', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { label: 'Pending Confirmations', value: '0', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                        <Truck className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Delivery Manager Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage and track delivery orders</p>
                    </div>
                </div>

                {/* Top Action Buttons */}
                <div className="flex flex-wrap gap-2 justify-end">
                    <button
                        onClick={() => onNavigate('all-orders')}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <List className="w-4 h-4" /> All Orders
                    </button>
                    <button
                        onClick={() => onNavigate('pending-confirmations')}
                        className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 flex items-center gap-2"
                    >
                        <AlertCircle className="w-4 h-4" /> Pending Confirmations
                    </button>
                    <button
                        onClick={() => onNavigate('shipping-companies')}
                        className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                        <Users className="w-4 h-4" /> Shipping Companies
                    </button>
                    <button
                        onClick={() => onNavigate('returned-orders')}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Returned Orders
                    </button>
                    <button
                        onClick={() => onNavigate('process-returns')}
                        className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 flex items-center gap-2"
                    >
                        <Play className="w-4 h-4" /> Process Returns
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Orders by Shipping Company */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Orders by Shipping Company</h2>
                </div>
                <div className="p-6">
                    <div className="bg-white border border-gray-100 rounded-lg p-4 max-w-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900">Default Delivery Company</h3>
                            <button className="text-blue-600 text-xs font-medium flex items-center gap-1">
                                <List className="w-3 h-3" /> Filter
                            </button>
                        </div>
                        <div className="text-sm text-gray-600">Total Orders: <span className="font-semibold">0</span></div>
                        <div className="text-sm text-green-600">Completed: <span className="font-semibold">0</span></div>
                    </div>
                </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 bg-white">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Quick Access</h2>
                </div>
                <div className="p-6 flex flex-wrap gap-4">
                    <button
                        onClick={() => onNavigate('pending-confirmations')}
                        className="px-4 py-2 bg-orange-100 text-orange-800 font-medium rounded-lg hover:bg-orange-200 flex items-center gap-2"
                    >
                        <AlertCircle className="w-4 h-4" /> Pending Confirmations (0)
                    </button>
                    <button
                        onClick={() => onNavigate('returned-orders')}
                        className="px-4 py-2 bg-red-100 text-red-800 font-medium rounded-lg hover:bg-red-200 flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Returned Orders (0)
                    </button>
                    <button
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 font-medium rounded-lg hover:bg-yellow-200 flex items-center gap-2"
                    >
                        <AlertCircle className="w-4 h-4" /> Unchecked Returns (0)
                    </button>
                    <button
                        onClick={() => onNavigate('process-returns')}
                        className="px-4 py-2 bg-orange-100 text-orange-800 font-medium rounded-lg hover:bg-orange-200 flex items-center gap-2"
                    >
                        <List className="w-4 h-4" /> Process Returns
                    </button>
                    <button
                        onClick={() => onNavigate('all-orders')}
                        className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg hover:bg-blue-200 flex items-center gap-2"
                    >
                        <List className="w-4 h-4" /> Assign New Orders
                    </button>
                    <button
                        onClick={() => onNavigate('all-orders')}
                        className="px-4 py-2 bg-green-100 text-green-800 font-medium rounded-lg hover:bg-green-200 flex items-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4" /> Update Order Statuses
                    </button>
                </div>
            </div>
        </div>
    );
}
