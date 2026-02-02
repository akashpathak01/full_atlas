import React from 'react';
import { Users, Shield, Lock, Settings, UserPlus, FileText, Activity, Server, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Alert */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center text-green-700">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                    <span className="font-medium">Welcome Admin User! Login successful.</span>
                </div>
                <button className="text-green-500 hover:text-green-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-500">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <span className="font-semibold text-slate-700">Home</span>
                <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="font-semibold text-slate-800">Dashboard</span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Total Users</p>
                            <p className="text-3xl font-bold text-slate-800 mt-1">0</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Active Users</p>
                            <p className="text-3xl font-bold text-slate-800 mt-1">0</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg text-green-600">
                            <UserPlus className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Total Roles</p>
                            <p className="text-3xl font-bold text-slate-800 mt-1">0</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
                            <Shield className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Total Permissions</p>
                            <p className="text-3xl font-bold text-slate-800 mt-1">0</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                            <Lock className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-[#FFE59E] px-6 py-4">
                        <h3 className="text-slate-800 font-bold text-lg">Quick Actions</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <button className="w-full flex items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mr-4 group-hover:bg-blue-100 transition-colors">
                                <UserPlus className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">Create New User</p>
                                <p className="text-sm text-slate-500">Add a new user to the system</p>
                            </div>
                        </button>

                        <button className="w-full flex items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="bg-green-50 p-2 rounded-lg text-green-600 mr-4 group-hover:bg-green-100 transition-colors">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">Create New Role</p>
                                <p className="text-sm text-slate-500">Define a new role with permissions</p>
                            </div>
                        </button>

                        <button className="w-full flex items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600 mr-4 group-hover:bg-yellow-100 transition-colors">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">View Audit Log</p>
                                <p className="text-sm text-slate-500">Review system activity logs</p>
                            </div>
                        </button>

                        <button className="w-full flex items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600 mr-4 group-hover:bg-purple-100 transition-colors">
                                <Server className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">System Status</p>
                                <p className="text-sm text-slate-500">Check system health and performance</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-[#FFE59E] px-6 py-4">
                        <h3 className="text-slate-800 font-bold text-lg">Recent Activities</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6 relative">
                            {/* Timeline line */}
                            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                            {[0, 1, 1, 1, 2].map((min, i) => (
                                <div key={i} className="flex items-center relative z-10">
                                    <div className="bg-white p-1">
                                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                                    </div>
                                    <span className="text-sm text-slate-500 ml-4">{min} minute{min !== 1 && 's'} ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
