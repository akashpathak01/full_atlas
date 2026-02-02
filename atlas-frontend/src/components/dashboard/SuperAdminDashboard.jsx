import React from 'react';
import { ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { stats, recentOrders, systemHealth } from '../../data/mockData';

export function SuperAdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:-translate-y-1 transition-transform duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-2xl bg-${stat.color}-100 text-${stat.color}-600`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                                    <div className="flex items-center mt-1">
                                        {stat.trend === 'up' ? (
                                            <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                                        ) : (
                                            <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                                        )}
                                        <span className={stat.trend === 'up' ? "text-xs font-medium text-green-600" : "text-xs font-medium text-red-600"}>
                                            {stat.change} from last month
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader className="flex items-center justify-between py-4">
                            <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                                View All <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-200">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <Badge
                                                    variant={
                                                        order.status === 'Delivered' ? 'success' :
                                                            order.status === 'Processing' ? 'info' :
                                                                order.status === 'Cancelled' ? 'danger' :
                                                                    order.status === 'Shipped' ? 'success' : 'warning'
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{order.id}</p>
                                                <p className="text-sm text-slate-500">{order.customer}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">{order.amount}</p>
                                            <p className="text-xs text-slate-500">{order.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-1">
                    <Card className="h-full">
                        <CardHeader className="py-4">
                            <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Button className="w-full justify-start text-left" variant="primary">
                                    <span className="mr-2">👤</span> Create User
                                </Button>
                                <Button className="w-full justify-start text-left" variant="secondary">
                                    <span className="mr-2">🏪</span> Manage Sellers
                                </Button>
                                <Button className="w-full justify-start text-left" variant="secondary">
                                    <span className="mr-2">📊</span> View Workflow
                                </Button>
                                <Button className="w-full justify-start text-left" variant="secondary">
                                    <span className="mr-2">🚚</span> Delivery Status
                                </Button>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-sm font-semibold text-slate-900 mb-4">System Health</h4>
                                <div className="space-y-4">
                                    {systemHealth.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-slate-600">{item.name}</span>
                                                <span className={`font-medium ${item.status === 'online' ? 'text-green-600' :
                                                    item.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                    {item.status === 'online' ? 'Healthy' : item.status === 'warning' ? 'Warning' : 'Offline'}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${item.status === 'online' ? 'bg-green-500' :
                                                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
