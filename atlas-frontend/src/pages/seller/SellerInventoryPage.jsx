import React, { useState } from 'react';
import { sellerInventoryData } from '../../data/sellerDummyData';
import { Warehouse, Plus, Upload, Home, Search, AlertTriangle, XCircle, Package, Edit, Trash2, Eye, X, Save, Download, LayoutDashboard, DollarSign, BarChart3, TrendingUp, ArrowLeft, PlusCircle, Info, Globe, ChevronDown, Image as ImageIcon, Link, FileText } from 'lucide-react';

export function SellerInventoryPage() {
    const [view, setView] = useState('list'); // 'list' or 'add'
    const [inventory, setInventory] = useState(sellerInventoryData);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showDashboardModal, setShowDashboardModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleView = (item) => {
        setSelectedItem(item);
        setShowViewModal(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setInventory(inventory.filter(i => i.sku !== selectedItem.sku));
        setShowDeleteModal(false);
        alert('Product deleted successfully!');
    };

    // Local State for Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [warehouseFilter, setWarehouseFilter] = useState('All Warehouses');
    const [stockLevelFilter, setStockLevelFilter] = useState('All Levels');

    // Derived state for filtered inventory
    const filteredInventory = inventory.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesWarehouse = warehouseFilter === 'All Warehouses' || item.warehouse === warehouseFilter;

        const matchesStock = stockLevelFilter === 'All Levels' ||
            (stockLevelFilter === 'Low Stock' && item.stock < 20) || // Example logic
            (stockLevelFilter === 'In Stock' && item.stock >= 20) ||
            (stockLevelFilter === 'Out of Stock' && item.stock === 0) ||
            (item.stockStatus === stockLevelFilter); // Allow matching by explicit status string if present

        return matchesSearch && matchesWarehouse && matchesStock;
    });

    // Unique warehouses for dropdown
    const uniqueWarehouses = [...new Set(sellerInventoryData.map(item => item.warehouse))];

    if (view === 'add') {
        return (
            <div className="space-y-6 pb-20 animate-in fade-in duration-500">
                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <PlusCircle className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Add New Product</h1>
                            <p className="text-xs text-gray-500">Fill in the details below to add a new product to your inventory</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setView('list')}
                            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Products
                        </button>
                        <button
                            onClick={() => setShowDashboardModal(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold transition-all active:scale-95 shadow-sm"
                        >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                        </button>
                    </div>
                </div>

                {/* Main Form container */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl max-w-5xl mx-auto overflow-hidden">
                    <div className="p-8 space-y-8">
                        {/* Section Title */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Product Information</h3>
                            <p className="text-sm text-gray-500">Enter the product details below</p>
                        </div>

                        {/* Info Alert */}
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-4">
                            <div className="bg-blue-500 rounded-full p-1 h-fit mt-1">
                                <Info className="w-3 h-3 text-white" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-blue-700 font-bold leading-relaxed flex items-center gap-2">
                                    <span dir="rtl" className="font-arabic">يمكن للسيلر اضافة منتج حتى وان لايوجد أي وير هاوس متاح. سيتم مراجعة المنتج من قبل الادمن وتعيينه لمستودع عند الموافقة.</span>
                                </p>
                                <p className="text-xs text-blue-600/80 font-medium">
                                    Note: The seller can add a product even if no warehouse is available. Your product will be reviewed by admin and assigned to a warehouse upon approval.
                                </p>
                            </div>
                        </div>

                        {/* Form Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            {/* Product Name (English) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name (English) <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter product name in English"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium"
                                />
                            </div>

                            {/* Product Name (Arabic) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name (Arabic)</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    placeholder="Enter product name in Arabic"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium font-arabic"
                                />
                            </div>

                            {/* Product Code */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Code</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Auto-generated"
                                        className="w-full px-5 py-3.5 bg-gray-100 border border-gray-200 rounded-2xl text-gray-400 font-bold cursor-not-allowed"
                                    />
                                    <p className="text-[10px] text-gray-400 ml-1 font-medium">Product code will be generated automatically</p>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <div className="relative">
                                    <select className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 appearance-none font-medium text-gray-500 cursor-pointer transition-all">
                                        <option>Select category</option>
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Home Decor</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Pricing Section (3 columns on md) */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Purchase Price (AED)</label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Selling Price (AED) <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Profit Margin (%)</label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                            </div>

                            {/* Stock & Link */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Link <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                                        <Link className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/product"
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium underline decoration-orange-200 underline-offset-4"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <div className="relative group">
                                    <div className="absolute top-4 left-4 text-gray-400 group-focus-within:text-orange-500">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <textarea
                                        rows="4"
                                        placeholder="Enter product description"
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Variants */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Variants</label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="e.g., Red Large"
                                            className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium"
                                        />
                                        <button className="bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-90">
                                            <Plus className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-400 ml-1 font-medium leading-relaxed">
                                        Add multiple variants separated by commas or use the + button to add more fields
                                    </p>
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/30 hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all cursor-pointer group">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100 group-hover:scale-110 group-hover:bg-orange-50 transition-all">
                                        <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-orange-500" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">
                                        <span className="text-orange-600">Upload a file</span> or drag and drop
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-black">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-50">
                            <button
                                onClick={() => setView('list')}
                                className="px-8 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl text-sm font-black transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { alert('Product Added!'); setView('list'); }}
                                className="px-10 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-sm font-black transition-all active:scale-95 shadow-xl shadow-orange-500/30"
                            >
                                + Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Sellers</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Inventory</span>
            </div>

            {/* Header & Actions */}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <Warehouse className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Inventory Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your product inventory and stock levels</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Add Product hidden for Seller as per architectural rules */}
                    <button
                        onClick={() => setShowExportModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                    <button
                        onClick={() => setShowDashboardModal(true)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-1">Search & Filters</h3>
                <p className="text-sm text-gray-500 mb-6">Find and filter inventory items quickly</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Inventory</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, SKU, etc."
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                        <select
                            value={warehouseFilter}
                            onChange={(e) => setWarehouseFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-orange-500"
                        >
                            <option value="All Warehouses">All Warehouses</option>
                            {uniqueWarehouses.map(wh => (
                                <option key={wh} value={wh}>{wh}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
                        <select
                            value={stockLevelFilter}
                            onChange={(e) => setStockLevelFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-orange-500"
                        >
                            <option value="All Levels">All Levels</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                // Reset filters if needed, or just let them stay applied reactively.
                                // If "Apply Filters" implies a manual step, we would separate state.
                                // For now, let's treat it as a "Clear Filters" or just a confirmation.
                                // Actually, user asked for "proper filter", usually implies they work.
                                // Let's make this button CLEAR filters for better UX since filtering is live.
                                setSearchQuery('');
                                setWarehouseFilter('All Warehouses');
                                setStockLevelFilter('All Levels');
                            }}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg mr-4">
                        <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Total Items</p>
                        <h3 className="text-2xl font-bold text-gray-900">31</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Low Stock</p>
                        <h3 className="text-2xl font-bold text-gray-900">0</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-red-100 rounded-lg mr-4">
                        <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                        <h3 className="text-2xl font-bold text-gray-900">0</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                        <Warehouse className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Warehouses</p>
                        <h3 className="text-2xl font-bold text-gray-900">1</h3>
                    </div>
                </div>
            </div>

            {/* Inventory List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Inventory List</h3>
                        <p className="text-sm text-gray-500">Manage and monitor your inventory</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Total Products</p>
                        <p className="text-xl font-bold text-orange-600">{filteredInventory.length}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-yellow-100/50">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-700">Product</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">SKU</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Price</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Stock Level</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Warehouse</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Last Updated</th>
                                <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInventory.length > 0 ? (
                                filteredInventory.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center mr-3 text-gray-500">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.model}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{item.sku}</span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.stock}</span>
                                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">{item.stockStatus}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{item.warehouse}</td>
                                        <td className="px-6 py-4 text-gray-500">{item.lastUpdated}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleView(item)}
                                                    className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {/* Edit and Delete hidden for Seller */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                                        <div className="flex flex-col items-center">
                                            <Package className="w-12 h-12 text-gray-300 mb-2 opacity-50" />
                                            <p className="font-medium">Inventory is empty</p>
                                            <p className="text-sm mt-1">Add your first product to get started.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Modal */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                    <Download className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Export Inventory</h2>
                            </div>
                            <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Choose Format</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 border-2 border-indigo-600 bg-indigo-50 rounded-xl text-left transition-all">
                                        <p className="font-bold text-indigo-700 uppercase">Excel Spreadsheet</p>
                                        <p className="text-xs text-indigo-500 mt-1">Detailed inventory report (.xlsx)</p>
                                    </button>
                                    <button className="p-4 border-2 border-gray-100 hover:border-indigo-200 rounded-xl text-left transition-all group">
                                        <p className="font-bold text-gray-700 uppercase group-hover:text-indigo-600">CSV File</p>
                                        <p className="text-xs text-gray-500 mt-1">Generic data format (.csv)</p>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 border-gray-300 rounded mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Include Stock Analytics</p>
                                        <p className="text-[10px] text-gray-500">Historical stock trends for each Item</p>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 border-gray-300 rounded mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Detailed Warehouse Logs</p>
                                        <p className="text-[10px] text-gray-500">Last 30 days of movement logs</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowExportModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-all active:scale-95">Cancel</button>
                            <button onClick={() => { alert('Inventory report generated!'); setShowExportModal(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all active:scale-95 shadow-sm">Generate Report</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Modal */}
            {showDashboardModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-yellow-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                                    <BarChart3 className="w-5 h-5 text-yellow-700" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Inventory Dashboard</h2>
                            </div>
                            <button onClick={() => setShowDashboardModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                    <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Inv. Value</p>
                                    <h3 className="text-2xl font-black text-green-700">12.5k</h3>
                                    <div className="flex items-center mt-2 text-[10px] text-green-500 font-bold">
                                        <TrendingUp className="w-3 h-3 mr-1" /> +3%
                                    </div>
                                </div>
                                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Turnover</p>
                                    <h3 className="text-2xl font-black text-orange-700">4.2x</h3>
                                    <p className="mt-2 text-[10px] text-orange-500 font-bold italic">Healthy Rate</p>
                                </div>
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">New SKUs</p>
                                    <h3 className="text-2xl font-black text-blue-700">12</h3>
                                    <p className="mt-2 text-[10px] text-blue-500 font-bold italic">This Month</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-700">Category Distribution</h4>
                                {[
                                    { label: 'Electronics', val: '65', color: 'bg-orange-500' },
                                    { label: 'Fashion', val: '20', color: 'bg-blue-500' },
                                    { label: 'Home Appliances', val: '15', color: 'bg-green-500' }
                                ].map(cat => (
                                    <div key={cat.label}>
                                        <div className="flex justify-between text-xs mb-1 font-bold text-gray-500 uppercase">
                                            <span>{cat.label}</span>
                                            <span>{cat.val}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className={`${cat.color} h - full rounded - full transition - all duration - 1000`} style={{ width: `${cat.val}% ` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => setShowDashboardModal(false)} className="px-8 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-all active:scale-95 shadow-sm shadow-yellow-100 border-b-2 border-yellow-800">Close Analytics</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-orange-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg mr-3"><Eye className="w-5 h-5 text-orange-600" /></div>
                                <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-start">
                                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mr-6 border border-gray-200 shrink-0 text-gray-400">
                                    <Package className="w-10 h-10" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-gray-900 leading-none">{selectedItem.name}</p>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">{selectedItem.sku}</p>
                                    <p className="text-xl font-bold text-orange-600 mt-2">{selectedItem.price}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Current Stock</p>
                                    <p className="text-2xl font-black text-blue-700 tracking-tighter">{selectedItem.stock} <span className="text-xs uppercase ml-1">Units</span></p>
                                </div>
                                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                                    <p className="text-[10px] font-black text-green-400 uppercase mb-1">Warehouse</p>
                                    <p className="text-sm font-bold text-green-700 leading-tight">{selectedItem.warehouse}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Other Information</p>
                                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Model Ref</span>
                                    <span className="font-medium text-gray-900">{selectedItem.model}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Last Replenishment</span>
                                    <span className="font-medium text-gray-900">{selectedItem.lastUpdated}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => setShowViewModal(false)} className="px-10 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:shadow-lg active:scale-95 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg mr-3"><Edit className="w-5 h-5 text-blue-600" /></div>
                                <h2 className="text-xl font-bold text-gray-800">Edit Inventory Item</h2>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm"><X className="w-5 h-5" /></button>
                        </div>
                        <form className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                                <input type="text" defaultValue={selectedItem.name} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Stock Level</label>
                                    <input type="number" defaultValue={selectedItem.stock} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-black text-blue-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Sale Price</label>
                                    <input type="text" defaultValue={selectedItem.price} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Warehouse Transfer</label>
                                <select defaultValue={selectedItem.warehouse} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none">
                                    <option>Dubai Warehouse A</option>
                                    <option>Abu Dhabi Logistics Hub</option>
                                    <option>Sharjah Main Depot</option>
                                </select>
                            </div>
                        </form>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowEditModal(false)} className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-white transition-all">Discard</button>
                            <button onClick={() => { alert('Inventory updated!'); setShowEditModal(false); }} className="px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg flex items-center border-b-2 border-blue-800"><Save className="w-4 h-4 mr-2" /> Update Stock</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 text-center px-12">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-10 h-10 text-red-600 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-800 mb-2">Delete Item?</h2>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                Are you sure you want to remove <span className="font-black text-gray-800">{selectedItem.name}</span> from inventory? This will clear all stock history.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                                <button onClick={confirmDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-xl shadow-red-100 active:scale-95 transition-all">Confirm Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
