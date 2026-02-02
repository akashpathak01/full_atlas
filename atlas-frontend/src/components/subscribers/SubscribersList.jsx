import React from 'react';
import { Users, UserCheck, Clock, UserPlus, Search, Filter, Eye, Edit } from 'lucide-react';

export function SubscribersList({ onNavigate, onEdit, onView }) {
    // Mock data for the table
    const subscribers = [
        { id: 1, name: 'Delivery Agent', email: 'delivery@atlas.com', phone: '-', business: '-', country: '-', date: 'Jan 22, 2026', status: 'Active', initials: 'D', bg: 'bg-blue-100', text: 'text-blue-600' },
        { id: 2, name: 'Packaging Agent', email: 'packaging@atlas.com', phone: '-', business: '-', country: '-', date: 'Jan 22, 2026', status: 'Active', initials: 'P', bg: 'bg-purple-100', text: 'text-purple-600' },
        { id: 3, name: 'Stock Keeper', email: 'stockkeeper@atlas.com', phone: '-', business: '-', country: '-', date: 'Jan 22, 2026', status: 'Active', initials: 'S', bg: 'bg-green-100', text: 'text-green-600' },
        { id: 4, name: 'Manager User', email: 'manager@atlas.com', phone: '-', business: '-', country: '-', date: 'Jan 22, 2026', status: 'Active', initials: 'M', bg: 'bg-orange-100', text: 'text-orange-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                        <Users className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-600">Subscribers</h1>
                        <p className="text-sm text-gray-500">Manage subscriber information and data</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Requests (0)
                    </span>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Export</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg"><Users className="w-6 h-6 text-blue-600" /></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Active Users</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg"><UserCheck className="w-6 h-6 text-green-600" /></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Pending Approval</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">0</h3>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg"><Clock className="w-6 h-6 text-yellow-600" /></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">New This Month</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg"><UserPlus className="w-6 h-6 text-purple-600" /></div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Search & Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="col-span-1 md:col-span-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Search</label>
                        <input type="text" placeholder="Search by name, email, phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Country</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Countries</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Sort By</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Newest First</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Apply Filters</button>
                    <button className="px-6 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200">Clear All</button>
                </div>
            </div>

            {/* Subscribers List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Subscribers List</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-yellow-200 text-gray-700 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-3">Full Name</th>
                                <th className="px-6 py-3">E-Mail</th>
                                <th className="px-6 py-3">Phone Number</th>
                                <th className="px-6 py-3">Business Name</th>
                                <th className="px-6 py-3">Residence Country</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${sub.bg} ${sub.text}`}>
                                                {sub.initials}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{sub.name}</div>
                                                <div className="text-xs text-green-500 flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {sub.status}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{sub.email}</td>
                                    <td className="px-6 py-4 text-gray-400">{sub.phone}</td>
                                    <td className="px-6 py-4 text-gray-400">{sub.business}</td>
                                    <td className="px-6 py-4 text-gray-400">{sub.country}</td>
                                    <td className="px-6 py-4 text-gray-500">{sub.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onView(sub)}
                                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onEdit(sub)}
                                                className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                                                title="Edit User"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
