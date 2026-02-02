
import React, { useState, useMemo } from 'react';
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
    ArrowLeft,
    CheckCircle2,
    Clock,
    User,
    Store,
    CreditCard,
    Lock,
    Upload,
    ArrowRight,
    Settings
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../../components/forms/UserForm';

const initialUsers = [
    { id: 1, name: 'testing tested', email: 'tetsing@gmail.com', role: 'Admin', status: 'Active', lastLogin: 'Never', initial: 't', color: 'bg-orange-400' },
    { id: 2, name: 'omar 1234', email: 'omar@accountant.com', role: 'Finance Manager', status: 'Active', lastLogin: 'Jan 15, 2026', initial: 'o', color: 'bg-orange-500' },
    { id: 3, name: 'Delivery Manager', email: 'deliverymanager@atlas.com', role: 'Delivery Manager', status: 'Active', lastLogin: 'Never', initial: 'D', color: 'bg-orange-600' },
    { id: 4, name: 'Viewer User', email: 'viewer@atlas.com', role: 'Viewer', status: 'Active', lastLogin: 'Never', initial: 'v', color: 'bg-orange-400' },
    { id: 5, name: 'Finance User', email: 'accountant@atlas.com', role: 'Accountant', status: 'Active', lastLogin: 'Never', initial: 'F', color: 'bg-orange-500' },
    { id: 6, name: 'Delivery Agent', email: 'delivery@atlas.com', role: 'Delivery Agent', status: 'Active', lastLogin: 'Jan 20, 2026', initial: 'D', color: 'bg-orange-600' },
    { id: 7, name: 'Packaging Agent', email: 'packaging@atlas.com', role: 'Packaging Agents', status: 'Active', lastLogin: 'Jan 20, 2026', initial: 'p', color: 'bg-orange-400' },
];

const roles = [
    'All Roles',
    'Admin',
    'Finance Manager',
    'Delivery Manager',
    'Viewer',
    'Accountant',
    'Delivery Agent',
    'Packaging Agents'
];

export function AdminUsersPage() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' or 'create'
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [users, setUsers] = useState(initialUsers);
    const [activeSearch, setActiveSearch] = useState({ term: '', role: 'All Roles' });

    // Filter Logic
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(activeSearch.term.toLowerCase()) ||
                user.email.toLowerCase().includes(activeSearch.term.toLowerCase());
            const matchesRole = activeSearch.role === 'All Roles' || user.role === activeSearch.role;
            return matchesSearch && matchesRole;
        });
    }, [users, activeSearch]);

    const handleSearch = () => {
        setActiveSearch({ term: searchTerm, role: roleFilter });
    };

    const handleCreateUser = (newUser) => {
        setUsers([
            ...users,
            {
                ...newUser,
                id: users.length + 1,
                status: 'Active',
                lastLogin: 'Never',
                initial: newUser.name.charAt(0).toLowerCase(),
                color: 'bg-orange-400'
            }
        ]);
        setView('list');
    };

    if (view === 'create') {
        return <UserForm onBack={() => setView('list')} onSubmit={handleCreateUser} />;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Breadcrumb & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center text-xs font-medium text-gray-500 space-x-2">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/dashboard')}>Home</span>
                        <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-400">Users</span>
                        <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-900 font-semibold uppercase tracking-wider">List</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <UserPlus className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                            <p className="text-sm text-gray-500">Manage system users and their roles</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setView('create')}
                        className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-blue-200 shadow-lg"
                    >
                        Add User
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

            {/* Search & Filters */}
            <Card className="border border-gray-100">
                <CardContent className="p-6 space-y-4">
                    <div className="border-b border-gray-50 pb-2">
                        <h2 className="text-lg font-bold text-gray-800">Search & Filters</h2>
                        <p className="text-xs text-gray-500 font-medium">Find users by name, email, or role</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        <div className="md:col-span-7 space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Search Users</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name, email, phone, etc."
                                    className="w-full pl-4 pr-10 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Role</label>
                            <div className="relative">
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full appearance-none pl-4 pr-10 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all text-gray-700 font-medium"
                                >
                                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <button
                                onClick={handleSearch}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-blue-100 shadow-md transition-all active:scale-95"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users List Table */}
            <Card className="border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Users List</h2>
                        <p className="text-xs text-gray-500">All users in the system with their details</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users: {filteredUsers.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em] bg-yellow-50/50">
                            <tr>
                                <th className="px-6 py-4"><span className="flex items-center"><User className="w-3.5 h-3.5 mr-2 text-orange-500" /> USER</span></th>
                                <th className="px-6 py-4"><span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2 text-orange-500" /> EMAIL</span></th>
                                <th className="px-6 py-4"><span className="flex items-center"><Shield className="w-3.5 h-3.5 mr-2 text-orange-500" /> PRIMARY ROLE</span></th>
                                <th className="px-6 py-4"><span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-orange-500" /> STATUS</span></th>
                                <th className="px-6 py-4"><span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-orange-500" /> LAST LOGIN</span></th>
                                <th className="px-6 py-4"><span className="flex items-center"><Settings className="w-3.5 h-3.5 mr-2 text-orange-500" /> ACTIONS</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        <div className="flex items-center space-x-3">
                                            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm transition-transform group-hover:scale-110", u.color)}>
                                                {u.initial}
                                            </div>
                                            <span className="group-hover:text-blue-600 transition-colors">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center py-1.5 px-3 bg-blue-50/50 rounded-lg text-blue-700 border border-blue-100 font-bold text-xs ring-1 ring-blue-100">
                                            <Star className="w-3.5 h-3.5 mr-2 fill-blue-600" />
                                            {u.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-bold text-[10px] uppercase tracking-wider ring-1 ring-emerald-100">
                                            <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-gray-500 font-medium">
                                            {u.lastLogin !== 'Never' && <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />}
                                            {u.lastLogin}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => alert(`Viewing details for ${u.name}`)}
                                            className="p-2 transition-all text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm active:scale-90"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
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
