
import React from 'react';
import { callCenterDashboardData } from '../../data/callCenterDummyData';
import { Headphones, List, CheckCircle, Clock, XCircle, Phone } from 'lucide-react';

export function CallCenterDashboardPage() {
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Call Center</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Agent Dashboard</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-start">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <Headphones className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Call Center Agent Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your assigned orders and calls</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end text-sm text-gray-500 mb-1">
                        <span className="mr-2">Current Time</span>
                        <span className="text-xl font-bold text-gray-900">{callCenterDashboardData.currentTime}</span>
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-500">
                        <span className="mr-2">Today's Date</span>
                        <span className="text-lg font-bold text-gray-900">{callCenterDashboardData.currentDate}</span>
                    </div>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex justify-between items-center relative overflow-hidden">
                <div className="flex items-center relative z-10">
                    <div className="p-3 bg-orange-100 rounded-full mr-4">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Welcome back, Call Center Agent!</h2>
                        <p className="text-gray-500 mt-1">
                            You are logged in as a <span className="text-orange-500 font-bold">Call Center Agent</span>
                        </p>
                    </div>
                </div>
                <div className="text-right relative z-10">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Last Login</p>
                    <p className="text-sm font-bold text-gray-700">{callCenterDashboardData.lastLogin}</p>
                </div>
                {/* Decorative blob similar to screenshot */}
                <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-orange-400 to-orange-500"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mr-3">
                        <List className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Assigned Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">{callCenterDashboardData.stats.assignedOrders}</h3>
                        <p className="text-xs text-blue-600 font-medium">↑ Active</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-green-50 rounded-lg mr-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Confirmed Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">{callCenterDashboardData.stats.confirmedOrders}</h3>
                        <p className="text-xs text-green-600 font-medium">↑ Completed</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-orange-50 rounded-lg mr-3">
                        <Clock className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Postponed Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">{callCenterDashboardData.stats.postponedOrders}</h3>
                        <p className="text-xs text-orange-600 font-medium">↑ Pending</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-red-50 rounded-lg mr-3">
                        <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Cancelled Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">{callCenterDashboardData.stats.cancelledOrders}</h3>
                        <p className="text-xs text-red-600 font-medium">↑ Cancelled</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 bg-purple-50 rounded-lg mr-3">
                        <Phone className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Total Calls Today</p>
                        <h3 className="text-2xl font-bold text-gray-900">{callCenterDashboardData.stats.totalCalls}</h3>
                        <p className="text-xs text-purple-600 font-medium">↑ Today</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Priority Orders */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center">
                            <div className="p-1.5 bg-orange-100 rounded mr-2">
                                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Current Priority Orders</h3>
                                <p className="text-xs text-gray-500">Orders requiring immediate attention</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-orange-500 hover:text-orange-600">View all</button>
                    </div>
                    <div className="p-5 space-y-4">
                        {callCenterDashboardData.priorityOrders.map((order, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
                                <div className="flex items-start pl-3">
                                    <div className="mr-3 mt-1">
                                        <div className="bg-red-100 p-1.5 rounded text-red-500">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{order.id} - {order.customer}</h4>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-600 font-medium mr-2">{order.product}</span>
                                            <span>• {order.units} units</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                                    </div>
                                </div>
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center text-xs font-bold shadow-sm shadow-orange-200">
                                    <Phone className="w-3 h-3 mr-1.5" />
                                    Call Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity (Empty State) */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center">
                            <div className="p-1.5 bg-blue-100 rounded mr-2">
                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                                <p className="text-xs text-gray-500">Your latest calls and actions</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h4 className="text-gray-900 font-medium mb-1">No Recent Activity</h4>
                        <p className="text-gray-500 text-sm">Start making calls to see your activity here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
