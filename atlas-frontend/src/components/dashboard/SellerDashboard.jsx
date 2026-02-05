import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellerDashboardService } from '../../services/sellerDashboard.service';
import {
    Settings,
    ShoppingBag,
    ShoppingCart,
    Package,
    Clock,
    Plus,
    BarChart2,
    Box,
    CheckCircle2,
    X,
    Home,
    ChevronRight,
    Search,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Loader2
} from 'lucide-react';

export function SellerDashboard() {
    const [showAlert, setShowAlert] = useState(true);
    const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        stats: null,
        performance: [],
        topProducts: [],
        recentOrders: [],
        lowStock: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [stats, performance, topProducts, recentOrders, lowStock] = await Promise.all([
                    sellerDashboardService.getStats(),
                    sellerDashboardService.getSalesPerformance(),
                    sellerDashboardService.getTopProducts(),
                    sellerDashboardService.getRecentOrders(),
                    sellerDashboardService.getLowStockAlerts()
                ]);

                setData({
                    stats,
                    performance,
                    topProducts,
                    recentOrders,
                    lowStock
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Top Alert Banner */}
            {showAlert && (
                <div className="bg-green-50 border-b border-green-100 py-3 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-1 rounded-full">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-green-700 text-sm font-medium">Welcome Demo Seller! Login successful.</span>
                    </div>
                    <button
                        onClick={() => setShowAlert(false)}
                        className="text-green-400 hover:text-green-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="p-6 max-w-[1600px] mx-auto space-y-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Home</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">Sellers</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Dashboard</span>
                </div>

                {/* Dashboard Header */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <ShoppingBag className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-orange-500">Seller Dashboard</h1>
                            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your business today.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Sales"
                        value={`AED ${data.stats?.revenue?.value?.toLocaleString() || 0}`}
                        trend={`${data.stats?.revenue?.change >= 0 ? '+' : ''}${data.stats?.revenue?.change?.toFixed(1) || 0}% from last month`}
                        icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
                        color="bg-orange-50"
                        textColor={data.stats?.revenue?.change >= 0 ? "text-green-600" : "text-red-600"}
                        trendIcon={data.stats?.revenue?.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    />
                    <StatCard
                        title="Total Orders"
                        value={data.stats?.orders?.value || 0}
                        trend={`${data.stats?.orders?.change >= 0 ? '+' : ''}${data.stats?.orders?.change?.toFixed(1) || 0}% from last month`}
                        icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
                        color="bg-blue-50"
                        textColor={data.stats?.orders?.change >= 0 ? "text-green-600" : "text-red-600"}
                        trendIcon={data.stats?.orders?.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    />
                    <StatCard
                        title="Products"
                        value={data.stats?.products?.value || 0}
                        trend={`${data.stats?.products?.change >= 0 ? '+' : ''}${data.stats?.products?.change?.toFixed(1) || 0}% from last week`}
                        icon={<Package className="w-6 h-6 text-green-600" />}
                        color="bg-green-50"
                        textColor={data.stats?.products?.change >= 0 ? "text-green-600" : "text-red-600"}
                        trendIcon={data.stats?.products?.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    />
                    <StatCard
                        title="Out of Stock"
                        value={data.stats?.outOfStock?.value || 0}
                        trend={data.stats?.outOfStock?.status || 'All good'}
                        icon={<Clock className="w-6 h-6 text-yellow-600" />}
                        color="bg-yellow-50"
                        textColor={data.stats?.outOfStock?.value > 0 ? "text-red-600" : "text-yellow-600"}
                        trendIcon={data.stats?.outOfStock?.value > 0 ? <AlertCircle className="w-3 h-3" /> : null}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Performance */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Sales Performance</h3>
                                <p className="text-sm text-gray-500 mt-1">Monthly sales trend</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
                                Sales (AED)
                            </div>
                        </div>
                        <div className="h-72 w-full">
                            <DynamicLineChart data={data.performance} />
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Top Products</h3>
                                <p className="text-sm text-gray-500 mt-1">Most ordered products</p>
                            </div>
                        </div>
                        <div className="h-72 overflow-y-auto pr-2 custom-scrollbar">
                            {data.topProducts.length > 0 ? (
                                <div className="space-y-4 pt-2">
                                    {data.topProducts.map((product, idx) => (
                                        <div key={product.id} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-5 h-5 text-gray-400 m-auto mt-2" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                                                    {product.name}
                                                </h4>
                                                <p className="text-xs text-gray-500">{product.quantity} units sold</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900">AED {product.sales.toLocaleString()}</p>
                                                <p className="text-[10px] text-green-600 font-medium flex items-center justify-end gap-1">
                                                    <TrendingUp className="w-2.5 h-2.5" />
                                                    Top {idx + 1}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-60">
                                    <Box className="w-10 h-10 text-gray-300 mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">No sales data yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
                        <p className="text-sm text-gray-500 mt-1">Common tasks and shortcuts</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ActionCard
                            title="Create Order"
                            desc="Create new order"
                            icon={<Plus className="w-5 h-5 text-orange-600" />}
                            bg="bg-orange-100"
                            onClick={() => setIsCreateOrderModalOpen(true)}
                        />
                        <ActionCard
                            title="View Orders"
                            desc="Manage orders"
                            icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
                            bg="bg-blue-100"
                            onClick={() => navigate('/seller/orders')}
                        />
                        <ActionCard
                            title="Inventory"
                            desc="Check stock levels"
                            icon={<Box className="w-5 h-5 text-green-600" />}
                            bg="bg-green-100"
                            onClick={() => navigate('/seller/inventory')}
                        />
                        <ActionCard
                            title="Analytics"
                            desc="View reports"
                            icon={<BarChart2 className="w-5 h-5 text-purple-600" />}
                            bg="bg-purple-100"
                            onClick={() => navigate('/seller/finance')}
                        />
                    </div>
                </div>

                {/* Bottom Section: Recent Orders & Stock Alert */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                                <p className="text-sm text-gray-500 mt-1">Latest order activity</p>
                            </div>
                            <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
                                View all →
                            </button>
                        </div>
                        <div className="overflow-hidden">
                            {data.recentOrders.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {data.recentOrders.map((order) => (
                                        <OrderRow
                                            key={order.id}
                                            id={order.orderNumber}
                                            date={new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                            amount={`AED ${order.totalAmount?.toLocaleString() || 0}`}
                                            status={order.status}
                                            statusColor={
                                                order.status === 'CREATED' ? 'text-blue-600' :
                                                order.status === 'PAID' ? 'text-green-600' :
                                                order.status === 'CANCELLED' ? 'text-red-600' : 'text-gray-600'
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <ShoppingCart className="w-12 h-12 text-gray-200 mb-3" />
                                    <h4 className="text-gray-900 font-bold">No orders yet</h4>
                                    <p className="text-gray-400 text-sm">Your recent orders will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Low Stock Alert</h3>
                                <p className="text-sm text-gray-500 mt-1">Products running low on stock</p>
                            </div>
                            <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
                                Manage →
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                            {data.lowStock.length > 0 ? (
                                <div className="space-y-4 pt-2">
                                    {data.lowStock.map((product) => (
                                        <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-red-50/50 border border-red-50 group hover:bg-red-50 transition-colors">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-red-100 flex items-center justify-center">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Box className="w-5 h-5 text-red-300" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-bold text-gray-900 truncate">
                                                    {product.name}
                                                </h4>
                                                <p className="text-[10px] text-gray-500">SKU: {product.sku}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-red-600">{product.currentStock} left</p>
                                                <p className={`text-[9px] px-1.5 py-0.5 rounded-full inline-block font-bold uppercase mt-1 ${
                                                    product.severity === 'critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                                                }`}>
                                                    {product.severity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-800">All good!</h4>
                                    <p className="text-gray-500 text-sm mt-1">No low stock products</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <CreateOrderModal
                isOpen={isCreateOrderModalOpen}
                onClose={() => setIsCreateOrderModalOpen(false)}
            />

            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
            />
        </div>
    );
}

function StatCard({ title, value, trend, icon, color, textColor, trendIcon }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${textColor.replace('text-', 'bg-')}`}></div>
            <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                    <div className="flex items-center gap-1 mt-1">
                        {trendIcon && <span className={textColor}>{trendIcon}</span>}
                        <p className={`text-xs ${textColor} font-bold`}>{trend}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionCard({ title, desc, icon, bg, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all text-left bg-white group w-full"
        >
            <div className={`p-3 rounded-lg ${bg}`}>
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">{title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
        </button>
    );
}

function ProductBar({ name, count, color }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-600 font-medium">{name}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${count}%` }}></div>
            </div>
        </div>
    );
}

function OrderRow({ id, date, amount, status, statusColor }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-full">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{id}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-gray-900 text-sm">{amount}</p>
                <p className={`text-xs font-medium ${statusColor} mt-0.5`}>{status}</p>
            </div>
        </div>
    );
}

function DynamicLineChart({ data }) {
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const maxVal = Math.max(...data.map(d => d.sales), 1000) * 1.2;
    
    // Create points for the SVG path
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1 || 1)) * 500;
        const y = 200 - (d.sales / maxVal) * 180;
        return { x, y };
    });

    const pathD = points.length > 0 
        ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
        : 'M 0 195 L 500 195';

    const areaD = points.length > 0
        ? `${pathD} L ${points[points.length - 1].x} 200 L 0 200 Z`
        : 'M 0 195 L 500 195 L 500 200 L 0 200 Z';

    return (
        <div className="w-full h-full relative font-sans pl-2">
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400 font-medium w-12 text-right pr-2">
                <span>{Math.round(maxVal).toLocaleString()}</span>
                <span>{Math.round(maxVal * 0.75).toLocaleString()}</span>
                <span>{Math.round(maxVal * 0.5).toLocaleString()}</span>
                <span>{Math.round(maxVal * 0.25).toLocaleString()}</span>
                <span>0</span>
            </div>

            <div className="absolute left-12 right-0 top-2 bottom-6">
                <div className="w-full h-full flex flex-col justify-between">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full border-t border-gray-50 h-0"></div>
                    ))}
                </div>

                <div className="absolute inset-0 z-10">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 200">
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(249, 115, 22, 0.2)" />
                                <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
                            </linearGradient>
                        </defs>
                        <path d={areaD} fill="url(#chartGradient)" stroke="none" />
                        <path d={pathD} fill="none" stroke="#F97316" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                        
                        {points.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#F97316" stroke="white" strokeWidth="2" className="hover:r-5 cursor-pointer transition-all" />
                        ))}
                    </svg>
                </div>
            </div>

            <div className="absolute left-12 right-0 bottom-0 flex justify-between text-[10px] text-gray-400 font-medium pt-2 px-0">
                {data.length > 0 ? data.map((d, i) => (
                    <span key={i}>{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                )) : months.map((m, i) => <span key={i}>{m}</span>)}
            </div>
        </div>
    );
}

function MockLineChart() {
    return <DynamicLineChart data={[]} />;
}

function CreateOrderModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">Create New Order</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Customer Name</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="Enter customer name" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="Enter phone number" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Product</label>
                            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white">
                                <option>Select Product</option>
                                <option>Product A</option>
                                <option>Product B</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="1" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Shipping Address</label>
                        <textarea className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none h-24" placeholder="Enter full address"></textarea>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-sm shadow-orange-200">
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
}

function SettingsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">Settings & Preferences</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button className="flex-1 py-1.5 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm">Profile</button>
                        <button className="flex-1 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Notifications</button>
                        <button className="flex-1 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Security</button>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl border-4 border-white shadow-sm">
                                DS
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Demo Seller</h4>
                                <p className="text-sm text-gray-500">seller@example.com</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Display Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" defaultValue="Demo Seller" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50" defaultValue="seller@example.com" disabled />
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                                <p className="text-xs text-gray-500">Receive daily summaries</p>
                            </div>
                            <div className="w-10 h-5 bg-orange-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

