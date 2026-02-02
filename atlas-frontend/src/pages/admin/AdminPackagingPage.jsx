
import React, { useState } from 'react';
import { PackagingDashboard } from '../../components/packaging/PackagingDashboard';
import { PackagingOrders } from '../../components/packaging/PackagingOrders';
import { PackagingMaterials } from '../../components/packaging/PackagingMaterials';
import { PackagingReports } from '../../components/packaging/PackagingReports';

export function AdminPackagingPage() {
    const [activeView, setActiveView] = useState('dashboard');

    const renderView = () => {
        switch (activeView) {
            case 'orders':
                return <PackagingOrders onNavigate={setActiveView} />;
            case 'materials':
                return <PackagingMaterials onNavigate={setActiveView} />;
            case 'reports':
                return <PackagingReports onNavigate={setActiveView} />;
            default:
                return <PackagingDashboard onNavigate={setActiveView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {renderView()}
        </div>
    );
}
