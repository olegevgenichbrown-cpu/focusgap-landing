import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-white/80 p-8 lg:p-16">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="mb-6 text-white/40 italic">Last updated: April 8, 2026</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>Welcome to FocusGap. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Identity Data:</strong> Includes email address when provided via our waitlist or VIP forms.</li>
              <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> Includes information about how you use our website, products and services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
            <p>We use your data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To register you for our Kickstarter launch notifications.</li>
              <li>To provide you with VIP early access benefits.</li>
              <li>To improve our website, products/services, marketing, and customer relationships.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p>We use selected third-party services to help us operate our business:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>PostHog:</strong> For product analytics and behavioral tracking to understand how users interact with our site.</li>
              <li><strong>Stripe:</strong> For secure payment processing of VIP reservations. We do not store your credit card details.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">5. International Transfers (GDPR Compliance)</h2>
            <p>FocusGap is based in the United States. Your data may be transferred to and processed in the US. We ensure a similar degree of protection is afforded to it by ensuring at least one of the legal safeguards is implemented.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">6. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p className="mt-4 font-medium text-white">FocusGap L.L.C</p>
            <p>Thirty North Gould Street, Suite N</p>
            <p>Email: privacy@focusgap.co</p>
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center text-white/20 text-sm">
          FocusGap © 2026 — Secure & Private
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
