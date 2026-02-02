import React from 'react';
import {
    User,
    Mail,
    Building2,
    Globe,
    Phone,
    Calendar,
    ArrowLeft,
    Edit,
    Shield,
    Power
} from 'lucide-react';

export function SubscriberDetails({ subscriber, onBack, onEdit }) {
    // Safe data mapping
    const data = subscriber || {};

    // Safe string helper
    const s = (val, fallback = 'N/A') => {
        if (val === undefined || val === null || val === '') return fallback;
        return String(val);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                        <User size={28} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{s(data.name, 'User Details')}</h1>
                        <p className="text-sm text-gray-500 font-medium">{s(data.email, 'No email associated')}</p>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={() => onBack?.()}
                        className="flex-1 md:flex-none px-6 py-2.5 bg-gray-700 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={16} /> Back to List
                    </button>
                    <button
                        onClick={() => onEdit?.()}
                        className="flex-1 md:flex-none px-6 py-2.5 bg-orange-600 text-white text-sm font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <Edit size={16} /> Edit User
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: Summary Card */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                        <div className="w-24 h-24 bg-orange-500 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-100 mb-4">
                            {s(data.initials || data.name?.[0] || 'U').toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{s(data.name)}</h2>
                        <div className="mt-3">
                            <span className="px-4 py-1.5 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-200">
                                {s(data.status, 'Active')}
                            </span>
                        </div>
                    </div>

                    <div className="bg-orange-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-100">
                        <h3 className="font-bold text-lg mb-2 text-white">Verified Account</h3>
                        <p className="text-orange-100 text-sm mb-4">This profile is managed and verified by the Atlas system.</p>
                        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 p-3 rounded-xl border border-white/20">
                            <Shield size={16} /> Identity Confirmed
                        </div>
                    </div>
                </div>

                {/* Right Side: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50/30">
                            <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1 h-4 bg-orange-500 rounded-full"></div> Personal Information
                            </h3>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                                { label: 'Full Name', value: data.name, icon: User },
                                { label: 'Email Address', value: data.email, icon: Mail },
                                { label: 'Company', value: data.business || data.company, icon: Building2 },
                                { label: 'Location', value: data.country || data.location, icon: Globe },
                                { label: 'Phone', value: data.phone, icon: Phone },
                                { label: 'Date Joined', value: data.date || data.since, icon: Calendar }
                            ].map((item, idx) => {
                                const ItemIcon = item.icon; // Use capitalized variable for JSX
                                return (
                                    <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
                                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                            <ItemIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                            <p className="font-bold text-gray-900">{s(item.value)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Role Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                            <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">User Role</h3>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase rounded-lg border border-yellow-200">
                                Active
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="p-5 bg-yellow-50/50 rounded-2xl border border-yellow-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-yellow-600 border border-yellow-100">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900 text-lg">{s(data.role, 'Subscriber')}</h4>
                                    <p className="text-xs text-yellow-700 font-medium">Standard access permissions for operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
