import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MainLayout } from './layouts/MainLayout';

// Admin Pages (Strict Conversion)
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminSellersPage } from './pages/admin/AdminSellersPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminAddProductPage } from './pages/admin/AdminAddProductPage';
import { AdminEditProductPage } from './pages/admin/AdminEditProductPage';
import { AdminWarehousesPage } from './pages/admin/AdminWarehousesPage';
import { AdminAddWarehousePage } from './pages/admin/AdminAddWarehousePage';

import { AdminFinancePage } from './pages/admin/AdminFinancePage';
import { AdminPaymentManagementPage } from './pages/admin/AdminPaymentManagementPage';
import { AdminAddPaymentPage } from './pages/admin/AdminAddPaymentPage';
import { AdminPaymentPlatformsPage } from './pages/admin/AdminPaymentPlatformsPage';
import { AdminFinancialReportsPage } from './pages/admin/AdminFinancialReportsPage';
import { AdminCreateInvoicePage } from './pages/admin/AdminCreateInvoicePage';
import { AdminSourcingPage } from './pages/admin/AdminSourcingPage';
import { AdminCreateSourcingRequestPage } from './pages/admin/AdminCreateSourcingRequestPage';
import { AdminSourcingRequestsPage } from './pages/admin/AdminSourcingRequestsPage';
import { AdminSuppliersPage } from './pages/admin/AdminSuppliersPage';
import { AdminPackagingPage } from './pages/admin/AdminPackagingPage';
import { AdminCallCenterPage } from './pages/admin/AdminCallCenterPage';
import { AdminDeliveryPage } from './pages/admin/AdminDeliveryPage';
import { AdminRolesPage } from './pages/admin/AdminRolesPage';
import { AdminSystemConfigurationPage } from './pages/admin/AdminSystemConfigurationPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

import { AuthProvider, useAuth } from './context/AuthContext';


// Seller Pages
import { SellerDashboardPage } from './pages/seller/SellerDashboardPage';
import { SellerOrdersPage } from './pages/seller/SellerOrdersPage';
import { SellerInventoryPage } from './pages/seller/SellerInventoryPage';
import { SellerProductsPage } from './pages/seller/SellerProductsPage';
import { SellerFinancePage } from './pages/seller/SellerFinancePage';
import { SellerSourcingPage } from './pages/seller/SellerSourcingPage';

// Call Center Pages
import { CallCenterDashboardPage } from './pages/call-center/CallCenterDashboardPage';
import { CallCenterOrdersPage } from './pages/call-center/CallCenterOrdersPage';
import { CallCenterCustomersPage } from './pages/call-center/CallCenterCustomersPage';
import { CustomerDetailPage } from './pages/call-center/CustomerDetailPage';

// Manager Pages
import { ManagerDashboardPage } from './pages/manager/ManagerDashboardPage';
import { ManagerOrdersPage } from './pages/manager/ManagerOrdersPage';
import { ManagerAgentsPage } from './pages/manager/ManagerAgentsPage';
import { ManagerPerformancePage } from './pages/manager/ManagerPerformancePage';
import { ManagerStatisticsPage } from './pages/manager/ManagerStatisticsPage';
import { ManagerSettingsPage } from './pages/manager/ManagerSettingsPage';

// Stock Keeper Pages
import { StockDashboardPage } from './pages/stock/StockDashboardPage';
import { StockInventoryPage } from './pages/stock/StockInventoryPage';
import { StockReceivingPage } from './pages/stock/StockReceivingPage';
import { StockPickingPage } from './pages/stock/StockPickingPage';
import { StockReturnsPage } from './pages/stock/StockReturnsPage';
import { StockWarehousesPage } from './pages/stock/StockWarehousesPage';
import { StockHistoryPage } from './pages/stock/StockHistoryPage';
import { PackagingDashboardPage } from './pages/packaging/PackagingDashboardPage';
import { PackagingOrdersPage } from './pages/packaging/PackagingOrdersPage';
import { PackagingMaterialsPage } from './pages/packaging/PackagingMaterialsPage';
import { PackagingManagementPage } from './pages/packaging/PackagingManagementPage';
import { PackagingReportsPage } from './pages/packaging/PackagingReportsPage';
import { DeliveryDashboardPage } from './pages/delivery/DeliveryDashboardPage';
import { DeliveryOrdersPage } from './pages/delivery/DeliveryOrdersPage';
import { DeliveryPerformancePage } from './pages/delivery/DeliveryPerformancePage';
import { DeliverySettingsPage } from './pages/delivery/DeliverySettingsPage';
import { OrderDetailPage } from './pages/orders/OrderDetailPage';


const AuthRedirect = () => {
  const { user } = useAuth();
  if (user) {
    const dashboardMap = {
      'Super Admin': '/admin/dashboard',
      'Admin': '/admin/dashboard',
      'Seller': '/seller/dashboard',
      'Call Center Agent': '/call-center/dashboard',
      'Call Center Manager': '/manager/dashboard',
      'Stock Keeper': '/stock/dashboard',
      'Packaging Agent': '/packaging/dashboard',
      'Delivery Agent': '/delivery/dashboard'
    };
    return <Navigate to={dashboardMap[user.role] || '/admin/dashboard'} replace />;
  }
  return <Navigate to="/login" replace />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided and user's role is not in the list
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardMap = {
      'Super Admin': '/admin/dashboard',
      'Admin': '/admin/dashboard',
      'Seller': '/seller/dashboard',
      'Call Center Agent': '/call-center/dashboard',
      'Call Center Manager': '/manager/dashboard',
      'Stock Keeper': '/stock/dashboard',
      'Packaging Agent': '/packaging/dashboard',
      'Delivery Agent': '/delivery/dashboard'
    };
    return <Navigate to={dashboardMap[user.role] || '/admin/dashboard'} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes - Using MainLayout as strictly requested */}
          {/* Protected Admin Routes Group */}
          <Route element={<ProtectedRoute allowedRoles={['Admin', 'Super Admin']}><Outlet /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={
              <MainLayout>
                <AdminDashboardPage />
              </MainLayout>
            } />

            <Route path="/admin/users" element={
              <MainLayout>
                <AdminUsersPage />
              </MainLayout>
            } />

            <Route path="/admin/sellers" element={
              <MainLayout>
                <AdminSellersPage />
              </MainLayout>
            } />

            <Route path="/admin/orders" element={
              <MainLayout>
                <AdminOrdersPage />
              </MainLayout>
            } />

            <Route path="/admin/orders/:id" element={
              <MainLayout>
                <OrderDetailPage />
              </MainLayout>
            } />

            <Route path="/admin/products" element={
              <MainLayout>
                <AdminProductsPage />
              </MainLayout>
            } />

            <Route path="/admin/products/add" element={
              <MainLayout>
                <AdminAddProductPage />
              </MainLayout>
            } />
            <Route path="/admin/products/edit/:id" element={
              <MainLayout>
                <AdminEditProductPage />
              </MainLayout>
            } />

            <Route path="/admin/inventory" element={
              <MainLayout>
                <AdminInventoryPage />
              </MainLayout>
            } />

            <Route path="/admin/inventory/warehouses" element={
              <MainLayout>
                <AdminWarehousesPage />
              </MainLayout>
            } />

            <Route path="/admin/inventory/warehouses/add" element={
              <MainLayout>
                <AdminAddWarehousePage />
              </MainLayout>
            } />

            <Route path="/admin/finance" element={
              <MainLayout>
                <AdminFinancePage />
              </MainLayout>
            } />

            <Route path="/admin/finance/payments" element={
              <MainLayout>
                <AdminPaymentManagementPage />
              </MainLayout>
            } />

            <Route path="/admin/finance/payments/add" element={
              <MainLayout>
                <AdminAddPaymentPage />
              </MainLayout>
            } />

            <Route path="/admin/finance/platforms" element={
              <MainLayout>
                <AdminPaymentPlatformsPage />
              </MainLayout>
            } />

            <Route path="/admin/finance/reports" element={
              <MainLayout>
                <AdminFinancialReportsPage />
              </MainLayout>
            } />

            <Route path="/admin/finance/invoices/create" element={
              <MainLayout>
                <AdminCreateInvoicePage />
              </MainLayout>
            } />

            <Route path="/admin/sourcing" element={
              <MainLayout>
                <AdminSourcingPage />
              </MainLayout>
            } />

            <Route path="/admin/sourcing/create" element={
              <MainLayout>
                <AdminCreateSourcingRequestPage />
              </MainLayout>
            } />

            <Route path="/admin/sourcing/requests" element={
              <MainLayout>
                <AdminSourcingRequestsPage />
              </MainLayout>
            } />

            {/* ... other admin routes can go here ... */}

            <Route path="/admin/sourcing/suppliers" element={
              <MainLayout>
                <AdminSuppliersPage />
              </MainLayout>
            } />


            <Route path="/admin/packaging" element={
              <MainLayout>
                <AdminPackagingPage />
              </MainLayout>
            } />

            <Route path="/admin/call-center" element={
              <MainLayout>
                <AdminCallCenterPage />
              </MainLayout>
            } />

            <Route path="/admin/delivery" element={
              <MainLayout>
                <AdminDeliveryPage />
              </MainLayout>
            } />


            <Route path="/admin/roles" element={
              <MainLayout>
                <AdminRolesPage />
              </MainLayout>
            } />
          </Route>

          {/* Super Admin Routes Group */}
          <Route element={<ProtectedRoute allowedRoles={['Super Admin']}><Outlet /></ProtectedRoute>}>
            <Route path="/super-admin/system-configuration" element={
              <MainLayout>
                <AdminSystemConfigurationPage />
              </MainLayout>
            } />

            <Route path="/super-admin/audit-logs" element={
              <MainLayout>
                <AdminAuditLogsPage />
              </MainLayout>
            } />
          </Route>


          {/* Seller Routes - Using MainLayout for consistency */}
          <Route path="/seller/dashboard" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <SellerDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/seller/orders" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <SellerOrdersPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/seller/orders/:id" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <OrderDetailPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/seller/inventory" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <SellerInventoryPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/seller/products" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <SellerProductsPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/seller/finance" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <SellerFinancePage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/seller/sourcing" element={
            <ProtectedRoute allowedRoles={['Seller', 'Admin', 'Super Admin']}>
              <MainLayout>
                <SellerSourcingPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Call Center Routes - Using MainLayout */}
          <Route path="/call-center/dashboard" element={
            <ProtectedRoute allowedRoles={['Call Center Agent', 'Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <CallCenterDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/call-center/orders" element={
            <ProtectedRoute allowedRoles={['Call Center Agent', 'Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <CallCenterOrdersPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/call-center/orders/:id" element={
            <ProtectedRoute allowedRoles={['Call Center Agent', 'Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <OrderDetailPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/call-center/customers" element={
            <ProtectedRoute allowedRoles={['Call Center Agent', 'Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <CallCenterCustomersPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/call-center/customers/:id" element={
            <ProtectedRoute allowedRoles={['Call Center Agent', 'Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <CustomerDetailPage />
              </MainLayout>
            </ProtectedRoute>
          } />



          {/* Call Center Manager Routes - Using MainLayout */}
          <Route path="/manager/dashboard" element={
            <ProtectedRoute allowedRoles={['Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <ManagerDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manager/orders" element={
            <ProtectedRoute allowedRoles={['Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <ManagerOrdersPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manager/agents" element={
            <ProtectedRoute allowedRoles={['Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <ManagerAgentsPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manager/performance" element={
            <ProtectedRoute allowedRoles={['Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <ManagerPerformancePage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manager/statistics" element={
            <ProtectedRoute allowedRoles={['Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <ManagerStatisticsPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manager/settings" element={
            <ProtectedRoute allowedRoles={['Call Center Manager', 'Admin', 'Super Admin']}>
              <MainLayout>
                <ManagerSettingsPage />
              </MainLayout>
            </ProtectedRoute>
          } />



          {/* Stock Keeper Routes - Using MainLayout */}
          <Route path="/stock/dashboard" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/stock/inventory" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockInventoryPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/stock/receiving" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockReceivingPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/stock/picking" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockPickingPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/stock/returns" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockReturnsPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/stock/warehouses" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockWarehousesPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/stock/history" element={
            <ProtectedRoute allowedRoles={['Stock Keeper', 'Admin', 'Super Admin']}>
              <MainLayout>
                <StockHistoryPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Packaging Agent Routes - Using MainLayout */}
          <Route path="/packaging/dashboard" element={
            <ProtectedRoute allowedRoles={['Packaging Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <PackagingDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/packaging/orders" element={
            <ProtectedRoute allowedRoles={['Packaging Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <PackagingOrdersPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/packaging/orders/:id" element={
            <ProtectedRoute allowedRoles={['Packaging Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <OrderDetailPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/packaging/materials" element={
            <ProtectedRoute allowedRoles={['Packaging Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <PackagingMaterialsPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/packaging/management" element={
            <ProtectedRoute allowedRoles={['Packaging Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <PackagingManagementPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/packaging/reports" element={
            <ProtectedRoute allowedRoles={['Packaging Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <PackagingReportsPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Delivery Agent Routes - Using MainLayout */}
          <Route path="/delivery/dashboard" element={
            <ProtectedRoute allowedRoles={['Delivery Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <DeliveryDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/delivery/orders" element={
            <ProtectedRoute allowedRoles={['Delivery Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <DeliveryOrdersPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/delivery/performance" element={
            <ProtectedRoute allowedRoles={['Delivery Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <DeliveryPerformancePage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/delivery/settings" element={
            <ProtectedRoute allowedRoles={['Delivery Agent', 'Admin', 'Super Admin']}>
              <MainLayout>
                <DeliverySettingsPage />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Fallback to dashboard for unknown routes if logged in, or login */}
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
