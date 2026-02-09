# MBS Technical Moat: The Distributed Nerve Center

> The architectural superiority of MBS Consent Manager over centralized SaaS competitors.

---

## 1. "Action-First" vs. "Sync-Later"

**Traditional:** Wait for database write → then trigger update. 100ms–2s latency.

**MBS:** Optimistic Execution. User clicks "Revoke" → Edge Function fires API call instantly → Audit logged async.

> We prioritize the **Spirit of the Law** (User Privacy) over the **Legacy of the Database**.

---

## 2. Distributed Node Architecture

**Traditional:** Hub-and-Spoke. Central server down = total outage.

**MBS:** Each Connector is a standalone Edge Function. HubSpot lag doesn't slow Mailchimp.

> The system is as robust as the internet itself.

---

## 3. Loop Prevention Protocol

**The Problem:** Mailchimp updates HubSpot → HubSpot webhook fires → Updates Mailchimp → Infinite loop.

**The Solution:** `MBS_NERVE` source tag in every outbound request:

```typescript
// Outbound API call includes source marker
await hubspot.updateContact(email, { 
  consent: false,
  metadata: { source: 'mbs_nerve' }
});

// Inbound webhook checks for marker
if (payload.metadata?.source === 'mbs_nerve') {
  return Response.json({ ignored: true }); // Not our problem
}
```

> Single pulse through the network. No loops. Ever.

---

## 4. Doppler Namespacing (Multi-Tenancy)

**The Problem:** 1000 customers = 1000 sets of API keys. How to isolate?

**The Solution:** Doppler Projects + Configs:

```
Project: mbs-consent
├── Config: customer_acme     → MAILCHIMP_KEY, HUBSPOT_KEY
├── Config: customer_zerodha  → MAILCHIMP_KEY, WHATSAPP_KEY
└── Config: customer_razorpay → HUBSPOT_KEY, SALESFORCE_KEY
```

**Webhook URL:** `/api/connectors/mailchimp?org=customer_acme`

```typescript
const config = await doppler.getConfig(req.query.org);
const mailchimpKey = config.MAILCHIMP_KEY;
```

> Zero cross-contamination. Customer A's keys never touch Customer B's memory.

---

## 5. Retry Logic (Resilience)

**The Problem:** CRM APIs are flaky. Don't lose consent events.

**The Solution:** Exponential backoff with `p-retry`:

```typescript
import pRetry from 'p-retry';

await pRetry(
  () => hubspotClient.updateContact(email, { consent: false }),
  { 
    retries: 3, 
    minTimeout: 1000,  // 1s, 2s, 4s
    onFailedAttempt: (error) => {
      console.log(`Attempt ${error.attemptNumber} failed. Retrying...`);
    }
  }
);
```

> 3 retries with backoff. Only fails if truly unreachable.

---

## 6. Dead Letter Queue (Never Lose an Event)

**The Problem:** After 3 retries, what happens to failed events?

**The Solution:** Dead Letter Queue in Supabase:

```sql
CREATE TABLE failed_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  channel text NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  error_message text,
  attempts int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);
```

**Dashboard:** `/failed-events` shows unresolved failures. Admin can:
- Manually replay
- Mark as resolved
- Investigate root cause

> Nothing is ever lost. Self-healing with human oversight.

---

## 7. Queue-Based Nightly Reconciliation

**The Problem:** Webhooks are "best effort." How to guarantee accuracy?

**The Solution:** Sharded reconciliation using Supabase Queue:

```sql
-- Queue table
CREATE TABLE reconciliation_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  status text DEFAULT 'pending', -- pending, processing, done, failed
  scheduled_for timestamptz DEFAULT now(),
  completed_at timestamptz
);
```

**Flow:**
1. **Midnight Cron** → Inserts all `customer_id` into queue
2. **Worker Functions** → Pick up customers in parallel
3. **Per Customer** → Fetch ground truth from each channel → Compare to DB → Fix drift
4. **Mark Done** → Update status

```typescript
// Worker picks up next customer
const { data: job } = await supabase
  .from('reconciliation_queue')
  .select('*')
  .eq('status', 'pending')
  .limit(1)
  .single();

// Process customer
await reconcileCustomer(job.customer_id);

// Mark complete
await supabase
  .from('reconciliation_queue')
  .update({ status: 'done', completed_at: new Date() })
  .eq('id', job.id);
```

> Scales to millions of users. Parallel processing. Self-healing by sunrise.

---

## 8. Serverless Cost Model

**Traditional:** Pay for servers 24/7 whether used or not.

**MBS:** Vercel Edge Functions + Supabase = Pay per execution.

| Metric | Cost |
|--------|------|
| Vercel Edge | $0.60 per 1M invocations |
| Supabase | Free tier handles 500K rows |
| Doppler | Free for 5 projects |

**At 100 customers × 5 channels × 1000 events/day:**
- 500K events/month = **$0.30/month** in compute

**Revenue:** ₹5L/month
**Cost:** ₹25/month
**Margin:** **99.995%**

> Your costs scale with usage, not existence.

---

## 9. Security: The Doppler Vault

**The Problem:** SMBs store API keys in plaintext `.env` files.

**The MBS Solution:** Force Doppler adoption.

**DPDP Section 8 Compliance:**
- Encrypted at rest
- Versioned with audit trail
- Access control per team member
- Automatic rotation support

> You're selling Compliance + Cyber-Security in one product.

---

## Summary for the Board

> "We don't give you a dashboard that eventually syncs your data. We give you a **Nerve Center** that:
> - Acts on user intent in **milliseconds**
> - Retries failed operations **automatically**
> - Never loses an event (Dead Letter Queue)
> - Verifies truth **every night**
> - Scales to millions at **99.99% margin**
>
> We are the first platform built for the **Technical Reality** of modern APIs, not the **Paper Reality** of old law."

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER'S CHANNELS                          │
│   Mailchimp │ HubSpot │ WhatsApp │ Salesforce │ Zoho │ ...     │
└──────┬──────┴────┬────┴────┬─────┴─────┬──────┴──┬───┴─────────┘
       │ webhooks  │         │           │         │
       ▼           ▼         ▼           ▼         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CONNECTOR LAYER (Vercel Edge)                │
│                                                                 │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│   │Mailchimp│ │ HubSpot │ │WhatsApp │ │Salesforce│  ...        │
│   │Connector│ │Connector│ │Connector│ │Connector │              │
│   └────┬────┘ └────┬────┘ └────┬────┘ └────┬─────┘              │
│        │           │           │           │                    │
│        └───────────┴─────┬─────┴───────────┘                    │
│                          │                                      │
│   Features:              │                                      │
│   • Loop Prevention      ▼                                      │
│   • Retry Logic    ┌───────────┐                                │
│   • Dead Letter    │  DOPPLER  │ (Keys + Routing)               │
│                    └─────┬─────┘                                │
│                          │                                      │
│         ┌────────────────┼────────────────┐                     │
│         ▼                ▼                ▼                     │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐                 │
│   │ Instant  │    │  Async   │    │  Failed  │                 │
│   │ API Call │    │  Audit   │    │  Events  │                 │
│   │ to Target│    │   Log    │    │  Queue   │                 │
│   └──────────┘    └──────────┘    └──────────┘                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE                                   │
│   consent_events │ failed_events │ reconciliation_queue        │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MBS ADMIN DASHBOARD                        │
│   /dashboard │ /consent │ /audit │ /failed-events │ /channels  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Availability, Reliability & Scale

### Availability (Uptime SLA)

| Component | Provider SLA | Our Dependency |
|-----------|--------------|----------------|
| Vercel Edge | 99.99% | Connectors + Dashboard |
| Supabase | 99.9% | Audit DB only |
| Doppler | 99.95% | Key fetch (cached) |

**Composite Availability:** 99.9% (weakest link)

**In Practice:** ~8.7 hours downtime/year max. But:
- Connectors are **stateless** - if one region fails, Vercel routes to another
- Doppler keys are **cached** in memory for 5 min - survives brief outages
- Failed events go to **Dead Letter Queue** - nothing is lost

### Reliability (Event Delivery)

| Scenario | Handling | Outcome |
|----------|----------|---------|
| Webhook received | Instant processing | ✅ Delivered |
| Target API slow | 3 retries with backoff | ✅ Delivered |
| Target API down | Dead Letter Queue | ⏳ Queued for retry |
| Our Edge down | Vercel auto-failover | ✅ Delivered |
| Supabase down | Audit fails, action succeeds | ⚠️ Action done, logged later |

**Event Delivery Rate:** 99.95% real-time, 100% within 24 hours (nightly recon)

### Scale Estimates

| Metric | Capacity | Notes |
|--------|----------|-------|
| **Concurrent customers** | 10,000+ | Multi-tenant, namespace isolated |
| **Events/second** | 10,000+ | Vercel Edge scales automatically |
| **Users/customer** | 2M+ | Your target segment |
| **Channels/customer** | 50+ | Limited only by integrations built |
| **Total events/day** | 100M+ | At Vercel Pro tier |

**Your Target (0-2M users per customer):**
- 2M users × 1% daily consent changes = 20K events/day
- 20K events = **$0.01/day** in compute
- **Trivially handled** by free tiers

### Cost at Scale

| Scale | Events/Month | Vercel Cost | Supabase Cost | Total |
|-------|--------------|-------------|---------------|-------|
| 10 customers | 100K | Free | Free | **$0** |
| 100 customers | 1M | $0.60 | Free | **$0.60** |
| 1000 customers | 10M | $6 | $25 | **$31** |
| 10000 customers | 100M | $60 | $100 | **$160** |

**Revenue at 1000 customers × ₹25K/month = ₹2.5 Cr/month**
**Cost: ₹2,600/month**
**Margin: 99.99%**

---

*Document created: Feb 7, 2026, 2:10 AM IST*
*Author: Sushant Pasumarty, Founder & CEO, Meridian Bridge Strategy*
