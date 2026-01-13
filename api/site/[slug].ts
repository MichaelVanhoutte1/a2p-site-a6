import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Debug: Log the full query object
    console.log('API Route - Full query:', req.query);
    console.log('API Route - URL:', req.url);
    
    // For Vercel dynamic routes, the parameter is in req.query
    // The slug parameter should be directly accessible
    const slug = req.query.slug as string | string[] | undefined;
    
    // Handle array case (shouldn't happen but be safe)
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    
    console.log('API Route - Extracted slug:', slugString);

    if (!slugString || typeof slugString !== 'string') {
      console.error('API Route - Invalid slug:', slugString);
      return res.status(400).json({ error: 'Slug is required', received: slugString });
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('API Route - Querying Supabase for slug:', slugString);
    
    // Query sites table by slug
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slugString)
      .single();

    if (error) {
      console.error('API Route - Supabase error:', error);
      if (error.code === 'PGRST116') {
        // No rows returned
        console.log('API Route - No site found for slug:', slugString);
        return res.status(404).json({ error: 'Site not found', slug: slugString });
      }
      return res.status(500).json({ error: error.message, code: error.code });
    }

    console.log('API Route - Found site data:', data ? 'Yes' : 'No');
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching site:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
