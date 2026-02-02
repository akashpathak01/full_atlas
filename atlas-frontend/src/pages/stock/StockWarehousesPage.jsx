
import React, { useState } from 'react';
import { Home, Warehouse, Plus, Layout, BarChart, Package, X, FileText, Calendar, MapPin, Box } from 'lucide-react';
import { stockWarehousesData } from '../../data/stockDummyData';

export function StockWarehousesPage() {
    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // Data States
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [reportType, setReportType] = useState('inventory');

    // Form States
    const [newWarehouse, setNewWarehouse] = useState({
        name: '',
        location: '',
        capacity: ''
    });

    // Handlers
    const handleAddWarehouse = (e) => {
        e.preventDefault();
        alert('Warehouse Added Successfully! (Simulation)');
        setIsAddModalOpen(false);
        setNewWarehouse({ name: '', location: '', capacity: '' });
    };

    const openViewModal = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsViewModalOpen(true);
    };

    const openReportModal = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsReportModalOpen(true);
    };

    const handleGenerateReport = () => {
        alert(`Generating ${reportType.toUpperCase()} report for ${selectedWarehouse.name}... Download started.`);
        setIsReportModalOpen(false);
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
                <span className="font-medium text-gray-900">Warehouses</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Warehouse Management</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    + Add Warehouse
                </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Warehouses</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stockWarehousesData.stats.totalWarehouses}</h3>
                    </div>
                    <div className="p-3 bg-blue-100/50 rounded-xl">
                        <Warehouse className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Units</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stockWarehousesData.stats.totalUnits}</h3>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-xl">
                        <BarChart className="w-6 h-6 text-gray-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Products</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stockWarehousesData.stats.totalProducts}</h3>
                    </div>
                    <div className="p-3 bg-blue-100/50 rounded-xl">
                        <Package className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Warehouse Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stockWarehousesData.warehouses.map((warehouse, idx) => (
                    <div key={idx} className={`bg-white rounded-xl border ${idx === 0 ? 'border-blue-500 border-2' : 'border-gray-200'} shadow-sm overflow-hidden p-6 transition-all hover:shadow-md`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{warehouse.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-6">
                            <span className="mr-2">📍</span> {warehouse.location}
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Products</span>
                                <span className="font-bold text-gray-900">{warehouse.products}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Current</span>
                                <span className="font-bold text-gray-900">{warehouse.current}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Capacity</span>
                                <span className="font-bold text-gray-900">{warehouse.capacity}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Utilization</span>
                                <span className="font-bold text-gray-900">{(warehouse.utilization * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-gray-300 h-2 rounded-full"
                                    style={{ width: `${warehouse.utilization * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => openViewModal(warehouse)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors active:scale-95"
                            >
                                View
                            </button>
                            <button
                                onClick={() => openReportModal(warehouse)}
                                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors active:scale-95"
                            >
                                Report
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Warehouse Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Plus className="w-5 h-5 mr-2 text-blue-600" /> Add New Warehouse</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleAddWarehouse} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Warehouse Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Dubai South Hub"
                                    value={newWarehouse.name}
                                    onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Location</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Jebel Ali Industrial Area"
                                    value={newWarehouse.location}
                                    onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Capacity</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Total capacity in units"
                                    value={newWarehouse.capacity}
                                    onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md">Add Warehouse</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Warehouse Modal */}
            {isViewModalOpen && selectedWarehouse && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><Warehouse className="w-5 h-5 mr-2 text-blue-600" /> Warehouse Details</h3>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedWarehouse.name}</h2>
                            <p className="text-gray-500 flex items-center text-sm mb-6"><MapPin className="w-4 h-4 mr-1" /> {selectedWarehouse.location}</p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Current Stock</p>
                                    <p className="text-2xl font-black text-gray-900">{selectedWarehouse.current} <span className="text-xs text-gray-400 font-normal">units</span></p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Capacity</p>
                                    <p className="text-2xl font-black text-gray-900">{selectedWarehouse.capacity} <span className="text-xs text-gray-400 font-normal">units</span></p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Unique Products</p>
                                    <p className="text-2xl font-black text-gray-900">{selectedWarehouse.products} <span className="text-xs text-gray-400 font-normal">types</span></p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Utilization</p>
                                    <p className={`text-2xl font-black ${(selectedWarehouse.utilization) > 0.8 ? 'text-red-500' : 'text-green-500'}`}>{(selectedWarehouse.utilization * 100).toFixed(0)}%</p>
                                </div>
                            </div>

                            <button onClick={() => setIsViewModalOpen(false)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Warehouse Report Modal */}
            {isReportModalOpen && selectedWarehouse && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><FileText className="w-5 h-5 mr-2 text-blue-600" /> Generate Report</h3>
                            <button onClick={() => setIsReportModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{selectedWarehouse.name}</h4>
                                <p className="text-sm text-gray-500">Select report parameters for this facility.</p>
                            </div>

                            <div className="space-y-3">
                                {['Utilization Report', 'Stock Movement', 'Audit Log', 'Low Stock Alert'].map((type) => (
                                    <label key={type} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${reportType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="reportType" className="text-blue-600 focus:ring-blue-500" checked={reportType === type} onChange={() => setReportType(type)} />
                                        <span className={`ml-3 text-sm font-medium ${reportType === type ? 'text-blue-700' : 'text-gray-700'}`}>{type}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button onClick={() => setIsReportModalOpen(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button onClick={handleGenerateReport} className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md">Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
