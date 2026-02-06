'use client';

import Sidebar from '@/components/Sidebar';
import { Search, Filter, Calendar, Info, ShieldAlert, User, ShieldCheck } from 'lucide-react';

export default function AuditPage() {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Audit Log</h1>
                        <p className="text-slate-500 mt-1">Immutable record of all consent-related actions for compliance.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by email, action, or ID..."
                                className="w-full pl-11 pr-4 py-2.5 bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                            />
                        </div>
                        <div className="h-6 w-px bg-slate-200 mx-2"></div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
                            <Calendar className="w-4 h-4" />
                            Date Range
                        </button>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-12">
                        {[
                            { email: 'john@example.com', action: 'created', site: 'dpdpaudit', actor: 'user', time: '2:30:00 pm', date: '6/2/2026' },
                            { email: 'sarah@startup.io', action: 'created', site: 'dpdpworkshop', actor: 'user', time: '12:15:00 pm', date: '6/2/2026' },
                            { email: 'old@user.com', action: 'deleted', site: 'dpdpaudit', actor: 'admin', time: '10:00:00 am', date: '6/2/2026' },
                            { email: 'raj@business.com', action: 'unsubscribed', site: 'dpdpaudit', actor: 'user', time: '6:45:00 pm', date: '5/2/2026' },
                            { email: 'priya@corp.in', action: 'created', site: 'dpdpworkshop', actor: 'user', time: '10:00:00 am', date: '5/2/2026' },
                        ].map((log, i) => {
                            const isDelete = log.action === 'deleted';
                            const isUnsub = log.action === 'unsubscribed';
                            const colorClass = isDelete ? 'bg-red-50 text-red-700 border-red-100' : isUnsub ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100';
                            const Icon = isDelete ? ShieldAlert : isUnsub ? Info : ShieldCheck;

                            return (
                                <div key={i} className="relative pl-8 group">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-white box-content ${isDelete ? 'bg-red-500' : isUnsub ? 'bg-amber-500' : 'bg-emerald-500'
                                        } group-hover:scale-125 transition-transform shadow-sm`}></div>

                                    {/* Card */}
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-slate-900 text-lg">{log.email}</span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${colorClass}`}>
                                                    {log.action}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-slate-900">{log.time}</p>
                                                <p className="text-xs text-slate-400">{log.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-slate-50 rounded-lg">
                                                    <Icon className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span>on <span className="font-medium text-slate-700">{log.site}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-slate-50 rounded-lg">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span>by <span className="font-medium text-slate-700">{log.actor}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <code className="px-2 py-0.5 bg-slate-50 rounded text-xs text-slate-400 font-mono">ID: {Math.random().toString(36).substr(2, 8)}</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
