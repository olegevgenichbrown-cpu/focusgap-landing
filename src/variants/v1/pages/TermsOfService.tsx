import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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

        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="mb-6 text-white/40 italic">Last updated: April 8, 2026</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p>FocusGap is a pre-launch platform for our modular desk system. We provide information about the product and offer users the ability to join a waitlist or reserve a VIP spot for our upcoming Kickstarter campaign.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">3. VIP Reservations</h2>
            <p>Reservations for VIP status require a $1 payment. This payment secures your early-bird pricing (15% off) and priority shipping for the Kickstarter campaign. This reservation is <strong>refundable</strong> upon request before the official Kickstarter launch.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <p>The content on this website, including but not limited to text, graphics, logos, and images, is the property of FocusGap L.L.C and is protected by copyright and other intellectual property laws.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">5. Disclaimer of Warranties</h2>
            <p>This website and its content are provided "as is" and "as available" without any warranties of any kind, either express or implied.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
            <p>In no event shall FocusGap L.L.C be liable for any indirect, incidental, special, consequential or punitive damages arising out of or in connection with your use of the website.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">7. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the State of Wyoming, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">8. Contact Information</h2>
            <p>FocusGap L.L.C</p>
            <p>Thirty North Gould Street, Suite N</p>
            <p>Email: legal@focusgap.co</p>
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center text-white/20 text-sm">
          FocusGap © 2026 — Legal Terms
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
