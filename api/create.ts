import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Helper function to add DNS record to Cloudflare with retry
async function addCloudflareDNSRecord(
  zoneId: string,
  apiToken: string,
  subdomain: string,
  maxRetries = 3
): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  const domain = `${subdomain}.stonesystems.io`;
  const cnameTarget = 'cname.vercel-dns.com';

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // First, check if record already exists
      const checkResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=CNAME&name=${domain}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!checkResponse.ok) {
        const errorData = await checkResponse.json().catch(() => ({}));
        console.error(`Cloudflare check failed (attempt ${attempt}):`, errorData);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
          continue;
        }
        return { success: false, error: `Failed to check existing records: ${checkResponse.status}` };
      }

      const checkData = await checkResponse.json();
      if (checkData.result && checkData.result.length > 0) {
        console.log(`DNS record for ${domain} already exists, skipping`);
        return { success: true, skipped: true };
      }

      // Create the DNS record
      const createResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'CNAME',
            name: domain,
            content: cnameTarget,
            ttl: 1, // Auto TTL
          }),
        }
      );

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => ({}));
        console.error(`Cloudflare API error (attempt ${attempt}):`, errorData);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
          continue;
        }
        return { success: false, error: `Failed to create DNS record: ${createResponse.status}` };
      }

      const createData = await createResponse.json();
      if (createData.success) {
        console.log(`Successfully created DNS record for ${domain}`);
        return { success: true };
      } else {
        return { success: false, error: 'Cloudflare API returned success: false' };
      }
    } catch (error) {
      console.error(`Cloudflare API exception (attempt ${attempt}):`, error);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        continue;
      }
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

// Helper function to add domain to Vercel
async function addVercelDomain(
  apiToken: string,
  projectId: string,
  domain: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/domains`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: domain,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // If domain already exists, that's okay
      if (response.status === 409 || errorData.error?.code === 'domain_already_in_use') {
        console.log(`Domain ${domain} already exists in Vercel, skipping`);
        return { success: true };
      }
      console.error('Vercel API error:', errorData);
      return { success: false, error: `Failed to add domain to Vercel: ${response.status}` };
    }

    const data = await response.json();
    console.log(`Successfully added domain ${domain} to Vercel`);
    return { success: true };
  } catch (error) {
    console.error('Vercel API exception:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { businessName, email, phone, description } = req.body;

    if (!businessName || !email || !phone || !description) {
      return res.status(400).json({
        error: 'Missing required fields: businessName, email, phone, description',
      });
    }

    // Generate slug from business name
    const slug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('API Route - Missing env vars. URL:', !!supabaseUrl, 'ServiceKey:', !!supabaseServiceKey);
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Insert into sites table
    const { data, error } = await supabase
      .from('sites')
      .insert({
        slug,
        business_name: businessName,
        email,
        phone,
        description,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Get Cloudflare and Vercel credentials
    const cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN;
    const cloudflareZoneId = process.env.CLOUDFLARE_ZONE_ID;
    const vercelApiToken = process.env.VERCEL_API_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;

    const domain = `${slug}.stonesystems.io`;
    const dnsResults: { cloudflare?: any; vercel?: any } = {};

    // Add DNS record to Cloudflare
    if (cloudflareApiToken && cloudflareZoneId) {
      const cloudflareResult = await addCloudflareDNSRecord(
        cloudflareZoneId,
        cloudflareApiToken,
        slug
      );
      dnsResults.cloudflare = cloudflareResult;
      
      if (!cloudflareResult.success && !cloudflareResult.skipped) {
        console.error('Cloudflare DNS creation failed:', cloudflareResult.error);
        // Continue anyway - site is created in Supabase
      }
    } else {
      console.warn('Cloudflare credentials not configured, skipping DNS record creation');
    }

    // Add domain to Vercel
    if (vercelApiToken && vercelProjectId) {
      const vercelResult = await addVercelDomain(
        vercelApiToken,
        vercelProjectId,
        domain
      );
      dnsResults.vercel = vercelResult;
      
      if (!vercelResult.success) {
        console.error('Vercel domain addition failed:', vercelResult.error);
        // Continue anyway - site is created in Supabase
      }
    } else {
      console.warn('Vercel API credentials not configured, skipping domain addition');
    }

    return res.status(200).json({ 
      data, 
      slug,
      dns: dnsResults // Include DNS operation results for debugging
    });
  } catch (error) {
    console.error('Error creating site:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
