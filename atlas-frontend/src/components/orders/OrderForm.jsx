import React, { useState, useEffect } from 'react';
import {
    User, Phone, Calendar, ArrowLeft, MapPin,
    ShoppingCart, Plus, Trash2, X, Check, Save,
    Users, Layout, DollarSign, Activity, FileText,
    RefreshCw
} from 'lucide-react';
import api from '../../lib/api';

export function OrderForm({ onBack }) {
    const [loading, setLoading] = useState(false);
    const [sellers, setSellers] = useState([]);
    const [sellerProducts, setSellerProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);

    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerPhone: '',
        customerEmail: '', // Re-added email
        orderDate: new Date().toISOString().slice(0, 10),
        orderTime: new Date().toISOString().slice(11, 16),
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

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch Sellers on Mount
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await api.get('/sellers');
                setSellers(response.data);
            } catch (err) {
                console.error("Error fetching sellers:", err);
                setError('Failed to load sellers');
            }
        };
        fetchSellers();
    }, []);

    // Fetch Products when Seller Changes
    useEffect(() => {
        const fetchProducts = async () => {
            if (!formData.seller) {
                setSellerProducts([]);
                return;
            }

            setProductsLoading(true);
            try {
                // Assuming seller ID is stored in formData.seller
                // If formData.seller stores ID directly, fine.
                const response = await api.get(`/products?sellerId=${formData.seller}&active=true`);
                setSellerProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                // Don't block UI, just empty products
                setSellerProducts([]);
            } finally {
                setProductsLoading(false);
            }
        };

        fetchProducts();
    }, [formData.seller]);

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));

        // Reset product selection if seller changes
        if (key === 'seller') {
            setFormData(prev => ({
                ...prev,
                seller: value,
                product: '',
                variant: 'No Variant',
                unitPrice: ''
            }));
        }

        // Auto-fill price if product changes
        if (key === 'product') {
            const selectedProduct = sellerProducts.find(p => p.id.toString() === value.toString());
            if (selectedProduct) {
                setFormData(prev => ({
                    ...prev,
                    product: value,
                    unitPrice: selectedProduct.price || selectedProduct.sellingPrice || ''
                }));
            }
        }
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        // Basic Validation
        if (!formData.customerName || !formData.customerPhone) {
            setError('Customer Name and Phone are required');
            return;
        }
        if (!formData.seller) {
            setError('Please select a Seller');
            return;
        }
        if (!formData.product || !formData.quantity) {
            setError('Please select a Product and Quantity');
            return;
        }
        if (!formData.streetAddress || !formData.city) {
            setError('City and Address are required');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                customerName: formData.customerName,
                customerPhone: formData.customerPhone,
                customerEmail: formData.customerEmail, // Added email back
                sellerId: parseInt(formData.seller),
                shippingAddress: `${formData.streetAddress}, ${formData.area}, ${formData.city}, ${formData.country}`,
                orderDate: `${formData.orderDate}T${formData.orderTime}:00Z`, // Combined date and time
                items: [
                    {
                        productId: parseInt(formData.product),
                        quantity: parseInt(formData.quantity),
                        price: parseFloat(formData.unitPrice)
                    }
                ],
                status: formData.status,
                customerNotes: formData.customerNotes,
                internalNotes: formData.internalNotes
            };

            await api.post('/orders', payload);
            setSuccess('Order created successfully!');
            // Optional: reset form or redirect
            setTimeout(() => {
                onBack();
            }, 1000);
        } catch (err) {
            console.error("Error creating order:", err);
            setError(err.response?.data?.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = (parseFloat(formData.unitPrice || 0) * parseInt(formData.quantity || 0)).toFixed(2);

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

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <X className="w-5 h-5" />
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Form Content */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Customer Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <User className="w-5 h-5 text-[#E15B2D]" />
                            <h3 className="font-bold text-gray-800">Customer Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Customer Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.customerName}
                                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                                            placeholder="Customer Name"
                                            className="w-full pl-10 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Customer Phone <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.customerPhone}
                                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                                            placeholder="+971501234567"
                                            className="w-full pl-10 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Customer Email</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.customerEmail}
                                            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                                            placeholder="email@example.com"
                                            className="w-full pl-10 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Order Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="date"
                                                value={formData.orderDate}
                                                onChange={(e) => handleInputChange('orderDate', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                            />
                                            <input
                                                type="time"
                                                value={formData.orderTime}
                                                onChange={(e) => handleInputChange('orderTime', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Status</label>
                                    <div className="relative">
                                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                            className="w-full pl-10 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Processing">Processing</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-[#E15B2D]" />
                            <h3 className="font-bold text-gray-800">Seller Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Select Seller <span className="text-red-500">*</span></label>
                                <select
                                    value={formData.seller}
                                    onChange={(e) => handleInputChange('seller', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                >
                                    <option value="">Select a seller</option>
                                    {sellers.map(seller => (
                                        <option key={seller.id} value={seller.id}>{seller.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#E15B2D]" />
                            <h3 className="font-bold text-gray-800">Address Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">City <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        placeholder="Enter City"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Area</label>
                                    <input
                                        type="text"
                                        value={formData.area}
                                        onChange={(e) => handleInputChange('area', e.target.value)}
                                        placeholder="Enter Area"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Street Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={formData.streetAddress}
                                        onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                                        placeholder="Enter street address and building number"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Country <span className="text-red-500">*</span></label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                    >
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Oman">Oman</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Kuwait">Kuwait</option>
                                        <option value="Qatar">Qatar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-[#E15B2D]" />
                                <h3 className="font-bold text-gray-800">Product Information</h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Product <span className="text-red-500">*</span></label>
                                    <select
                                        value={formData.product}
                                        onChange={(e) => handleInputChange('product', e.target.value)}
                                        disabled={!formData.seller || productsLoading}
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                    >
                                        <option value="">{productsLoading ? 'Loading...' : (formData.seller ? 'Select Product' : 'Select Seller First')}</option>
                                        {sellerProducts.map(prod => (
                                            <option key={prod.id} value={prod.id}>{prod.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Product Variant</label>
                                    <select
                                        disabled
                                        className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-400"
                                    >
                                        <option>No Variant</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Quantity <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Unit Price (AED) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={formData.unitPrice}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 text-right">
                                <p className="text-lg font-bold">Total Price: <span className="text-[#E15B2D]">AED {totalPrice}</span></p>
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
                                        value={formData.customerNotes}
                                        onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                                        placeholder="Customer notes or special instructions"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none min-h-[100px]"
                                    ></textarea>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Internal Notes</label>
                                    <textarea
                                        value={formData.internalNotes}
                                        onChange={(e) => handleInputChange('internalNotes', e.target.value)}
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
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold text-xs uppercase tracking-wider">{formData.status}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Total Amount</span>
                                <span className="text-[#28a745] font-bold text-lg">AED {totalPrice}</span>
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
                        </div>
                    </div>

                    {/* Create Order */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Create Order</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-[#E15B2D] text-white py-3 rounded-lg font-bold shadow-md hover:bg-[#d05026] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {loading ? 'Creating...' : 'Create Order'}
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
