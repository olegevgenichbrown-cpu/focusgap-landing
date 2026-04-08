import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Shield, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const VIP = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vip-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Здесь будет редирект на Stripe
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Redirecting to Stripe checkout...');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/component8.mp4" />
        </video>
        {/* Dark overlay + blur */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <div ref={heroRef} className="px-8 lg:px-16 pt-20 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="vip-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-xs tracking-widest uppercase">VIP Early Access</span>
            </div>

            <h1 className="vip-item text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Reserve your spot
            </h1>
            
            <p className="vip-item text-white/60 text-lg md:text-xl mb-4">
              Join our inner circle. Reserve your early-access discount today.
            </p>
            
            <p className="vip-item text-white/40">
              Get 15% off any module when we launch on Kickstarter.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 lg:px-16 pb-20">
          <div className="max-w-xl mx-auto">
            <div className="vip-item bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
              {/* Benefits */}
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: Shield, text: '15% off retail price' },
                  { icon: Truck, text: 'First priority shipping' },
                  { icon: Zap, text: 'Free worldwide shipping' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white/80" />
                    </div>
                    <span className="text-white/80">{text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-8" />

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Continue to Stripe'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <p className="text-white/30 text-xs text-center mt-4">
                You'll be redirected to Stripe for secure $1 payment
              </p>

              {/* Scarcity */}
              <div className="flex items-center justify-center gap-2 text-white/40 text-sm mt-6 pt-6 border-t border-white/10">
                <Zap className="w-4 h-4 text-yellow-400" />
                500 spots. 312 already claimed.
              </div>
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="px-8 lg:px-16 py-8 border-t border-white/5 relative z-10">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-4 text-center">
            <div className="text-white/20 text-sm">
              FocusGap © 2026 — Pre-launch campaign<br />
              FocusGap L.L.C — Thirty North Gould Street, Suite N
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-white/20 hover:text-white/40 transition-colors text-xs uppercase tracking-widest">Privacy</Link>
              <Link to="/terms" className="text-white/20 hover:text-white/40 transition-colors text-xs uppercase tracking-widest">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VIP;
