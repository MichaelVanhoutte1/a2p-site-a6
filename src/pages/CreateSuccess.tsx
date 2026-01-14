import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useSearchParams } from "wouter";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface SiteData {
  slug: string;
  business_name: string;
  email: string;
  phone: string;
  description: string;
}

export default function CreateSuccess() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function fetchSiteData() {
      try {
        const response = await fetch(`/api/site/${slug}`);
        if (!response.ok) {
          console.error('Failed to fetch site data');
          return;
        }
        const result = await response.json();
        setSiteData(result.data);
      } catch (error) {
        console.error('Error fetching site data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSiteData();
  }, [slug]);

  if (!slug || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Site not found</p>
        </div>
      </div>
    );
  }

  const websiteUrl = `https://${slug}.stonesystems.dev`;
  const privacyPolicyUrl = `https://${slug}.stonesystems.dev/privacy-policy`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const campaignText = `Campaign Description: Send first-party low volume messages offered directly by the messaging party. ${siteData.business_name} is ${siteData.description}.

Sample Messages
Sample message 1: Your 10DLC campaign is now fully approved, congratulations! Respond STOP to opt out from ${siteData.business_name}
Sample message 2: Your payment has been successfully received. Respond STOP to opt out from ${siteData.business_name}

Call-to-Action / Message Flow: Clients will be able to sign up to receive SMS notifications by checking their preference by clicking on ${websiteUrl} where they'll see a form to fill out information, and can click a specific box for Account Notification.
[ ] By providing a telephone number, clicking this button, and submitting the form, you are consenting to be contacted by SMS text message and AI-powered voice calls from ${siteData.business_name}, regarding Account Notification (our message frequency may vary). Message & data rates apply. Reply STOP to unsubscribe from further messaging from ${siteData.business_name}. Reply HELP for more information. See our Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.
Consent is provided exclusively for ${siteData.business_name} to contact the user based on the selection, not any other third parties mentioned on the site. SMS opt-in data is not shared/sold to third parties for promotional/marketing purposes.
Privacy Policy URL: ${privacyPolicyUrl}

Opt-in Message: Welcome! You've now opted-in to messaging from ${siteData.business_name}. Message Frequency may vary. Message and data rates may apply. Reply STOP to opt-out, and HELP for support.`;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-6">Site Created Successfully!</h1>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Website URL</h2>
              <div className="flex items-center gap-2">
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  {websiteUrl}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(websiteUrl, "Website URL")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Campaign Description</h2>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {campaignText}
                </pre>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(campaignText, "Campaign description")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Campaign Description
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
