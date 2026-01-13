import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceProps {
  businessName: string;
  email: string;
  phone: string;
}

export function TermsOfServiceContent({ businessName, email, phone }: TermsOfServiceProps) {
  return (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-4 text-sm">
        <p className="font-semibold">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>

        <div>
          <h3 className="font-bold text-base mb-2">1. Introduction</h3>
          <p>These Terms of Service ("Terms") govern your use of the services provided by {businessName} ("we," "our," or "us"). By accessing or using our services, you agree to be bound by these Terms.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">2. Services</h3>
          <p>We provide services ("Services"). We reserve the right to modify or discontinue the Services at any time without notice.</p>
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
          <p>To the maximum extent permitted by law, {businessName} will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Your use or inability to use the Services.</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
            <li>Any interruption or cessation of transmission to or from the Services.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">10. Indemnification</h3>
          <p>You agree to indemnify, defend, and hold harmless {businessName}, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">11. Termination</h3>
          <p>We may terminate or suspend your account and access to the Services at our sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">12. Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">13. Links to Other Websites</h3>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by {businessName}.</p>
          <p className="mt-2">{businessName} has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that {businessName} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
          <p className="mt-2">We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">14. Dispute Resolution</h3>
          <p>Any disputes arising out of or in connection with these Terms or the Services shall be resolved through binding arbitration in accordance with applicable arbitration rules.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">15. Changes to the Terms</h3>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">16. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="mt-2">Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>

        <p className="font-semibold mt-4">By using our Services, you agree to be bound by these Terms.</p>
      </div>
    </ScrollArea>
  );
}
