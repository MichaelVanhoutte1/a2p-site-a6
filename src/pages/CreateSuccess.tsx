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

  const campaignDescription = `Send first-party low volume messages offered directly by the messaging party. ${siteData.business_name} is ${siteData.description}.`;

  const sampleMessage1 = `Your 10DLC campaign is now fully approved, congratulations! Respond STOP to opt out from ${siteData.business_name}`;

  const sampleMessage2 = `Your payment has been successfully received. Respond STOP to opt out from ${siteData.business_name}`;

  const callToActionMessageFlow = `Clients will be able to sign up to receive SMS notifications by checking their preference by clicking on ${websiteUrl} where they'll see a form to fill out information, and can click a specific box for Account Notification.
[ ] By providing a telephone number, clicking this button, and submitting the form, you are consenting to be contacted by SMS text message and AI-powered voice calls from ${siteData.business_name}, regarding Account Notification (our message frequency may vary). Message & data rates apply. Reply STOP to unsubscribe from further messaging from ${siteData.business_name}. Reply HELP for more information. See our Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.
Consent is provided exclusively for ${siteData.business_name} to contact the user based on the selection, not any other third parties mentioned on the site. SMS opt-in data is not shared/sold to third parties for promotional/marketing purposes.`;

  const optInMessage = `Welcome! You've now opted-in to messaging from ${siteData.business_name}. Message Frequency may vary. Message and data rates may apply. Reply STOP to opt-out, and HELP for support.`;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-8">Site Created Successfully!</h1>
          
          <div className="space-y-8">
            {/* Website URL */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Your Website URL</h2>
              <div className="flex items-center gap-2 flex-wrap">
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

            {/* Privacy Policy and Terms Links */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Legal Pages</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href={`${websiteUrl}/privacy-policy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  Privacy Policy
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={`${websiteUrl}/terms`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  Terms of Service
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Campaign Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Campaign Description</h2>
              <div 
                className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors relative group"
                onClick={() => copyToClipboard(campaignDescription, "Campaign Description")}
                title="Click to copy"
              >
                <p className="text-sm whitespace-pre-wrap select-all">{campaignDescription}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                  Click to copy
                </div>
              </div>
            </div>

            {/* Sample Messages */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Sample Messages</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Sample Message 1</h3>
                  <div 
                    className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors relative group"
                    onClick={() => copyToClipboard(sampleMessage1, "Sample Message 1")}
                    title="Click to copy"
                  >
                    <p className="text-sm whitespace-pre-wrap select-all">{sampleMessage1}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                      Click to copy
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Sample Message 2</h3>
                  <div 
                    className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors relative group"
                    onClick={() => copyToClipboard(sampleMessage2, "Sample Message 2")}
                    title="Click to copy"
                  >
                    <p className="text-sm whitespace-pre-wrap select-all">{sampleMessage2}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                      Click to copy
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call-to-Action / Message Flow */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Call-to-Action / Message Flow</h2>
              <div 
                className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors relative group"
                onClick={() => copyToClipboard(callToActionMessageFlow, "Call-to-Action / Message Flow")}
                title="Click to copy"
              >
                <p className="text-sm whitespace-pre-wrap select-all">{callToActionMessageFlow}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                  Click to copy
                </div>
              </div>
            </div>

            {/* Opt-in Message */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Opt-in Message</h2>
              <div 
                className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors relative group"
                onClick={() => copyToClipboard(optInMessage, "Opt-in Message")}
                title="Click to copy"
              >
                <p className="text-sm whitespace-pre-wrap select-all">{optInMessage}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                  Click to copy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
