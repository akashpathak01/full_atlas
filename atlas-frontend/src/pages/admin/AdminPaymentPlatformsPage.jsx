
import React from 'react';
import { adminPaymentPlatformsData } from '../../data/adminDummyData';
import { Plug, Plus, Home, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminPaymentPlatformsPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Platform Integrations</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage payment platform integrations for automated data sync</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Platform
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Plug className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Platforms</p>
                        <h3 className="text-xl font-bold text-gray-900">0</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Connections</p>
                        <h3 className="text-xl font-bold text-gray-900">0</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Verification</p>
                        <h3 className="text-xl font-bold text-gray-900">0</h3>
                    </div>
                </div>
            </div>

            {/* Empty State / List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-blue-600 text-white">
                    <h2 className="font-bold">Payment Platform Integrations</h2>
                </div>

                <div className="p-12 flex flex-col items-center justify-center text-center">
                    <Plug className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">No payment platform integrations found</h3>
                    <p className="text-gray-500 mt-1 mb-6">Add payment platform integrations to automate data synchronization.</p>
                    <button className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Your First Platform
                    </button>
                </div>
            </div>

            {/* Supported Platforms */}
            <div className="bg-[#5c6ac4] text-white p-4 rounded-t-xl mt-8">
                <h2 className="font-bold">Supported Platforms</h2>
            </div>
            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Amazon */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-orange-500 font-bold text-2xl">a</span>
                            <h3 className="font-bold text-blue-900 text-lg">Amazon Seller Central</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Connect your Amazon Seller Central account to sync orders and payments automatically.</p>
                        <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                            <li>Order synchronization</li>
                            <li>Payment tracking</li>
                            <li>Inventory updates</li>
                        </ul>
                    </div>

                    {/* Shopify */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white font-bold">S</div>
                            <h3 className="font-bold text-blue-900 text-lg">Shopify</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Integrate your Shopify store to automatically sync orders, payments, and customer data.</p>
                        <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                            <li>Real-time order sync</li>
                            <li>Payment processing</li>
                            <li>Customer management</li>
                        </ul>
                    </div>

                    {/* Magento */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-white font-bold">M</div>
                            <h3 className="font-bold text-blue-900 text-lg">Magento</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Connect your Magento store for seamless order and payment synchronization.</p>
                        <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                            <li>Order management</li>
                            <li>Payment tracking</li>
                            <li>Product sync</li>
                        </ul>
                    </div>
                </div>
            </div>

            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
