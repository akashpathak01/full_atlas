import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Check, AlertCircle, Shield, Briefcase } from 'lucide-react';
import api from '../../lib/api';

export function RolePermissionEditor({ role, onBack }) {
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
        // Initialize selected permissions from the role object passed in
        // Ideally we fetch fresh role data, but we can start with what we have
        // Actually, role.permissions from list might be just a count or partial.
        // It's safer to rely on the user to re-fetch or we assume the list had full objects?
        // The service returns `permissions: role.permissions` which is an array of objects.
        if (role.permissions && Array.isArray(role.permissions)) {
            setSelectedPermissions(new Set(role.permissions.map(p => p.id)));
        }
    }, [role]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/roles/permissions');
            setPermissions(response.data || []);
        } catch (err) {
            setError('Failed to load permissions');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = (permissionId) => {
        const next = new Set(selectedPermissions);
        if (next.has(permissionId)) {
            next.delete(permissionId);
        } else {
            next.add(permissionId);
        }
        setSelectedPermissions(next);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await api.put(`/roles/${role.id}/permissions`, {
                permissionIds: Array.from(selectedPermissions)
            });
            onBack(); // Go back to list on success
        } catch (err) {
            setError('Failed to save changes');
        } finally {
            setIsSaving(false);
        }
    };

    // Group permissions by module
    const groupedPermissions = permissions.reduce((acc, perm) => {
        if (!acc[perm.module]) acc[perm.module] = [];
        acc[perm.module].push(perm);
        return acc;
    }, {});

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-orange-600" />
                        Edit Permissions: <span className="text-orange-600">{role.displayName || role.name}</span>
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Configure access levels for this role</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 font-bold rounded-lg hover:bg-gray-100 transition-all text-sm flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm flex items-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Save Changes
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-bold text-sm">{error}</span>
                </div>
            )}

            {/* Permissions Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groupedPermissions).map(([module, perms]) => (
                    <div key={module} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <h3 className="font-black text-gray-700 uppercase tracking-wider text-sm">{module}</h3>
                        </div>
                        <div className="p-2 flex-col flex">
                            {perms.map(perm => (
                                <label
                                    key={perm.id}
                                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border border-transparent ${selectedPermissions.has(perm.id)
                                            ? 'bg-blue-50 border-blue-100'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedPermissions.has(perm.id)
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-300'
                                        }`}>
                                        {selectedPermissions.has(perm.id) && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedPermissions.has(perm.id)}
                                        onChange={() => handleToggle(perm.id)}
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{perm.action}</p>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">{perm.description || perm.code}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
