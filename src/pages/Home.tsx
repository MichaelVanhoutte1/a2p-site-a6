import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center">asdasd</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - About Us */}
          <div className="bg-gray-100 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-gray-700 leading-relaxed">
              asdasd is a sdfsdf. We provide Customer Support messages (information on your
              order/service and help if you ever need guidance during the process), and marketing
              of our services when applicable. When you consent to receive messaging from asdasd,
              you are providing it only to asdasd, not any third parties. Your SMS opt-in data will never
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
                  consenting to be contacted by SMS text message and AI-powered voice calls from asdasd
                  regarding , (our message frequency may vary). Message & data rates apply. Reply STOP to
                  unsubscribe from further messaging from asdasd Reply HELP for more information. See our
                  Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-11 text-base font-semibold cursor-pointer bg-black hover:bg-gray-800 text-white">
                Submit
              </Button>

              {/* Terms and Privacy Links */}
              <div className="flex justify-center gap-8 text-sm pt-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="underline hover:text-primary transition-colors cursor-pointer">
                      Terms of Service
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">asdasd Terms of Service</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-4 text-sm">
                        <p className="font-semibold">Effective Date: 1/13/2026</p>

                        <div>
                          <h3 className="font-bold text-base mb-2">1. Introduction</h3>
                          <p>These Terms of Service ("Terms") govern your use of the services provided by asdasd ("we," "our," or "us"). By accessing or using our services, you agree to be bound by these Terms.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">2. Services</h3>
                          <p>We provide mortgage and related services ("Services"). We reserve the right to modify or discontinue the Services at any time without notice.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">3. Account Registration</h3>
                          <p>To use our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">4. Acceptable Use</h3>
                          <p>You agree to use our Services in compliance with all applicable laws and regulations. You must not:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Use the Services for any unlawful purpose.</li>
                            <li>Interfere with or disrupt the Services or servers/networks connected to the Services.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">5. Fees and Payment</h3>
                          <p>You agree to pay all applicable fees for the Services as outlined in your service agreement. Fees are non-refundable except as required by law.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">6. Intellectual Property</h3>
                          <p>We own all rights, title, and interest in and to the Services, including all intellectual property rights. You are granted a limited, non-exclusive, non-transferable, and revocable license to use the Services for your internal business purposes.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">7. Confidentiality</h3>
                          <p>You agree to maintain the confidentiality of any non-public information disclosed to you by us, including business, technical, and financial information.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">8. Privacy</h3>
                          <p>Your use of the Services is also governed by our Privacy Policy, which is incorporated by reference into these Terms.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">9. Limitation of Liability</h3>
                          <p>To the maximum extent permitted by law, asdasd will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Your use or inability to use the Services.</li>
                            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                            <li>Any interruption or cessation of transmission to or from the Services.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">10. Indemnification</h3>
                          <p>You agree to indemnify, defend, and hold harmless asdasd, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">11. Termination</h3>
                          <p>We may terminate or suspend your account and access to the Services at our sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">12. Governing Law</h3>
                          <p>These Terms shall be governed and construed in accordance with the laws of the state of , without regard to its conflict of law provisions.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">13. Links to Other Websites</h3>
                          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by asdasd.</p>
                          <p className="mt-2">asdasd has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that asdasd shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
                          <p className="mt-2">We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">14. Dispute Resolution</h3>
                          <p>Any disputes arising out of or in connection with these Terms or the Services shall be resolved through binding arbitration in , in accordance with the rules of the American Arbitration Association.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">15. Changes to the Terms</h3>
                          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">16. Contact Us</h3>
                          <p>If you have any questions about these Terms, please contact us at:</p>
                          <p className="mt-2">Email: Michael3vanhoutte@gmail.com</p>
                          <p>Phone:</p>
                        </div>

                        <p className="font-semibold mt-4">By using our Services, you agree to be bound by these Terms.</p>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="underline hover:text-primary transition-colors cursor-pointer">
                      Privacy Policy
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">asdasd Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-4 text-sm">
                        <p className="font-semibold">Effective Date: 1/13/2026</p>

                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h3 className="font-bold text-base mb-2">SMS Disclaimer:</h3>
                          <p>SMS messages are sent by asdasd. asdasd is a sdfsdf. We provide Customer Support messages (information on your order/service and help if you ever need guidance during the process), and marketing of our services when applicable. When you consent to receive messaging from asdasd, you are providing it only to asdasd, not any third parties. Your SMS opt-in data will never be shared/sold to third parties.. By opting into messaging from asdasd regarding customer support and marketing messages, you understand that our message frequency may vary, you may reach out to Michael3vanhoutte@gmail.com with any questions, message and data rates may apply, and can reply "STOP" to opt out from messaging from asdasd.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">1. Introduction</h3>
                          <p>asdasd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this Privacy Policy carefully.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">2. Information We Collect</h3>
                          <p className="font-semibold mb-1">Personal Data:</p>
                          <p className="mb-2">We collect personally identifiable information, such as your name, email address, phone number, and payment details, when you register on our site, place an order, or subscribe to our newsletter.</p>
                          <p className="font-semibold mb-1">Usage Data:</p>
                          <p className="mb-2">We automatically collect information about your visit to our website, including your IP address, browser type, access times, and pages viewed.</p>
                          <p className="font-semibold mb-1">Cookies and Tracking Technologies:</p>
                          <p>We use cookies, web beacons, and similar tracking technologies to track the activity on our website and hold certain information.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">3. Use of Your Information</h3>
                          <p>We use the information we collect for various purposes, including:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Providing, operating, and maintaining our website and services.</li>
                            <li>Improving, personalizing, and expanding our website and services.</li>
                            <li>Processing transactions and managing your orders.</li>
                            <li>Communicating with you, including responding to inquiries, providing customer support, and sending updates.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">4. Disclosure of Your Information</h3>
                          <p>We may share your information with:</p>
                          <p className="font-semibold mt-2 mb-1">Service Providers:</p>
                          <p className="mb-2">Third-party vendors who provide services on our behalf, such as payment processing, data analysis, email delivery, and hosting services.</p>
                          <p className="font-semibold mb-1">Affiliates:</p>
                          <p className="mb-2">We may share your information with our affiliates, in which case we will require them to honor this Privacy Policy.</p>
                          <p className="font-semibold mb-1">Business Transfers:</p>
                          <p className="mb-2">If we undergo a merger, acquisition, or asset sale, your information may be transferred.</p>
                          <p className="font-semibold">No data is shared/sold to third parties for marketing and promotional purposes, including SMS opt-in consent. SMS opt-in consent is not shared/sold to third parties for marketing/promotional purposes.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">5. Data Security</h3>
                          <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">6. Your Data Protection Rights</h3>
                          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>The right to access - You have the right to request copies of your personal data.</li>
                            <li>The right to rectification - You have the right to request correction of any inaccurate information.</li>
                            <li>The right to erasure - You have the right to request that we erase your personal data, under certain conditions.</li>
                            <li>The right to restrict processing - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                            <li>The right to object to processing - You have the right to object to our processing of your personal data, under certain conditions.</li>
                            <li>The right to data portability - You have the right to request that we transfer your data to another organization, or directly to you, under certain conditions.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">7. California Consumer Privacy Act (CCPA)</h3>
                          <p>If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA). These include the right to:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Know what personal data is being collected about you.</li>
                            <li>Know whether your personal data is sold or disclosed and to whom.</li>
                            <li>Access your personal data.</li>
                            <li>Request deletion of your personal data.</li>
                            <li>Opt-out of the sale of your personal data.</li>
                            <li>Non-discrimination for exercising your privacy rights.</li>
                          </ul>
                          <p className="mt-2">To exercise your CCPA rights, please contact us at Michael3vanhoutte@gmail.com. We will respond to your request within the timeframe required by law.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">8. Changes to This Privacy Policy</h3>
                          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective when they are posted on this page.</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-base mb-2">9. Contact Us</h3>
                          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                          <p className="mt-2">Email: Michael3vanhoutte@gmail.com</p>
                          <p>Phone:</p>
                        </div>

                        <p className="font-semibold mt-4">By using our website and services, you consent to the terms of this Privacy Policy.</p>
                      </div>
                    </ScrollArea>
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