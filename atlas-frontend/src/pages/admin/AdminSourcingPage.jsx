
import React from 'react';
import { adminSourcingStats, adminSourcingRequests } from '../../data/adminDummyData';
import { Search, Filter, Plus, Clock, CheckCircle, Users, ArrowRight, UserPlus, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminSourcingPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Search className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-600">Sourcing Management</h1>
                        <p className="text-sm text-gray-600">Manage your product sourcing and supplier requests</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors bg-[#EAB308]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/sourcing/create')}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Sourcing Request
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Requests</p>
                            <h3 className="text-2xl font-bold text-gray-900">{adminSourcingStats.pendingRequests}</h3>
                        </div>
                    </div>
                    <button className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                        View all <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Approved Requests</p>
                            <h3 className="text-2xl font-bold text-gray-900">{adminSourcingStats.approvedRequests}</h3>
                        </div>
                    </div>
                    <button className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                        View all <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Suppliers</p>
                            <h3 className="text-2xl font-bold text-gray-900">{adminSourcingStats.totalSuppliers}</h3>
                        </div>
                    </div>
                    <button className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                        View all <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Avg. Processing Time</p>
                            <h3 className="text-2xl font-bold text-gray-900">{adminSourcingStats.avgProcessingTime || 'N/A'}</h3>
                        </div>
                    </div>
                    <button className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                        N/A
                    </button>
                </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
                    <p className="text-sm text-gray-500 mt-1">Latest sourcing requests and their status</p>
                </div>

                <div className="min-h-[200px]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-orange-50 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="px-6 py-3 flex items-center gap-2"><li className="list-none text-orange-600 text-base">📄</li>REQUEST</th>
                                    <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">●</span>STATUS</span></th>
                                    <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">📅</span>DATE</span></th>
                                    <th className="px-6 py-3"><span className="flex items-center gap-2"><span className="text-orange-600 text-base">⚙️</span>ACTION</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {adminSourcingRequests.length > 0 ? (
                                    adminSourcingRequests.map((req) => (
                                        <tr key={req.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{req.product}</div>
                                                <div className="text-sm text-gray-500">{req.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                        req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">View</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                                    <Box className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900">No recent requests found</h3>
                                                <p className="text-gray-500 mt-1">Create your first sourcing request to get started</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Quick Links</h2>
                    <p className="text-sm text-gray-500 mt-1">Access common sourcing functions</p>
                </div>

                <div className="divide-y divide-gray-100">
                    <button
                        onClick={() => navigate('/admin/sourcing/requests')}
                        className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="p-2 bg-yellow-50 rounded-lg mr-4">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Pending Requests</h3>
                            <p className="text-sm text-gray-500">View all pending sourcing requests</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/sourcing/suppliers')}
                        className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="p-2 bg-blue-50 rounded-lg mr-4">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Manage Suppliers</h3>
                            <p className="text-sm text-gray-500">View and manage supplier details</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/sourcing/create')}
                        className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="p-2 bg-green-50 rounded-lg mr-4">
                            <Plus className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Create Request</h3>
                            <p className="text-sm text-gray-500">Create a new sourcing request</p>
                        </div>
                    </button>
                </div>
            </div>
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
