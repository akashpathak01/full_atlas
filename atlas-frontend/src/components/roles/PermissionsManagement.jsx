import React, { useState, useEffect } from 'react';
import {
    Shield,
    Package,
    Key,
    CheckCircle,
    Search,
    ArrowLeft,
    Filter,
} from 'lucide-react';
import api from '../../lib/api';

export function PermissionsManagement({ onBack }) {
    const [permissions, setPermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterModule, setFilterModule] = useState('All Modules');

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await api.get('/roles/permissions');
                setPermissions(response.data || []);
            } catch (error) {
                console.error('Failed to fetch permissions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPermissions();
    }, []);

    // Derived state
    const modules = ['All Modules', ...new Set(permissions.map(p => p.module))];

    const filteredPermissions = permissions.filter(p => {
        const matchesSearch = p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesModule = filterModule === 'All Modules' || p.module === filterModule;
        return matchesSearch && matchesModule;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-orange-600">Permissions Explorer</h1>
                    <p className="text-sm text-gray-500 font-medium">View all available system permissions</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 font-bold rounded-lg hover:bg-gray-100 transition-all text-sm flex items-center gap-2 shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Roles
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Total Permissions</p>
                        <h4 className="text-2xl font-black text-gray-900">{permissions.length}</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center border border-green-100 shadow-inner">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Modules</p>
                        <h4 className="text-2xl font-black text-gray-900">{modules.length - 1}</h4>
                    </div>
                </div>

                {/* Decoration stats */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 opacity-50">
                    <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-100 shadow-inner">
                        <Key className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Active</p>
                        <h4 className="text-2xl font-black text-gray-900">100%</h4>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div>
                    <h3 className="font-black text-gray-900 text-lg">Search & Filter</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search permissions..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Module</label>
                        <select
                            value={filterModule}
                            onChange={(e) => setFilterModule(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        >
                            {modules.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Permission Code</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Module</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPermissions.length > 0 ? (
                                filteredPermissions.map((perm) => (
                                    <tr key={perm.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                                {perm.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{perm.module}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{perm.action}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{perm.description || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                                        No permissions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
