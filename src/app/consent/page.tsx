'use client';

import Sidebar from '@/components/Sidebar';
import { Search, Filter, Trash2, Eye, Download, ChevronDown, CheckCircle, XCircle } from 'lucide-react';

export default function ConsentPage() {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Consent Records</h1>
                        <p className="text-slate-500 mt-1">View and manage all user consent data across the network.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by email..."
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            All Sites
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            All Consent
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Site</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Marketing</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { email: 'john@example.com', site: 'dpdpaudit', company: '-', marketing: true, date: '6/2/2026' },
                                { email: 'sarah@startup.io', site: 'dpdpworkshop', company: 'StartupIO', marketing: false, date: '6/2/2026' },
                                { email: 'raj@business.com', site: 'dpdpaudit', company: '-', marketing: true, date: '5/2/2026' },
                                { email: 'priya@corp.in', site: 'dpdpworkshop', company: 'CorpIndia', marketing: true, date: '5/2/2026' },
                                { email: 'mike@tech.co', site: 'dpdpaudit', company: '-', marketing: false, date: '4/2/2026' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6 font-medium text-slate-900">{row.email}</td>
                                    <td className="py-4 px-6">
                                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                                            {row.site}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-500 text-sm">{row.company}</td>
                                    <td className="py-4 px-6">
                                        {row.marketing ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                                                <CheckCircle className="w-3 h-3" /> Yes
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-medium border border-slate-200">
                                                No
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-slate-500 text-sm">{row.date}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 border-t border-slate-100 text-sm text-slate-500 text-center bg-slate-50/30">
                        Showing 5 of 47 records
                    </div>
                </div>
            </main>
        </div>
    );
}
