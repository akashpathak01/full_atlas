import React from 'react';
import { ArrowLeft, CheckCircle, Edit, Info, User, Mail, Phone, Building2, Globe, Shield, Power, Eye, Calendar, LogIn, Save, X } from 'lucide-react';

export function EditSubscriber({ subscriber, onBack, onViewDetails }) {
    // Robust data mapping
    const user = {
        name: subscriber?.name || 'Delivery Agent',
        email: subscriber?.email || 'delivery@atlas.com',
        initials: subscriber?.initials || 'DA',
        status: subscriber?.status || 'Active',
        role: subscriber?.role || 'Delivery Agent',
        company: subscriber?.business || subscriber?.company || '',
        country: subscriber?.country || subscriber?.location || '',
        phone: subscriber?.phone || '',
        since: subscriber?.date || subscriber?.since || 'January 22, 2026'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Edit className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-600">Edit User</h1>
                        <p className="text-sm text-gray-500">Update information for {user.name}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onViewDetails}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" /> View Details
                    </button>
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to List
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* User Info Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-orange-500 text-white flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <h3 className="font-bold">User Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg w-fit mb-4">
                                <Info className="w-4 h-4" />
                                <span className="text-sm font-semibold">Basic Information</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <User className="w-3 h-3" /> Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" defaultValue={user.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <User className="w-3 h-3" /> Username <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <Mail className="w-3 h-3" /> Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" defaultValue={user.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <Phone className="w-3 h-3" /> Phone Number
                                    </label>
                                    <input type="text" defaultValue={user.phone} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <Building2 className="w-3 h-3" /> Company Name
                                    </label>
                                    <input type="text" defaultValue={user.company} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <Globe className="w-3 h-3" /> Country
                                    </label>
                                    <input type="text" defaultValue={user.country} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg w-fit mt-8 mb-4">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-semibold">Account Settings</span>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Account Status
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">Enable or disable user access to the system</p>
                                </div>
                                {/* Toggle Switch Placeholder */}
                                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* User Roles */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-purple-600 mb-4">
                                <Shield className="w-5 h-5" />
                                <h3 className="font-bold">User Roles</h3>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <Shield className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{user.role}</h4>
                                        <p className="text-xs text-gray-500">Handles delivery operations and tracking</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded flex items-center gap-1">
                                        ★ Primary
                                    </span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded flex items-center gap-1">
                                        ● Active
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg flex gap-2">
                                <Info className="w-4 h-4 shrink-0" />
                                <p>Role management is handled through the Roles section. Contact an administrator to modify user roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Account Information Footer */}
                    <div className="bg-blue-50/50 rounded-xl shadow-sm border border-blue-100 overflow-hidden p-6">
                        <div className="flex items-center gap-2 text-blue-700 mb-4">
                            <Info className="w-5 h-5" />
                            <h3 className="font-bold">Account Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg flex gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg h-fit"><Calendar className="w-4 h-4 text-gray-600" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Date Joined</p>
                                    <p className="text-sm font-medium text-gray-900">{user.since}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg flex gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg h-fit"><LogIn className="w-4 h-4 text-gray-600" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Last Login</p>
                                    <p className="text-sm font-medium text-gray-900">January 23, 2026<br /><span className="text-xs text-gray-500">05:20</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={onBack} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2">
                            <X className="w-4 h-4" /> Cancel
                        </button>
                        <button className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="p-1 bg-orange-100 rounded"><Edit className="w-3 h-3 text-orange-600" /></div>
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                                <Power className="w-5 h-5 text-blue-600" />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">Deactivate User</h4>
                                    <p className="text-xs text-gray-500">Toggle user status</p>
                                </div>
                            </button>
                            <button onClick={onViewDetails} className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                                <Eye className="w-5 h-5 text-green-600" />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">View Full Profile</h4>
                                    <p className="text-xs text-gray-500">View detailed info</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* User Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="p-1 bg-purple-100 rounded"><User className="w-3 h-3 text-purple-600" /></div>
                            User Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status:</span>
                                <span className="font-medium text-green-600">{user.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Roles:</span>
                                <span className="font-medium text-gray-900">1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Joined:</span>
                                <span className="font-medium text-gray-900">{user.since}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                        <h3 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            Tips
                        </h3>
                        <ul className="text-xs text-yellow-700 space-y-2 list-disc list-inside">
                            <li>Keep user information up to date</li>
                            <li>Verify email addresses are correct</li>
                            <li>Contact admin for role changes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
