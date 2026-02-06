'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    Shield,
    LogOut,
    Globe,
    Newspaper,
    Mic,
    BarChart3,
    ChevronRight
} from 'lucide-react';

const navSections = [
    {
        title: 'Overview',
        items: [
            { href: '/', label: 'Dashboard', icon: LayoutDashboard },
        ]
    },
    {
        title: 'Compliance',
        items: [
            { href: '/consent', label: 'Consent Records', icon: Users },
            { href: '/audit', label: 'Audit Log', icon: FileText },
        ]
    },
    {
        title: 'Network Content',
        items: [
            { href: '/network', label: 'Network Hubs', icon: Globe },
            { href: '/content', label: 'Content Library', icon: Newspaper },
            { href: '/voice-notes', label: 'Voice Notes', icon: Mic },
        ]
    },
    {
        title: 'System',
        items: [
            { href: '/analytics', label: 'Analytics', icon: BarChart3 },
            { href: '/settings', label: 'Settings', icon: Settings },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-[#0F172A] min-h-screen flex flex-col border-r border-slate-800 shadow-xl relative z-10">
            {/* Brand Header */}
            <div className="h-20 flex items-center px-6 border-b border-slate-800/60 bg-[#0F172A]">
                <div className="flex items-center gap-3.5">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/50">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg tracking-tight">MBS Admin</h1>
                        <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">DPDP Control Center</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700">
                {navSections.map((section) => (
                    <div key={section.title}>
                        <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            {section.title}
                        </p>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-200' : 'text-slate-500 group-hover:text-slate-300'
                                                }`} />
                                            {item.label}
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4 text-indigo-300" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-slate-800/60 bg-[#0B1121]">
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 font-bold text-indigo-400">
                        AD
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">Admin User</p>
                        <p className="text-xs text-slate-500 truncate">admin@meridianbridge.com</p>
                    </div>
                    <LogOut className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </button>
            </div>
        </aside>
    );
}
