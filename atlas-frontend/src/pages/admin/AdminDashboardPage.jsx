
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Bell,
    TrendingUp,
    Activity,
    ArrowRight,
    BarChart3,
    AlertTriangle,
    Package,
    ShoppingCart,
    Lock,
    Settings,
    FileText,
    DollarSign,
    Box,
    Truck,
    Headphones,
    UserCheck,
    RefreshCw,
    Shield,
    Warehouse
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

export function AdminDashboardPage() {
    const navigate = useNavigate();

    const metricCards = [
        {
            title: "Active Users",
            value: "18",
            link: "View all users →",
            path: "/admin/users",
            icon: <Users className="w-5 h-5 text-blue-600" />,
            iconBg: "bg-blue-50",
        },
        {
            title: "System Alerts",
            value: "0",
            link: "View all alerts →",
            path: "/admin/dashboard",
            icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
            iconBg: "bg-red-50",
            alert: true
        },
        {
            title: "Total Sales",
            value: "AED 22,962",
            link: "View details →",
            path: "/admin/finance",
            icon: <TrendingUp className="w-5 h-5 text-green-600" />,
            iconBg: "bg-green-50",
        },
        {
            title: "System Performance",
            value: "58%",
            link: "",
            path: "",
            icon: <Activity className="w-5 h-5 text-purple-600" />,
            iconBg: "bg-purple-50",
        }
    ];

    const drilldownReports = [
        {
            title: "Sales Overview",
            description: "Revenue trends & order analytics",
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            color: "bg-emerald-500",
            path: "/admin/finance"
        },
        {
            title: "Inventory Alerts",
            description: "Low stock & reorder notifications",
            icon: <AlertTriangle className="w-6 h-6 text-white" />,
            color: "bg-orange-500",
            path: "/admin/inventory",
            badge: "0 Active"
        },
        {
            title: "Stock Reservations",
            description: "Order stock holds & allocations",
            icon: <Box className="w-6 h-6 text-white" />,
            color: "bg-purple-500",
            path: "/admin/inventory",
            badge: "0 Reserved"
        },
        {
            title: "User Activity",
            description: "Login history & user actions",
            icon: <Users className="w-6 h-6 text-white" />,
            color: "bg-blue-500",
            path: "/admin/users"
        }
    ];

    const quickFilters = [
        { label: "Low Stock", icon: <TrendingUp className="w-4 h-4" />, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Inventory", icon: <Warehouse className="w-4 h-4" />, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Orders", icon: <ShoppingCart className="w-4 h-4" />, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "System", icon: <Settings className="w-4 h-4" />, color: "text-red-600", bg: "bg-red-50" },
        { label: "Payment", icon: <DollarSign className="w-4 h-4" />, color: "text-green-600", bg: "bg-green-50" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                <Warehouse className="w-4 h-4 mr-1" />
                <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate('/admin/dashboard')}>Home</span>
                <ArrowRight className="w-3 h-3 mx-1" />
                <span className="text-gray-900">Dashboard</span>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricCards.map((card, i) => (
                    <Card key={i} className="border border-gray-100 hover:shadow-md transition-shadow cursor-pointer overflow-hidden group">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{card.value}</h3>
                                </div>
                                <div className={`${card.iconBg} p-2.5 rounded-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                    {card.icon}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                {card.link ? (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); card.path && navigate(card.path); }}
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center"
                                    >
                                        {card.link}
                                    </button>
                                ) : <div className="h-4" />}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Activity Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">User Activity</h2>
                            <p className="text-xs text-gray-500">Monthly user activity overview</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                <span className="text-xs font-medium text-gray-600">Active Users</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                                <span className="text-xs font-medium text-gray-600">New Registrations</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 relative mt-4">
                        {/* SVG Mock Chart */}
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            {/* Grid Lines */}
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <line
                                    key={i}
                                    x1="0" y1={i * 20 + "%"}
                                    x2="100%" y2={i * 20 + "%"}
                                    stroke="#f1f5f9" strokeWidth="1"
                                />
                            ))}
                            {/* Line 1 - Active Users */}
                            <path
                                d="M0,180 Q150,175 300,170 T600,165 T900,100"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                className="drop-shadow-lg"
                            />
                            {/* Area 2 - New Registrations */}
                            <path
                                d="M0,195 Q150,192 300,190 T600,185 T900,10"
                                fill="rgba(16, 185, 129, 0.1)"
                                stroke="#10b981"
                                strokeWidth="3"
                            />
                            {/* Dots */}
                            <circle cx="0" cy="180" r="4" fill="#3b82f6" />
                            <circle cx="300" cy="170" r="4" fill="#3b82f6" />
                            <circle cx="600" cy="165" r="4" fill="#3b82f6" />
                            <circle cx="900" cy="100" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />

                            <circle cx="0" cy="195" r="4" fill="#10b981" />
                            <circle cx="300" cy="190" r="4" fill="#10b981" />
                            <circle cx="600" cy="185" r="4" fill="#10b981" />
                            <circle cx="900" cy="10" r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                        </svg>
                        {/* X-Axis labels */}
                        <div className="flex justify-between mt-4 px-2">
                            {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map(m => (
                                <span key={m} className="text-[10px] font-medium text-gray-400">{m}</span>
                            ))}
                        </div>
                        {/* Y-Axis labels */}
                        <div className="absolute left-[-20px] top-0 bottom-4 flex flex-col justify-between text-[10px] font-medium text-gray-400">
                            {[18, 16, 14, 12, 10, 8, 6, 4, 2, 0].map(n => <span key={n}>{n}</span>)}
                        </div>
                    </div>
                </div>

                {/* System Performance Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">System Performance</h2>
                    <p className="text-xs text-gray-500 mb-6 font-medium uppercase tracking-wider">System response time metrics</p>

                    <div className="flex items-end justify-between h-56 px-2">
                        {[
                            { day: 'Mon', val: 58, color: 'bg-blue-500' },
                            { day: 'Tue', val: 62, color: 'bg-emerald-500' },
                            { day: 'Wed', val: 65, color: 'bg-orange-400' },
                            { day: 'Thu', val: 68, color: 'bg-rose-500' },
                            { day: 'Fri', val: 72, color: 'bg-purple-500' },
                            { day: 'Sat', val: 56, color: 'bg-pink-500' },
                            { day: 'Sun', val: 60, color: 'bg-cyan-500' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center flex-1">
                                <div
                                    className={`${item.color} w-8 rounded-t-lg transition-all duration-700 relative group`}
                                    style={{ height: `${item.val}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        {item.val}ms
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 mt-2">{item.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Days of Week</span>
                    </div>
                </div>
            </div>

            {/* Drilldown Reports */}
            <div className="space-y-4">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-gray-900">Drilldown Reports</h2>
                    <p className="text-xs text-gray-500">Detailed analytics and data exploration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {drilldownReports.map((report, i) => (
                        <Card
                            key={i}
                            onClick={() => navigate(report.path)}
                            className={`${report.color} border-none shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden h-32`}
                        >
                            <CardContent className="p-5 flex flex-col justify-between h-full relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                                        {report.icon}
                                    </div>
                                    {report.badge && (
                                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full">{report.badge}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight">{report.title}</h3>
                                    <p className="text-white/80 text-[10px] font-medium uppercase tracking-wider">{report.description}</p>
                                </div>
                            </CardContent>
                            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Quick Alert Filters */}
            <div className="pt-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Alert Filters</p>
                <div className="flex flex-wrap gap-3">
                    {quickFilters.map((filter, i) => (
                        <button
                            key={i}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-100 ${filter.bg} ${filter.color} hover:shadow-sm transition-all text-xs font-bold ring-1 ring-gray-100`}
                        >
                            {filter.icon}
                            <span>{filter.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
