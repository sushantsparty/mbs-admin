import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Server-side client with service role (full access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Types for consent records
export interface ConsentRecord {
    id: string;
    email: string;
    company_name: string | null;
    transactional_consent: boolean;
    marketing_consent: boolean;
    consent_timestamp: string;
    consent_version: string;
    unsubscribed_at: string | null;
    deleted_at: string | null;
    created_at: string;
    source_site?: string;
    tier?: string;
}

export interface ConsentMasterRecord extends ConsentRecord {
    source_site: string;
    auth0_id: string | null;
}

export interface AuditLogRecord {
    id: string;
    source_site: string;
    email: string;
    action: string;
    old_value: Record<string, unknown> | null;
    new_value: Record<string, unknown> | null;
    performed_by: string;
    ip_address: string | null;
    created_at: string;
}

// Fetch all consent records from master view
export async function getAllConsent(): Promise<ConsentMasterRecord[]> {
    const { data, error } = await supabaseAdmin
        .from('consent_master')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

// Fetch consent records for a specific site
export async function getConsentBySite(site: string): Promise<ConsentRecord[]> {
    const tableName = `consent_${site}`;
    const { data, error } = await supabaseAdmin
        .from(tableName)
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

// Search consent by email across all tables
export async function searchByEmail(email: string): Promise<ConsentMasterRecord[]> {
    const { data, error } = await supabaseAdmin
        .from('consent_master')
        .select('*')
        .ilike('email', `%${email}%`)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

// Soft delete user across all tables (erasure request)
export async function deleteUserData(email: string): Promise<{ success: boolean; error?: string }> {
    const tables = ['consent_dpdpaudit', 'consent_dpdpworkshop', 'consent_mbs'];
    const now = new Date().toISOString();

    try {
        for (const table of tables) {
            await supabaseAdmin
                .from(table)
                .update({ deleted_at: now })
                .eq('email', email.toLowerCase().trim());
        }

        // Log the deletion
        await supabaseAdmin.from('consent_audit_log').insert({
            source_site: 'all',
            email: email.toLowerCase().trim(),
            action: 'deleted',
            performed_by: 'admin'
        });

        return { success: true };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

// Get audit log for an email
export async function getAuditLog(email?: string): Promise<AuditLogRecord[]> {
    let query = supabaseAdmin
        .from('consent_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

    if (email) {
        query = query.eq('email', email.toLowerCase().trim());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

// Get stats for dashboard
export async function getDashboardStats() {
    const { data: allRecords } = await supabaseAdmin
        .from('consent_master')
        .select('source_site, marketing_consent');

    if (!allRecords) return { total: 0, bySite: {}, marketingOptIn: 0 };

    const bySite: Record<string, number> = {};
    let marketingOptIn = 0;

    for (const record of allRecords) {
        bySite[record.source_site] = (bySite[record.source_site] || 0) + 1;
        if (record.marketing_consent) marketingOptIn++;
    }

    return {
        total: allRecords.length,
        bySite,
        marketingOptIn
    };
}
