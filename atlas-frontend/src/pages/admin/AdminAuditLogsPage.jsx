import React from 'react';
import { FileText } from 'lucide-react';

export function AdminAuditLogsPage() {
    return (
        <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            </div>
            <p className="text-gray-600">Audit Logs module (frontend placeholder)</p>
            <div className="mt-8 p-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-gray-50">
                <FileText className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Platform-wide activity and system logs will be displayed here.</p>
            </div>
        </div>
    );
}
