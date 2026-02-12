import React, { useState, useRef } from 'react';
import {
    LayoutDashboard,
    ChevronDown,
    ArrowLeft,
    ArrowRight,
    UserPlus,
    CheckCircle2,
    Upload,
    FileText,
    X
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const roleScopes = {
    'SUPER_ADMIN': ['ADMIN'],
    'ADMIN': [
        'SELLER',
        'CALL_CENTER_AGENT',
        'CALL_CENTER_MANAGER',
        'STOCK_KEEPER',
        'PACKAGING_AGENT',
        'DELIVERY_AGENT'
    ]
};

export function UserForm({
    onBack,
    onSubmit,
    currentUserRole = 'Super Admin', // Default to Super Admin if not provided
    title = "Create New User",
    subtitle = "Add a new user to the system with specific role and permissions",
    initialData = null
}) {
    const frontIdInputRef = useRef(null);
    const backIdInputRef = useRef(null);

    const normalizedRequesterRole = currentUserRole?.toUpperCase().replace(/\s+/g, '_') || 'ADMIN';
    const availableRoles = roleScopes[normalizedRequesterRole] || [];

    const isEditing = !!initialData;
    const nameParts = initialData?.name?.split(' ') || ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || firstName,
        lastName: initialData?.lastName || lastName,
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        role: initialData?.role?.name || initialData?.role || '',
        shopName: initialData?.shopName || initialData?.seller?.shopName || '',
        storeLink: initialData?.storeLink || '',
        bankName: initialData?.bankName || '',
        accountHolder: initialData?.accountHolder || '',
        accountNumber: initialData?.accountNumber || '',
        ibanConfirmation: initialData?.ibanConfirmation || '',
        password: '',
        confirmPassword: '',
        isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
        idFrontImage: initialData?.idFrontImage || null,
        idBackImage: initialData?.idBackImage || null
    });

    const [fileNames, setFileNames] = useState({
        front: initialData?.idFrontImage || 'No file chosen',
        back: initialData?.idBackImage || 'No file chosen'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e, side) => {
        const file = e.target.files[0];
        if (file) {
            setFileNames(prev => ({ ...prev, [side]: file.name }));
            // For now, we'll store the file object. In a real app, you'd upload it to S3/Cloudinary 
            // and store the URL. For this demo, we'll just store the name or a mock URL.
            setFormData(prev => ({ ...prev, [`id${side.charAt(0).toUpperCase() + side.slice(1)}Image`]: file.name }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const submissionData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            shopName: formData.shopName,
            storeLink: formData.storeLink,
            bankName: formData.bankName,
            accountHolder: formData.accountHolder,
            accountNumber: formData.accountNumber,
            ibanConfirmation: formData.ibanConfirmation,
            idFrontImage: formData.idFrontImage,
            idBackImage: formData.idBackImage,
            isActive: formData.isActive
        };

        if (formData.password) {
            submissionData.password = formData.password;
        }

        onSubmit(submissionData);
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
                        <span className="cursor-pointer hover:text-gray-900" onClick={onBack}>Back</span>
                        <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-900 font-semibold uppercase tracking-wider">Form</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <UserPlus className="w-6 h-6 text-orange-600" />
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
                {/* Personal Information */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                            <p className="text-xs text-gray-500 font-medium">Basic user details and contact information</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                    </CardContent>
                </Card>

                {/* Role Assignment */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Role Assignment</h2>
                            <p className="text-xs text-gray-500 font-medium">Assign role to the user</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">User Role</label>
                            <div className="relative">
                                <select
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all appearance-none cursor-pointer font-medium"
                                >
                                    <option value="">Select a role</option>
                                    {availableRoles.map(role => (
                                        <option key={role} value={role}>
                                            {role.charAt(0) + role.slice(1).toLowerCase().replace(/_/g, ' ')}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Store Information */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Store Information</h2>
                            <p className="text-xs text-gray-500 font-medium">Store details and website link</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Shop Name (Optional)" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="Enter shop name" />
                            <InputField label="Store Link (Optional)" name="storeLink" value={formData.storeLink} onChange={handleChange} placeholder="https://yourstore.com" />
                        </div>
                    </CardContent>
                </Card>

                {/* Bank Account Information */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Bank Account Information</h2>
                            <p className="text-xs text-gray-500 font-medium">Bank details for payment processing</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Bank Name (Optional)" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Enter bank name" />
                            <InputField label="Account Holder Name (Optional)" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Enter account holder name" />
                            <InputField label="Account Number / IBAN (Optional)" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Enter account number or IBAN" />
                            <InputField label="IBAN Confirmation (Optional)" name="ibanConfirmation" value={formData.ibanConfirmation} onChange={handleChange} placeholder="Confirm IBAN" />
                        </div>
                    </CardContent>
                </Card>

                {/* ID Verification */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">ID Verification</h2>
                            <p className="text-xs text-gray-500 font-medium">Upload ID images for verification</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">ID Front Image (Optional)</label>
                                <input
                                    type="file"
                                    ref={frontIdInputRef}
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, 'front')}
                                    accept="image/*"
                                />
                                <div
                                    onClick={() => frontIdInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-100 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer group"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="inline-flex items-center px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-semibold text-gray-600 mb-2 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Choose file
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {fileNames.front !== 'No file chosen' && <CheckCircle2 className="inline w-3 h-3 mr-1 text-emerald-500" />}
                                            {fileNames.front}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Upload the front side of ID card</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">ID Back Image (Optional)</label>
                                <input
                                    type="file"
                                    ref={backIdInputRef}
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, 'back')}
                                    accept="image/*"
                                />
                                <div
                                    onClick={() => backIdInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-100 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer group"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="inline-flex items-center px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-semibold text-gray-600 mb-2 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Choose file
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {fileNames.back !== 'No file chosen' && <CheckCircle2 className="inline w-3 h-3 mr-1 text-emerald-500" />}
                                            {fileNames.back}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Upload the back side of ID card</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Security */}
                <Card className="border border-gray-100">
                    <CardContent className="p-6">
                        <div className="border-b border-gray-50 pb-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Account Security</h2>
                            <p className="text-xs text-gray-500 font-medium">Set up user credentials and security settings</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <InputField
                                    label={isEditing ? "New Password (Optional)" : "Password"}
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!isEditing}
                                />
                                <p className="text-[10px] text-gray-400">Minimum 8 characters, must contain uppercase, lowercase, and numbers</p>
                            </div>
                            <InputField
                                label={isEditing ? "Confirm New Password" : "Confirm Password"}
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required={formData.password.length > 0}
                            />
                        </div>
                        <div className="mt-6 flex items-center space-x-3">
                            <div className="flex items-center">
                                <input
                                    id="isActive"
                                    name="isActive"
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isActive" className="ml-2 text-xs font-bold text-gray-700 uppercase tracking-widest cursor-pointer">User account is active</label>
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
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-blue-200 shadow-xl hover:bg-blue-700 transition-all active:scale-95"
                    >
                        {isEditing ? 'Update User' : 'Create User'}
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
                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
            />
        </div>
    );
}
