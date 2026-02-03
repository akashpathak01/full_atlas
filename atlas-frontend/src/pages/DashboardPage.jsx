import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboardPage } from './admin/AdminDashboardPage';
import { SuperAdminDashboard } from '../components/dashboard/SuperAdminDashboard';
import { CallCenterDashboard } from '../components/dashboard/CallCenterDashboard';
import { ManagerDashboard } from '../components/dashboard/ManagerDashboard';
import { SellerDashboard } from '../components/dashboard/SellerDashboard';

export function DashboardPage() {
    const { user } = useAuth();
    // Default to Seller view for testing the new dashboard
    const role = user?.role || 'Super Admin';

    if (role === 'ADMIN') { // Corrected case to match backend
        return <AdminDashboardPage />;
    }

    if (role === 'CALL_CENTER_AGENT') {
        return <CallCenterDashboard />;
    }

    if (role === 'CALL_CENTER_MANAGER') {
        return <ManagerDashboard />;
    }

    if (role === 'SELLER') {
        return <SellerDashboard />;
    }

    return <AdminDashboardPage />; // Defaulting to Admin for now as SuperAdmin might be missing
}
