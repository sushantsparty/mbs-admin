# MBS Nerve Center: Distributed Consent Management

> **Vision**: The central nervous system for consent management, built for DPDP.
> **Philosophy**: User consent is paramount. Action first, audit later.

---

## The Big Idea

Instead of hub-and-spoke (slow, fragile), we go **fully distributed**:

```
User opts out on Mailchimp
        │
        ▼
   ┌─────────┐     ┌─────────┐     ┌─────────┐
   │Mailchimp│────►│ DOPPLER │────►│ HubSpot │
   │Connector│     │ Router  │     │   API   │
   └─────────┘     └────┬────┘     └─────────┘
                        │
                        ├────────►│WhatsApp API│
                        │
                        ├────────►│Salesforce  │
                        │
                        └────────►│Supabase DB │
                                   (Audit Log)
```

**Result**: 200ms propagation. Not 7 days. User's choice respected instantly.

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    CUSTOMER'S CHANNELS                           │
│   Mailchimp │ HubSpot │ WhatsApp │ Salesforce │ Zoho │ ...      │
└──────┬──────┴────┬────┴────┬─────┴─────┬──────┴──┬───┴──────────┘
       │ webhooks  │         │           │         │
       ▼           ▼         ▼           ▼         ▼
┌──────────────────────────────────────────────────────────────────┐
│                 CONNECTOR LAYER (Vercel Edge)                    │
│                                                                  │
│   Each connector: ~50 lines of code                              │
│   • Catch webhook                                                │
│   • Check loop prevention tag                                    │
│   • Call Doppler Router                                          │
│   • Log to Supabase (async)                                      │
│                                                                  │
│   URL: /api/connectors/{channel}/webhook?org={customer_id}       │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                      DOPPLER (The Brain)                         │
│                                                                  │
│   • Stores ALL API keys (per customer namespace)                 │
│   • Routes consent changes to target channels                    │
│   • Fires PARALLEL API calls (instant propagation)               │
│                                                                  │
│   Project: mbs-consent                                           │
│   ├── Config: customer_acme     → keys for Acme Corp             │
│   ├── Config: customer_zerodha  → keys for Zerodha               │
│   └── Config: customer_razorpay → keys for Razorpay              │
└────────────────────────────┬─────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Instant  │  │  Async   │  │ Failed   │
        │ API Call │  │  Audit   │  │ Events   │
        │ to Target│  │   Log    │  │  Queue   │
        └──────────┘  └──────────┘  └──────────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                       SUPABASE                                   │
│                                                                  │
│   consent_events  │ failed_events │ reconciliation_queue        │
│   (audit trail)   │ (dead letter) │ (nightly sync)              │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                   MBS ADMIN DASHBOARD                            │
│                                                                  │
│   /dashboard     → Real-time stats                               │
│   /consent       → All consent records                           │
│   /audit         → Compliance timeline                           │
│   /channels      → Connect/disconnect channels                   │
│   /failed-events → Dead letter queue (manual retry)              │
│                                                                  │
│   URL: admin.meridianbridgestrategy.com                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## How It Works (Data Flow)

```
STEP 1: User clicks "Unsubscribe" in Mailchimp email
                    │
STEP 2: Mailchimp fires webhook to:
        POST /api/connectors/mailchimp/webhook?org=customer_acme
        { type: "unsubscribe", email: "user@example.com" }
                    │
STEP 3: Connector receives, parses, calls Doppler Router
                    │
STEP 4: Doppler Router (in parallel):
        ├─→ HubSpot API: consent = false
        ├─→ WhatsApp API: opt_in = false
        └─→ Salesforce: marketing_consent = "Opted Out"
                    │
STEP 5: Supabase logs: { email, channel, consent, timestamp }
                    │
STEP 6: Dashboard shows event in real-time
```

**Total time: <200ms**

---

## Technical Patterns

### 1. Loop Prevention
```typescript
// Every outbound includes source tag
metadata: { source: 'mbs_nerve' }

// Every inbound checks for tag
if (payload.metadata?.source === 'mbs_nerve') {
  return; // Ignore - we triggered this
}
```

### 2. Multi-Tenant Namespacing
```
Webhook URL: /api/connectors/mailchimp?org=customer_acme
                                           ↓
Doppler.getConfig('customer_acme') → MAILCHIMP_API_KEY
```

### 3. Retry Logic
```typescript
await pRetry(
  () => hubspotClient.updateContact(email, consent),
  { retries: 3, minTimeout: 1000 }
);
```

### 4. Dead Letter Queue
```sql
CREATE TABLE failed_events (
  id uuid PRIMARY KEY,
  customer_id text,
  payload jsonb,
  error text,
  attempts int
);
```

### 5. Nightly Reconciliation
- Midnight cron → Queue all customers
- Workers process in parallel
- Compare channel ground truth vs DB
- Fix any drift

---

## DPDP Compliance

| Requirement | How We Solve It |
|-------------|-----------------|
| Section 6: Right to withdraw | Instant propagation |
| Section 8: Consent safeguards | Doppler encrypted vault |
| Section 11: Data Principal rights | Single dashboard view |
| Section 12: Grievance redressal | Full audit trail |
| Section 27: Penalties | Real-time = no delay = no violation |

---

## Competitive Advantage

| Dimension | OneTrust | MBS Nerve Center |
|-----------|----------|------------------|
| Architecture | Hub-and-Spoke | Distributed Edge |
| Latency | 100ms - 2s | <50ms |
| Setup Time | 3-6 months | 1 day |
| Pricing | ₹20-50L/year | ₹3-12L/year |
| India/DPDP | Afterthought | Native |

---

## Availability & Scale

| Metric | Spec |
|--------|------|
| Uptime SLA | 99.9% |
| Event Delivery | 99.95% real-time, 100% within 24h |
| Concurrent Customers | 10,000+ |
| Events/Second | 10,000+ |
| Users/Customer | 2M+ |

---

## Unit Economics

| Scale | Revenue | Cost | Margin |
|-------|---------|------|--------|
| 10 customers | ₹2.5L/mo | ₹0 | 100% |
| 100 customers | ₹25L/mo | ₹50 | 99.99% |
| 1000 customers | ₹2.5Cr/mo | ₹2,600 | 99.99% |

---

## Pricing Model

| Tier | Price | Included |
|------|-------|----------|
| **Starter** | ₹25K/mo | 3 channels, 10K users |
| **Growth** | ₹50K/mo | 7 channels, 100K users |
| **Enterprise** | ₹1L+/mo | Unlimited, SLA, custom |

*Monthly billing. Add/remove channels anytime.*

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Dashboard | Next.js (mbs-admin) |
| Connectors | Next.js API Routes / Edge |
| Secrets | Doppler |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

---

## 21-Day Sprint (Feb 7-28)

### Week 1: Foundation
- [ ] Deploy mbs-admin to Vercel
- [ ] Setup Supabase schema
- [ ] Build Mailchimp connector
- [ ] Configure Doppler

### Week 2: Core Connectors
- [ ] HubSpot connector
- [ ] Zoho connector
- [ ] WhatsApp Business connector
- [ ] Test cross-channel routing

### Week 3: Polish & Launch
- [ ] Nightly reconciliation job
- [ ] Failed events dashboard
- [ ] Onboarding flow
- [ ] Launch 🚀

---

## The Tagline

> "We don't give you a dashboard that eventually syncs your data.
> We give you a **Nerve Center** that acts on user intent in milliseconds
> and verifies the truth every night."

---

*Created: Feb 7, 2026, 2:13 AM IST*
*Author: Sushant Pasumarty, Founder, Meridian Bridge Strategy*
