import React, { useState } from 'react';
import { Home, ChevronRight, Plus, Search, X, Globe, Filter, ArrowLeft, CheckCircle2, Upload, Send, Info, ChevronDown, ListPlus, FileText, LayoutList } from 'lucide-react';

export function SellerSourcingPage() {
    const [view, setView] = useState('list'); // 'list' or 'create'

    if (view === 'create') {
        return (
            <div className="space-y-6 pb-20 animate-in fade-in duration-500">
                {/* Breadcrumb */}
                <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest font-bold">
                    <Home className="w-3.5 h-3.5 mr-2" />
                    <span className="cursor-pointer hover:text-yellow-600 transition-colors" onClick={() => setView('list')}>Home</span>
                    <span className="mx-3 text-gray-300 font-normal">/</span>
                    <span className="cursor-pointer hover:text-yellow-600 transition-colors">Sellers</span>
                    <span className="mx-3 text-gray-300 font-normal">/</span>
                    <span className="text-gray-900">Sourcing Request Create</span>
                </div>

                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Create Sourcing Request</h1>
                        <p className="text-sm text-gray-500 font-medium">Fill out all required fields to create your sourcing request.</p>
                    </div>
                    <button
                        onClick={() => setView('list')}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg flex items-center text-sm font-bold transition-all active:scale-95 shadow-md shadow-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Requests
                    </button>
                </div>

                {/* Main Form container */}
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Section: Required Information */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="px-8 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                            <div className="p-1.5 bg-blue-100 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Required Information</h3>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Product Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Product Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter product name"
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-medium"
                                    />
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium">Enter the name of the product you want to source.</p>
                                    </div>
                                </div>

                                {/* Product URL */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Product URL (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/product"
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-medium"
                                    />
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium">Link to the product page (optional).</p>
                                    </div>
                                </div>

                                {/* Product Image */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Product Image (Optional)</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50/30 hover:bg-white hover:border-yellow-200 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <label className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-yellow-600 shadow-sm cursor-pointer group-hover:bg-yellow-600 group-hover:text-white transition-all active:scale-95">
                                                Choose file
                                                <input type="file" className="hidden" />
                                            </label>
                                            <span className="text-sm text-gray-400 font-medium tracking-wide">No file chosen</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium">Upload a product image (optional). Accepted formats: JPG, PNG, GIF.</p>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Quantity (Pieces) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter quantity in pieces"
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-bold text-gray-900"
                                    />
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium">Specify the total quantity in pieces/units.</p>
                                    </div>
                                </div>

                                {/* Number of Cartons */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Number of Cartons <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter number of cartons"
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-bold text-gray-900"
                                    />
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Specify the number of cartons/boxes. Standard carton sizes vary by product.</p>
                                    </div>
                                </div>

                                {/* Source Country */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Source Country <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <select className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-medium appearance-none cursor-pointer">
                                            <option>Select source country</option>
                                            <option>China</option>
                                            <option>UAE</option>
                                            <option>Turkey</option>
                                            <option>USA</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-yellow-600" />
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Select the country where you want the product to be sourced from.</p>
                                    </div>
                                </div>

                                {/* Destination Country */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Destination Country <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <select className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-medium appearance-none cursor-pointer">
                                            <option>Select destination country</option>
                                            <option>United Arab Emirates</option>
                                            <option>Saudi Arabia</option>
                                            <option>Qatar</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-yellow-600" />
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg">
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Select the country where the product should be delivered.</p>
                                    </div>
                                </div>

                                {/* Funding Source */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-700">Funding Source <span className="text-red-500">*</span></label>
                                    <div className="space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="mt-1">
                                                <input type="radio" name="funding" defaultChecked className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-700 group-hover:text-yellow-600 transition-colors">Seller's Funds - I will finance this sourcing request</p>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="mt-1">
                                                <input type="radio" name="funding" className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-700 group-hover:text-yellow-600 transition-colors">CRM Funding Request - Request CRM to finance this sourcing</p>
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50/30 border-l-2 border-yellow-500 rounded-r-lg mt-2">
                                        <p className="text-[11px] text-gray-500 font-medium tracking-tight">Choose how this sourcing request will be financed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Optional Information */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="px-8 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                            <div className="p-1.5 bg-gray-100 rounded-full">
                                <Plus className="w-4 h-4 text-gray-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Optional Information</h3>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Priority */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Priority</label>
                                    <div className="relative group">
                                        <select className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-medium appearance-none cursor-pointer">
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Low</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-yellow-600" />
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Budget (AED)</label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-bold text-gray-900"
                                    />
                                </div>

                                {/* Additional Notes */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Additional Notes</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Any additional information or special requirements"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 focus:bg-white transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 px-8">
                            <button
                                onClick={() => setView('list')}
                                className="px-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all active:scale-95 shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { alert('Sourcing Request Submitted!'); setView('list'); }}
                                className="px-10 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-black transition-all active:scale-95 shadow-lg shadow-yellow-200 flex items-center"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 font-sans">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500">
                <Home className="w-4 h-4" />
                <span className="mx-2 hover:text-gray-900 cursor-pointer">Home</span>
                <ChevronRight className="w-4 h-4" />
                <span className="mx-2 hover:text-gray-900 cursor-pointer">Sellers</span>
                <ChevronRight className="w-4 h-4" />
                <span className="mx-2 font-medium text-gray-900">Sourcing Requests</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-xl">
                        <Globe className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Sourcing Requests</h1>
                        <p className="text-gray-500 mt-1">Manage your product sourcing and supplier requests</p>
                    </div>
                </div>
                <button
                    onClick={() => setView('create')}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-lg transition-all active:scale-95 font-bold shadow-md shadow-yellow-100"
                >
                    <Plus className="w-5 h-5" />
                    Create Sourcing Request
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Filter Requests</h3>
                        <p className="text-sm text-gray-500">Filter and search sourcing requests</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-3 space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 block ml-1">Status</label>
                        <div className="relative group">
                            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium cursor-pointer">
                                <option>All Status</option>
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 group-hover:text-yellow-600 transition-colors">
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 block ml-1">Priority</label>
                        <div className="relative group">
                            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium cursor-pointer">
                                <option>All Priorities</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 group-hover:text-yellow-600 transition-colors">
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4 space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 block ml-1">Search</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Product name or ID..."
                                className="w-full border border-gray-200 text-gray-700 py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 bg-gray-50 transition-all font-medium"
                            />
                            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-lg font-bold transition-all active:scale-95 shadow-md shadow-slate-100">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Sourcing Requests List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                        <LayoutList className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Sourcing History</h3>
                        <p className="text-sm text-gray-500">Manage and monitor your sourcing requests</p>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Request ID</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Info</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Request Date</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Priority</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Empty State */}
                            <tr>
                                <td colSpan="7" className="py-24 text-center">
                                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                        <div className="bg-yellow-50 p-6 rounded-3xl mb-6 shadow-inner">
                                            <ListPlus className="w-12 h-12 text-yellow-600" />
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-2">No sourcing requests yet</h3>
                                        <p className="text-gray-500 font-medium text-sm mb-8">
                                            It looks like you haven't started any sourcing requests. Click below to find suppliers globally.
                                        </p>
                                        <button
                                            onClick={() => setView('create')}
                                            className="flex items-center gap-3 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl transition-all font-black shadow-lg shadow-yellow-200 active:scale-95"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Create First Request
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

