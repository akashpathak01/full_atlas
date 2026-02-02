import React, { useState } from 'react';
import { OrdersList } from './OrdersList';
import { OrderForm } from './OrderForm';

export function OrderManager() {
    const [view, setView] = useState('list'); // 'list' or 'form'

    if (view === 'form') {
        return <OrderForm onBack={() => setView('list')} />;
    }

    return <OrdersList onAddNewOrder={() => setView('form')} />;
}
