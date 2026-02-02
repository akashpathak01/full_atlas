import React, { useState } from 'react';
import { Menu, Bell, Search, User, ChevronDown, Check, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { Badge } from './ui/Badge';
import { useAuth } from '../context/AuthContext';

export function Navbar({ onMenuClick }) {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const userName = user?.name || user?.role || 'User';
    const userEmail = user?.email || 'user@atlas.com';
    const userRole = user?.role || 'Agent';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 lg:px-8">
            {/* Left Section */}
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="flex items-center space-x-2">
                    <img src="https://i.ibb.co/YT4Ny4L1/10.png" alt="Atlas" className="h-8 w-auto" />
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hidden sm:block">Atlas Fulfillment</span>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Language Selector (Mock) */}
                <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hidden sm:flex items-center">
                    <Globe className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">EN</span>
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                                <span className="font-semibold text-sm text-gray-900">Notifications</span>
                                <span className="text-xs text-yellow-600 cursor-pointer hover:underline">Mark all read</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer">
                                    <p className="text-sm font-medium text-gray-900">New Order #1234</p>
                                    <p className="text-xs text-gray-500 mt-1">Received 5 mins ago</p>
                                </div>
                                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer">
                                    <p className="text-sm font-medium text-gray-900">Stock Alert</p>
                                    <p className="text-xs text-gray-500 mt-1">Product XYZ is running low</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-2 p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-sm uppercase">
                            {userName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">{userName}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                <p className="text-sm font-medium text-gray-900">{userName}</p>
                                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                                <Badge variant="warning" className="mt-2">{userRole}</Badge>
                            </div>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                            <div className="border-t border-gray-50 mt-1 pt-1">
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
