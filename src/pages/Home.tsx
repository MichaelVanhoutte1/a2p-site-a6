import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useSiteData } from "@/hooks/useSiteData";
import { TermsOfServiceContent } from "@/components/TermsOfService";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicy";
import { useLocation } from "wouter";

export default function Home() {
  const { siteData, loading, error } = useSiteData();
  const [location] = useLocation();
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    // Auto-open dialog based on route
    if (location === "/terms" || location === "/terms-of-service") {
      setTermsOpen(true);
    } else if (location === "/privacy" || location === "/privacy-policy") {
      setPrivacyOpen(true);
    } else {
      // Close dialogs when navigating away
      setTermsOpen(false);
      setPrivacyOpen(false);
    }
  }, [location]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    if (!formData.consent) {
      toast.error("Please provide consent to be contacted");
      return;
    }

    toast.success("Thanks for submitting. We'll get in contact with you as soon as possible.");
    console.log("Form submitted:", formData);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <p className="text-lg text-red-600 font-semibold mb-2">Error Loading Site</p>
          <p className="text-sm text-gray-700">{error || "Site not found"}</p>
          <p className="text-xs text-gray-500 mt-4">
            Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}
          </p>
          <p className="text-xs text-gray-500">
            Check the browser console for more details.
          </p>
        </div>
      </div>
    );
  }

  const businessName = siteData.business_name;
  const email = siteData.email;
  const phone = siteData.phone;

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center">{businessName}</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - About Us */}
          <div className="bg-gray-100 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-gray-700 leading-relaxed">
              {businessName} provides services. We provide Customer Support messages (information on your
              order/service and help if you ever need guidance during the process), and marketing
              of our services when applicable. When you consent to receive messaging from {businessName},
              you are providing it only to {businessName}, not any third parties. Your SMS opt-in data will never
              be shared/sold to third parties.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-center">
              Input Your Information Here to Learn About our Products! 😊
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              {/* First Name */}
              <div className="space-y-1">
                <Label htmlFor="first-name" className="text-sm font-semibold">
                  First name
                </Label>
                <Input
                  id="first-name"
                  placeholder="Type your answer here..."
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <Label htmlFor="last-name" className="text-sm font-semibold">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  placeholder="Type your answer here..."
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Type your answer here..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone
                </Label>
                <div className="flex gap-2">
                  <select className="h-11 px-3 border rounded-md bg-white cursor-pointer text-sm">
                    <option>🇺🇸 +1</option>
                  </select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder=""
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 flex-1"
                    required
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 py-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, consent: checked as boolean })
                  }
                  className="mt-0.5 cursor-pointer"
                />
                <Label htmlFor="consent" className="text-xs leading-relaxed cursor-pointer text-gray-700">
                  By providing a telephone number, clicking this button, and submitting the form, you are
                  consenting to be contacted by SMS text message and AI-powered voice calls from {businessName}
                  regarding our services (our message frequency may vary). Message & data rates apply. Reply STOP to
                  unsubscribe from further messaging from {businessName}. Reply HELP for more information. See our
                  Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-11 text-base font-semibold cursor-pointer bg-black hover:bg-gray-800 text-white">
                Submit
              </Button>

              {/* Terms and Privacy Links */}
              <div className="flex justify-center gap-8 text-sm pt-3">
                <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
                  <DialogTrigger asChild>
                    <a href="/terms" className="underline hover:text-primary transition-colors cursor-pointer">
                      Terms of Service
                    </a>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{businessName} Terms of Service</DialogTitle>
                    </DialogHeader>
                    <TermsOfServiceContent businessName={businessName} email={email} phone={phone} />
                  </DialogContent>
                </Dialog>

                <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
                  <DialogTrigger asChild>
                    <a href="/privacy-policy" className="underline hover:text-primary transition-colors cursor-pointer">
                      Privacy Policy
                    </a>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{businessName} Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <PrivacyPolicyContent businessName={businessName} email={email} phone={phone} />
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}