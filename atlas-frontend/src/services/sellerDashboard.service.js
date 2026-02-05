import api from '../lib/api';

export const sellerDashboardService = {
    /**
     * Get dashboard stats (Total Sales, Total Orders, Products, Pending Orders)
     * @param {string|number} [sellerId] - Optional seller ID for admins
     * @returns {Promise<Object>}
     */
    getStats: async (sellerId) => {
        const url = sellerId ? `/sellers/${sellerId}/dashboard/stats` : '/sellers/dashboard/stats';
        const response = await api.get(url);
        return response.data;
    },

    /**
     * Get sales performance data for charts
     * @param {string|number} [sellerId] - Optional seller ID for admins
     * @param {number} [days=30] - Number of days to look back
     * @returns {Promise<Array>}
     */
    getSalesPerformance: async (sellerId, days = 30) => {
        const url = sellerId 
            ? `/sellers/${sellerId}/dashboard/sales-performance?days=${days}` 
            : `/sellers/dashboard/sales-performance?days=${days}`;
        const response = await api.get(url);
        return response.data;
    },

    /**
     * Get top products by sales
     * @param {string|number} [sellerId] - Optional seller ID for admins
     * @param {number} [limit=5] - Number of products
     * @returns {Promise<Array>}
     */
    getTopProducts: async (sellerId, limit = 5) => {
        const url = sellerId 
            ? `/sellers/${sellerId}/dashboard/top-products?limit=${limit}` 
            : `/sellers/dashboard/top-products?limit=${limit}`;
        const response = await api.get(url);
        return response.data;
    },

    /**
     * Get recent orders
     * @param {string|number} [sellerId] - Optional seller ID for admins
     * @param {number} [limit=10] - Number of orders
     * @returns {Promise<Array>}
     */
    getRecentOrders: async (sellerId, limit = 10) => {
        const url = sellerId 
            ? `/sellers/${sellerId}/dashboard/recent-orders?limit=${limit}` 
            : `/sellers/dashboard/recent-orders?limit=${limit}`;
        const response = await api.get(url);
        return response.data;
    },

    /**
     * Get low stock alerts
     * @param {string|number} [sellerId] - Optional seller ID for admins
     * @param {number} [threshold=10] - Stock threshold
     * @returns {Promise<Array>}
     */
    getLowStockAlerts: async (sellerId, threshold = 10) => {
        const url = sellerId 
            ? `/sellers/${sellerId}/dashboard/low-stock-alerts?threshold=${threshold}` 
            : `/sellers/dashboard/low-stock-alerts?threshold=${threshold}`;
        const response = await api.get(url);
        return response.data;
    }
};
