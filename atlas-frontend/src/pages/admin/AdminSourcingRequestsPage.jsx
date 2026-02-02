
import React, { useState } from 'react';
import { adminSourcingRequests } from '../../data/adminDummyData';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminSourcingRequestsPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');

    const filteredRequests = adminSourcingRequests.filter(req => {
        const matchesSearch = req.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        // Mock priority since it's not in dummy data yet, defaulting to 'Medium' for display logic if needed or ignoring
        const matchesPriority = priorityFilter === 'All';

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sourcing Requests</h1>
                    <p className="text-sm text-gray-600">Manage your product sourcing and supplier requests</p>
                </div>
                <button
                    onClick={() => navigate('/admin/sourcing/create')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Sourcing Request
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="mb-4">
                    <h2 className="font-semibold text-gray-900">Filter Requests</h2>
                    <p className="text-sm text-gray-500">Filter and search sourcing requests</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="In Review">In Review</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Request ID or product..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-orange-50 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                <th className="px-6 py-3 flex items-center gap-2"><li className="list-none text-orange-600 text-base">#</li> REQUEST ID</th>
                                <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">📦</span> PRODUCT</span></th>
                                <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">👤</span> REQUESTER</span></th>
                                <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">📅</span> DATE</span></th>
                                <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">⚠</span> PRIORITY</span></th>
                                <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">●</span> STATUS</span></th>
                                <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">⚙️</span> ACTIONS</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{req.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.product}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin User</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                                                Medium
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                                ${req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                                                <Eye className="w-4 h-4" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900">No sourcing requests found</h3>
                                            <p className="text-gray-500 mt-1">Try adjusting your search or filters to find what you're looking for.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
