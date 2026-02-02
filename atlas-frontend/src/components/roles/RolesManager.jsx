import React, { useState } from 'react';
import { RolesList } from './RolesList';
import { PermissionsManagement } from './PermissionsManagement';
import { CreateUserForm } from './CreateUserForm';

export function RolesManager() {
    const [activeView, setActiveView] = useState('list'); // 'list' | 'permissions' | 'add-user'

    const handleBackToList = () => setActiveView('list');

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-7xl mx-auto">
                {activeView === 'list' && (
                    <RolesList
                        onAddUser={() => setActiveView('add-user')}
                        onManagePermissions={() => setActiveView('permissions')}
                    />
                )}

                {activeView === 'permissions' && (
                    <PermissionsManagement onBack={handleBackToList} />
                )}

                {activeView === 'add-user' && (
                    <CreateUserForm onBack={handleBackToList} />
                )}
            </div>
        </div>
    );
}
