import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Ticket, Mail, ArrowRight, Check } from 'lucide-react';
import { visitConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MapPin,
  Clock,
  Calendar,
  Ticket,
};

const Visit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!visitConfig.headline && visitConfig.infoCards.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const form = formRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.info-card');
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Animate form
    if (form) {
      gsap.set(form, { opacity: 0, y: 30 });
      const formTrigger = ScrollTrigger.create({
        trigger: form,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(form, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(formTrigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send to your backend
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <p className="museo-label text-white/50 mb-4">{visitConfig.label}</p>
        <h2
          className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-8"
          dangerouslySetInnerHTML={{ __html: visitConfig.headline }}
        />
        <p className="museo-body text-white/60 text-lg max-w-2xl">
          {visitConfig.description}
        </p>
      </div>

      {/* Email Capture Form */}
      <div className="max-w-7xl mx-auto mb-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={1.5} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 museo-body focus:outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            data-cursor="hover"
            disabled={isSubmitted}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#050505] museo-label hover:bg-white/90 transition-colors disabled:opacity-70"
          >
            {isSubmitted ? (
              <>
                <Check className="w-5 h-5" strokeWidth={1.5} />
                Subscribed!
              </>
            ) : (
              <>
                {visitConfig.ctaText}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>
        <p className="mt-4 text-white/30 text-sm museo-body">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {visitConfig.infoCards.map((card, i) => {
          const IconComponent = iconMap[card.icon];
          return (
            <div key={i} className="info-card p-5 md:p-8 border border-white/10 hover:border-white/20 transition-colors">
              {IconComponent && <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white/50 mb-4 md:mb-6" strokeWidth={1.5} />}
              <h3 className="museo-headline text-white text-base md:text-xl mb-2 md:mb-3">{card.title}</h3>
              <div
                className="museo-body text-white/60 text-xs md:text-sm"
                dangerouslySetInnerHTML={{ __html: card.content }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Visit;
