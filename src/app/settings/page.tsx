import Sidebar from '@/components/Sidebar';
import { Database, Shield, Mail, Key } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    <p className="text-slate-500">Configure your admin portal</p>
                </div>

                {/* Settings Cards */}
                <div className="space-y-6">
                    {/* Database Connection */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Database className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-slate-900">Supabase Connection</h2>
                                <p className="text-slate-500 text-sm mt-1">Database connection status and configuration</p>
                                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="text-sm text-slate-600">Connected</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">
                                        SUPABASE_URL: ••••••••••••••••
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Auth Settings */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 rounded-lg">
                                <Shield className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-slate-900">Authentication</h2>
                                <p className="text-slate-500 text-sm mt-1">Auth0 configuration for admin access</p>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Allowed Admin Emails
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="sushant@meridianbridgestrategy.com"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            disabled
                                        />
                                        <p className="text-xs text-slate-400 mt-1">
                                            Only these emails can access the admin portal
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DPO Email */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-slate-900">DPO Inbox</h2>
                                <p className="text-slate-500 text-sm mt-1">Automated erasure request handling</p>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            DPO Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="dpo@meridianbridgestrategy.com"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                        <p className="text-sm text-amber-800">
                                            <strong>Coming Soon:</strong> Automated webhook for erasure requests
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* API Keys */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Key className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-slate-900">Environment Variables</h2>
                                <p className="text-slate-500 text-sm mt-1">Required environment variables for this portal</p>
                                <div className="mt-4 p-4 bg-slate-900 rounded-lg text-sm font-mono">
                                    <p className="text-slate-400"># Supabase</p>
                                    <p className="text-green-400">NEXT_PUBLIC_SUPABASE_URL=</p>
                                    <p className="text-green-400">SUPABASE_SERVICE_KEY=</p>
                                    <p className="text-slate-400 mt-2"># Auth0</p>
                                    <p className="text-green-400">AUTH0_SECRET=</p>
                                    <p className="text-green-400">AUTH0_BASE_URL=</p>
                                    <p className="text-green-400">AUTH0_ISSUER_BASE_URL=</p>
                                    <p className="text-green-400">AUTH0_CLIENT_ID=</p>
                                    <p className="text-green-400">AUTH0_CLIENT_SECRET=</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
