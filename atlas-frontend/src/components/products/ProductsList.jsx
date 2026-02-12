import React, { useState } from 'react';
import {
    Search, Filter, Plus, Download, Home,
    Package, Edit, Trash2, Eye, MoreVertical,
    Box, Activity, CheckCircle, AlertCircle
} from 'lucide-react';

export function ProductsList({ products = [], onAddProduct, onEdit, onDelete, onView }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('All Warehouses');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Filter logic placeholder - effectively just passing through empty array for now or filtering provided products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.code?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesWarehouse = selectedWarehouse === 'All Warehouses' || product.warehouse === selectedWarehouse;
        const matchesStatus = statusFilter === 'All Status' || product.status === statusFilter;
        return matchesSearch && matchesWarehouse && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Home className="w-4 h-4" />
                        <span>/</span>
                        <span>Sellers</span>
                        <span>/</span>
                        <span className="text-[#E15B2D] font-medium">Products</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#E15B2D]/10 rounded-lg">
                            <Package className="w-6 h-6 text-[#E15B2D]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                            <p className="text-sm text-gray-500">Manage your product inventory and stock levels</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onAddProduct}
                        className="flex items-center gap-2 bg-[#E15B2D] text-white px-4 py-2.5 rounded-lg hover:bg-[#d05026] transition-colors shadow-sm font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Add Product
                    </button>
                    <button className="flex items-center gap-2 bg-[#2d3436] text-white px-4 py-2.5 rounded-lg hover:bg-[#2d3436]/90 transition-colors shadow-sm font-medium">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 bg-[#f1c40f] text-white px-4 py-2.5 rounded-lg hover:bg-[#f39c12] transition-colors shadow-sm font-medium">
                        <Home className="w-4 h-4" />
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-4">
                    <h3 className="font-bold text-gray-800">Search & Filters</h3>
                    <p className="text-sm text-gray-500">Find and filter products quickly</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-5 space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Search Products</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, code, etc..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-3 space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Warehouse</label>
                        <select
                            value={selectedWarehouse}
                            onChange={(e) => setSelectedWarehouse(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                        >
                            <option>All Warehouses</option>
                            <option>Dubai Main</option>
                            <option>Abu Dhabi Branch</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                        >
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button className="w-full flex items-center justify-center gap-2 bg-[#E15B2D] text-white px-4 py-2.5 rounded-lg hover:bg-[#d05026] transition-colors shadow-sm font-medium">
                            <Search className="w-4 h-4" />
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="font-bold text-gray-800">Products List</h3>
                        <p className="text-xs text-gray-500">Manage and monitor your products</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Total Products: <span className="font-bold text-gray-900">{products.length}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No Products Found</h3>
                            <p className="text-gray-500 mb-6">Start by adding your first product to the inventory.</p>
                            <div className="mt-8 h-1 bg-gray-100 rounded-full w-full max-w-sm mx-auto overflow-hidden">
                                <div className="h-full bg-[#E15B2D] w-3/4 rounded-full"></div>
                            </div>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#fff8f1] border-b border-[#ffdcb4]">
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Product</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><Box className="w-3.5 h-3.5" /> Code</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1">$ Price</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> Stock Level</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Status</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Approval Status</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Warehouse</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><Box className="w-3.5 h-3.5" /> Pending Orders</div>
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#E15B2D] uppercase tracking-wider">
                                        <div className="flex items-center gap-1"><MoreVertical className="w-3.5 h-3.5" /> Actions</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                                    {product.image ? (
                                                        <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                                                    ) : (
                                                        <Package className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-500">{product.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-gray-600 font-medium bg-gray-50/50 rounded-sm">{product.sku || product.code}</td>
                                        <td className="p-4 font-bold text-gray-900">{product.price} AED</td>
                                        <td className="p-4 font-medium">{product.stock}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs font-medium text-blue-600">
                                            {product.approvalStatus}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {product.inventory && product.inventory.length > 0
                                                ? product.inventory.map(i => i.warehouse?.name).join(', ')
                                                : '-'}
                                        </td>
                                        <td className="p-4 font-bold text-gray-900">
                                            {product.pendingOrders || 0}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onView && onView(product)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onEdit && onEdit(product)}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete && onDelete(product)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
