import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Zap } from 'lucide-react';
import posthog from 'posthog-js';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  '15% off retail price',
  'First priority shipping',
  'Exclusive backer community access',
];

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.set(content, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      posthog.capture('email_submitted', { email, variant: 'v1', source: 'final_cta' });
      navigate(`/vip?email=${encodeURIComponent(email)}`);
    }
  };

  const handleDirectVip = () => {
    if (email) {
      posthog.capture('email_submitted', { email, variant: 'v1', source: 'final_cta_direct' });
      navigate(`/vip?email=${encodeURIComponent(email)}`);
    } else {
      navigate('/vip');
    }
  };

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-32 lg:py-56 px-6 lg:px-16"
    >
      <div
        ref={contentRef}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-10">
          Claim your early backer spot
        </h2>

        <div className="flex flex-col items-center gap-4 mb-10">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={2} />
              </div>
              <span className="museo-body text-white/80 text-lg">{benefit}</span>
            </div>
          ))}
        </div>

        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all group whitespace-nowrap"
          >
            JOIN THE VIP LIST
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-4">
            <Zap className="w-4 h-4 text-yellow-400" />
            500 VIP spots. 312 already claimed.
          </div>
          
          <button
            type="button"
            onClick={handleDirectVip}
            className="text-white/40 hover:text-white/80 transition-colors text-xs uppercase tracking-[0.2em] font-black underline underline-offset-8"
          >
            Or join the VIP list directly →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
