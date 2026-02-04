import React, { useState, useEffect } from 'react';
import { Home, Search, Download, Filter, Inbox, X, Check, FileText, Sheet, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../../lib/api';

export function StockHistoryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    // Export State
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [exportFormat, setExportFormat] = useState('csv');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async (filters = {}) => {
        setLoading(true);
        try {
            const response = await api.get('/inventory/history', { params: filters });
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchHistory({ search: searchTerm, type: activeFilter });
    };

    const handleRefresh = () => {
        fetchHistory({ search: searchTerm, type: activeFilter });
    };

    const handleExportClick = () => {
        setIsExportModalOpen(true);
    };

    const confirmExport = () => {
        alert(`Exporting history log as ${exportFormat.toUpperCase()}... Download starting.`);
        setIsExportModalOpen(false);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const selectFilter = (filter) => {
        setActiveFilter(filter);
        setIsFilterOpen(false);
        fetchHistory({ search: searchTerm, type: filter });
    };

    // No longer need client-side filtering since server handles it
    const displayHistory = history;

    return (
        <div className="space-y-6 relative">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Stock</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Inventory Log</span>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Stock History</h1>
                <button 
                    onClick={handleRefresh}
                    className={`p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <svg
                        className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search history by ID, SKU, or user..."
                        className="flex-1 px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700 shadow-sm"
                    />
                    <button 
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all active:scale-95 shadow-md"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex gap-3 relative">
                    <button
                        onClick={handleExportClick}
                        className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center text-sm font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>

                    <div className="relative">
                        <button
                            onClick={toggleFilter}
                            className={`border px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm ${activeFilter !== 'All' ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            {activeFilter === 'All' ? 'Filter' : activeFilter}
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 animate-in fade-in zoom-in-95 duration-100">
                                {['All', 'Stock In', 'Stock Out'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => selectFilter(filter)}
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

            {/* History Table / Empty State */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="grid grid-cols-8 bg-yellow-100/50 border-b border-gray-100 p-4 text-xs font-bold text-gray-600 uppercase">
                    <div>Log ID</div>
                    <div className="col-span-1">Date & Time</div>
                    <div>Type</div>
                    <div>SKU</div>
                    <div className="col-span-2">Product</div>
                    <div>Quantity</div>
                    <div className="col-span-1">Warehouse</div>
                </div>
                {displayHistory.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {displayHistory.map((item) => (
                            <div key={item.id} className="grid grid-cols-8 p-4 items-center hover:bg-gray-50 transition-colors text-sm">
                                <div className="font-bold text-gray-900">#{item.id}</div>
                                <div className="text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
                                <div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.type === 'IN' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {item.type}
                                    </span>
                                </div>
                                <div className="font-mono text-gray-500">{item.inventory?.product?.sku}</div>
                                <div className="col-span-2 font-medium text-gray-900">{item.inventory?.product?.name}</div>
                                <div className={`font-bold ${item.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.type === 'IN' ? '+' : ''}{item.quantity}
                                </div>
                                <div className="text-gray-600">{item.inventory?.warehouse?.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-16 text-gray-400">
                        <Inbox className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium text-sm">No records found matching "{searchTerm || activeFilter}"</p>
                    </div>
                )}
            </div>

            {/* Export Modal */}
            {isExportModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Download className="w-5 h-5 mr-2 text-blue-600" /> Export History</h3>
                            <button onClick={() => setIsExportModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-sm text-gray-600">Choose a format to export the stock history logs.</p>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setExportFormat('csv')}
                                    className={`p-4 border rounded-xl flex flex-col items-center transition-all ${exportFormat === 'csv' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <Sheet className={`w-8 h-8 mb-2 ${exportFormat === 'csv' ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-bold ${exportFormat === 'csv' ? 'text-blue-700' : 'text-gray-600'}`}>CSV</span>
                                </button>
                                <button
                                    onClick={() => setExportFormat('pdf')}
                                    className={`p-4 border rounded-xl flex flex-col items-center transition-all ${exportFormat === 'pdf' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <FileText className={`w-8 h-8 mb-2 ${exportFormat === 'pdf' ? 'text-red-600' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-bold ${exportFormat === 'pdf' ? 'text-red-700' : 'text-gray-600'}`}>PDF</span>
                                </button>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button onClick={() => setIsExportModalOpen(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button onClick={confirmExport} className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md">Export Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
