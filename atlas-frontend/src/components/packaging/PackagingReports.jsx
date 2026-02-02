import React from 'react';
import { FileText, Download, TrendingUp, CheckCircle, AlertTriangle, XCircle, Clock, Package, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PackagingReports() {
    const navigate = useNavigate();

    const handleExportPDF = () => {
        alert("Preparing PDF report for download...");
        // Simulation logic for PDF generation
    };

    const handleExportCSV = () => {
        alert("Preparing CSV report for download...");
        // Simulation logic for CSV generation
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                        <FileText className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-600">Packaging Report</h1>
                        <p className="text-sm text-gray-500">View packaging performance and statistics</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/packaging/dashboard')}
                    className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 flex items-center gap-2 shadow-sm transition-all text-sm"
                >
                    <Home className="w-4 h-4" /> Dashboard
                </button>
            </div>

            {/* Report Period */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-700 text-lg">Report Period</h2>
                <div className="flex bg-gray-100 p-1.5 rounded-xl gap-1">
                    <button className="px-6 py-2 bg-orange-600 text-white text-sm font-bold rounded-lg shadow-md transition-all">Today</button>
                    <button className="px-6 py-2 text-gray-500 text-sm font-bold hover:text-gray-900 transition-colors">Last 7 Days</button>
                    <button className="px-6 py-2 text-gray-500 text-sm font-bold hover:text-gray-900 transition-colors">Last 30 Days</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-xl"><Package className="w-6 h-6 text-green-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Packages Completed</p>
                            <h3 className="text-3xl font-bold text-gray-900">0</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl"><Clock className="w-6 h-6 text-blue-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Duration</p>
                            <h3 className="text-3xl font-bold text-gray-900">0 min</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 rounded-xl"><CheckCircle className="w-6 h-6 text-yellow-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quality Checks</p>
                            <h3 className="text-3xl font-bold text-gray-900">0</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 rounded-xl"><TrendingUp className="w-6 h-6 text-purple-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pass Rate</p>
                            <h3 className="text-3xl font-bold text-gray-900">0%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quality Check Results */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[400px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 font-primary">Quality Check Results</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[#F0FDF4] rounded-xl group transition-all">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                                <span className="text-base font-medium text-[#166534]">Passed</span>
                            </div>
                            <span className="font-bold text-[#22C55E] text-lg">0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#FFFBEB] rounded-xl group transition-all">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                                <span className="text-base font-medium text-[#92400E]">Conditional</span>
                            </div>
                            <span className="font-bold text-[#F59E0B] text-lg">0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#FEF2F2] rounded-xl group transition-all">
                            <div className="flex items-center gap-3">
                                <XCircle className="w-5 h-5 text-[#EF4444]" />
                                <span className="text-base font-medium text-[#991B1B]">Failed</span>
                            </div>
                            <span className="font-bold text-[#EF4444] text-lg">0</span>
                        </div>
                    </div>
                    <div className="mt-auto pb-10 text-center">
                        <p className="text-gray-400 text-sm font-medium">No quality check data available</p>
                    </div>
                </div>

                {/* Daily Activity */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Daily Activity</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-400 font-bold text-[11px] tracking-wider uppercase">
                                <tr>
                                    <th className="text-left pb-4">DATE</th>
                                    <th className="text-center pb-4">PACKAGES</th>
                                    <th className="text-center pb-4">CHECKS</th>
                                    <th className="text-right pb-4">AVG TIME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[18, 19, 20, 21, 22, 23, 24].map((day) => (
                                    <tr key={day} className="border-t border-gray-50 transition-colors">
                                        <td className="py-4 font-medium text-gray-600">Jan {day}</td>
                                        <td className="py-4 text-center text-blue-600 font-bold">0</td>
                                        <td className="py-4 text-center text-green-600 font-bold">0</td>
                                        <td className="py-4 text-right text-purple-600 font-bold">0 min</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Package Weight Statistics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Package Weight Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#EFF6FF] p-6 rounded-xl text-center border border-blue-50">
                        <p className="text-sm font-medium text-gray-500 mb-2">Average Weight</p>
                        <h4 className="text-2xl font-black text-[#2563EB]">0 kg</h4>
                    </div>
                    <div className="bg-[#F0FDF4] p-6 rounded-xl text-center border border-green-50">
                        <p className="text-sm font-medium text-gray-500 mb-2">Minimum Weight</p>
                        <h4 className="text-2xl font-black text-[#16A34A]">0 kg</h4>
                    </div>
                    <div className="bg-[#FAF5FF] p-6 rounded-xl text-center border border-purple-50">
                        <p className="text-sm font-medium text-gray-500 mb-2">Maximum Weight</p>
                        <h4 className="text-2xl font-black text-[#9333EA]">0 kg</h4>
                    </div>
                </div>
            </div>

            {/* Export Report Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Export Report</h3>
                    <p className="text-sm text-gray-400 font-medium tracking-tight">Export packaging data for the selected period</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportPDF}
                        className="px-6 py-2.5 bg-[#22C55E] text-white font-bold rounded-lg hover:bg-[#16A34A] flex items-center gap-2 shadow-sm transition-all text-sm"
                    >
                        <FileText className="w-4 h-4" /> Export PDF
                    </button>
                    <button
                        onClick={handleExportCSV}
                        className="px-6 py-2.5 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1D4ED8] flex items-center gap-2 shadow-sm transition-all text-sm"
                    >
                        <FileText className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>
        </div>
    );
}

