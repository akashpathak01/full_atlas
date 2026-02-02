
import React from 'react';
import { adminInventoryData, adminInventoryStats } from '../../data/adminDummyData';
import { Search, AlertTriangle, Package, Warehouse, DollarSign, RefreshCw, Plus, ArrowRight, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminInventoryPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inventory and Warehouse</h1>
                    <p className="text-sm text-gray-600 mt-1">Monitor and manage your product inventory efficiently</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/inventory')}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        <Warehouse className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/products/add')}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </button>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Package className="w-4 h-4 mr-2" />
                        View All Products
                    </button>
                </div>
            </div>

            {/* Inventory Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Products</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">{adminInventoryStats.totalItems}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <button onClick={() => navigate('/admin/products')} className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                        View details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Low Stock Items</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">{adminInventoryStats.lowStock}</h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <button className="text-red-600 text-sm font-medium hover:text-red-700 flex items-center">
                        View details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Warehouses</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">4</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl">
                            <Warehouse className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <button onClick={() => navigate('/admin/inventory/warehouses')} className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center">
                        View details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                    <p className="text-sm text-gray-500 mt-1">Common inventory management tasks</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button
                        onClick={() => navigate('/admin/products/add')}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                    >
                        <div className="p-2 bg-blue-50 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                            <Plus className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Add Product</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Create new product</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/products')}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                    >
                        <div className="p-2 bg-green-50 rounded-lg mr-4 group-hover:bg-green-100 transition-colors">
                            <Package className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">View Products</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Browse all products</p>
                        </div>
                    </button>

                    <button className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                        <div className="p-2 bg-purple-50 rounded-lg mr-4 group-hover:bg-purple-100 transition-colors">
                            <Truck className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Inventory Movements</h3>
                            <p className="text-xs text-gray-500 mt-0.5">View stock movements</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/inventory/warehouses')}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                    >
                        <div className="p-2 bg-orange-50 rounded-lg mr-4 group-hover:bg-orange-100 transition-colors">
                            <Warehouse className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Warehouses</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Manage warehouses</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
