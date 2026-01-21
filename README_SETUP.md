# Setup Instructions

## Required Dependencies

You need to install the following packages:

```bash
npm install @supabase/supabase-js @vercel/node
```

## Environment Variables

Create a `.env` file (or set these in Vercel) with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudflare API Configuration (for automatic DNS record creation)
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ZONE_ID=your_cloudflare_zone_id

# Vercel API Configuration (for automatic domain addition)
VERCEL_API_TOKEN=your_vercel_api_token
VERCEL_PROJECT_ID=your_vercel_project_id
# CNAME target for Cloudflare DNS (project-specific, get from Vercel domain settings)
# Default: fd3588ab14e28b6f.vercel-dns-017.com (can be overridden via env var)
VERCEL_CNAME_TARGET=fd3588ab14e28b6f.vercel-dns-017.com
```

**Important:** 
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side (in API routes). Never expose it in client-side code.
- API tokens (`CLOUDFLARE_API_TOKEN`, `VERCEL_API_TOKEN`) should only be used server-side and kept secure.

### Getting Cloudflare Credentials

1. **API Token**: 
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Create a token with "Edit zone DNS" permissions
   - Limit scope to `stonesystems.io` zone
   - Copy the token value

2. **Zone ID**:
   - Go to Cloudflare Dashboard → Select `stonesystems.io`
   - On Overview page, find "Zone ID"
   - Copy the Zone ID

### Getting Vercel Credentials

1. **API Token**:
   - Go to https://vercel.com/account/tokens
   - Create a new token with appropriate permissions
   - Copy the token value

2. **Project ID**:
   - Go to your Vercel project → Settings
   - Find "Project ID" in the project settings
   - Copy the Project ID

## Database Setup

Make sure you have a `sites` table in Supabase with the following schema:

```sql
CREATE TABLE sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Routes

The following API routes have been created:

1. **POST /api/create** - Creates a new site
   - Body: `{ businessName: string, email: string, phone: string }`
   - Returns: `{ data: Site, slug: string }`
   - Uses service role key for database access

2. **GET /api/site/[slug]** - Fetches site data by slug
   - Returns: `{ data: Site }`
   - Uses anon key for database access

## How It Works

1. The frontend detects the subdomain from `window.location.hostname`
2. Extracts the subdomain (e.g., "acme" from "acme.mydomain.com")
3. Fetches site data from `/api/site/[slug]`
4. Displays the site data throughout the application
5. Terms and Privacy pages dynamically insert the business name, email, and phone

## Testing Locally

For local development, you can use:
- `localhost` won't work for subdomain detection
- Use a local domain setup or test with actual subdomains
- Or modify the subdomain extraction logic for development
