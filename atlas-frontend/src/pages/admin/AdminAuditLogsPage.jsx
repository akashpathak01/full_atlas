import React, { useState, useEffect } from 'react';
import {
    FileText,
    Search,
    Filter,
    Clock,
    User,
    Shield,
    ArrowRight,
    Eye,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Activity,
    Database,
    Download
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import api from '../../lib/api';

export function AdminAuditLogsPage() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        total: 0,
        totalPages: 0
    });
    const [filters, setFilters] = useState({
        actionType: 'All Actions',
        entityType: 'All Entities'
    });

    useEffect(() => {
        fetchLogs();
    }, [pagination.page]);

    const fetchLogs = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/audit-logs?page=${pagination.page}&limit=${pagination.limit}`);
            setLogs(response.data.data || []);
            setPagination(prev => ({
                ...prev,
                total: response.data.meta?.total || 0,
                totalPages: response.data.meta?.totalPages || 0
            }));
        } catch (error) {
            console.error('Failed to fetch audit logs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const actionColors = {
        'CREATE': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'UPDATE': 'bg-blue-50 text-blue-700 border-blue-100',
        'DELETE': 'bg-red-50 text-red-700 border-red-100',
        'LOGIN': 'bg-purple-50 text-purple-700 border-purple-100',
        'STATUS_UPDATE': 'bg-amber-50 text-amber-700 border-amber-100'
    };

    const getActionColor = (action) => {
        if (action.includes('CREATE')) return actionColors.CREATE;
        if (action.includes('UPDATE')) return actionColors.UPDATE;
        if (action.includes('DELETE')) return actionColors.DELETE;
        if (action.includes('LOGIN')) return actionColors.LOGIN;
        return 'bg-gray-50 text-gray-700 border-gray-100';
    };

    if (isLoading && logs.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <FileText className="w-8 h-8 mr-3 text-red-500" />
                        Audit Trail Logs
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor platform activity and security events</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Logs
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-orange-100 bg-orange-50/30">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Total Events</p>
                            <p className="text-xl font-black text-gray-900">{pagination.total}</p>
                        </div>
                    </CardContent>
                </Card>
                {/* More stats could be added here */}
            </div>

            {/* Filters */}
            <Card className="border border-gray-100">
                <CardContent className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search logs by user or entity..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Logs Table */}
            <Card className="border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-[10px] text-gray-500 uppercase font-black tracking-[0.1em] bg-gray-50/80">
                            <tr>
                                <th className="px-6 py-4">TIMESTAMP</th>
                                <th className="px-6 py-4">PERFORMER</th>
                                <th className="px-6 py-4">ACTION</th>
                                <th className="px-6 py-4">ENTITY</th>
                                <th className="px-6 py-4">METADATA</th>
                                <th className="px-6 py-4 text-right">DETAILS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold">{new Date(log.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-gray-400 font-black">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{log.performerName}</span>
                                                <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{log.performedByRole}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex px-2 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider",
                                            getActionColor(log.actionType)
                                        )}>
                                            {log.actionType.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold text-xs">{log.entityType}</span>
                                            <span className="text-[10px] text-gray-400 font-black">ID: {log.entityId || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-gray-500 font-medium truncate max-w-[200px]">
                                            {log.metadata ? JSON.stringify(log.metadata) : 'No extra data'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">
                        Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} logs
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                                    className={cn(
                                        "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                                        pagination.page === i + 1 ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

