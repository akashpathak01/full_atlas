import React, { useState } from 'react';
import { DeliveryDashboard } from '../../components/delivery/DeliveryDashboard';
import { DeliveryAllOrders } from '../../components/delivery/DeliveryAllOrders';
import { DeliveryPendingConfirmations } from '../../components/delivery/DeliveryPendingConfirmations';
import { DeliveryShippingCompanies } from '../../components/delivery/DeliveryShippingCompanies';
import { DeliveryReturnedOrders } from '../../components/delivery/DeliveryReturnedOrders';

export function AdminDeliveryPage() {
    const [activeView, setActiveView] = useState('dashboard');

    const renderView = () => {
        switch (activeView) {
            case 'all-orders':
                return <DeliveryAllOrders onNavigate={setActiveView} />;
            case 'pending-confirmations':
                return <DeliveryPendingConfirmations onNavigate={setActiveView} />;
            case 'shipping-companies':
                return <DeliveryShippingCompanies onNavigate={setActiveView} />;
            case 'returned-orders':
                return <DeliveryReturnedOrders onNavigate={setActiveView} />;
            case 'process-returns':
                // Reusing returned orders view for now, or could be a separate component if flow differs
                return <DeliveryReturnedOrders onNavigate={setActiveView} />;
            default:
                return <DeliveryDashboard onNavigate={setActiveView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {renderView()}
        </div>
    );
}
