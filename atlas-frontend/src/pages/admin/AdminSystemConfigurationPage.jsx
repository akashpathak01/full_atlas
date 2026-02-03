import React, { useState, useEffect } from 'react';
import {
    Settings,
    Globe,
    Bell,
    Shield,
    CreditCard,
    Save,
    RefreshCcw,
    AlertCircle,
    CheckCircle2,
    Database,
    Mail,
    Lock
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import api from '../../lib/api';

export function AdminSystemConfigurationPage() {
    const [configs, setConfigs] = useState({
        site_name: 'Atlas Fulfillment',
        support_email: 'support@atlas.com',
        maintenance_mode: false,
        enable_registration: true,
        default_currency: 'AED',
        smtp_host: 'smtp.atlas.com',
        smtp_port: '587',
        tax_rate: '5',
        shipping_fee: '15'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/config');
            if (Object.keys(response.data).length > 0) {
                setConfigs(prev => ({ ...prev, ...response.data }));
            }
        } catch (error) {
            console.error('Failed to fetch configs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setMessage(null);
            await api.post('/config/batch', configs);
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Failed to save configs:', error);
            setMessage({ type: 'error', text: 'Failed to update settings.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (key, value) => {
        setConfigs(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Settings className="w-8 h-8 mr-3 text-blue-600" />
                        System Configuration
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage global platform settings and system rules</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchConfigs}
                        className="p-2.5 text-gray-500 hover:text-blue-600 bg-white border border-gray-200 rounded-xl transition-all"
                        title="Refresh"
                    >
                        <RefreshCcw className={cn("w-5 h-5", isLoading && "animate-spin")} />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>

            {message && (
                <div className={cn(
                    "p-4 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top duration-300",
                    message.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-700"
                )}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Navigation/Categories */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="border border-gray-100 sticky top-24">
                        <CardContent className="p-2">
                            <nav className="space-y-1">
                                {[
                                    { icon: Globe, label: 'General Settings', id: 'general' },
                                    { icon: Mail, label: 'Email Configuration', id: 'email' },
                                    { icon: CreditCard, label: 'Payment & Tax', id: 'payment' },
                                    { icon: Shield, label: 'Security & Access', id: 'security' },
                                    { icon: Database, label: 'System & Maintenance', id: 'system' }
                                ].map((cat) => (
                                    <button
                                        key={cat.id}
                                        className="w-full flex items-center px-4 py-3 text-sm font-bold text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all group"
                                    >
                                        <cat.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                                        {cat.label}
                                    </button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Settings Form */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Section */}
                    <Card className="border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                            <h2 className="font-black text-gray-900 uppercase tracking-wider text-xs">General Settings</h2>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Site Name</label>
                                    <input
                                        type="text"
                                        value={configs.site_name}
                                        onChange={(e) => handleChange('site_name', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Support Email</label>
                                    <input
                                        type="email"
                                        value={configs.support_email}
                                        onChange={(e) => handleChange('support_email', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                <div>
                                    <p className="text-sm font-black text-blue-900">Maintenance Mode</p>
                                    <p className="text-xs text-blue-700/70 font-medium">Temporarily disable public access to the platform</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={configs.maintenance_mode}
                                        onChange={(e) => handleChange('maintenance_mode', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Email Section */}
                    <Card className="border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                            <h2 className="font-black text-gray-900 uppercase tracking-wider text-xs">Email Configuration (SMTP)</h2>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">SMTP Host</label>
                                    <input
                                        type="text"
                                        value={configs.smtp_host}
                                        onChange={(e) => handleChange('smtp_host', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">SMTP Port</label>
                                    <input
                                        type="text"
                                        value={configs.smtp_port}
                                        onChange={(e) => handleChange('smtp_port', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Finance Section */}
                    <Card className="border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                            <h2 className="font-black text-gray-900 uppercase tracking-wider text-xs">Finance & Fees</h2>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">VAT Rate (%)</label>
                                    <input
                                        type="number"
                                        value={configs.tax_rate}
                                        onChange={(e) => handleChange('tax_rate', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Shipping Fee (AED)</label>
                                    <input
                                        type="number"
                                        value={configs.shipping_fee}
                                        onChange={(e) => handleChange('shipping_fee', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Currency</label>
                                    <select
                                        value={configs.default_currency}
                                        onChange={(e) => handleChange('default_currency', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                                    >
                                        <option value="AED">AED - Emirati Dirham</option>
                                        <option value="SAR">SAR - Saudi Riyal</option>
                                        <option value="USD">USD - US Dollar</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

