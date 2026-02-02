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
    ShieldCheck,
    HelpCircle
} from 'lucide-react';

const SubscriberView = ({ subscriber, onBack, onEdit }) => {
    // Ultra-safe data processing
    const data = subscriber || {};

    const InfoRow = ({ label, value, Icon, iconColor }) => (
        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
            <div className={`p-2 rounded-lg bg-${iconColor}-50 text-${iconColor}-600`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">{label}</p>
                <p className="font-bold text-gray-900">{String(value || 'Not specified')}</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900">{data.name || 'User Details'}</h1>
                        <p className="text-gray-500 font-medium">{data.email || 'No email associated'}</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => onBack?.()}
                        className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <button
                        onClick={() => onEdit?.()}
                        className="flex-1 md:flex-none px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                    >
                        <Edit size={18} /> Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Stats/Status Panel */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-700" />
                        <div className="px-6 pb-6 -mt-12 text-center">
                            <div className="inline-flex w-24 h-24 rounded-3xl bg-white p-1 border-4 border-white shadow-xl mb-4">
                                <div className="w-full h-full rounded-2xl bg-orange-100 flex items-center justify-center text-3xl font-black text-orange-600">
                                    {String(data.initials || data.name?.[0] || 'U').toUpperCase()}
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900">{data.name}</h3>
                            <div className="mt-2 flex justify-center">
                                <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-black uppercase rounded-full border border-green-200">
                                    {data.status || 'Active'}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/30">
                            <div className="p-4 text-center">
                                <p className="text-2xl font-black text-gray-900">1</p>
                                <p className="text-[10px] uppercase font-bold text-gray-400">Total Roles</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-2xl font-black text-gray-900">1</p>
                                <p className="text-[10px] uppercase font-bold text-gray-400">Recent Login</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-black text-lg mb-2">Account Overview</h3>
                            <p className="text-orange-100 text-sm font-medium mb-4">This profile is fully managed and verified by the system.</p>
                            <div className="flex items-center gap-2 text-sm font-bold bg-white/10 p-3 rounded-xl border border-white/20">
                                <ShieldCheck size={20} /> Verified Subscriber
                            </div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <Shield size={120} />
                        </div>
                    </div>
                </div>

                {/* Main Details Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <InfoRow label="Full Name" value={data.name} Icon={User} iconColor="orange" />
                            <InfoRow label="Email Address" value={data.email} Icon={Mail} iconColor="blue" />
                            <InfoRow label="Company/Business" value={data.business || data.company} Icon={Building2} iconColor="purple" />
                            <InfoRow label="Residence Country" value={data.country || data.location} Icon={Globe} iconColor="red" />
                            <InfoRow label="Phone Number" value={data.phone} Icon={Phone} iconColor="green" />
                            <InfoRow label="Registration Date" value={data.date || data.since} Icon={Calendar} iconColor="gray" />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Role & Permissions</h3>
                        </div>
                        <div className="p-6">
                            <div className="bg-yellow-50 rounded-2xl p-6 flex items-center justify-between border border-yellow-100">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-white rounded-xl shadow-sm text-yellow-600">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-lg">{data.role || 'Subscriber'}</h4>
                                        <p className="text-yellow-700 font-medium text-sm">Active system role with member access.</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-white text-yellow-600 text-[10px] font-black uppercase rounded-lg shadow-sm border border-yellow-100">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriberView;
