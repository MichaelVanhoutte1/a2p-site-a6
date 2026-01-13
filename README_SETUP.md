# Setup Instructions

## Required Dependencies

You need to install the following packages:

```bash
npm install @supabase/supabase-js @vercel/node
```

## Environment Variables

Create a `.env` file (or set these in Vercel) with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:** The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side (in API routes). Never expose it in client-side code.

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
