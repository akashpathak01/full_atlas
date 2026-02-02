
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, CheckCircle, PlusCircle, AlertCircle } from 'lucide-react';

export function AdminCreateSourcingRequestPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        additionalInfo: '',
        sourceName: '',
        additionalSpecs: '',
        cartonQuantity: '',
        sourceCountry: '',
        destinationCountry: '',
        fundingSource: '',
        supplierName: '',
        supplierPhone: '',
        productDescription: '',
        targetPrice: '',
        currency: 'AED',
        brandNew: false,
        originalPackaging: false,
        warrantyRequired: false,
        certifiedProducts: false,
        specialInstructions: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sourcing Request Submitted:', formData);
        navigate('/admin/sourcing');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-orange-600">Create Sourcing Request</h1>
                    <p className="text-sm text-gray-600 mt-1">Fill out all required fields to create your sourcing request.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/sourcing')}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Requests
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Required Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                        <div className="p-1 bg-blue-100 rounded-full">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <h2 className="font-bold text-gray-900">Required Information</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-red-500 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter the name of the product you want to source</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Product Info (Optional)</label>
                                <input
                                    type="text"
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    placeholder="Additional product specifications (optional)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">Additional product specifications or requirements (optional)</p>
                            </div>
                        </div>

                        {/* Product Image */}
                        <div>
                            <label className="block text-sm font-bold text-orange-600 mb-1 flex items-center gap-1">
                                <span className="bg-orange-100 text-orange-600 p-0.5 rounded text-xs">🖼️</span> Product Image (Optional)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                                <div className="flex gap-4 items-center">
                                    <button type="button" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium hover:bg-yellow-200 transition-colors">
                                        Choose file
                                    </button>
                                    <span className="text-gray-500">No file chosen</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Upload a product image (optional but recommended)</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-red-500 mb-1">Carton Quantity *</label>
                                <input
                                    type="number"
                                    name="cartonQuantity"
                                    value={formData.cartonQuantity}
                                    onChange={handleChange}
                                    placeholder="Enter quantity in cartons"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <div className="border-l-2 border-orange-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">Specify quantity in cartons/boxes. Standard carton sizes vary by product.</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-red-500 mb-1">Source Country *</label>
                                <select
                                    name="sourceCountry"
                                    value={formData.sourceCountry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select source country</option>
                                    <option value="China">China</option>
                                    <option value="India">India</option>
                                    <option value="Vietnam">Vietnam</option>
                                </select>
                                <div className="border-l-2 border-orange-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">Select the country where you want the product to be sourced from</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-red-500 mb-1">Destination Country *</label>
                                <select
                                    name="destinationCountry"
                                    value={formData.destinationCountry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select destination country</option>
                                    <option value="UAE">United Arab Emirates</option>
                                    <option value="KSA">Saudi Arabia</option>
                                    <option value="USA">United States</option>
                                </select>
                                <div className="border-l-2 border-orange-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">Select the country where the product should be delivered</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-red-500 mb-1">Funding Source *</label>
                                <div className="space-y-3">
                                    <div className="flex items-start border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <input
                                            type="radio"
                                            name="fundingSource"
                                            value="seller"
                                            checked={formData.fundingSource === 'seller'}
                                            onChange={handleChange}
                                            className="mt-1 mr-3"
                                            required
                                        />
                                        <div>
                                            <span className="text-sm font-medium text-gray-900 block">Seller's Funds - I will finance this sourcing request</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <input
                                            type="radio"
                                            name="fundingSource"
                                            value="crm"
                                            checked={formData.fundingSource === 'crm'}
                                            onChange={handleChange}
                                            className="mt-1 mr-3"
                                        />
                                        <div>
                                            <span className="text-sm font-medium text-gray-900 block">CRM Funding Request - Request CRM to finance this sourcing</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-l-2 border-orange-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">Choose how this sourcing request will be financed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded-full">
                            <PlusCircle className="w-4 h-4 text-gray-600" />
                        </div>
                        <h2 className="font-bold text-gray-900">Optional Information</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Supplier Name (Optional)</label>
                                <input
                                    type="text"
                                    name="supplierName"
                                    value={formData.supplierName}
                                    onChange={handleChange}
                                    placeholder="Enter preferred supplier name (optional)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="border-l-2 border-blue-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">If you have a preferred supplier, provide their company name</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Supplier Phone (Optional)</label>
                                <input
                                    type="text"
                                    name="supplierPhone"
                                    value={formData.supplierPhone}
                                    onChange={handleChange}
                                    placeholder="+971501234567"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="border-l-2 border-blue-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">Include country code for international numbers</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Product Description</label>
                            <textarea
                                name="productDescription"
                                value={formData.productDescription}
                                onChange={handleChange}
                                placeholder="Enter detailed product specifications and requirements..."
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            ></textarea>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">Character count</span>
                                <span className="text-xs text-gray-500">{formData.productDescription.length} / 1000</span>
                            </div>
                            <div className="border-l-2 border-blue-400 pl-3 mt-2">
                                <p className="text-xs text-gray-600">Detailed product specifications and requirements</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Target Unit Price (Optional)</label>
                                <input
                                    type="text"
                                    name="targetPrice"
                                    value={formData.targetPrice}
                                    onChange={handleChange}
                                    placeholder="Enter target unit price"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="border-l-2 border-blue-400 pl-3 mt-2">
                                    <p className="text-xs text-gray-600">Help administrators understand pricing expectations</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Currency</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="AED">AED</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Quality Requirements</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="brandNew"
                                        checked={formData.brandNew}
                                        onChange={handleChange}
                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-700">Brand New Only</span>
                                </label>
                                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="originalPackaging"
                                        checked={formData.originalPackaging}
                                        onChange={handleChange}
                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-700">Original Packaging Required</span>
                                </label>
                                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="warrantyRequired"
                                        checked={formData.warrantyRequired}
                                        onChange={handleChange}
                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-700">Warranty Required</span>
                                </label>
                                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="certifiedProducts"
                                        checked={formData.certifiedProducts}
                                        onChange={handleChange}
                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-700">Certified Products Only</span>
                                </label>
                            </div>
                            <div className="border-l-2 border-blue-400 pl-3 mt-3">
                                <p className="text-xs text-gray-600">Specify quality standards and requirements</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Special Instructions/Notes</label>
                            <textarea
                                name="specialInstructions"
                                value={formData.specialInstructions}
                                onChange={handleChange}
                                placeholder="Enter additional requirements or special handling instructions..."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            ></textarea>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">Character count</span>
                                <span className="text-xs text-gray-500">{formData.specialInstructions.length} / 500</span>
                            </div>
                            <div className="border-l-2 border-blue-400 pl-3 mt-2">
                                <p className="text-xs text-gray-600">Additional requirements or special handling instructions</p>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/sourcing')}
                            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create Sourcing Request
                        </button>
                    </div>
                </div>
            </form>
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
