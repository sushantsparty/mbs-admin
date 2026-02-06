# MBS Admin - Consent Management Portal

Admin portal for DPDP Network consent management.

**Domain:** admin.meridianbridgestrategy.com

## Features

- 📊 **Dashboard** - Consent stats, site breakdown, quick actions
- 👥 **Consent Records** - View, search, filter all consent data
- 📝 **Audit Log** - Track all consent changes for compliance
- ⚙️ **Settings** - Configure database and auth

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Auth0 (Admin auth)

## Setup

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run SQL schema from `../meridianbridgestrategy-website/supabase/schema.sql`
3. Create Auth0 application at [auth0.com](https://auth0.com)
4. Copy `.env.example` to `.env.local` and fill in values
5. Run `npm install && npm run dev`

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbG...

# Auth0
AUTH0_SECRET=<random 32 char string>
AUTH0_BASE_URL=https://admin.meridianbridgestrategy.com
AUTH0_ISSUER_BASE_URL=https://xxx.auth0.com
AUTH0_CLIENT_ID=xxx
AUTH0_CLIENT_SECRET=xxx
```

## Deploy

```bash
vercel --prod
```

Then add subdomain `admin` pointing to this deployment.
