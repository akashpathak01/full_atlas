
import React, { useState } from 'react';
import { Home, Calendar, Clock, Package, Inbox, X, Search } from 'lucide-react';
import { stockPickingData } from '../../data/stockDummyData';

export function StockPickingPage() {
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'packing'
    const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [barcodeInput, setBarcodeInput] = useState('');

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

    const handleBarcodeSubmit = (e) => {
        if (e.key === 'Enter') {
            alert(`Verifying Barcode: ${barcodeInput} (Simulation)`);
            setBarcodeInput('');
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
                <span className="font-medium text-gray-900">Ship Orders</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Order Preparation</h1>
                <button
                    onClick={() => setIsPeriodModalOpen(true)}
                    className={`border px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 ${selectedPeriod ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedPeriod ? selectedPeriod : 'Select Period'}
                    {selectedPeriod && <X className="w-3 h-3 ml-2 hover:bg-blue-200 rounded-full p-0.5" onClick={handleClearPeriod} />}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-3 rounded-lg flex items-center font-bold shadow-sm transition-all active:scale-95 ${activeTab === 'pending' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <Clock className="w-5 h-5 mr-2" />
                    Pending
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {stockPickingData.pendingCount}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('packing')}
                    className={`px-6 py-3 rounded-lg flex items-center font-bold shadow-sm transition-all active:scale-95 ${activeTab === 'packing' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <Package className="w-5 h-5 mr-2" />
                    Ready for Packing
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'packing' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
                        {stockPickingData.readyForPackingCount}
                    </span>
                </button>
            </div>

            {/* Scan Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Scan Barcode While Picking</h3>
                <div className="relative">
                    <input
                        type="text"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        onKeyDown={handleBarcodeSubmit}
                        placeholder="Scan product barcode..."
                        className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-gray-400 text-sm mt-2">Press Enter to verify product during picking</p>
            </div>

            {/* Orders List / Empty State */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                {/* Fixed Grid Cols to 6 to match headers */}
                <div className="grid grid-cols-6 bg-yellow-100/50 border-b border-gray-100 p-4 text-xs font-bold text-gray-600 uppercase">
                    <div>Order Number</div>
                    <div className="col-span-2">Customer Name</div>
                    <div>Seller</div>
                    <div>Items Count</div>
                    <div className="text-right">Action</div>
                </div>
                <div className="flex flex-col items-center justify-center p-12 text-gray-400 h-64">
                    <Inbox className="w-16 h-16 mb-4 opacity-50 text-gray-300" />
                    <h3 className="text-lg font-bold text-gray-600">No {activeTab} orders</h3>
                    <p className="text-sm">There are no orders currently in the {activeTab} stage.</p>
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
        </div>
    );
}
