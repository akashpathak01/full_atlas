import React, { useState } from 'react';
import { SubscribersList } from './SubscribersList';
import { SubscriberDetails } from './SubscriberDetails'; // Back to named import
import { EditSubscriber } from './EditSubscriber';

export function SubscribersManager() {
    const [activeView, setActiveView] = useState('list');
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);

    const handleEdit = (subscriber) => {
        setSelectedSubscriber(subscriber);
        setActiveView('edit');
    };

    const handleView = (subscriber) => {
        setSelectedSubscriber(subscriber);
        setActiveView('details');
    };

    const handleBack = () => {
        setSelectedSubscriber(null);
        setActiveView('list');
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {activeView === 'list' && (
                <SubscribersList
                    onNavigate={setActiveView}
                    onEdit={handleEdit}
                    onView={handleView}
                />
            )}

            {activeView === 'details' && (
                <SubscriberDetails
                    subscriber={selectedSubscriber}
                    onBack={handleBack}
                    onEdit={() => setActiveView('edit')}
                />
            )}

            {activeView === 'edit' && (
                <EditSubscriber
                    subscriber={selectedSubscriber}
                    onBack={handleBack}
                    onViewDetails={() => setActiveView('details')}
                />
            )}
        </div>
    );
}
