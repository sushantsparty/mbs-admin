'use client';

import Sidebar from '@/components/Sidebar';
import { Mic, Play, Clock, CheckCircle, User, ChevronRight, BarChart2 } from 'lucide-react';
import { useState } from 'react';

const mockVoiceNotes = [
    {
        id: '1',
        contributor: 'Aviral',
        role: 'Google Engineer',
        topic: 'Technical implementation of consent managers',
        duration: '4:32',
        status: 'pending',
        date: '2026-02-06',
        outputs: []
    },
    {
        id: '2',
        contributor: 'Sushant',
        role: 'MBS Founder',
        topic: 'D2C compliance strategy and business impact',
        duration: '7:15',
        status: 'processing',
        date: '2026-02-05',
        outputs: ['CEO View', 'CTO View']
    },
    {
        id: '3',
        contributor: 'Ayush',
        role: 'Legal Partner',
        topic: 'Section 8 interpretation and case precedents',
        duration: '5:48',
        status: 'completed',
        date: '2026-02-04',
        outputs: ['Legal View', 'News View', 'Training View']
    },
    {
        id: '4',
        contributor: 'PVS Sarma',
        role: 'Industry Veteran',
        topic: 'Enterprise board-level liability briefing',
        duration: '8:22',
        status: 'completed',
        date: '2026-02-03',
        outputs: ['CEO View', 'CTO View', 'Legal View', 'Training View']
    },
    {
        id: '5',
        contributor: 'Neil',
        role: 'Entrepreneur',
        topic: 'Startup compliance on a bootstrap budget',
        duration: '3:56',
        status: 'pending',
        date: '2026-02-06',
        outputs: []
    },
];

const statusConfig = {
    pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100', icon: Clock },
    processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100', icon: Play },
    completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-100', icon: CheckCircle },
};

export default function VoiceNotesPage() {
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredNotes = mockVoiceNotes.filter(note =>
        filterStatus === 'all' || note.status === filterStatus
    );

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Voice Notes Queue</h1>
                        <p className="text-slate-500 mt-1">Transform expert voice inputs into multi-persona content.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                            <span className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span> 2 Pending
                            </span>
                            <div className="h-4 w-px bg-slate-200"></div>
                            <span className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 2 Done
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['all', 'pending', 'processing', 'completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border ${filterStatus === status
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-200'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredNotes.map((note) => {
                        const config = statusConfig[note.status as keyof typeof statusConfig];
                        const StatusIcon = config.icon;
                        return (
                            <div key={note.id} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                                <div className="flex items-start gap-5">
                                    <div className={`p-4 rounded-2xl ${note.status === 'processing' ? 'bg-indigo-50 text-indigo-600 animate-pulse' : 'bg-slate-50 text-slate-400'
                                        }`}>
                                        {note.status === 'processing' ? <BarChart2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {note.topic}
                                            </h3>
                                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide w-fit ${config.color} ${config.border} border`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {config.label}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span className="font-medium text-slate-700">{note.contributor}</span>
                                                <span className="text-slate-400 px-1.5 py-0.5 bg-slate-50 rounded text-xs">{note.role}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                <span>{note.duration}</span>
                                            </div>
                                            <div className="text-slate-400 text-xs">
                                                Added on {new Date(note.date).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {/* Pipeline Visual */}
                                        {note.outputs.length > 0 && (
                                            <div className="pt-4 border-t border-slate-50">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Generated Content</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {note.outputs.map((output) => (
                                                        <span key={output} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1.5">
                                                            <CheckCircle className="w-3 h-3" />
                                                            {output}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {note.status === 'pending' && (
                                            <div className="pt-4 border-t border-slate-50 flex justify-end">
                                                <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    Start AI Pipeline <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
