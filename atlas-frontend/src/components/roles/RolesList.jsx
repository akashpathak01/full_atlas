import React from 'react';
import {
    Users,
    Search,
    Shield,
    Settings,
    UserPlus,
    Clock,
    Edit,
    Eye,
    CheckCircle,
    MoreVertical,
    ChevronRight,
    FileCode
} from 'lucide-react';

const rolesData = [
    {
        id: 1,
        name: 'Accountant',
        permissions: 0,
        description: 'Manages financial operations and reports',
        status: 'Active',
        isProtected: true,
        users: 0,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 2,
        name: 'Admin',
        permissions: 0,
        description: 'System administrator with full access',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 3,
        name: 'Call Center Agent',
        permissions: 0,
        description: 'Handles customer calls and order processing',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 4,
        name: 'Call Center Manager',
        permissions: 0,
        description: 'Manages call center operations and team',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 5,
        name: 'Delivery Agent',
        permissions: 0,
        description: 'Handles delivery operations and tracking',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 6,
        name: 'Packaging Agent',
        permissions: 0,
        description: 'Handles packaging and preparation',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 7,
        name: 'Seller',
        permissions: 0,
        description: 'Merchant dashboard access',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 8,
        name: 'Stock Keeper',
        permissions: 0,
        description: 'Manages warehouse inventory and stock',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        id: 9,
        name: 'Super Admin',
        permissions: 0,
        description: 'Highest level control access',
        status: 'Active',
        isProtected: true,
        users: 1,
        created: 'Jan 22, 2026',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
    }
];

export function RolesList({ onAddUser, onManagePermissions }) {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl font-black text-orange-600">Roles Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage user roles and permissions</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm shadow-md">
                        <FileCode className="w-4 h-4" /> Permissions Editor
                    </button>
                    <button
                        onClick={onManagePermissions}
                        className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 font-bold rounded-lg hover:bg-gray-100 transition-all text-sm"
                    >
                        Manage Permissions
                    </button>
                    <button
                        onClick={onAddUser}
                        className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 font-bold rounded-lg hover:bg-gray-100 transition-all text-sm"
                    >
                        Add User
                    </button>
                </div>
            </div>

            {/* Global Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search roles..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <button className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md">
                    Search
                </button>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rolesData.map((role) => (
                    <div key={role.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group p-5 flex flex-col h-full relative overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${role.bgColor} ${role.iconColor} rounded-xl flex items-center justify-center shadow-sm`}>
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors uppercase tracking-tight">{role.name}</h3>
                                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{role.permissions} permissions</p>
                                </div>
                            </div>
                            <button className="text-blue-600 text-xs font-bold hover:underline flex items-center">
                                View Details
                            </button>
                        </div>

                        {/* Description */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                                {role.description}
                            </p>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-2 mb-6">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-200">
                                {role.status}
                            </span>
                            {role.isProtected && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black uppercase rounded-full border border-purple-200 flex items-center gap-1">
                                    Protected
                                </span>
                            )}
                        </div>

                        {/* Stats & Actions */}
                        <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
                            <div>
                                <p className="text-sm font-bold text-gray-900">{role.users} users</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Created {role.created}</p>
                            </div>
                            <div className="p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-100 text-gray-400 hover:text-blue-600">
                                <Edit className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Small hover hint */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </div>
                ))}
            </div>
        </div>
    );
}
