import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Home, Info, Plus, Image as ImageIcon,
    X, Save, HelpCircle
} from 'lucide-react';
import api from '../../lib/api';

export function NewProductForm({ onBack, onSubmit }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const [sellers, setSellers] = useState([]);
    const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
        code: 'Auto-generated',
        category: '',
        purchasePrice: '',
        sellingPrice: '',
        profitMargin: '',
        stock: '0',
        warehouse: '',
        productLink: '',
        description: '',
        variants: [],
        image: null,
        sellerId: ''
    });

    useEffect(() => {
        if (['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
            const fetchSellers = async () => {
                try {
                    const response = await api.get('/sellers');
                    setSellers(response.data);
                } catch (error) {
                    console.error("Error fetching sellers:", error);
                }
            };
            fetchSellers();
        }
    }, [user.role]);

    const [warehouses, setWarehouses] = useState([]);

    // Fetch warehouses for the dropdown
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await api.get('/inventory/warehouses');
                setWarehouses(response.data || []);
            } catch (error) {
                console.error("Error fetching warehouses:", error);
            }
        };
        fetchWarehouses();
    }, []);

    const [currentVariant, setCurrentVariant] = useState('');


    const handleAddVariant = () => {
        if (currentVariant.trim()) {
            setFormData({
                ...formData,
                variants: [...formData.variants, currentVariant]
            });
            setCurrentVariant('');
        }
    };

    const handleChange = (e) => {
        const { type, value } = e.target;
        // Handle nested or special inputs if needed
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Map to backend expected format
        const payload = {
            name: formData.nameEn,
            nameAr: formData.nameAr,
            sku: formData.code === 'Auto-generated' ? `SKU-${Date.now()}` : formData.code,
            sellingPrice: parseFloat(formData.sellingPrice) || 0,
            purchasePrice: parseFloat(formData.purchasePrice) || 0,
            stockQuantity: parseInt(formData.stock) || 0,
            description: formData.description,
            category: formData.category,
            productLink: formData.productLink,
            status: 'Active',
            warehouse: formData.warehouse,
            variants: formData.variants,
            sellerId: formData.sellerId
        };
        onSubmit(payload);
    };

    const handleRemoveVariant = (index) => {
        setFormData({
            ...formData,
            variants: formData.variants.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Home className="w-4 h-4" />
                        <span>/</span>
                        <span>Sellers</span>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Product Create</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-[#fff8f1] p-3 rounded-xl border border-[#ffdcb4]">
                        <Plus className="w-6 h-6 text-[#E15B2D]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#E15B2D]">Add New Product</h1>
                        <p className="text-sm text-gray-500">Fill in the details below to add a new product to your inventory</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 bg-[#4b5563] text-white px-4 py-2.5 rounded-lg hover:bg-[#374151] transition-colors shadow-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </button>
                    <button className="flex items-center gap-2 bg-[#f1c40f] text-white px-4 py-2.5 rounded-lg hover:bg-[#f39c12] transition-colors shadow-sm font-medium">
                        <Home className="w-4 h-4" />
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Main Form Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    {/* Section Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Product Information</h2>
                        <p className="text-gray-500">Enter the product details below</p>
                    </div>

                    {/* Info Alert */}
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8 flex items-start gap-3">
                        <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-green-700">
                            <p className="font-bold mb-1 rtl:text-right" dir="rtl">.يمكن للسيلر اضافة منتج حتى وان لايوجد اي وير هاوس متاح. اختيار المستودع اختياري</p>
                            <p>Note: The seller can add a product even if no warehouse is available. Warehouse selection is optional.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['ADMIN', 'SUPER_ADMIN'].includes(user.role) && (
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-bold text-gray-700">Assign to Seller <span className="text-[#E15B2D]">*</span></label>
                                    <select
                                        value={formData.sellerId}
                                        onChange={(e) => handleInputChange('sellerId', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                        required
                                    >
                                        <option value="">Select a seller</option>
                                        {sellers.map(seller => (
                                            <option key={seller.id} value={seller.id}>
                                                {seller.name || `Seller #${seller.id}`}
                                            </option>
                                        ))}

                                    </select>
                                    <p className="text-xs text-gray-500">Products must be assigned to a seller to be visible in their inventory</p>
                                </div>
                            )}
                            <div className="space-y-1.5">

                                <label className="text-sm font-bold text-gray-700">Product Name (English) <span className="text-[#E15B2D]">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter product name in English"
                                    value={formData.nameEn}
                                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Product Name (Arabic)</label>
                                <input
                                    type="text"
                                    placeholder="Enter product name in Arabic"
                                    value={formData.nameAr}
                                    onChange={(e) => handleInputChange('nameAr', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Product Code</label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500">Product code will be generated automatically</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                >
                                    <option value="">Select category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home & Garden</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Purchase Price (AED)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.purchasePrice}
                                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Selling Price (AED) <span className="text-[#E15B2D]">*</span></label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.sellingPrice}
                                    onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Profit Margin (%)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    disabled
                                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="hidden md:block"></div> {/* Spacer */}

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Stock Quantity</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange('stock', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Warehouse <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <select
                                    value={formData.warehouse}
                                    onChange={(e) => handleInputChange('warehouse', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                >
                                    <option value="">No Warehouse (Optional)</option>
                                    {warehouses.map(wh => (
                                        <option key={wh.id} value={wh.name}>{wh.name}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500">No warehouses available. Product can still be created without warehouse assignment.</p>
                            </div>

                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Product Link <span className="text-[#E15B2D]">*</span></label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/product"
                                    value={formData.productLink}
                                    onChange={(e) => handleInputChange('productLink', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-1 space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea
                                    placeholder="Enter product description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all resize-none"
                                ></textarea>
                            </div>
                            <div className="md:col-span-1 space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Product Variants</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g., Red Large"
                                        value={currentVariant}
                                        onChange={(e) => setCurrentVariant(e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E15B2D]/20 focus:border-[#E15B2D] outline-none transition-all"
                                    />
                                    <button
                                        onClick={handleAddVariant}
                                        type="button"
                                        className="bg-[#2ecc71] hover:bg-[#27ae60] text-white p-2.5 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">Add multiple variants separated by commas or use the + button to add more fields</p>

                                {formData.variants.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.variants.map((variant, idx) => (
                                            <div key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                                <span>{variant}</span>
                                                <button onClick={() => handleRemoveVariant(idx)} className="hover:text-red-500">
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Product Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#E15B2D] hover:bg-orange-50/10 transition-colors cursor-pointer group">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                                        <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-[#E15B2D]" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1">
                                        <span className="text-[#E15B2D]">Upload a file</span> or drag and drop
                                    </h3>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                            <button
                                onClick={onBack}
                                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2.5 bg-[#E15B2D] text-white font-bold rounded-lg hover:bg-[#d05026] transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
                            >
                                <Plus className="w-5 h-5" />
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Help Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50">
                <HelpCircle className="w-7 h-7" />
            </button>
        </div>
    );
}
