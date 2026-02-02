import React, { useState } from 'react';
import {
    LayoutDashboard,
    ChevronDown,
    ArrowLeft,
    ArrowRight,
    Package,
    CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const categories = [
    'Electronics',
    'Fashion',
    'Home',
    'Sports',
    'Beauty',
    'Books',
    'Toys',
    'Automotive'
];

const statusOptions = [
    'In Stock',
    'Low Stock',
    'Out of Stock'
];

export function ProductForm({ onBack, onSubmit, title = "Add New Product", subtitle = "Add a new product to the catalog" }) {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        seller: '',
        status: 'In Stock',
        description: '',
        weight: '',
        dimensions: ''
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
        onSubmit({
            id: `PRD-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            name: formData.name,
            category: formData.category,
            price: `AED ${formData.price}`,
            stock: parseInt(formData.stock),
            seller: formData.seller,
            status: formData.status
        });
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center text-xs font-medium text-gray-500 space-x-2">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span className="cursor-pointer hover:text-gray-900">Home</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                        <span className="cursor-pointer hover:text-gray-900" onClick={onBack}>Products</span>
                        <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-900 font-semibold uppercase tracking-wider">Form</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Package className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            <p className="text-sm text-gray-500">{subtitle}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center px-6 py-2.5 bg-slate-600 text-white rounded-lg font-bold text-sm hover:bg-slate-700 transition-all shadow-md active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to List
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Basic Information</h2>
                            <p className="text-xs text-gray-500 font-medium">Product details and identification</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Product Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" />
                            <InputField label="SKU / Product ID" name="sku" value={formData.sku} onChange={handleChange} required placeholder="PRD-001" />
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Category</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full appearance-none pl-4 pr-10 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-yellow-50/50 focus:border-yellow-400 transition-all text-gray-700 font-medium"
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <InputField label="Seller / Vendor" name="seller" value={formData.seller} onChange={handleChange} required placeholder="Enter seller name" />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Inventory */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Pricing & Inventory</h2>
                            <p className="text-xs text-gray-500 font-medium">Set product price and stock levels</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Price (AED)" name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="299" />
                            <InputField label="Stock Quantity" name="stock" type="number" value={formData.stock} onChange={handleChange} required placeholder="100" />
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Stock Status</label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full appearance-none pl-4 pr-10 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-yellow-50/50 focus:border-yellow-400 transition-all text-gray-700 font-medium"
                                        required
                                    >
                                        {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Details */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
                            <p className="text-xs text-gray-500 font-medium">Additional product information</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Enter product description..."
                                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-yellow-50/50 focus:border-yellow-400 transition-all resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Weight (Optional)" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g., 500g" />
                                <InputField label="Dimensions (Optional)" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g., 10x5x3 cm" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Images */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Product Images</h2>
                            <p className="text-xs text-gray-500 font-medium">Upload product images</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Main Image (Optional)</label>
                                <div className="border-2 border-dashed border-slate-100 rounded-xl p-4 text-center hover:border-yellow-400 transition-colors cursor-pointer group">
                                    <div className="flex flex-col items-center">
                                        <div className="inline-flex items-center px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-semibold text-gray-600 mb-2 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-all">
                                            Choose file
                                        </div>
                                        <span className="text-xs text-gray-400">No file chosen</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2">Upload main product image</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Additional Images (Optional)</label>
                                <div className="border-2 border-dashed border-slate-100 rounded-xl p-4 text-center hover:border-yellow-400 transition-colors cursor-pointer group">
                                    <div className="flex flex-col items-center">
                                        <div className="inline-flex items-center px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-semibold text-gray-600 mb-2 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-all">
                                            Choose files
                                        </div>
                                        <span className="text-xs text-gray-400">No files chosen</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2">Upload additional product images</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-yellow-500 text-white rounded-xl text-sm font-bold shadow-yellow-200 shadow-xl hover:bg-yellow-600 transition-all active:scale-95"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

function InputField({ label, name, type = "text", value, onChange, placeholder, required = false }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-yellow-50/50 focus:border-yellow-400 transition-all"
            />
        </div>
    );
}
