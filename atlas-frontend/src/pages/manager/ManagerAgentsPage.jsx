
import React, { useState } from 'react';
import { managerAgentsData } from '../../data/managerDummyData';
import { Home, Phone, UserPlus, Search, Filter, MoreVertical, Mail, Activity, BarChart2, X, User, MapPin, Calendar, Star, Users, ArrowLeft, CheckCircle2, Info, Edit, ShoppingBag, CheckCircle, Clock, Percent, LayoutGrid, Plus, BarChart3, ExternalLink, RefreshCcw, Send } from 'lucide-react';

export function ManagerAgentsPage() {
    const [view, setView] = useState('list'); // 'list' or 'details'
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Modal states
    const [showAddAgentModal, setShowAddAgentModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    // Filter agents based on search and status
    const filteredAgents = managerAgentsData.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddAgent = (e) => {
        e.preventDefault();
        alert("New Agent Added Successfully! (Simulation)");
        setShowAddAgentModal(false);
    };

    const handleViewDetails = (agent) => {
        setSelectedAgent(agent);
        setView('details');
    };

    const confirmDelete = () => {
        alert('Confirm agents removal?');
    };

    if (view === 'details' && selectedAgent) {
        return (
            <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <User className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Agent Detail</h1>
                            <p className="text-xs text-gray-500 font-medium">{selectedAgent.role || 'Call Center Agent'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setView('list')}
                            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center text-sm font-bold border border-gray-200 transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Agents
                        </button>
                        <button
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold transition-all active:scale-95 shadow-md shadow-orange-100"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Agent
                        </button>
                    </div>
                </div>

                {/* Profile Summary Card */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex items-center justify-between group relative overflow-hidden">
                    <div className="flex items-center gap-6 z-10">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-3xl font-black text-orange-400 border border-orange-100 shadow-inner group-hover:scale-110 transition-transform">
                            <User className="w-10 h-10" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedAgent.name}</h2>
                            <p className="text-sm font-bold text-gray-500 tracking-tight">{selectedAgent.role || 'Call Center Agent'}</p>
                            <p className="text-xs font-medium text-blue-500 hover:underline cursor-pointer">{selectedAgent.email}</p>
                        </div>
                    </div>
                    <div className="text-right space-y-3 z-10">
                        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">
                            {selectedAgent.status || 'Active'}
                        </span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            Last Login: <span className="text-gray-600">Jan 24, 2026 01:37</span>
                        </p>
                    </div>
                    {/* Abstract background blobs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column (70%) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                                <div className="p-1.5 bg-blue-50 rounded-lg">
                                    <Info className="w-4 h-4 text-blue-500" />
                                </div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Basic Information</h3>
                            </div>
                            <div className="p-8 grid grid-cols-2 gap-x-12 gap-y-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Full Name</p>
                                    <p className="text-sm font-bold text-gray-800">{selectedAgent.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                                    <p className="text-sm font-bold text-blue-500">{selectedAgent.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
                                    <p className="text-sm font-bold text-gray-400 italic">Not provided</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                                    <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                        {selectedAgent.status || 'Active'}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Date Joined</p>
                                    <p className="text-sm font-bold text-gray-800">January 22, 2026</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Last Login</p>
                                    <p className="text-sm font-bold text-gray-800">Jan 24, 2026 01:37</p>
                                </div>
                            </div>
                        </div>

                        {/* Performance Statistics */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                                <div className="p-1.5 bg-green-50 rounded-lg">
                                    <Activity className="w-4 h-4 text-green-500" />
                                </div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Performance Statistics</h3>
                            </div>
                            <div className="p-8 grid grid-cols-4 gap-4 text-center">
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="p-3 bg-blue-50 rounded-full text-blue-600 mb-2">
                                        <ShoppingBag className="w-5 h-5" />
                                    </div>
                                    <p className="text-2xl font-black text-gray-900">0</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Total Orders</p>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="p-3 bg-green-50 rounded-full text-green-600 mb-2">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <p className="text-2xl font-black text-gray-900">0</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Completed</p>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="p-3 bg-yellow-50 rounded-full text-yellow-600 mb-2">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <p className="text-2xl font-black text-gray-900">0</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Pending</p>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="p-3 bg-purple-50 rounded-full text-purple-600 mb-2">
                                        <Percent className="w-5 h-5" />
                                    </div>
                                    <p className="text-2xl font-black text-gray-900">{selectedAgent.performance || '85%'}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Success Rate</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-purple-50 rounded-lg">
                                        <LayoutGrid className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Recent Orders</h3>
                                </div>
                                <button className="text-[10px] font-bold text-blue-600 hover:underline">View all</button>
                            </div>
                            <div className="p-16 flex flex-col items-center justify-center text-center">
                                <div className="p-4 bg-gray-50 rounded-full mb-4">
                                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                                </div>
                                <p className="text-sm font-bold text-gray-400">No orders assigned to this agent yet.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (30%) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                                <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                                    <Activity className="w-4 h-4" />
                                </div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Quick Actions</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-orange-100">
                                    <Edit className="w-4 h-4" /> Edit Agent
                                </button>
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-blue-100">
                                    <LayoutGrid className="w-4 h-4" /> View Orders
                                </button>
                                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-green-100">
                                    <Plus className="w-4 h-4" /> Assign Order
                                </button>
                                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-purple-100">
                                    <BarChart3 className="w-4 h-4" /> View Reports
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Recent Activity</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-green-50 rounded-full h-fit">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Order Completed</p>
                                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">Order #ORD-123456</p>
                                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded-full h-fit">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Customer Call</p>
                                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">Called customer for order confirmation</p>
                                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">4 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-2 bg-yellow-50 rounded-full h-fit">
                                        <RefreshCcw className="w-4 h-4 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Order Updated</p>
                                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">Updated order status to processing</p>
                                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">6 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 space-y-4">
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-green-500" /> Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-300" />
                                        <p className="text-xs font-bold text-blue-500 hover:underline cursor-pointer">{selectedAgent.email}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-gray-300" />
                                        <p className="text-xs font-bold text-gray-500">Joined Jan 22, 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Call Center</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Agents</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm gap-4">
                <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-xl mr-4">
                        <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage call center agents and view performance</p>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search agents by name or email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Filter className="w-4 h-4" />
                        <span>Filter by:</span>
                    </div>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Offline">Offline</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Agents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500 mr-3">
                                            {agent.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{agent.name}</h3>
                                            <p className="text-sm text-gray-500">{agent.role}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                        {agent.email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                        {agent.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Activity className="w-4 h-4 mr-2 text-gray-400" />
                                        Status:
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${agent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {agent.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BarChart2 className="w-4 h-4 mr-2 text-gray-400" />
                                        Performance:
                                        <span className="ml-2 font-bold text-gray-900">{agent.performance}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center bg-opacity-50 group-hover:bg-opacity-100 transition-colors">
                                <span className="text-xs text-gray-500">Joined: {agent.joined}</span>
                                <button
                                    onClick={() => handleViewDetails(agent)}
                                    className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No agents found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* --- MODALS --- */}

            {/* Add New Agent Modal */}
            {showAddAgentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><UserPlus className="w-5 h-5 mr-2 text-blue-600" /> Add New Agent</h3>
                            <button onClick={() => setShowAddAgentModal(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleAddAgent} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                <input type="email" required placeholder="john@company.com" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Role</label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500">
                                    <option>Support Agent</option>
                                    <option>Senior Agent</option>
                                    <option>Team Lead</option>
                                </select>
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setShowAddAgentModal(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md">Add Agent</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
}
