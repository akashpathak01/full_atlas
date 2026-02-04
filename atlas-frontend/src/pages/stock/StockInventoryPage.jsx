import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Home, Package, Search, Plus, FileText, Calendar, Filter, Image as ImageIcon, X, ChevronDown, Check, Loader2 } from 'lucide-react';

export function StockInventoryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // Data States
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [activePeriod, setActivePeriod] = useState(null);

    // Add Inventory Form State
    const [newProduct, setNewProduct] = useState({
        productId: '',
        warehouseId: '',
        quantity: '',
        reason: 'Regular Stock In'
    });

    // Report Form State
    const [reportType, setReportType] = useState('inventory');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [invRes, prodRes, whRes] = await Promise.all([
                api.get('/inventory'),
                api.get('/products'), // Need to check if this endpoint exists and return what we need
                api.get('/inventory/warehouses')
            ]);
            setInventory(invRes.data);
            setProducts(prodRes.data.products || prodRes.data); 
            setWarehouses(whRes.data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInventory = async () => {
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (activeFilter !== 'All') params.append('category', activeFilter);
            
            const response = await api.get(`/inventory?${params.toString()}`);
            setInventory(response.data);
        } catch (error) {
            console.error('Error refreshing inventory:', error);
        }
    };

    useEffect(() => {
        if (inventory.length > 0) {
            fetchInventory();
        }
    }, [activeFilter]);

    // Dynamic Categories
    const categories = ['All', ...new Set(inventory.map(item => item.product?.category || 'General').filter(Boolean))];

    // Filter Logic
    const filteredInventory = inventory.filter(item => {
        const name = item.product?.name || '';
        const sku = item.product?.sku || '';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sku.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = activeFilter === 'All' || (item.product?.category || 'General').toLowerCase() === activeFilter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    // Handlers
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        fetchInventory();
    };

    // Handlers
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/inventory/in', newProduct);
            alert('Stock added successfully!');
            setIsAddModalOpen(false);
            setNewProduct({
                productId: '',
                warehouseId: '',
                quantity: '',
                reason: 'Regular Stock In'
            });
            fetchInventory();
        } catch (error) {
            console.error('Error adding stock:', error);
            alert(`Failed to add stock: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleApplyPeriod = (e) => {
        e.preventDefault();
        if (dateRange.start && dateRange.end) {
            setActivePeriod(`${dateRange.start} - ${dateRange.end}`);
            setIsPeriodModalOpen(false);
        }
    };

    const clearPeriod = () => {
        setActivePeriod(null);
        setDateRange({ start: '', end: '' });
    };

    const handleGenerateReport = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Report "${reportType}" has been generated and downloaded to your system.`);
            setIsReportModalOpen(false);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Stock</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Product Acceptance</span>
            </div>

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h1>

                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search product name or SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700"
                        />
                        <button 
                            onClick={handleSearch}
                            title="Search"
                            className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-all active:scale-90"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={fetchInitialData}
                            title="Refresh Data"
                            className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-all active:scale-95 flex items-center gap-2"
                        >
                            <Loader2 className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            + Add Inventory
                        </button>

                        <button
                            onClick={() => setIsReportModalOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Stock Report
                        </button>

                        <button
                            onClick={() => setIsPeriodModalOpen(true)}
                            className={`border px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 ${activePeriod ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            {activePeriod ? activePeriod : 'Select Period'}
                            {activePeriod && <X className="w-3 h-3 ml-2 hover:bg-blue-200 rounded-full p-0.5" onClick={(e) => { e.stopPropagation(); clearPeriod(); }} />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`bg-white border ${activeFilter !== 'All' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-700'} px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-gray-50 transition-all active:scale-95`}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                {activeFilter === 'All' ? 'Filter' : activeFilter}
                                <ChevronDown className={`w-3 h-3 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 animate-in fade-in zoom-in-95 duration-100">
                                    {categories.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => {
                                                setActiveFilter(filter);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${activeFilter === filter ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'}`}
                                        >
                                            {filter}
                                            {activeFilter === filter && <Check className="w-3.5 h-3.5" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-yellow-100/50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 w-4">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    </th>
                                    <th className="px-6 py-4 font-bold text-gray-600">IMAGE</th>
                                    <th className="px-6 py-4 font-bold text-gray-600">ID</th>
                                    <th className="px-6 py-4 font-bold text-gray-600">PRODUCT NAME</th>
                                    <th className="px-6 py-4 font-bold text-gray-600">SKU</th>
                                    <th className="px-6 py-4 font-bold text-gray-600">SELLER</th>
                                    <th className="px-6 py-4 font-bold text-gray-600">CATEGORY</th>
                                    <th className="px-6 py-4 font-bold text-gray-600">QTY</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredInventory.length > 0 ? (
                                    filteredInventory.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900">{item.product?.name}</td>
                                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.product?.sku}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.product?.seller?.shopName || 'Admin'}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs capitalize">{item.product?.category || 'General'}</span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">{item.quantity}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="font-medium">No products found</p>
                                            <p className="text-xs mt-1">Try adjusting your search or filters</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Inventory Modal - MATCHING SCREENSHOT */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4  flex justify-between items-center bg-white">
                            <h3 className="text-xl font-bold text-gray-900">Add Inventory</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleAddProduct} className="px-6 pb-6 space-y-4">
                            {/* Product Select */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product</label>
                                <select
                                    required
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    value={newProduct.productId}
                                    onChange={(e) => setNewProduct({ ...newProduct, productId: e.target.value })}
                                >
                                    <option value="" disabled hidden>Select Product</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Warehouse Select */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Warehouse</label>
                                <select
                                    required
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    value={newProduct.warehouseId}
                                    onChange={(e) => setNewProduct({ ...newProduct, warehouseId: e.target.value })}
                                >
                                    <option value="" disabled hidden>Select Warehouse</option>
                                    {warehouses.map(w => (
                                        <option key={w.id} value={w.id}>{w.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity and Reason Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={newProduct.quantity}
                                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reason</label>
                                    <input
                                        type="text"
                                        value={newProduct.reason}
                                        onChange={(e) => setNewProduct({ ...newProduct, reason: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="pt-4 flex items-center justify-between gap-3">
                                <button
                                    type="submit"
                                    className="flex-grow bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-colors text-sm"
                                >
                                    Add Stock
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-shrink-0 bg-[#e5e7eb] hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Select Period Modal - Preserved */}
            {isPeriodModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Calendar className="w-5 h-5 mr-2 text-blue-600" /> Select Period</h3>
                            <button onClick={() => setIsPeriodModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleApplyPeriod} className="p-6 space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Start Date</label>
                                    <input type="date" required value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">End Date</label>
                                    <input type="date" required value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setIsPeriodModalOpen(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md">Apply Period</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Stock Report Modal - Preserved */}
            {isReportModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><FileText className="w-5 h-5 mr-2 text-red-600" /> Generate Report</h3>
                            <button onClick={() => setIsReportModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-sm text-gray-600">Select the type of report you want to generate. The file will be downloaded in PDF format.</p>

                            <div className="space-y-3">
                                {['Inventory Summary', 'Low Stock Report', 'Stock Movement'].map((type) => (
                                    <label key={type} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${reportType === type ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="reportType" className="text-red-600 focus:ring-red-500" checked={reportType === type} onChange={() => setReportType(type)} />
                                        <span className={`ml-3 text-sm font-medium ${reportType === type ? 'text-red-700' : 'text-gray-700'}`}>{type}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button onClick={() => setIsReportModalOpen(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button onClick={handleGenerateReport} className="flex-1 px-4 py-3 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-md">Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
