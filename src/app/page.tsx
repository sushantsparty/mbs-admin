'use client';

import Sidebar from '@/components/Sidebar';
import {
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowRight,
  Shield,
  FileText,
  AlertTriangle
} from 'lucide-react';

function StatCard({
  title,
  value,
  change,
  subtext,
  icon: Icon,
  trend
}: {
  title: string;
  value: string;
  change: string;
  subtext: string;
  icon: any;
  trend: 'up' | 'down' | 'neutral';
}) {
  const trendColor = trend === 'up' ? 'text-emerald-600 bg-emerald-50' : trend === 'down' ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-50';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 rounded-xl">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${trendColor}`}>
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-1">Real-time overview of your DPDP compliance network.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              Download Report
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Consents"
            value="47"
            change="+12%"
            subtext="Last 7 days"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Marketing Opt-In"
            value="26%"
            change="+2.4%"
            subtext="Conversion rate"
            icon={CheckCircle}
            trend="up"
          />
          <StatCard
            title="Policy Violations"
            value="0"
            change="0%"
            subtext="Requires attention"
            icon={AlertTriangle}
            trend="neutral"
          />
          <StatCard
            title="Active Hubs"
            value="3/12"
            change="Processing"
            subtext="Network rollout"
            icon={Shield}
            trend="neutral"
          />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Activity Feed */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Recent Compliance Activity</h2>
              <button className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { user: 'john@example.com', action: 'Granted Consent', site: 'dpdpaudit', time: '2 mins ago', icon: CheckCircle, color: 'text-emerald-500' },
                { user: 'sarah@startup.io', action: 'Downloaded Report', site: 'dpdpworkshop', time: '15 mins ago', icon: FileText, color: 'text-blue-500' },
                { user: 'mike@tech.co', action: 'Opted Out', site: 'dpdpaudit', time: '1 hour ago', icon: XCircle, color: 'text-slate-400' },
                { user: 'priya@corp.in', action: 'Updated Profile', site: 'mbs-profile', time: '2 hours ago', icon: Users, color: 'text-indigo-500' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className={`p-2 rounded-full bg-slate-50 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-bold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-slate-400">on {item.site}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Site Status */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 text-lg mb-6">Hub Status</h2>
            <div className="space-y-6">
              {[
                { name: 'dpdpaudit', status: 100, color: 'bg-emerald-500', users: 28 },
                { name: 'dpdpworkshop', status: 100, color: 'bg-emerald-500', users: 19 },
                { name: 'mbs-profile', status: 15, color: 'bg-amber-500', users: 0 },
                { name: 'dpdpnews', status: 0, color: 'bg-slate-200', users: 0 },
              ].map((site) => (
                <div key={site.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">{site.name}</span>
                    <span className="text-slate-500">{site.users} users</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${site.color}`}
                      style={{ width: `${site.status === 0 ? 5 : site.status}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="p-2 bg-indigo-500 rounded-full">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-900">Network Growing</p>
                  <p className="text-xs text-indigo-700">12 new consents this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
