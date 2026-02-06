'use client';

import Sidebar from '@/components/Sidebar';
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const siteStats = [
    { name: 'dpdpbible.com', visitors: 2400, pageviews: 5200, avgTime: '2:34', bounceRate: '42%', trend: '+12%' },
    { name: 'dpdpaudit.co.in', visitors: 1800, pageviews: 4100, avgTime: '3:12', bounceRate: '38%', trend: '+8%' },
    { name: 'dpdpworkshop.com', visitors: 890, pageviews: 2200, avgTime: '4:45', bounceRate: '31%', trend: '-2%' },
];

function StatCard({
    title,
    value,
    change,
    icon: Icon,
    color,
    trend
}: {
    title: string;
    value: string | number;
    change: string;
    icon: any;
    color: string;
    trend: 'up' | 'down';
}) {
    const isPositive = trend === 'up';

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {change}
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
            </div>
        </div>
    );
}

export default function AnalyticsPage() {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
                        <p className="text-slate-500 mt-1">Deep dive into network performance and traffic sources.</p>
                    </div>
                    <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        {['7D', '30D', '3M', 'YTD'].map((range) => (
                            <button
                                key={range}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${range === '30D' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Visitors"
                        value="12,450"
                        change="12%"
                        icon={Users}
                        color="bg-indigo-500 shadow-lg shadow-indigo-200"
                        trend="up"
                    />
                    <StatCard
                        title="Page Views"
                        value="48,200"
                        change="18%"
                        icon={Eye}
                        color="bg-emerald-500 shadow-lg shadow-emerald-200"
                        trend="up"
                    />
                    <StatCard
                        title="Avg. Time on Site"
                        value="3:15"
                        change="5%"
                        icon={Clock}
                        color="bg-amber-500 shadow-lg shadow-amber-200"
                        trend="up"
                    />
                    <StatCard
                        title="Conversion Rate"
                        value="4.2%"
                        change="0.8%"
                        icon={MousePointer}
                        color="bg-rose-500 shadow-lg shadow-rose-200"
                        trend="down"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Site Performance Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Hub Performance</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Site</th>
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Visitors</th>
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Pageviews</th>
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Growth</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {siteStats.map((site) => (
                                        <tr key={site.name} className="group">
                                            <td className="py-4 font-bold text-slate-900">{site.name}</td>
                                            <td className="py-4 text-right font-medium text-slate-600">{site.visitors.toLocaleString()}</td>
                                            <td className="py-4 text-right font-medium text-slate-600">{site.pageviews.toLocaleString()}</td>
                                            <td className="py-4 text-right">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${site.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                                    }`}>
                                                    {site.trend}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Traffic Sources</h2>
                        <div className="space-y-6">
                            {[
                                { source: 'Organic Search', value: 65, color: 'bg-indigo-500' },
                                { source: 'Direct', value: 20, color: 'bg-indigo-400' },
                                { source: 'Social', value: 10, color: 'bg-indigo-300' },
                                { source: 'Referral', value: 5, color: 'bg-indigo-200' },
                            ].map((item) => (
                                <div key={item.source}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-slate-700">{item.source}</span>
                                        <span className="font-medium text-slate-500">{item.value}%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${item.color}`}
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">SEO Impact</p>
                            </div>
                            <p className="text-xs text-slate-500">
                                DPDP Bible ranking #1 for "DPDP Act Penalty" is driving 40% of organic traffic this week.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
