import React, { useState } from 'react';
import { RolesList } from './RolesList';
import { PermissionsManagement } from './PermissionsManagement';
import { CreateUserForm } from './CreateUserForm';
import { RolePermissionEditor } from './RolePermissionEditor';

export function RolesManager() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [activeView, setActiveView] = useState('list'); // 'list' | 'permissions' | 'add-user' | 'edit-role'

    const handleBackToList = () => {
        setActiveView('list');
        setSelectedRole(null);
    };

    const handleEditRole = (role) => {
        setSelectedRole(role);
        setActiveView('edit-role');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-7xl mx-auto">
                {activeView === 'list' && (
                    <RolesList
                        onAddUser={() => setActiveView('add-user')}
                        onManagePermissions={() => setActiveView('permissions')}
                        onEditRole={handleEditRole}
                    />
                )}

                {activeView === 'permissions' && (
                    <PermissionsManagement onBack={handleBackToList} />
                )}

                {activeView === 'add-user' && (
                    <CreateUserForm onBack={handleBackToList} />
                )}

                {activeView === 'edit-role' && selectedRole && (
                    <RolePermissionEditor
                        role={selectedRole}
                        onBack={handleBackToList}
                    />
                )}
            </div>
        </div>
    );
}
