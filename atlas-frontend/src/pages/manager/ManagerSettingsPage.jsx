import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Check } from 'lucide-react';

export function ManagerSettingsPage() {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        callCenterName: 'Main Call Center',
        workingHours: '9:00 AM - 6:00 PM',
        timezone: 'UTC+3 (Cairo)'
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        orderUpdates: true,
        agentPerformance: false
    });

    const handleSettingChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSaveSettings = () => {
        alert("Settings saved successfully!");
        // Add actual save logic here
    };

    const handleSaveNotifications = () => {
        alert("Notifications saved successfully!");
        // Add actual save logic here
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center space-x-3">
                    <Settings className="w-8 h-8 text-[#f97316]" />
                    <div>
                        <h1 className="text-2xl font-bold text-[#f97316]">Settings</h1>
                        <p className="text-[#64748b] text-sm font-medium">Manage your call center settings</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/manager/dashboard')}
                    className="bg-[#475569] hover:bg-[#334155] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col h-full">
                    <h2 className="text-lg font-bold text-[#1e293b] mb-6 pb-4 border-b border-gray-100">General Settings</h2>

                    <div className="space-y-6 flex-grow">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider">Call Center Name</label>
                            <input
                                type="text"
                                name="callCenterName"
                                value={settings.callCenterName}
                                onChange={handleSettingChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1e293b] placeholder-gray-400 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider">Working Hours</label>
                            <input
                                type="text"
                                name="workingHours"
                                value={settings.workingHours}
                                onChange={handleSettingChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1e293b] placeholder-gray-400 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider">Timezone</label>
                            <div className="relative">
                                <select
                                    name="timezone"
                                    value={settings.timezone}
                                    onChange={handleSettingChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1e293b] appearance-none focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all cursor-pointer"
                                >
                                    <option>UTC+3 (Cairo)</option>
                                    <option>UTC+0 (London)</option>
                                    <option>UTC-5 (New York)</option>
                                    <option>UTC+4 (Dubai)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSaveSettings}
                        className="mt-8 w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] active:scale-95"
                    >
                        Save Settings
                    </button>
                </div>

                {/* Notification Settings Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col h-full">
                    <h2 className="text-lg font-bold text-[#1e293b] mb-6 pb-4 border-b border-gray-100">Notification Settings</h2>

                    <div className="space-y-8 flex-grow">
                        {/* Email Notifications */}
                        <div
                            className="flex items-start justify-between cursor-pointer group select-none"
                            onClick={() => toggleNotification('emailNotifications')}
                        >
                            <div className="pr-4">
                                <h3 className="text-sm font-bold text-[#1e293b] group-hover:text-[#f97316] transition-colors">Email Notifications</h3>
                                <p className="text-xs text-[#64748b] mt-1 line-clamp-2">Receive email notifications for important events</p>
                            </div>
                            <div className={`flex-shrink-0 w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${notifications.emailNotifications ? 'bg-[#f97316] border-[#f97316]' : 'bg-white border-gray-300'}`}>
                                {notifications.emailNotifications && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                            </div>
                        </div>

                        {/* Order Updates */}
                        <div
                            className="flex items-start justify-between cursor-pointer group select-none"
                            onClick={() => toggleNotification('orderUpdates')}
                        >
                            <div className="pr-4">
                                <h3 className="text-sm font-bold text-[#1e293b] group-hover:text-[#f97316] transition-colors">Order Updates</h3>
                                <p className="text-xs text-[#64748b] mt-1 line-clamp-2">Get notified when orders are updated</p>
                            </div>
                            <div className={`flex-shrink-0 w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${notifications.orderUpdates ? 'bg-[#f97316] border-[#f97316]' : 'bg-white border-gray-300'}`}>
                                {notifications.orderUpdates && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                            </div>
                        </div>

                        {/* Agent Performance */}
                        <div
                            className="flex items-start justify-between cursor-pointer group select-none"
                            onClick={() => toggleNotification('agentPerformance')}
                        >
                            <div className="pr-4">
                                <h3 className="text-sm font-bold text-[#1e293b] group-hover:text-[#f97316] transition-colors">Agent Performance</h3>
                                <p className="text-xs text-[#64748b] mt-1 line-clamp-2">Receive daily performance reports</p>
                            </div>
                            <div className={`flex-shrink-0 w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${notifications.agentPerformance ? 'bg-[#f97316] border-[#f97316]' : 'bg-white border-gray-300'}`}>
                                {notifications.agentPerformance && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSaveNotifications}
                        className="mt-8 w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] active:scale-95"
                    >
                        Save Notifications
                    </button>
                </div>
            </div>
        </div>
    );
}
