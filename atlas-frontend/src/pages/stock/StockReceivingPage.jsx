
import React, { useState } from 'react';
import { Home, Package, User, Building, Calendar, Plus, Search, X } from 'lucide-react';

export function StockReceivingPage() {
    const [activeTab, setActiveTab] = useState('client'); // 'client' or 'sourcing'
    const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
    const [isManualEntryModalOpen, setIsManualEntryModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    // Filter/Search States
    const [barcodeInput, setBarcodeInput] = useState('');
    const [orderSearch, setOrderSearch] = useState('');

    const handleApplyPeriod = (e) => {
        e.preventDefault();
        if (dateRange.start && dateRange.end) {
            setSelectedPeriod(`${dateRange.start} - ${dateRange.end}`);
            setIsPeriodModalOpen(false);
        }
    };

    const handleClearPeriod = (e) => {
        e.stopPropagation();
        setSelectedPeriod(null);
        setDateRange({ start: '', end: '' });
    };

    const handleManualEntrySubmit = (e) => {
        e.preventDefault();
        alert("Manual entry processed! (Simulation)");
        setIsManualEntryModalOpen(false);
    };

    const handleOrderSearch = () => {
        if (orderSearch) {
            alert(`Searching for Order: ${orderSearch}`);
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Stock</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Receive Stock</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">Receiving Shipments</h1>

            {/* Toggle Tabs */}
            <div className="flex space-x-4">
                <button
                    onClick={() => setActiveTab('client')}
                    className={`px-6 py-3 rounded-lg flex items-center font-bold shadow-md transition-all active:scale-95 ${activeTab === 'client' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <User className="w-5 h-5 mr-2" />
                    Client Stock-In
                </button>
                <button
                    onClick={() => setActiveTab('sourcing')}
                    className={`px-6 py-3 rounded-lg flex items-center font-medium shadow-sm transition-all active:scale-95 ${activeTab === 'sourcing' ? 'bg-blue-600 text-white hover:bg-blue-700 font-bold' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <Building className="w-5 h-5 mr-2" />
                    Sourcing Purchase
                </button>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => setIsPeriodModalOpen(true)}
                    className={`border px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 ${selectedPeriod ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedPeriod ? selectedPeriod : 'Select Period'}
                    {selectedPeriod && <X className="w-3 h-3 ml-2 hover:bg-blue-200 rounded-full p-0.5" onClick={handleClearPeriod} />}
                </button>
            </div>

            {/* Scan Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Scan Barcode</h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        placeholder="Scan or enter barcode..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        onClick={() => setIsManualEntryModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-bold shadow-sm transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Manual Entry
                    </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">Scan product barcode to receive stock</p>
            </div>

            {/* Order Search */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Enter Receiving Order Number (SIR-...)"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        onClick={handleOrderSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center font-bold shadow-sm transition-all active:scale-95"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Search
                    </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">Example: SIR-2025-046</p>
            </div>

            {/* Recent Receivings Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[300px]">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">Recent Receivings ({activeTab === 'client' ? 'Client' : 'Sourcing'})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-yellow-100/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-600">GRN NUMBER</th>
                                <th className="px-6 py-4 font-bold text-gray-600">DATE</th>
                                <th className="px-6 py-4 font-bold text-gray-600">SUPPLIER</th>
                                <th className="px-6 py-4 font-bold text-gray-600">STATUS</th>
                                <th className="px-6 py-4 font-bold text-gray-600">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Empty Body as in screenshot, but reactive to tabs */}
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300 opacity-50" />
                                    <p>No recent {activeTab} receivings found</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Select Period Modal */}
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

            {/* Manual Entry Modal */}
            {isManualEntryModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Plus className="w-5 h-5 mr-2 text-blue-600" /> Manual Entry</h3>
                            <button onClick={() => setIsManualEntryModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleManualEntrySubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Barcode / SKU</label>
                                <input type="text" required placeholder="Enter product barcode" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Quantity</label>
                                <input type="number" min="1" required placeholder="0" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" className="w-full px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md mt-2">Add Stock</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
