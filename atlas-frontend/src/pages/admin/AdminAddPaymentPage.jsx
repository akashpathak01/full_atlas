
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Home } from 'lucide-react';

export function AdminAddPaymentPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        method: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        orderId: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting payment:', formData);
        navigate('/admin/finance/payments');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Home className="w-4 h-4" />
                <span>&gt;</span>
                <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/finance')}>Finance</span>
                <span>&gt;</span>
                <span className="text-gray-900 font-medium">Add Payment</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Plus className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-600">Add Payment</h1>
                        <p className="text-sm text-gray-600">Create a new payment record</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/finance')}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/finance/payments')}
                        className="flex items-center px-4 py-2 bg-[#4b5563] text-white rounded-lg hover:bg-[#374151] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Payments
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 bg-orange-50 border-b border-orange-100">
                    <h2 className="text-lg font-bold text-orange-800">Payment Information</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-red-600">Amount *</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-red-600">Payment Method *</label>
                            <select
                                name="method"
                                value={formData.method}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="cash">Cash</option>
                                <option value="wallet">Wallet</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-red-600">Customer Name *</label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                placeholder="Enter customer name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                            <input
                                type="email"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleChange}
                                placeholder="Enter customer email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Customer Phone</label>
                            <input
                                type="tel"
                                name="customerPhone"
                                value={formData.customerPhone}
                                onChange={handleChange}
                                placeholder="Enter customer phone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Order (Optional)</label>
                            <select
                                name="orderId"
                                value={formData.orderId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            >
                                <option value="">Select Order (Optional)</option>
                                <option value="1">Order #1</option>
                                <option value="2">Order #2</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Enter payment notes (optional)"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/finance/payments')}
                            className="px-6 py-2 bg-[#4b5563] text-white font-medium rounded-lg hover:bg-[#374151] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#E15B2D] text-white font-medium rounded-lg hover:bg-[#c44e26] transition-colors flex items-center gap-2"
                        >
                            Create Payment
                        </button>
                    </div>
                </form>
            </div>

            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
