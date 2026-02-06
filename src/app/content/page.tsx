'use client';

import Sidebar from '@/components/Sidebar';
import { Search, Filter, ExternalLink, Calendar, User, FileText, ChevronRight } from 'lucide-react';

const mockContent = [
    { id: '1', title: 'What Every Indian Founder Needs to Know About DPDP', site: 'dpdpbible', author: 'Sushant', status: 'published', date: '2026-02-05', views: 1240 },
    { id: '2', title: 'DPDP Compliance Audit Checklist 2026', site: 'dpdpaudit', author: 'Aviral', status: 'published', date: '2026-02-04', views: 890 },
    { id: '3', title: 'Workshop: Building a Privacy-First D2C Brand', site: 'dpdpworkshop', author: 'Sushant', status: 'published', date: '2026-02-03', views: 456 },
    { id: '4', title: 'DPDP Rules 2025: Key Changes Explained', site: 'dpdpnews', author: 'Ayush', status: 'draft', date: '2026-02-06', views: 0 },
    { id: '5', title: 'Privacy Policy Template for Startups', site: 'dpdptemplate', author: 'Sushant', status: 'draft', date: '2026-02-06', views: 0 },
    { id: '6', title: 'CXO Guide: Board-Level DPDP Briefing', site: 'dpdpconsulting', author: 'PVS Sarma', status: 'draft', date: '2026-02-05', views: 0 },
];

const siteColors: Record<string, string> = {
    dpdpbible: 'bg-purple-50 text-purple-700 border-purple-100',
    dpdpaudit: 'bg-blue-50 text-blue-700 border-blue-100',
    dpdpworkshop: 'bg-amber-50 text-amber-700 border-amber-100',
    dpdpnews: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    dpdptemplate: 'bg-pink-50 text-pink-700 border-pink-100',
    dpdpconsulting: 'bg-slate-50 text-slate-700 border-slate-100',
};

export default function ContentPage() {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Content Library</h1>
                        <p className="text-slate-500 mt-1">Manage articles and resources across the network.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                        <FileText className="w-4 h-4" />
                        New Article
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            Site
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            Status
                        </button>
                    </div>
                </div>

                {/* Content List */}
                <div className="space-y-4">
                    {mockContent.map((item) => (
                        <div key={item.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-md border ${siteColors[item.site]}`}>
                                            {item.site}
                                        </span>
                                        {item.status === 'published' ? (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Draft
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-6 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span>{item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <span>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                        {item.views > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-slate-50 rounded text-xs font-medium text-slate-600">
                                                    {item.views.toLocaleString()} views
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="self-center">
                                    <div className="p-2 rounded-xl text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
