
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Shield,
    UserPlus,
    LayoutDashboard,
    Eye,
    ChevronDown,
    Star,
    CheckCircle2,
    Clock,
    User,
    Store,
    ArrowRight,
    Settings,
    Briefcase
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { UserForm } from '../../components/forms/UserForm';
import { adminSellersData } from '../../data/adminDummyData';

export function AdminSellersPage() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' or 'create'
    const [searchTerm, setSearchTerm] = useState('');
    const [sellers, setSellers] = useState(adminSellersData.map(s => ({
        ...s,
        initial: s.name.charAt(0),
        color: s.status === 'Active' ? 'bg-orange-500' : 'bg-orange-400'
    })));
    const [activeSearch, setActiveSearch] = useState('');

    // Filter Logic
    const filteredSellers = useMemo(() => {
        return sellers.filter(seller =>
            seller.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
            seller.email.toLowerCase().includes(activeSearch.toLowerCase()) ||
            seller.phone.includes(activeSearch)
        );
    }, [sellers, activeSearch]);

    const handleSearch = () => {
        setActiveSearch(searchTerm);
    };

    const handleCreateSeller = (userData) => {
        const newSeller = {
            id: sellers.length + 1,
            ...userData,
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            initial: userData.name.charAt(0),
            color: 'bg-orange-500'
        };
        setSellers([newSeller, ...sellers]);
        setView('list');
    };

    if (view === 'create') {
        return (
            <UserForm
                onBack={() => setView('list')}
                onSubmit={handleCreateSeller}
                title="Create New Seller"
                subtitle="Add a new seller to the platform"
            />
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Breadcrumb & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center text-xs font-medium text-gray-500 space-x-2">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/dashboard')}>Home</span>
                        <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-400">Sellers</span>
                        <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-900 font-semibold uppercase tracking-wider">Management</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Briefcase className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Seller Management</h1>
                            <p className="text-sm text-gray-500">Manage platform sellers and their accounts</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setView('create')}
                        className="flex items-center px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all shadow-emerald-200 shadow-lg"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add New Seller
                    </button>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center px-6 py-2.5 bg-yellow-500 text-white rounded-lg font-bold text-sm hover:bg-yellow-600 transition-all shadow-yellow-200 shadow-lg"
                    >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center">
                <div className="w-full max-w-2xl flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter Name, Email or Username"
                            className="w-full pl-4 pr-10 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-50/50 focus:border-orange-400 transition-all"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-orange-100 shadow-md transition-all active:scale-95"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Sellers List Table */}
            <Card className="border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight flex items-center">
                            <Store className="w-5 h-5 mr-2 text-orange-500" />
                            Sellers List
                        </h2>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Total: {filteredSellers.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-[10px] text-gray-500 uppercase font-black tracking-[0.15em] bg-yellow-50/50">
                            <tr>
                                <th className="px-6 py-5"># ID</th>
                                <th className="px-6 py-5">SELLER</th>
                                <th className="px-6 py-5">EMAIL</th>
                                <th className="px-6 py-5">PHONE</th>
                                <th className="px-6 py-5">JOINED DATE</th>
                                <th className="px-6 py-5">STATUS</th>
                                <th className="px-6 py-5 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSellers.map((s, idx) => (
                                <tr key={s.id} className="hover:bg-slate-50/80 transition-all duration-300 group">
                                    <td className="px-6 py-4 font-bold text-[10px] text-gray-400">
                                        #{String(s.id).padStart(3, '0')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3", s.color)}>
                                                {s.initial}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-gray-900 group-hover:text-orange-600 transition-colors">{s.name}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verified Seller</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-gray-600 font-bold text-xs ring-1 ring-slate-100 bg-slate-50/50 px-2 py-1 rounded-lg">
                                            <Mail className="w-3 h-3 mr-1.5 text-blue-500" />
                                            {s.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-gray-600 font-bold text-xs">
                                            <Phone className="w-3 h-3 mr-1.5 text-emerald-500" />
                                            {s.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-gray-500 font-black text-[10px] uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-lg w-fit">
                                            <Clock className="w-3 h-3 mr-1.5 text-gray-400" />
                                            {s.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] ring-1 ring-inset",
                                            s.status === 'Active'
                                                ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                                                : "bg-amber-50 text-amber-700 ring-amber-100"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full mr-2 shadow-sm", s.status === 'Active' ? "bg-emerald-500" : "bg-amber-500")} />
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => alert(`Viewing details for ${s.name}`)}
                                                className="p-2.5 transition-all text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-100 active:scale-90"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2.5 transition-all text-white bg-slate-800 hover:bg-black rounded-xl shadow-lg shadow-gray-100 active:scale-90"
                                            >
                                                <Briefcase className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2.5 transition-all text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-100 active:scale-90"
                                            >
                                                <Settings className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
