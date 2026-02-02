import React from 'react';
import {
    User,
    Mail,
    Phone,
    ArrowLeft,
    Shield,
    Building2,
    Globe,
    Lock,
    Upload,
    CreditCard,
    CheckCircle,
    Link as LinkIcon
} from 'lucide-react';

export function CreateUserForm({ onBack }) {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-orange-600">Create New User</h1>
                        <p className="text-sm text-gray-500 font-medium tracking-tight">Add a new user to the system with specific role and permissions</p>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-sm flex items-center gap-2 shadow-sm uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to List
                </button>
            </div>

            <form className="space-y-6 max-w-5xl mx-auto pb-12">
                {/* 1. Personal Information */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
                            Personal Information
                        </h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Basic user details and contact information</p>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">First Name</label>
                            <input type="text" placeholder="Enter first name" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Last Name</label>
                            <input type="text" placeholder="Enter last name" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Email <span className="text-red-500">*</span></label>
                            <input type="email" placeholder="Enter email address" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Phone</label>
                            <input type="text" placeholder="Enter phone number" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                    </div>
                </div>

                {/* 2. Role Assignment */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Role Assignment</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Assign role to the user</p>
                    </div>
                    <div className="p-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">User Role</label>
                            <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none">
                                <option>Select User Role</option>
                                <option>Accountant</option>
                                <option>Admin</option>
                                <option>Call Center Agent</option>
                                <option>Delivery Agent</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. Store Information */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Store Information</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Store details and website link</p>
                    </div>
                    <div className="p-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">Store Link <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <input type="text" placeholder="https://yourstore.com" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                    </div>
                </div>

                {/* 4. Bank Account Information */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Bank Account Information</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Bank details for payment processing</p>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Bank Name <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <input type="text" placeholder="Enter bank name" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Account Holder Name <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <input type="text" placeholder="Enter account holder name" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Account Number / IBAN <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <input type="text" placeholder="Enter account number or IBAN" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">IBAN Confirmation <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <input type="text" placeholder="Confirm IBAN" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                    </div>
                </div>

                {/* 5. ID Verification */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">ID Verification</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Upload ID images for verification</p>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">ID Front Image <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-all group cursor-pointer">
                                <div className="p-3 bg-gray-100 text-gray-400 rounded-full group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all mb-4 shadow-inner">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div className="flex bg-gray-100 border border-gray-200 rounded overflow-hidden shadow-sm">
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-black uppercase">Choose file</span>
                                    <span className="px-3 py-1 text-gray-400 text-[10px] font-bold">No file chosen</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-tighter">Upload the front side of ID card</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">ID Back Image <span className="text-[9px] lowercase font-medium text-gray-400">(Optional)</span></label>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-all group cursor-pointer">
                                <div className="p-3 bg-gray-100 text-gray-400 rounded-full group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all mb-4 shadow-inner">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div className="flex bg-gray-100 border border-gray-200 rounded overflow-hidden shadow-sm">
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-black uppercase">Choose file</span>
                                    <span className="px-3 py-1 text-gray-400 text-[10px] font-bold">No file chosen</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-tighter">Upload the back side of ID card</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Account Security */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Account Security</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Set up user credentials and security settings</p>
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Minimum 8 characters, must contain uppercase, lowercase, and numbers.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Confirm Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 py-4 border-t border-gray-50">
                            <input type="checkbox" id="isActive" defaultChecked className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer shadow-sm" />
                            <div className="cursor-pointer" onClick={() => document.getElementById('isActive').click()}>
                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-0.5">Is Active</label>
                                <p className="text-[10px] text-gray-400 font-bold tracking-tight">User account is active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-8 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-10 py-3.5 bg-gray-100 text-gray-600 font-black rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-12 py-3.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs"
                    >
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
}
