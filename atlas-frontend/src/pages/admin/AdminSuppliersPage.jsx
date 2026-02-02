
import React, { useState } from 'react';
import { adminSuppliersData } from '../../data/adminDummyData';
import { Search, Plus, Filter, MapPin, Mail, Phone, Building, User, X } from 'lucide-react';

export function AdminSuppliersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState(adminSuppliersData || []);

    // Form State
    const [formData, setFormData] = useState({
        companyName: '',
        category: 'General',
        contactPerson: '',
        email: '',
        phone: '',
        country: ''
    });

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to add the supplier
        console.log("New Supplier Data:", formData);

        // Mock addition for UI feedback
        const newSupplier = {
            id: suppliers.length + 1,
            name: formData.companyName,
            category: formData.category,
            contactPerson: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            status: 'Active'
        };

        setSuppliers([...suppliers, newSupplier]);
        setIsAddModalOpen(false);
        setFormData({
            companyName: '',
            category: 'General',
            contactPerson: '',
            email: '',
            phone: '',
            country: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Suppliers Management</h1>
                    <p className="text-sm text-gray-600">Manage your suppliers and their details</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Supplier
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search suppliers..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSuppliers.map((supplier) => (
                    <div key={supplier.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Building className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                    ${supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {supplier.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{supplier.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{supplier.category}</p>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-400" />
                                    {supplier.contactPerson}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    {supplier.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    {supplier.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {supplier.country}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end gap-2">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                            <span className="text-gray-300">|</span>
                            <button className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Supplier Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Plus className="w-5 h-5" /> Add New Supplier
                            </h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-white hover:text-blue-200 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                {/* Company Info */}
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2 mb-3">
                                        <Building className="w-4 h-4" /> Company Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Company Name *</label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter company name"
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="General">General</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Apparel">Apparel</option>
                                                <option value="Furniture">Furniture</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2 mb-3 mt-4">
                                        <User className="w-4 h-4" /> Contact Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Contact Person</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    name="contactPerson"
                                                    value={formData.contactPerson}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter contact person name"
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter email address"
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter phone number"
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Info */}
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2 mb-3 mt-4">
                                        <MapPin className="w-4 h-4" /> Location Information
                                    </h3>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Country *</label>
                                        <div className="relative">
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            >
                                                <option value="">Select Country</option>
                                                <option value="China">China</option>
                                                <option value="India">India</option>
                                                <option value="Vietnam">Vietnam</option>
                                                <option value="UAE">United Arab Emirates</option>
                                                <option value="USA">United States</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Add Supplier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5c6ac4] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4d59ad] transition-transform hover:scale-105 z-50 text-2xl font-bold">
                ?
            </button>
        </div>
    );
}
