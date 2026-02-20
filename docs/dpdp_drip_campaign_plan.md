# DPDP AUTOMATED DRIP CAMPAIGN - IMPLEMENTATION PLAN

## OBJECTIVE
Build automated email drip campaign for Tier 1 DPDP outbound using Resend, Google Sheets, and GitHub Actions.

---

## SYSTEM ARCHITECTURE

### Components
1. **Google Sheet** - Single source of truth CRM database
2. **Resend API** - Email sending with open/click tracking
3. **GitHub Action** - Daily automation runner (9 AM IST)
4. **Gmail API** - Reply detection (checks inbox for responses)

### Data Flow
```
Google Sheet → GitHub Action (daily) → Check rules → Send via Resend → Update Sheet
                     ↓
                Gmail API (check replies) → Update Status = Replied → Stop drip
```

---

## GOOGLE SHEET STRUCTURE

### Required Columns
| Column | Type | Purpose |
|--------|------|---------|
| Name | Text | Contact name |
| Email | Text | Contact email |
| Company | Text | Company name |
| Sector | Text | Fintech / HealthTech / EdTech |
| Status | Text | Active / Replied / Bounced / Unsubscribed |
| Email1_Sent | Date | YYYY-MM-DD when Email 1 sent |
| Email1_Opened | Boolean | TRUE/FALSE (via Resend webhook) |
| Email1_Clicked | Boolean | TRUE/FALSE (via Resend webhook) |
| Email1_Replied | Boolean | TRUE/FALSE (via Gmail API) |
| Email2_Sent | Date | YYYY-MM-DD when Email 2 sent |
| Email2_Opened | Boolean | TRUE/FALSE |
| Email2_Clicked | Boolean | TRUE/FALSE |
| Email2_Replied | Boolean | TRUE/FALSE |
| Email3_Sent | Date | YYYY-MM-DD when Email 3 sent |
| Email3_Opened | Boolean | TRUE/FALSE |
| Email3_Clicked | Boolean | TRUE/FALSE |
| Email3_Replied | Boolean | TRUE/FALSE |
| Last_Contact | Date | Last email sent date |
| Notes | Text | Manual notes |

### Sheet Name
`DPDP Outbound CRM`

---

## EMAIL SEQUENCE (5-TOUCH CAMPAIGN)

### Email 1: DPDP Bible (Week 1)
**Purpose:** Pure awareness, no ask
**Content:**
- Subject: `DPDP Act 2023: What it means for [Company]`
- Body: Explain DPDP enforcement (May 2027), penalties (₹50-250Cr)
- CTA: Link to DPDP Bible (dpdpbible.com)
- Footer: All 5 resources linked

**Trigger:** `Status = Active` AND `Email1_Sent` is empty

---

### Email 2: DPDP Audit Tool (Week 2-3)
**Purpose:** Self-assessment, interactive value
**Content:**
- Subject: `Quick DPDP compliance check for [Company]`
- Body: 2-minute assessment, generates PDF report
- CTA: Link to DPDP Audit Tool (dpdpaudit.co.in/[sector])
- Reference previous email

**Trigger:** `Email1_Sent >= 7 days ago` AND `Email2_Sent` is empty AND `Email1_Replied = FALSE`

---

### Email 3: DPDP Workshop (Week 4-5)
**Purpose:** Introduce paid service (first ask)
**Content:**
- Subject: `How [Similar Company] is preparing for DPDP`
- Body: Workshop details (2-day, deliverables, peer social proof)
- CTA: Link to DPDP Workshop (dpdpworkshop.com)
- Low-pressure close ("either way, free stuff helps")

**Trigger:** `Email2_Sent >= 14 days ago` AND `Email3_Sent` is empty AND `Email2_Replied = FALSE`

---

### Email 4: DPDP News + Consulting (Week 7-8)
**Purpose:** Ongoing intelligence, reinforce authority
**Content:**
- Subject: `Daily DPDP updates for [sector]`
- Body: Link to DPDP News (daily updates) + DPDP Consulting (privacy policy analysis)
- Peer comparison angle

**Trigger:** `Email3_Sent >= 14 days ago` AND `Email4_Sent` is empty AND `Email3_Replied = FALSE`

---

### Email 5: Qualification Question (Week 11-12)
**Purpose:** Engage warm leads who clicked but didn't reply
**Content:**
- Subject: `Quick question about DPDP prep`
- Body: Checkbox format - where are you in prep process?
- Opens conversation naturally

**Trigger:** `Email4_Sent >= 21 days ago` AND `(Email1_Clicked = TRUE OR Email2_Clicked = TRUE)` AND `Status = Active`

---

## SENDING RULES

### Core Logic
1. **Daily check:** Run at 9 AM IST via GitHub Action
2. **Status check:** Only send if `Status = Active`
3. **Reply check:** If replied, set `Status = Replied` and STOP all future emails
4. **Time-based progression:** Each email waits N days before next
5. **Random offset:** Add 0-3 day random delay to avoid robotic pattern

### Stop Conditions
- User replied (detected via Gmail API) → `Status = Replied`
- Email bounced (detected via Resend webhook) → `Status = Bounced`
- User unsubscribed (manual or link) → `Status = Unsubscribed`

### Timing
- Email 1 → Email 2: 7-10 days (7 + random 0-3)
- Email 2 → Email 3: 14-17 days
- Email 3 → Email 4: 14-17 days
- Email 4 → Email 5: 21-24 days

---

## TRACKING & WEBHOOKS

### Resend Webhooks (Automatic)
**Events to track:**
- `email.opened` → Update `Email1_Opened = TRUE`
- `email.clicked` → Update `Email1_Clicked = TRUE`
- `email.bounced` → Update `Status = Bounced`

**Webhook endpoint:** Google Apps Script web app OR Cloudflare Worker
**Action:** Update Google Sheet based on event type

---

### Gmail API (Reply Detection)
**Function:** Check inbox daily for replies from contacts
**Logic:**
- Query: `from:{contact_email}` in last 30 days
- If found → Update `Email1_Replied = TRUE` and `Status = Replied`
- Stop all future emails for this contact

**Why needed:** Resend doesn't track replies natively

---

## GITHUB ACTION WORKFLOW

### File Structure
```
.github/
  workflows/
    dpdp-drip.yml          # GitHub Action config

scripts/
  drip_campaign.py          # Main Python script
  email_templates.py        # Email content templates
  
requirements.txt            # Python dependencies
```

### GitHub Action Schedule
```yaml
on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM IST
  workflow_dispatch:      # Manual trigger for testing
```

### Secrets Required (GitHub Secrets)
- `RESEND_API_KEY` - From Resend dashboard
- `GOOGLE_CREDENTIALS` - Service account JSON for Google Sheets access
- `GMAIL_CREDENTIALS` - OAuth token JSON for Gmail API access

---

## PYTHON SCRIPT LOGIC

### Main Functions

**1. `load_contacts_from_sheet()`**
- Connect to Google Sheet via gspread
- Load all records
- Return as list of dicts

**2. `check_for_replies(email_address)`**
- Query Gmail API: `from:{email_address}`
- Check if reply in last 30 days
- Return TRUE/FALSE

**3. `send_email_1(name, email, company, sector)`**
- Construct email from template
- Send via Resend API
- Return success/failure
- Similar for `send_email_2()`, `send_email_3()`, etc.

**4. `update_sheet(row, column, value)`**
- Update specific cell in Google Sheet
- Used to mark Email1_Sent, Status, etc.

**5. `main()`**
```python
for each contact in sheet:
    if Status != 'Active':
        skip
    
    if check_for_replies(email):
        update Status = 'Replied'
        continue
    
    # RULE: Send Email 1 if not sent
    if Email1_Sent is empty:
        send_email_1(...)
        update Email1_Sent = today
        continue
    
    # RULE: Send Email 2 if Email 1 sent 7+ days ago
    if days_since(Email1_Sent) >= 7 and Email2_Sent is empty:
        send_email_2(...)
        update Email2_Sent = today
        continue
    
    # Continue for Email 3, 4, 5...
```

---

## EMAIL TEMPLATES

### Template Variables
- `{name}` - Contact first name
- `{company}` - Company name
- `{sector}` - Sector (Fintech, HealthTech, EdTech)

### Standard Footer (All Emails)
```
---
DPDP Network:
→ Founder's Guide: dpdpbible.com
→ Free Assessment: dpdpaudit.co.in
→ Workshop Info: dpdpworkshop.com
→ Daily News: dpdpnews.live
→ Privacy Analysis: dpdpconsulting.com
```

### Reply-To Address
All emails: `sushant@meridianbridgestrategy.com`

---

## FINTECH vs NON-FINTECH DIFFERENTIATION

### For Fintech (Aware of Compliance)
**Email 1 angle:** "DPDP vs existing RBI/SEBI compliance"
**Body adjustment:**
```
You're used to RBI/SEBI compliance.

DPDP is different:
- User can refuse ANY data collection
- ₹250Cr penalties (vs RBI's ₹1-10Cr)
- May 2027 (vs existing rolling compliance)
```

### For HealthTech / EdTech (Likely Unaware)
**Email 1 angle:** "New data law affects [sector] companies"
**Body adjustment:**
```
DPDP Act passed Aug 2023, enforced May 2027.

If you handle [health data/kids data], this applies to you:
- Specific consent required
- ₹50-250Cr penalties
- 16 months to comply
```

**Implementation:** Check `Sector` column, customize email template accordingly

---

## MVP IMPLEMENTATION (WEEK 1)

### Phase 1: Manual Hybrid (Week 1)
- [ ] Create Google Sheet with structure
- [ ] Write Python script for Email 1 sending
- [ ] Run script locally (not GitHub Action yet)
- [ ] Set up Resend webhooks (opens/clicks)
- [ ] Manually mark replies in sheet

### Phase 2: Add Email 2 (Week 2)
- [ ] Add Email 2 logic to script
- [ ] Test time-based triggers
- [ ] Send to 5-10 test companies

### Phase 3: Gmail API (Week 3)
- [ ] Implement reply detection
- [ ] Auto-stop drip on reply
- [ ] Test full sequence

### Phase 4: GitHub Action (Week 4)
- [ ] Move to daily automated runs
- [ ] No manual intervention
- [ ] Monitor and adjust

---

## EXPECTED METRICS (Per 100 Companies)

### Email 1 (DPDP Bible)
- Open rate: 25-35%
- Click rate: 5-10%
- Reply rate: 1-3%

### Email 2 (Audit Tool)
- Open rate: 15-25% (of non-responders)
- Click rate: 10-15%
- Tool completion: 30-40% of clickers
- Reply rate: 3-5%

### Email 3 (Workshop)
- Open rate: 20-30%
- Click rate: 15-20%
- Reply rate: 5-10%

### Overall Conversion
- 100 companies contacted
- 25-35 open at least one email
- 10-15 click on resource
- 5-8 use Audit Tool
- 3-5 reply asking questions
- 1-2 convert to discovery calls

---

## VOLUME TARGETS

### Weekly Cadence
- Week 1: Send Email 1 to 20 new companies
- Week 2: Send Email 1 to 20 new + Email 2 to Week 1 non-responders (~15)
- Week 3: Send Email 1 to 20 new + Email 2 to Week 2 + Email 3 to Week 1
- Continue pattern...

### 12-Week Pipeline
- 240 companies contacted with Email 1
- ~180 reached Email 2
- ~120 reached Email 3
- 3-5 discovery calls booked
- 1-2 clients closed

---

## ANTI-SPAM MEASURES

### Technical
- Random 0-3 day offset on send timing
- Personalized emails (name, company, sector)
- Different content each email (not just "following up")
- Stop immediately on reply
- Respect unsubscribes
- Professional sender domain (@meridianbridgestrategy.com)

### Content
- Value-first (free resources before ask)
- Low-pressure language ("no rush", "either way")
- Relevant timing (spread over 12 weeks, not 5)
- Industry-specific customization
- Clear unsubscribe option in footer

---

## SUCCESS CRITERIA

### Week 1
- Script sends Email 1 successfully
- Resend webhooks update sheet for opens/clicks
- No errors in Google Sheet updates

### Week 4
- Full 3-email sequence working
- Reply detection functional
- Drip stops when user replies

### Week 8
- GitHub Action running daily without intervention
- 50+ companies in pipeline
- 2-3 discovery calls booked

### Week 12
- 100+ companies contacted
- 1-2 clients closed or in proposal stage
- System fully automated and scalable

---

## DEPENDENCIES

### Python Libraries
```
gspread              # Google Sheets API
oauth2client         # Google authentication
resend               # Resend email API
google-auth-httplib2 # Gmail API
google-auth-oauthlib # Gmail OAuth
```

### External Services
- Resend (email sending + webhooks)
- Google Sheets (CRM database)
- Gmail API (reply detection)
- GitHub Actions (automation)

### API Keys & Credentials
- Resend API key
- Google Service Account (for Sheets)
- Gmail OAuth token (for inbox access)

---

## NOTES

- This is value-first outbound, not cold sales spam
- 12-week sequence (not 5 weeks) to avoid feeling spammy
- Each email provides standalone value
- Self-qualifying funnel (people who engage = warm leads)
- System scales to 1,000+ companies with zero marginal effort
- Wait for Angel One case study before targeting Tier 0 (₹100Cr+ companies)
- Start with Tier 1 (₹1-50Cr, no legal team, sensitive data)
