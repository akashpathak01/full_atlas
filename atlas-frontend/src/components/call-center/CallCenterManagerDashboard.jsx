import React, { useState } from 'react';
import { Phone, Clock, Users, CheckCircle, AlertTriangle, Play, Wrench, Plus, User, HelpCircle, LayoutDashboard } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';
import { adminCallCenterData } from '../../data/adminDummyData';

export function CallCenterManagerDashboard() {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });


    const handleAction = (actionType) => {
        let config = {
            isOpen: true,
            confirmText: 'Confirm',
            cancelText: 'Cancel'
        };

        switch (actionType) {
            case 'autoAssign':
                config.title = 'Confirm';
                config.message = 'Are you sure you want to auto-assign all unassigned orders?';
                config.onConfirm = () => console.log('Auto assigning orders...');
                break;
            case 'fixUnassigned':
                config.title = 'Confirm';
                config.message = 'Are you sure you want to fix unassigned orders? This will attempt to re-route them.';
                config.onConfirm = () => console.log('Fixing unassigned orders...');
                break;
            case 'createTest':
                config.title = 'Confirm';
                config.message = 'Are you sure you want to create test orders? This will generate dummy data.';
                config.onConfirm = () => console.log('Creating test orders...');
                break;
            default:
                return;
        }

        setModalConfig(config);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                        <Phone className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Call Center Manager</h1>
                        <p className="text-sm text-gray-500">Manager: Super Admin</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" /> Main Dashboard
                    </button>
                    <div>
                        <p className="text-xs text-gray-500">Live Operations</p>
                        <p className="text-lg font-bold text-gray-900">04:20:02 PM</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg"><Phone className="w-8 h-8 text-blue-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <div className="text-2xl font-bold text-gray-900">0</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-lg"><Clock className="w-8 h-8 text-orange-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Pending Approval</p>
                        <div className="text-2xl font-bold text-orange-600">0</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg"><Users className="w-8 h-8 text-green-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Active Agents</p>
                        <div className="text-2xl font-bold text-gray-900">0</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Approved Today</p>
                        <div className="text-2xl font-bold text-green-600">0</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Awaiting Approval */}
                <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
                    <div className="p-4 bg-orange-50 border-b border-orange-100 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-orange-800 font-semibold">
                            <AlertTriangle className="w-5 h-5" />
                            Orders Awaiting Approval
                        </div>
                        <span className="bg-orange-200 text-orange-900 px-2 py-0.5 rounded text-xs font-medium">0 orders</span>
                    </div>
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1">All Orders Approved</h3>
                        <p className="text-gray-500 text-sm">No orders are currently awaiting approval</p>
                    </div>
                </div>

                {/* Recently Approved Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
                    <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-green-800 font-semibold">
                            <CheckCircle className="w-5 h-5" />
                            Recently Approved Orders
                        </div>
                        <span className="bg-green-200 text-green-900 px-2 py-0.5 rounded text-xs font-medium">0 today</span>
                    </div>
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1">No Recent Approvals</h3>
                        <p className="text-gray-500 text-sm">No orders have been approved recently</p>
                    </div>
                </div>
            </div>

            {/* Order Assignment Management */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="p-4 bg-blue-50 border-b border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold">
                        <Users className="w-5 h-5" />
                        Order Assignment Management
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleAction('autoAssign')}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Play className="w-3 h-3" /> Auto Assign Orders
                        </button>
                        <button
                            onClick={() => handleAction('fixUnassigned')}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                            <Wrench className="w-3 h-3" /> Fix Unassigned Orders
                        </button>
                        <button
                            onClick={() => handleAction('createTest')}
                            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2"
                        >
                            <Plus className="w-3 h-3" /> Create Test Orders
                        </button>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-900 mb-6 text-left">Assigned Orders</h4>
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="p-3 bg-gray-100 rounded-full mb-3">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">No assigned orders</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-900 mb-6 text-left">Unassigned Orders</h4>
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="p-3 bg-green-50 rounded-full mb-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <p className="text-gray-500 text-sm">All orders are assigned</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5" /> Performance Overview
                    </h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Approval Rate</p>
                        <h3 className="text-xl font-bold text-gray-900">0%</h3>
                    </div>
                    <div>
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Avg Response Time</p>
                        <h3 className="text-xl font-bold text-gray-900">0 min</h3>
                    </div>
                    <div>
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Customer Satisfaction</p>
                        <h3 className="text-xl font-bold text-gray-900">0/5</h3>
                    </div>
                    <div>
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Phone className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Calls Handled</p>
                        <h3 className="text-xl font-bold text-gray-900">0</h3>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                {...modalConfig}
            />
        </div>
    );
}
