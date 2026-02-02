import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';
import { SuperAdminDashboard } from '../components/dashboard/SuperAdminDashboard';
import { CallCenterDashboard } from '../components/dashboard/CallCenterDashboard';
import { ManagerDashboard } from '../components/dashboard/ManagerDashboard';
import { SellerDashboard } from '../components/dashboard/SellerDashboard';

export function DashboardPage() {
    const { user } = useAuth();
    // Default to Seller view for testing the new dashboard
    // const role = user?.role || 'Super Admin'; 
    const role = 'Seller'; // FORCED for preview as per user request

    if (role === 'Admin') {
        return <AdminDashboard />;
    }

    if (role === 'Call Center Agent') {
        return <CallCenterDashboard />;
    }

    if (role === 'Call Center Manager') {
        return <ManagerDashboard />;
    }

    if (role === 'Seller') {
        return <SellerDashboard />;
    }

    return <SuperAdminDashboard />;
}
