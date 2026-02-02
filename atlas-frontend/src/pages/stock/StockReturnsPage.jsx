import React, { useState } from 'react';
import { Home, RefreshCw, AlertTriangle, CheckCircle, Search, Calendar, RefreshCcw, ClipboardCheck, Inbox, X, Eye, Package, User, Clock, MapPin, ClipboardList } from 'lucide-react';
import { stockReturnsData } from '../../data/stockDummyData';

export function StockReturnsPage() {
    const [activeTab, setActiveTab] = useState('awaiting'); // 'awaiting' or 'completed'
    const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [barcodeQuery, setBarcodeQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [inspectionData, setInspectionData] = useState({
        orderId: '',
        condition: 'good',
        notes: '',
        quantity: 1
    });

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

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000); // Simulate refresh
    };

    const handleManualInspection = () => {
        setInspectionData({ orderId: '', condition: 'good', notes: '', quantity: 1 });
        setIsInspectionModalOpen(true);
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    const handleProceedToInspection = (orderId) => {
        setIsViewModalOpen(false);
        setInspectionData({ ...inspectionData, orderId: orderId, quantity: selectedOrder?.itemCount || 1 });
        setIsInspectionModalOpen(true);
    };

    const handleSaveInspection = (e) => {
        e.preventDefault();
        console.log('Inspection Data:', inspectionData);
        setIsInspectionModalOpen(false);
        setInspectionData({ orderId: '', condition: 'good', notes: '', quantity: 1 });
        alert("Inspection details saved successfully!");
    };

    return (
        <div className="space-y-6 relative">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-400 gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
                <span>&gt;</span>
                <span>Stock</span>
                <span>&gt;</span>
                <span className="font-bold text-gray-900">Return Orders</span>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Return Orders</h1>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by order, seller, or reason..."
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPeriodModalOpen(true)}
                        className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-sm font-bold transition-all active:scale-95 ${selectedPeriod ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Calendar className="w-4 h-4" />
                        {selectedPeriod ? selectedPeriod : 'Select Period'}
                        {selectedPeriod && <X className="w-3.5 h-3.5 ml-1 bg-white/20 rounded-full" onClick={handleClearPeriod} />}
                    </button>
                    <button
                        onClick={handleRefresh}
                        className={`bg-white border border-gray-100 p-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 shadow-sm transition-all active:scale-95 ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3">
                <button
                    onClick={() => setActiveTab('awaiting')}
                    className={`px-6 py-3 rounded-xl flex items-center gap-3 font-bold transition-all active:scale-95 ${activeTab === 'awaiting' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                >
                    <AlertTriangle className="w-5 h-5" />
                    <span>Awaiting Inspection</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === 'awaiting' ? 'bg-white/20' : 'bg-gray-100'}`}>
                        {stockReturnsData.orders.filter(o => o.status === 'awaiting').length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-6 py-3 rounded-xl flex items-center gap-3 font-bold transition-all active:scale-95 ${activeTab === 'completed' ? 'bg-white border border-gray-100 text-blue-600' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                >
                    <CheckCircle className="w-5 h-5" />
                    <span>Completed</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100'}`}>
                        {stockReturnsData.orders.filter(o => o.status === 'completed').length}
                    </span>
                </button>
            </div>

            {/* Scan Section */}
            <div className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm overflow-hidden relative">
                <div className="relative z-10">
                    <h3 className="text-xl font-black text-gray-900 mb-6">Scan Barcode to Inspect Return</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={barcodeQuery}
                                onChange={(e) => setBarcodeQuery(e.target.value)}
                                placeholder="Scan product barcode..."
                                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium"
                            />
                        </div>
                        <button
                            onClick={handleManualInspection}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-black shadow-xl shadow-blue-100 transition-all active:scale-95"
                        >
                            <ClipboardCheck className="w-5 h-5" />
                            Manual Inspection
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest">Scan barcode to inspect returned product</p>
                </div>
            </div>

            {/* Returns Table */}
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="bg-yellow-50/50 border-b border-yellow-100/30">
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">ORDER NUMBER</th>
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">SELLER</th>
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">RETURN REASON</th>
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">ARRIVAL DATE</th>
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">ITEMS COUNT</th>
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">INSPECTION STATUS</th>
                                <th className="px-6 py-5 text-[10px] font-black text-yellow-700 uppercase tracking-widest">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stockReturnsData.orders
                                .filter(order => order.status === activeTab)
                                .filter(order =>
                                    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.reason.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/30 transition-all group">
                                        <td className="px-6 py-6 font-black text-gray-900">{order.id}</td>
                                        <td className="px-6 py-6 font-bold text-gray-500">{order.seller}</td>
                                        <td className="px-6 py-6 font-bold text-gray-500">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${order.reason === 'Defective Item' ? 'bg-red-50 text-red-500' :
                                                order.reason === 'Wrong Size' ? 'bg-orange-50 text-orange-500' :
                                                    'bg-blue-50 text-blue-500'
                                                }`}>
                                                {order.reason}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-medium text-gray-400">{order.arrivalDate}</td>
                                        <td className="px-6 py-6 font-black text-gray-700">{order.itemCount} Items</td>
                                        <td className="px-6 py-6">
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status === 'completed' ? 'Inspected' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black shadow-sm border border-blue-100 flex items-center gap-2 mx-auto hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {stockReturnsData.orders.filter(order => order.status === activeTab).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50/20">
                        <Inbox className="w-16 h-16 text-gray-100 mb-4" />
                        <p className="text-sm font-black text-gray-300 uppercase tracking-widest italic">No Orders Found</p>
                    </div>
                )}
            </div>

            {/* Return Details Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
                        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-blue-100">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">Return Details</h3>
                                    <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">{selectedOrder.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-2.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <User className="w-3.5 h-3.5" /> Seller
                                    </div>
                                    <p className="font-black text-gray-900">{selectedOrder.seller}</p>
                                </div>
                                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <RefreshCw className="w-3.5 h-3.5" /> Reason
                                    </div>
                                    <span className="inline-block px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-black text-gray-600">{selectedOrder.reason}</span>
                                </div>
                                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Clock className="w-3.5 h-3.5" /> Arrival Date
                                    </div>
                                    <p className="font-black text-gray-900">{selectedOrder.arrivalDate}</p>
                                </div>
                                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Package className="w-3.5 h-3.5" /> Item Count
                                    </div>
                                    <p className="font-black text-gray-900">{selectedOrder.itemCount} Items</p>
                                </div>
                            </div>

                            {selectedOrder.status === 'completed' && (
                                <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-green-100 rounded-xl">
                                            <ClipboardCheck className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Inspection Complete</p>
                                            <p className="text-sm font-bold text-green-900">Verified on {selectedOrder.inspectionDate}</p>
                                        </div>
                                    </div>
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
                                >
                                    Close Details
                                </button>
                                {selectedOrder.status === 'awaiting' && (
                                    <button
                                        onClick={() => handleProceedToInspection(selectedOrder.id)}
                                        className="flex-[1.5] py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        Inspect Now
                                        <ClipboardList className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Select Period Modal */}
            {isPeriodModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-black text-gray-900 flex items-center tracking-tight"><Calendar className="w-5 h-5 mr-3 text-blue-600" /> Select Period</h3>
                            <button onClick={() => setIsPeriodModalOpen(false)} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleApplyPeriod} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Start Date</label>
                                    <input type="date" required value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-black text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">End Date</label>
                                    <input type="date" required value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-black text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setIsPeriodModalOpen(false)} className="flex-1 py-4 text-xs font-black text-gray-500 bg-gray-50 rounded-2xl hover:bg-gray-100 uppercase tracking-widest transition-all">Cancel</button>
                                <button type="submit" className="flex-[2] py-4 text-xs font-black text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 uppercase tracking-widest transition-all">Apply Filter</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Inspection Modal */}
            {isInspectionModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300 transform transition-all border border-gray-100">
                        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gradient-to-br from-blue-50 to-white">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 flex items-center tracking-tight">
                                    <ClipboardCheck className="w-7 h-7 mr-3 text-blue-600" />
                                    Return Inspection
                                </h3>
                                <p className="text-[10px] font-black text-blue-600/50 mt-1 uppercase tracking-widest pl-10">Verification Protocol</p>
                            </div>
                            <button
                                onClick={() => setIsInspectionModalOpen(false)}
                                className="p-3 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm active:scale-90"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveInspection} className="p-10 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Return ID / Order ID</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Search className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter Order or Return ID"
                                            value={inspectionData.orderId}
                                            onChange={(e) => setInspectionData({ ...inspectionData, orderId: e.target.value })}
                                            className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border border-gray-100 rounded-3xl text-sm font-black text-gray-900 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Item Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={inspectionData.quantity}
                                        onChange={(e) => setInspectionData({ ...inspectionData, quantity: parseInt(e.target.value) })}
                                        className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-3xl text-sm font-black text-gray-900 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Product Condition</label>
                                    <select
                                        value={inspectionData.condition}
                                        onChange={(e) => setInspectionData({ ...inspectionData, condition: e.target.value })}
                                        className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-3xl text-sm font-black text-gray-900 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="good">✨ Perfect Condition</option>
                                        <option value="opened">📦 Box Opened</option>
                                        <option value="minor">⚠️ Minor Scratch</option>
                                        <option value="damaged">❌ Damaged / Broken</option>
                                        <option value="wrong">🔄 Wrong Item</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Inspection Notes</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Describe the condition or any issues found during physical inspection..."
                                        value={inspectionData.notes}
                                        onChange={(e) => setInspectionData({ ...inspectionData, notes: e.target.value })}
                                        className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all resize-none placeholder:text-gray-300"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-6">
                                <button
                                    type="button"
                                    onClick={() => setIsInspectionModalOpen(false)}
                                    className="flex-1 py-5 text-xs font-black text-gray-400 bg-gray-50 rounded-3xl hover:bg-gray-100 hover:text-gray-600 transition-all uppercase tracking-widest active:scale-95"
                                >
                                    Dismiss
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-5 text-xs font-black text-white bg-blue-600 rounded-3xl hover:bg-blue-700 shadow-2xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 active:translate-y-0 flex items-center justify-center gap-3 uppercase tracking-widest"
                                >
                                    Approve & Complete
                                    <CheckCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
