import React, { useState } from 'react';
import { Search, Filter, Plus, Download, AlertTriangle, Package, Trash2, Edit, Home, Box, LayoutGrid, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { AddMaterialModal } from './AddMaterialModal';

export function PackagingMaterials() {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    // Empty state to match screenshot
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('All');
    const [filterLevel, setFilterLevel] = useState('All Stock Levels');

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const response = await api.get('/packaging/materials');
            setMaterials(response.data);
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this material?')) return;
        try {
            await api.delete(`/packaging/materials/${id}`);
            fetchMaterials();
        } catch (error) {
            console.error('Error deleting material:', error);
            alert('Failed to delete material');
        }
    };

    React.useEffect(() => {
        fetchMaterials();
    }, []);

    const getStatus = (item) => {
        if (item.stock <= 0) return 'Out of Stock';
        if (item.stock <= item.minLevel) return 'Low Stock';
        return 'In Stock';
    };

    const filteredMaterials = materials.filter(m => {
        const matchesType = filterType === 'All' || m.type === filterType;
        const status = getStatus(m);
        const matchesLevel = filterLevel === 'All Stock Levels' || 
                           (filterLevel === 'In Stock' && status === 'In Stock') ||
                           (filterLevel === 'Low Stock' && status === 'Low Stock') ||
                           (filterLevel === 'Out of Stock' && status === 'Out of Stock');
        return matchesType && matchesLevel;
    });

    const stats = {
        total: materials.length,
        lowStock: materials.filter(m => getStatus(m) === 'Low Stock').length,
        outOfStock: materials.filter(m => getStatus(m) === 'Out of Stock').length,
        totalValue: materials.reduce((sum, m) => sum + (m.stock * m.cost), 0).toFixed(2)
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                        <Package className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-600">Materials Inventory</h1>
                        <p className="text-sm text-gray-500">Manage packaging materials and supplies</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/packaging/dashboard')}
                    className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 flex items-center gap-2 shadow-sm transition-all"
                >
                    <Home className="w-4 h-4" /> Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main List Section */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Materials Inventory</h2>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm"
                            >
                                Add New Material
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-100">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Type</label>
                                <select 
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 leading-tight"
                                >
                                    <option value="All">All Types</option>
                                    <option value="Boxes">Boxes</option>
                                    <option value="Wraps">Wraps</option>
                                    <option value="Labels">Labels</option>
                                    <option value="Tape">Tape</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Stock Level</label>
                                <select 
                                    value={filterLevel}
                                    onChange={(e) => setFilterLevel(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 leading-tight"
                                >
                                    <option>All Stock Levels</option>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Out of Stock</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 shadow-sm">
                                    <Filter className="w-4 h-4" /> Filter
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-yellow-50 text-gray-600 font-bold uppercase text-[10px] tracking-widest border-b border-yellow-100">
                                    <tr>
                                        <th className="px-6 py-4">Material</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Min Level</th>
                                        <th className="px-6 py-4">Cost/Unit</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-24 text-center">
                                                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
                                                <p className="text-gray-500 font-bold">Loading materials...</p>
                                            </td>
                                        </tr>
                                    ) : filteredMaterials.length > 0 ? (
                                        filteredMaterials.map((item) => {
                                            const status = getStatus(item);
                                            return (
                                                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-50">
                                                    <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                                                    <td className="px-6 py-4 text-gray-500 font-medium">{item.type}</td>
                                                    <td className="px-6 py-4 font-bold">{item.stock}</td>
                                                    <td className="px-6 py-4 text-gray-500">{item.minLevel}</td>
                                                    <td className="px-6 py-4 text-gray-500 font-medium">${item.cost.toFixed(2)}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                                                      status === 'Out of Stock' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button className="p-2 bg-gray-50 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                                                            <button 
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-2 bg-gray-50 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="p-6 bg-gray-50 rounded-2xl mb-4">
                                                        <Box className="w-12 h-12 text-gray-200" />
                                                    </div>
                                                    <h3 className="text-gray-900 font-bold text-lg mb-1">No materials found</h3>
                                                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Get started by adding your first material.</p>
                                                    <button
                                                        onClick={() => setShowAddModal(true)}
                                                        className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg active:scale-95 transition-all text-sm"
                                                    >
                                                        Add Material
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Inventory Overview */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-6 text-lg">Inventory Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                                <span className="text-gray-500 font-medium">Total Materials</span>
                                <span className="font-bold text-gray-900">{stats.total}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                                <span className="text-gray-500 font-medium">Low Stock</span>
                                <span className="font-bold text-yellow-600">{stats.lowStock}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                                <span className="text-gray-500 font-medium">Out of Stock</span>
                                <span className="font-bold text-red-600">{stats.outOfStock}</span>
                            </div>
                            <div className="pt-2 flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Total Value</span>
                                <span className="font-black text-green-600 text-lg">${stats.totalValue}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-6 text-lg">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-sm shadow-sm transition-all active:scale-95"
                            >
                                <Plus className="w-4 h-4" /> Add New Material
                            </button>
                            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm shadow-sm transition-all active:scale-95">
                                <Download className="w-4 h-4" /> Export Inventory
                            </button>
                            <button className="w-full py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 flex items-center justify-center gap-2 text-sm shadow-sm transition-all active:scale-95">
                                <AlertTriangle className="w-4 h-4" /> Low Stock Alert
                            </button>
                        </div>
                    </div>

                    {/* Material Types Help */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">Material Types</h3>
                        </div>
                        <div className="h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-100"></div>
                    </div>
                </div>
            </div>

            {showAddModal && <AddMaterialModal onClose={() => setShowAddModal(false)} onSuccess={fetchMaterials} />}
        </div>
    );
}

