import React, { useState, useMemo, useEffect } from 'react';
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
    Settings,
    Pencil,
    Trash2,
    X
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../../components/forms/UserForm';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';


const roleDisplayMap = {
    'SUPER_ADMIN': 'Super Admin',
    'ADMIN': 'Admin',
    'SELLER': 'Seller',
    'CALL_CENTER_AGENT': 'Call Center Agent',
    'CALL_CENTER_MANAGER': 'Call Center Manager',
    'STOCK_KEEPER': 'Stock Keeper',
    'PACKAGING_AGENT': 'Packaging Agent',
    'DELIVERY_AGENT': 'Delivery Agent'
};

const roles = [
    'All Roles',
    ...Object.values(roleDisplayMap)
];

const colorMap = {
    'SUPER_ADMIN': 'bg-orange-600',
    'ADMIN': 'bg-orange-500',
    'SELLER': 'bg-blue-500',
    'CALL_CENTER_AGENT': 'bg-orange-400',
    'CALL_CENTER_MANAGER': 'bg-orange-500',
    'STOCK_KEEPER': 'bg-orange-600',
    'PACKAGING_AGENT': 'bg-orange-400',
    'DELIVERY_AGENT': 'bg-orange-600'
};

export function AdminUsersPage() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list', 'create', 'edit'
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSearch, setActiveSearch] = useState({ term: '', role: 'All Roles' });
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/users');
            // Assuming response.data is an array of users
            const formattedUsers = (response.data || []).map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                role: roleDisplayMap[u.role?.name] || u.role?.name || 'User',
                status: u.isActive ? 'Active' : 'Inactive',
                lastLogin: 'Jan 20, 2026', // Mock if not in DB
                initial: u.name.charAt(0).toUpperCase(),
                color: colorMap[u.role?.name] || 'bg-gray-400'
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            // alert('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleCreateUser = async (newUser) => {
        try {
            await api.post('/users', {
                ...newUser,
                roleName: newUser.role // Already in uppercase from UserForm
            });
            fetchUsers();
            setView('list');
        } catch (error) {
            console.error('Failed to create user:', error);
            alert(error.response?.data?.message || 'Failed to create user');
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setView('edit');
    };

    const handleUpdateUser = async (updatedData) => {
        try {
            // Map display role back to backend role name
            const reverseRoleMap = Object.entries(roleDisplayMap).reduce((acc, [key, value]) => {
                acc[value] = key;
                return acc;
            }, {});

            const roleName = reverseRoleMap[updatedData.role] || updatedData.role;

            await api.patch(`/users/${editingUser.id}`, {
                ...updatedData,
                roleName
            });
            fetchUsers();
            setEditingUser(null);
            setView('list');
        } catch (error) {
            console.error('Failed to update user:', error);
            alert(error.response?.data?.message || 'Failed to update user');
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await api.delete(`/users/${userId}`);
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert(error.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleViewUser = async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            setViewingUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            alert('Failed to fetch user details');
        }
    };

    const { user: currentUser } = useAuth();

    if (isLoading && users.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (view === 'create') {
        return (
            <div className="max-w-4xl mx-auto">
                <UserForm
                    onBack={() => setView('list')}
                    onSubmit={handleCreateUser}
                    currentUserRole={currentUser?.role}
                    title="Add System User"
                    subtitle="Create new staff account with specific permissions"
                />
            </div>
        );
    }

    if (view === 'edit' && editingUser) {
        return (
            <div className="max-w-4xl mx-auto">
                <UserForm
                    onBack={() => { setView('list'); setEditingUser(null); }}
                    onSubmit={handleUpdateUser}
                    initialData={editingUser}
                    currentUserRole={currentUser?.role}
                    title="Edit System User"
                    subtitle={`Updating details for ${editingUser.name}`}
                />
            </div>
        );
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
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleViewUser(u.id)}
                                                className="p-2 transition-all text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm active:scale-90"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(u)}
                                                className="p-2 transition-all text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm active:scale-90"
                                                title="Edit User"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(u.id, u.name)}
                                                className="p-2 transition-all text-white bg-rose-500 hover:bg-rose-600 rounded-lg shadow-sm active:scale-90"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {/* View User Modal */}
            {viewingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 p-4">
                    <Card className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden border-0">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-orange-600 text-white">
                            <h2 className="text-xl font-bold">User Details</h2>
                            <button onClick={() => setViewingUser(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <DetailItem label="Full Name" value={viewingUser.name} icon={<User className="w-4 h-4 text-orange-500" />} />
                                    <DetailItem label="Email Address" value={viewingUser.email} icon={<Mail className="w-4 h-4 text-blue-500" />} />
                                    <DetailItem label="Phone Number" value={viewingUser.phone || 'N/A'} icon={<Phone className="w-4 h-4 text-emerald-500" />} />
                                    <DetailItem label="Role" value={roleDisplayMap[viewingUser.role?.name] || viewingUser.role?.name} icon={<Shield className="w-4 h-4 text-orange-500" />} />
                                </div>
                                <div className="space-y-6">
                                    <DetailItem label="Status" value={viewingUser.isActive ? 'Active' : 'Inactive'} icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} />
                                    <DetailItem label="Joined Date" value={new Date(viewingUser.createdAt).toLocaleDateString()} icon={<Clock className="w-4 h-4 text-gray-400" />} />
                                    <DetailItem label="Shop Name" value={viewingUser.seller?.shopName || 'N/A'} icon={<Store className="w-4 h-4 text-orange-500" />} />
                                    <DetailItem label="Bank Account" value={viewingUser.accountNumber || 'N/A'} icon={<CreditCard className="w-4 h-4 text-blue-500" />} />
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setViewingUser(null)}
                                    className="px-8 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                                >
                                    Close Details
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

function DetailItem({ label, value, icon }) {
    return (
        <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {icon}
                <span className="ml-2">{label}</span>
            </div>
            <div className="text-sm font-bold text-gray-900 ml-6">{value}</div>
        </div>
    );
}
