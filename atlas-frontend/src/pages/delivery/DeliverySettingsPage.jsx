
import React, { useState, useEffect } from 'react';
import { Home, Truck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export function DeliverySettingsPage() {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({ total: 0, completed: 0 });

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        const fetchStats = async () => {
            try {
                const res = await api.get('/delivery/stats');
                setStats({
                    total: res.data.total,
                    completed: res.data.delivered
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <Truck className="w-4 h-4 mr-2" />
                <span className="mr-2">Delivery</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Settings</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold text-gray-900">Settings & Profile</h1>
                    <p className="text-gray-500 text-sm">Manage your profile, preferences, and account settings</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Current Time</p>
                    <p className="text-xl font-bold text-gray-900 font-mono">{currentTime.toLocaleTimeString()}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Delivery Stats</p>
                        <div className="text-sm text-gray-600">Total Orders: <span className="font-semibold">{stats.total}</span></div>
                        <div className="text-sm text-green-600">Completed: <span className="font-semibold">{stats.completed}</span></div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 p-1 flex space-x-1 w-max">
                <button onClick={() => navigate('/delivery/dashboard')} className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    Dashboard
                </button>
                <button onClick={() => navigate('/delivery/performance')} className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    Performance
                </button>
                <button className="px-6 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg">
                    Settings
                </button>
            </div>

            {/* Agent Management Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Delivery Agent Management</h3>
                    <p className="text-gray-500 text-sm">View and manage delivery agent preferences</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-12">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No delivery agents found</h3>
                    <p className="text-gray-500 text-sm text-center">Delivery agents will appear here once they are registered.</p>
                </div>
            </div>
        </div>
    );
}
