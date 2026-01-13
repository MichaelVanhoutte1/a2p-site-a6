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
        console.log('useSiteData - Hostname:', hostname);
        
        const slug = extractSubdomain(hostname);
        console.log('useSiteData - Extracted slug:', slug);

        if (!slug) {
          console.error('useSiteData - No subdomain detected from hostname:', hostname);
          setError(`No subdomain detected. Hostname: ${hostname}`);
          setLoading(false);
          return;
        }

        // Fetch site data from API
        const apiUrl = `/api/site/${slug}`;
        console.log('useSiteData - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('useSiteData - Response status:', response.status);
        console.log('useSiteData - Response ok:', response.ok);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('useSiteData - Error response:', errorData);
          
          if (response.status === 404) {
            setError(`Site not found for slug: ${slug}`);
          } else {
            setError(`Failed to fetch site data: ${response.status} ${errorData.error || ''}`);
          }
          setLoading(false);
          return;
        }

        const result = await response.json();
        console.log('useSiteData - Received data:', result);
        
        if (!result.data) {
          console.error('useSiteData - No data in response:', result);
          setError('Invalid response from server');
          setLoading(false);
          return;
        }
        
        setSiteData(result.data);
        setError(null);
      } catch (err) {
        console.error('useSiteData - Exception:', err);
        setError(`Failed to fetch site data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchSiteData();
  }, []);

  return { siteData, loading, error };
}
