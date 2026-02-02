import React, { useState } from 'react';
import {
    User, Phone, Calendar, ArrowLeft, MapPin,
    ShoppingCart, Plus, Trash2, X, Check, Save,
    Users, Layout, DollarSign, Activity, FileText,
    RefreshCw
} from 'lucide-react';

export function OrderForm({ onBack }) {
    const [formData, setFormData] = useState({
        customerName: 'Unknown Customer',
        customerPhone: '+971501234567',
        orderDate: '22-01-2026 06:40',
        status: 'Pending',
        seller: '',
        city: '',
        area: '',
        streetAddress: '',
        country: 'United Arab Emirates',
        product: '',
        variant: 'No Variant',
        quantity: 1,
        unitPrice: '',
        customerNotes: '',
        internalNotes: '',
        assignment: 'auto'
    });

    const sections = [
        {
            title: 'Customer Information',
            icon: User,
            fields: [
                { label: 'Customer Name', key: 'customerName', type: 'text', placeholder: 'Customer Name', icon: User, required: true },
                { label: 'Customer Phone', key: 'customerPhone', type: 'text', placeholder: '+971501234567', icon: Phone, required: true },
                { label: 'Order Date', key: 'orderDate', type: 'datetime-local', icon: Calendar, required: true },
                { label: 'Status', key: 'status', type: 'select', icon: Activity, options: ['Pending'] },
            ]
        },
        {
            title: 'Seller Information',
            icon: ShoppingCart,
            fields: [
                { label: 'Select Seller', key: 'seller', type: 'select', placeholder: 'Select a seller', required: true, options: ['Select a seller'] },
            ]
        },
        {
            title: 'Address Information',
            icon: MapPin,
            fields: [
                { label: 'City', key: 'city', type: 'select', placeholder: 'Select City', required: true, options: ['Select City'] },
                { label: 'Area', key: 'area', type: 'select', placeholder: 'Select Area - Please select city first', required: true, options: ['Select Area - Please select city first'] },
                { label: 'Street Address', key: 'streetAddress', type: 'text', placeholder: 'Enter street address and building number', required: true },
                { label: 'Country', key: 'country', type: 'select', options: ['United Arab Emirates'], required: true },
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#E15B2D] text-white rounded-full">
                        <Plus className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#E15B2D]">Create New Order</h1>
                        <p className="text-sm text-gray-500">Add a new order to the system</p>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 bg-[#6c757d] text-white px-4 py-2 rounded-lg hover:bg-[#5a6268] transition-colors shadow-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Form Content */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Customer, Seller, Address Sections */}
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                                <section.icon className="w-5 h-5 text-[#E15B2D]" />
                                <h3 className="font-bold text-gray-800">{section.title}</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {section.fields.map((field, fIdx) => (
                                        <div key={fIdx} className={`${field.label === 'Street Address' ? 'md:col-span-2' : ''} space-y-1.5`}>
                                            <label className="text-sm font-bold text-gray-700">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            <div className="relative">
                                                {field.icon && <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
                                                {field.type === 'select' ? (
                                                    <select className={`w-full ${field.icon ? 'pl-10' : 'px-4'} pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none transition-all`}>
                                                        {field.options?.map((opt, oIdx) => (
                                                            <option key={oIdx}>{opt}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        className={`w-full ${field.icon ? 'pl-10' : 'px-4'} py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all`}
                                                        defaultValue={formData[field.key]}
                                                    />
                                                )}
                                                {field.type === 'select' && (
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <Activity className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Product Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-[#E15B2D]" />
                                <h3 className="font-bold text-gray-800">Product Information</h3>
                            </div>
                            <button className="flex items-center gap-2 bg-[#28a745] text-white px-4 py-1.5 rounded-lg text-sm font-bold">
                                <Plus className="w-4 h-4" />
                                Add Product
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Product <span className="text-red-500">*</span></label>
                                    <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                        <option>Select Product</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Product Variant</label>
                                    <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none appearance-none">
                                        <option>No Variant</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Quantity <span className="text-red-500">*</span></label>
                                    <input type="number" defaultValue="1" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Unit Price (AED) <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none" />
                                </div>
                            </div>
                            <div className="mt-6 text-right">
                                <p className="text-lg font-bold">Total Price: <span className="text-[#E15B2D]">AED 0.00</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#E15B2D]" />
                            <h3 className="font-bold text-gray-800">Notes</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Customer Notes</label>
                                    <textarea
                                        placeholder="Customer notes or special instructions"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none min-h-[100px]"
                                    ></textarea>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Internal Notes</label>
                                    <textarea
                                        placeholder="Internal notes for team members"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none min-h-[100px]"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">Order Summary</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Status</span>
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold text-xs uppercase tracking-wider">Pending Review</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Total Amount</span>
                                <span className="text-[#28a745] font-bold text-lg">AED 0.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Agent Assignment */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#E15B2D]" />
                            <h3 className="font-bold text-gray-800">Agent Assignment</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input type="radio" name="assignment" className="peer hidden" defaultChecked />
                                    <div className="w-5 h-5 border-2 border-[#E15B2D] rounded-full peer-checked:bg-[#E15B2D] transition-all"></div>
                                    <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white rounded-full hidden peer-checked:block"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Auto Assign</p>
                                    <p className="text-xs text-gray-400">Automatically distribute orders among available agents</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input type="radio" name="assignment" className="peer hidden" />
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-[#E15B2D] peer-checked:bg-[#E15B2D] transition-all"></div>
                                    <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white rounded-full hidden peer-checked:block"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Manual Assign</p>
                                    <p className="text-xs text-gray-400">Select a specific agent</p>
                                </div>
                            </label>
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
                                <Activity className="w-5 h-5 text-blue-500 shrink-0" />
                                <p className="text-xs text-blue-600 font-medium leading-relaxed">
                                    Orders will be automatically distributed among 0 available agents
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Quick Actions</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <button
                                onClick={onBack}
                                className="w-full flex items-center justify-center gap-2 bg-[#2d6ae1] text-white py-2.5 rounded-lg font-bold shadow-sm hover:bg-[#2558ba]"
                            >
                                <Layout className="w-4 h-4" />
                                All Orders
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 bg-[#6c757d] text-white py-2.5 rounded-lg font-bold shadow-sm hover:bg-[#5a6268]">
                                <RefreshCw className="w-4 h-4" />
                                Reset Form
                            </button>
                        </div>
                    </div>

                    {/* Create Order */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Create Order</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 bg-[#E15B2D] text-white py-3 rounded-lg font-bold shadow-md hover:bg-[#d05026]">
                                <Save className="w-5 h-5" />
                                Create Order
                            </button>
                            <button
                                onClick={onBack}
                                className="w-full flex items-center justify-center gap-2 bg-[#6c757d] text-white py-3 rounded-lg font-bold shadow-sm hover:bg-[#5a6268]"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
