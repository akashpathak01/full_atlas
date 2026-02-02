
import React, { useState } from 'react';
import { adminWarehousesData } from '../../data/adminDummyData';
import { Search, Plus, MapPin, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminWarehousesPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    const filteredWarehouses = adminWarehousesData.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/dashboard')}>Home</span>
                        <span>&gt;</span>
                        <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/inventory')}>Inventory</span>
                        <span>&gt;</span>
                        <span className="text-gray-900 font-medium">Warehouses</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Warehouses</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your warehouse locations</p>
                </div>
                <button
                    onClick={() => navigate('/admin/inventory/warehouses/add')}
                    className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Warehouse
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Warehouse List</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search warehouses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 w-64"
                            />
                        </div>
                    </div>
                </div>

                {filteredWarehouses.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No warehouses found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-yellow-100">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-gray-700">Name</th>
                                    <th className="px-6 py-3 font-medium text-gray-700">Location</th>
                                    <th className="px-6 py-3 font-medium text-gray-700">Description</th>
                                    <th className="px-6 py-3 font-medium text-gray-700">Status</th>
                                    <th className="px-6 py-3 font-medium text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredWarehouses.map((warehouse) => (
                                    <tr key={warehouse.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{warehouse.name}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                                {warehouse.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{warehouse.description}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${warehouse.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {warehouse.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
