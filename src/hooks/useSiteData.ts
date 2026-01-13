import { useState, useEffect } from 'react';
import { extractSubdomain } from '@/lib/subdomain';

export interface SiteData {
  slug: string;
  business_name: string;
  email: string;
  phone: string;
}

export function useSiteData() {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSiteData() {
      try {
        // Extract subdomain from current hostname
        const hostname = window.location.hostname;
        const slug = extractSubdomain(hostname);

        if (!slug) {
          setError('No subdomain detected');
          setLoading(false);
          return;
        }

        // Fetch site data from API
        const response = await fetch(`/api/site/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Site not found');
          } else {
            setError('Failed to fetch site data');
          }
          setLoading(false);
          return;
        }

        const result = await response.json();
        setSiteData(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching site data:', err);
        setError('Failed to fetch site data');
      } finally {
        setLoading(false);
      }
    }

    fetchSiteData();
  }, []);

  return { siteData, loading, error };
}
