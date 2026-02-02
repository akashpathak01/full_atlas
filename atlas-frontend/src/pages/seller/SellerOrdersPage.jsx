import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { ShoppingCart, Plus, Upload, Download, Home, Search, Calendar, User, Phone, MapPin, Package, Eye, Edit, Trash2, Filter, MoreVertical, LayoutDashboard, X, Save, ArrowLeft, PlusCircle, Globe, LayoutList, RotateCcw, FileText, ChevronDown, CheckCircle } from 'lucide-react';

export function SellerOrdersPage() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' or 'create'
    const [showImportModal, setShowImportModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showDashboardModal, setShowDashboardModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Create Order State
    const [activeProducts, setActiveProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('');

    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        orderDate: new Date().toISOString().split('T')[0],
        status: 'PENDING_REVIEW',
        city: '',
        area: '',
        address: '',
        country: 'United Arab Emirates',
        customerNotes: '',
        internalNotes: ''
    });

    const cityAreas = {
        'Dubai': ['Dubai Marina', 'Downtown Dubai', 'JLT', 'Business Bay', 'Deira'],
        'Abu Dhabi': ['Yas Island', 'Saadiyat Island', 'Al Reem Island', 'Khalifa City'],
        'Sharjah': ['Al Majaz', 'Al Nahda', 'Al Khan', 'Muwaileh']
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'city' ? { area: '' } : {}) // Reset area if city changes
        }));
    };

    // Fetch Orders on Mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get('/orders');
            // Backend should return filtered orders for SELLER
            setOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setError('Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Active Products when entering create view
    useEffect(() => {
        if (view === 'create') {
            fetchActiveProducts();
        }
    }, [view]);

    const fetchActiveProducts = async () => {
        try {
            const response = await api.get('/products?active=true');
            setActiveProducts(response.data || []);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    const handleProductSelect = (e) => {
        const productId = e.target.value;
        const product = activeProducts.find(p => p.id == productId); // Flexible comparison
        setSelectedProduct(product || null);
        setVariant(''); // Reset variant
    };

    const handleViewOrder = (order) => {
        navigate(`/seller/orders/${order.id}`);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setShowEditModal(true);
    };

    const handleDeleteClick = (order) => {
        setSelectedOrder(order);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setOrders(orders.filter(o => o.id !== selectedOrder.id));
        setShowDeleteModal(false);
        alert(`Order #${selectedOrder.orderNumber || selectedOrder.id} deleted successfully!`);
    };

    if (view === 'create') {
        return (
            <div className="space-y-6 pb-20">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500">
                    <Home className="w-4 h-4 mr-2" />
                    <span className="mr-2">Home</span>
                    <span className="mx-2">&gt;</span>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span className="mr-2 cursor-pointer hover:text-orange-500" onClick={() => setView('list')}>Orders</span>
                    <span className="mx-2">&gt;</span>
                    <span className="font-medium text-gray-900">Create</span>
                </div>

                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500 rounded-xl">
                            <PlusCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-orange-600">Create New Order</h1>
                            <p className="text-gray-500 text-sm">Add a new order to the system</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setView('list')}
                        className="bg-slate-600 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg flex items-center text-sm font-bold transition-all active:scale-95 shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Orders
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Main Form */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* 1. Customer Information */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
                                <User className="w-5 h-5 text-orange-500" />
                                <h3 className="font-bold text-gray-800">Customer Information</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleInputChange}
                                            placeholder="Customer Name"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Customer Phone <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="customerPhone"
                                            value={formData.customerPhone}
                                            onChange={handleInputChange}
                                            placeholder="+971501234567"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Order Date <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="date"
                                            name="orderDate"
                                            value={formData.orderDate}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1.5 ml-1">Date is automatically set to today</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Filter className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value="Pending Review"
                                            readOnly
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1.5 ml-1">Status will be set to Pending automatically</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Address Information */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-orange-500" />
                                <h3 className="font-bold text-gray-800">Address Information</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 appearance-none transition-all font-medium text-gray-600"
                                        >
                                            <option value="">Select City</option>
                                            <option value="Dubai">Dubai</option>
                                            <option value="Abu Dhabi">Abu Dhabi</option>
                                            <option value="Sharjah">Sharjah</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Area <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <select
                                            name="area"
                                            value={formData.area}
                                            onChange={handleInputChange}
                                            disabled={!formData.city}
                                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 appearance-none transition-all font-medium text-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                                        >
                                            <option value="">{formData.city ? 'Select Area' : 'Select City First'}</option>
                                            {formData.city && cityAreas[formData.city]?.map(area => (
                                                <option key={area} value={area}>{area}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                                            <Home className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter street address and building number"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 appearance-none transition-all font-medium text-gray-900 border-2"
                                        >
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="Oman">Oman</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Product Information */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5 text-orange-500" />
                                    <h3 className="font-bold text-gray-800">Product Information</h3>
                                </div>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-sm transition-all active:scale-95">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Product
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end pb-6 border-b border-gray-50 mb-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                onChange={handleProductSelect}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 appearance-none font-medium text-gray-500 text-sm"
                                            >
                                                <option value="">Select Product</option>
                                                {activeProducts.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Variant</label>
                                        <div className="relative">
                                            <select
                                                value={variant}
                                                onChange={(e) => setVariant(e.target.value)}
                                                disabled={!selectedProduct || !selectedProduct.variants || selectedProduct.variants.length === 0}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 appearance-none font-medium text-gray-500 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">No Variant</option>
                                                {selectedProduct && selectedProduct.variants && selectedProduct.variants.map((v, i) => (
                                                    <option key={i} value={v}>{v}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quantity <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            min="1"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Unit Price (AED) <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            value={selectedProduct ? selectedProduct.price : ''}
                                            readOnly
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none font-bold text-gray-600 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end items-center">
                                    <span className="text-lg font-bold text-gray-500 mr-4">Total Price:</span>
                                    <span className="text-2xl font-black text-orange-600 uppercase tracking-tight">
                                        AED {(quantity * (selectedProduct ? selectedProduct.price : 0)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 4. Notes */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-orange-500" />
                                <h3 className="font-bold text-gray-800">Notes</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Customer Notes</label>
                                    <textarea
                                        rows="4"
                                        name="customerNotes"
                                        value={formData.customerNotes}
                                        onChange={handleInputChange}
                                        placeholder="Customer notes or special instructions"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Internal Notes</label>
                                    <textarea
                                        rows="4"
                                        name="internalNotes"
                                        value={formData.internalNotes}
                                        onChange={handleInputChange}
                                        placeholder="Internal notes for team members"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Action Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="font-bold text-gray-800">Order Summary</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-500">Status</span>
                                    <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-lg text-xs font-black">Pending Review</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-gray-500 text-sm font-medium">Total Amount</span>
                                    <span className="text-lg font-black text-green-600 tracking-tight">
                                        AED {(quantity * (selectedProduct ? selectedProduct.price : 0)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="font-bold text-gray-800">Quick Actions</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <button onClick={() => setView('list')} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-all active:scale-95 shadow-md shadow-blue-200">
                                    <LayoutList className="w-4 h-4 mr-2" />
                                    All Orders
                                </button>
                                <button onClick={() => window.location.reload()} className="w-full py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-all active:scale-95 shadow-md shadow-slate-200">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset Form
                                </button>
                            </div>
                        </div>

                        {/* Create Order Submit Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="font-bold text-gray-800">Create Order</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <button
                                    onClick={async () => {
                                        // Simple validation
                                        if (!formData.customerName || !formData.customerPhone || !formData.city || !formData.area || !selectedProduct) {
                                            alert("Please fill all required fields (*) and select at least one product.");
                                            return;
                                        }

                                        try {
                                            const payload = {
                                                customerName: formData.customerName,
                                                customerPhone: formData.customerPhone,
                                                orderDate: formData.orderDate,
                                                status: formData.status,
                                                shippingAddress: `${formData.address}, ${formData.area}, ${formData.city}, ${formData.country}`,
                                                totalAmount: parseFloat((quantity * (selectedProduct ? selectedProduct.price : 0)).toFixed(2)),
                                                items: [{
                                                    productId: selectedProduct.id,
                                                    quantity: quantity,
                                                    variant: variant || null,
                                                    price: selectedProduct.price
                                                }],
                                                customerNotes: formData.customerNotes,
                                                internalNotes: formData.internalNotes
                                            };

                                            await api.post('/orders', payload);
                                            alert('Order Created Successfully!');
                                            setView('list');
                                            fetchOrders(); // Refresh list
                                        } catch (error) {
                                            console.error("Error creating order:", error);
                                            alert(error.response?.data?.error || "Failed to create order");
                                        }
                                    }}
                                    className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-black flex items-center justify-center transition-all active:scale-95 shadow-xl shadow-orange-500/30"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Create Order
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className="w-full py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-all active:scale-95"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Floating help button */}
                <div className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer hover:bg-indigo-700 transition-all hover:scale-110 active:scale-90 z-20">
                    <span className="text-xl font-black">?</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                <span className="mr-2">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="mr-2">Sellers</span>
                <span className="mx-2">&gt;</span>
                <span className="font-medium text-gray-900">Orders</span>
            </div>

            {/* Header & Actions */}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <ShoppingCart className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Order Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your order processing and fulfillment</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setView('create')}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Order
                    </button>
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Import Orders
                    </button>
                    <button
                        onClick={() => setShowExportModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                    <button
                        onClick={() => setShowDashboardModal(true)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-1">Search & Filters</h3>
                <p className="text-sm text-gray-500 mb-6">Find and filter orders quickly</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Orders</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by order ID, customer"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-orange-500">
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="All Time"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => alert('Filters Applied')}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Orders List</h3>
                        <p className="text-sm text-gray-500">Manage and monitor your orders</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <p className="text-xl font-bold text-orange-600">61</p>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 p-4 border-b border-blue-100">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700 font-medium">
                                يمكن للسيلر ان يحذف الطلبية حالة pending اذا لساتاه في
                            </p>
                            <p className="text-sm text-blue-600 mt-1">
                                Note: If an order status is still pending, the seller can delete the order.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">
                            Loading orders...
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center text-red-500">
                            {error}
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-yellow-100/50">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Order ID</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Customer</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Product</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Address</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Amount</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Payment</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.length > 0 ? (
                                    orders.map((order, idx) => (
                                        <tr
                                            key={order.id || idx}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => handleViewOrder(order)}
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">#{order.orderNumber || order.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-500">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{order.customerName || 'Unknown'}</p>
                                                        <p className="text-xs text-gray-500">{order.customerPhone || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                                                        <Package className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{order.items?.[0]?.product || 'Assorted'}</p>
                                                        <p className="text-xs text-gray-500">Qty: {order.items?.reduce((p, c) => p + (c.quantity || 1), 0) || 0}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                                                    <span className="truncate max-w-[150px]" title={order.shippingAddress}>{order.shippingAddress || 'No Address'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{order.totalAmount} AED</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-md text-xs font-medium ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    {order.paymentStatus || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleViewOrder(order)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {order.status === 'PENDING' && (
                                                        <button
                                                            onClick={() => handleDeleteClick(order)}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Order"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                                            <div className="flex flex-col items-center">
                                                <Package className="w-12 h-12 text-gray-300 mb-2 opacity-50" />
                                                <p className="font-medium">No orders found</p>
                                                <p className="text-sm mt-1">Try changing filters or create a new order.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {/* Import Orders Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg mr-3">
                                    <Upload className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Import Orders</h2>
                                    <p className="text-xs text-gray-500">Upload your bulk orders file (CSV, XLSX)</p>
                                </div>
                            </div>
                            <button onClick={() => setShowImportModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="border-2 border-dashed border-green-200 rounded-xl p-10 flex flex-col items-center justify-center bg-green-50/30 hover:bg-green-50/50 transition-colors cursor-pointer group">
                                <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500 mt-1">Maximum file size 10MB</p>
                            </div>
                            <div className="mt-6 space-y-3">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Instructions</p>
                                <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4">
                                    <li>Use the standard template for successful import</li>
                                    <li>Ensure all required fields like Customer Name and Product are filled</li>
                                    <li>Phone numbers should include country code</li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowImportModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-all active:scale-95">Cancel</button>
                            <button onClick={() => { alert('Import Process Started!'); setShowImportModal(false); }} className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all active:scale-95 shadow-sm">Start Import</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                    <Download className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Export Orders</h2>
                                    <p className="text-xs text-gray-500">Choose your export preferences and data range</p>
                                </div>
                            </div>
                            <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Excel', 'CSV', 'PDF'].map((format) => (
                                        <button key={format} className={`py-3 rounded-xl border text-sm font-medium transition-all ${format === 'Excel' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-200 text-gray-600'}`}>
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Range</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                                    <option>Last 30 Days</option>
                                    <option>This Month</option>
                                    <option>Last Quarter</option>
                                    <option>All Time</option>
                                    <option>Custom Range</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Included Statuses</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                        <label key={s} className="flex items-center p-2 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 mr-2" />
                                            <span className="text-xs text-gray-600">{s}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowExportModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-all active:scale-95">Cancel</button>
                            <button onClick={() => { alert('Export Started!'); setShowExportModal(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all active:scale-95 shadow-sm">Download File</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Stats Modal */}
            {showDashboardModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-yellow-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                                    <LayoutDashboard className="w-5 h-5 text-yellow-700" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Order Dashboard Stats</h2>
                                    <p className="text-xs text-gray-500">Quick overview of your order performance</p>
                                </div>
                            </div>
                            <button onClick={() => setShowDashboardModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-orange-50 rounded-2xl">
                                    <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">Total Orders</p>
                                    <h3 className="text-3xl font-black text-orange-600">61</h3>
                                    <p className="text-[10px] text-orange-500 mt-2 font-medium">+12.5% from last month</p>
                                </div>
                                <div className="p-6 bg-blue-50 rounded-2xl">
                                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Total Revenue</p>
                                    <h3 className="text-3xl font-black text-blue-600">4,285</h3>
                                    <p className="text-[10px] text-blue-500 mt-2 font-medium">AED currency</p>
                                </div>
                                <div className="p-6 bg-green-50 rounded-2xl">
                                    <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Completed</p>
                                    <h3 className="text-3xl font-black text-green-600">41</h3>
                                    <p className="text-[10px] text-green-500 mt-2 font-medium">67% completion rate</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-sm font-bold text-gray-700 mb-4">Recent Performance</h4>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Weekly Growth', val: '85', color: 'bg-orange-500' },
                                        { label: 'Customer Satisfaction', val: '92', color: 'bg-blue-500' },
                                        { label: 'On-time Delivery', val: '78', color: 'bg-green-500' }
                                    ].map(item => (
                                        <div key={item.label}>
                                            <div className="flex justify-between text-xs mb-1 font-medium">
                                                <span className="text-gray-500">{item.label}</span>
                                                <span className="text-gray-700">{item.val}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.val}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => setShowDashboardModal(false)} className="px-8 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-all active:scale-95 shadow-sm">Close Dashboard View</button>
                        </div>
                    </div>
                </div>
            )}
            {/* View Order Modal */}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                                    <p className="text-xs text-gray-500">Full information for order {selectedOrder.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Info</p>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <p className="font-bold text-gray-900">{selectedOrder.customer}</p>
                                            <p className="text-sm text-gray-500 mt-1 flex items-center"><Phone className="w-3 h-3 mr-2" /> {selectedOrder.phone}</p>
                                            <p className="text-sm text-gray-500 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-2" /> {selectedOrder.address}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Order Status</p>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${selectedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                {selectedOrder.status}
                                            </span>
                                            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                                {selectedOrder.payment}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Product Info</p>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start">
                                            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-4 shrink-0">
                                                <Package className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{selectedOrder.product}</p>
                                                <p className="text-sm text-gray-500">Qty: {selectedOrder.qty}</p>
                                                <p className="text-lg font-black text-orange-600 mt-1">{selectedOrder.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Delivery Note</p>
                                        <p className="text-xs text-gray-500 leading-relaxed italic border-l-4 border-gray-200 pl-4 py-1">
                                            Customer requested delivery before 5 PM. Please ensure the package is handled with care as it contains fragile items.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowViewModal(false)} className="px-8 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-all active:scale-95 shadow-lg">Close Details</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {showEditModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
                            <div className="flex items-center">
                                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                    <Edit className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Edit Order</h2>
                                    <p className="text-xs text-gray-500">Modify details for order {selectedOrder.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form className="p-6 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Customer Information</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                        <input type="text" defaultValue={selectedOrder.customer} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="text" defaultValue={selectedOrder.phone} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <textarea rows="2" defaultValue={selectedOrder.address} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Order Management</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                                        <select defaultValue={selectedOrder.status} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold">
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                            <input type="number" defaultValue={selectedOrder.qty} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                                            <input type="text" defaultValue={selectedOrder.amount} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Internal Note</label>
                                        <input type="text" placeholder="Add private note..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowEditModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-all active:scale-95 shadow-sm">Discard Changes</button>
                            <button onClick={() => { alert('Changes Saved Successfully!'); setShowEditModal(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all active:scale-95 shadow-sm hover:shadow-md border-b-2 border-indigo-900 flex items-center">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedOrder && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-10 h-10 text-red-600 animate-bounce" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Are you sure?</h2>
                            <p className="text-gray-500 mb-6">
                                You are about to delete order <span className="font-bold text-gray-800">#{selectedOrder.id}</span>.
                                This action cannot be undone.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    No, Keep it
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
