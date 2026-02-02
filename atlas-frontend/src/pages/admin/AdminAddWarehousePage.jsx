
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse, ArrowLeft, Plus } from 'lucide-react';

export function AdminAddWarehousePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        isActive: true
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
        console.log('Submitting warehouse data:', formData);
        // Here you would typically call an API to create the warehouse
        navigate('/admin/inventory/warehouses');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/dashboard')}>Home</span>
                <span>&gt;</span>
                <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/inventory')}>Inventory</span>
                <span>&gt;</span>
                <span className="text-gray-900 font-medium">Add Warehouse</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Warehouse className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add Warehouse</h1>
                        <p className="text-sm text-gray-600">Create a new warehouse to manage your inventory</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/inventory/warehouses')}
                        className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Warehouses
                    </button>
                    <button
                        onClick={() => navigate('/admin/inventory')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        Dashboard
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Warehouse Information</h2>
                    <p className="text-sm text-gray-500 mt-1">Enter the details for the new warehouse</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-red-600">
                                Warehouse Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter warehouse name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-red-600">
                                Location *
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter warehouse location"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter warehouse description (optional)"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                            Active Warehouse
                        </label>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">Enable this warehouse for inventory operations</p>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-2 text-blue-700 text-sm">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        All fields marked with * are required
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/inventory/warehouses')}
                            className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">×</span> Cancel
                            </span>
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create Warehouse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
