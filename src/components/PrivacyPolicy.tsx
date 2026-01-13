import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyProps {
  businessName: string;
  email: string;
  phone: string;
}

export function PrivacyPolicyContent({ businessName, email, phone }: PrivacyPolicyProps) {
  return (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-4 text-sm">
        <p className="font-semibold">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="font-bold text-base mb-2">SMS Disclaimer:</h3>
          <p>SMS messages are sent by {businessName}. We provide Customer Support messages (information on your order/service and help if you ever need guidance during the process), and marketing of our services when applicable. When you consent to receive messaging from {businessName}, you are providing it only to {businessName}, not any third parties. Your SMS opt-in data will never be shared/sold to third parties. By opting into messaging from {businessName} regarding customer support and marketing messages, you understand that our message frequency may vary, you may reach out to {email} with any questions, message and data rates may apply, and can reply "STOP" to opt out from messaging from {businessName}.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">1. Introduction</h3>
          <p>{businessName} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this Privacy Policy carefully.</p>
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
          <p className="mt-2">To exercise your CCPA rights, please contact us at {email}. We will respond to your request within the timeframe required by law.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">8. Changes to This Privacy Policy</h3>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective when they are posted on this page.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">9. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>

        <p className="font-semibold mt-4">By using our website and services, you consent to the terms of this Privacy Policy.</p>
      </div>
    </ScrollArea>
  );
}
