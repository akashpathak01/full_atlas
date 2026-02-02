import React from 'react';
import { Settings } from 'lucide-react';

export function AdminSystemConfigurationPage() {
    return (
        <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
            </div>
            <p className="text-gray-600">Configuration module (frontend placeholder)</p>
            <div className="mt-8 p-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-gray-50">
                <Settings className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">System settings and global rules will be managed here.</p>
            </div>
        </div>
    );
}
