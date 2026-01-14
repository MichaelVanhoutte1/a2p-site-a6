import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useLocation } from "wouter";

export default function RootLanding() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.email || !formData.phone || !formData.description) {
      toast.error("Please fill out all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to create site');
        setLoading(false);
        return;
      }

      const result = await response.json();
      toast.success("Site created successfully!");
      
      // Navigate to success page with slug
      setLocation(`/success?slug=${result.slug}`);
    } catch (error) {
      console.error('Error creating site:', error);
      toast.error('An error occurred while creating the site');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <Toaster />
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Your Site
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-semibold">
              Company Name *
            </Label>
            <Input
              id="businessName"
              placeholder="Enter your company name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              What your company does *
            </Label>
            <Textarea
              id="description"
              placeholder="does X, Y, Z"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
              required
            />
            <p className="text-xs text-gray-500">
              Format: "does X, Y, Z" (e.g., "does plumbing, electrical work, and HVAC services")
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Site"}
          </Button>
        </form>
      </div>
    </div>
  );
}
