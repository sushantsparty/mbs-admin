'use client';

import Sidebar from '@/components/Sidebar';
import { Globe, CheckCircle, Clock, AlertCircle, ExternalLink, ArrowUpRight } from 'lucide-react';

const hubs = [
    { name: 'dpdpbible.com', status: 'live', type: 'Authority', description: 'Founder\'s Guide - Ranking #1', traffic: '2.4k' },
    { name: 'dpdpaudit.co.in', status: 'live', type: 'Tool', description: 'Panic Generator Audit', traffic: '1.8k' },
    { name: 'dpdpworkshop.com', status: 'live', type: 'Sales', description: 'High-Ticket Workshop Hub', traffic: '890' },
    { name: 'dpdpnews.in', status: 'pending', type: 'News', description: 'Notification Tracker', traffic: '-' },
    { name: 'dpdptemplates.in', status: 'pending', type: 'Revenue', description: 'Template Store', traffic: '-' },
    { name: 'dpdptraining.in', status: 'pending', type: 'Education', description: 'DPO Certification Academy', traffic: '-' },
    { name: 'dpdpblog.in', status: 'pending', type: 'Editorial', description: 'Opinions & Commentary', traffic: '-' },
    { name: 'privacypodcast.in', status: 'pending', type: 'Multimedia', description: 'Audio/Video Authority', traffic: '-' },
    { name: 'dpdpconsulting.in', status: 'pending', type: 'Service', description: 'Parent HQ Offering', traffic: '-' },
    { name: 'dpdphelp.in', status: 'pending', type: 'Support', description: 'CTO Q&A Helpdesk', traffic: '-' },
    { name: 'dpdp.cloud', status: 'pending', type: 'SaaS', description: 'Waitlist Landing', traffic: '-' },
    { name: 'dpdptemplate.in', status: 'pending', type: 'Lead Magnet', description: 'Single Template Generator', traffic: '-' },
];

const statusConfig = {
    live: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    issue: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
};

export default function NetworkPage() {
    const liveCount = hubs.filter(h => h.status === 'live').length;
    const pendingCount = hubs.filter(h => h.status === 'pending').length;

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Network Hubs</h1>
                        <p className="text-slate-500 mt-1">Status of all 12 DPDP Network domains.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-900 leading-none">{liveCount}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Live</p>
                            </div>
                        </div>
                        <div className="px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded-lg">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-900 leading-none">{pendingCount}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Pending</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hubs.map((hub) => {
                        const config = statusConfig[hub.status as keyof typeof statusConfig];
                        const StatusIcon = config.icon;
                        return (
                            <div key={hub.name} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${config.bg} ${config.color}`}>
                                    <StatusIcon className="w-5 h-5" />
                                </div>

                                <div className="mb-4">
                                    <div className="p-3 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-indigo-50 transition-colors">
                                        <Globe className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{hub.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1 line-clamp-2 min-h-[40px]">{hub.description}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-md">
                                        {hub.type}
                                    </span>

                                    {hub.status === 'live' ? (
                                        <a
                                            href={`https://${hub.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                        >
                                            Visit <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                            Start Build <ArrowUpRight className="w-3 h-3" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
