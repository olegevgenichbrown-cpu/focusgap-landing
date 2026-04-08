import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pricingConfig } from '../config';
import { Check, Star, Zap, Crown, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Star,
  Zap,
  Crown,
};

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  if (!pricingConfig.headline || pricingConfig.tiers.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    // Header reveal
    gsap.set('.pricing-header', { opacity: 0, y: 40 });
    const headerTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.pricing-header', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(headerTrigger);

    // Cards reveal
    const cardItems = cards.querySelectorAll('.pricing-card');
    cardItems.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-32 px-8 lg:px-16 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[200px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[200px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="pricing-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/70 text-xs tracking-widest uppercase mb-6">
            <Users className="w-4 h-4" />
            Limited Early Bird
          </div>
          <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            {pricingConfig.headline}
          </h2>
          <p className="museo-body text-white/50 text-lg max-w-2xl mx-auto">
            {pricingConfig.description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingConfig.tiers.map((tier, i) => {
            const IconComponent = iconMap[tier.icon];
            const isPopular = tier.popular;
            
            return (
              <div
                key={i}
                className={`pricing-card relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  isPopular 
                    ? 'md:-mt-4 md:mb-4' 
                    : ''
                }`}
                onMouseEnter={() => setHoveredTier(i)}
                onMouseLeave={() => setHoveredTier(null)}
                data-cursor="hover"
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-white text-[#050505] text-xs font-bold tracking-wider uppercase text-center z-20">
                    Most Popular
                  </div>
                )}

                {/* Card background with glow */}
                <div className={`relative h-full p-8 rounded-2xl border transition-all duration-500 ${
                  isPopular
                    ? 'bg-gradient-to-b from-white/10 to-transparent border-white/30'
                    : hoveredTier === i
                      ? 'bg-white/[0.06] border-white/30'
                      : 'bg-white/[0.03] border-white/10'
                }`}>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    isPopular ? 'opacity-100' : 'opacity-0'
                  }`} style={{
                    background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.1), transparent 60%)'
                  }} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      isPopular 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/5 text-white/40'
                    }`}>
                      {IconComponent && <IconComponent className="w-6 h-6" strokeWidth={1.5} />}
                    </div>

                    {/* Tier name */}
                    <h3 className="museo-headline text-white text-2xl mb-2">{tier.name}</h3>
                    <p className="museo-body text-white/40 text-sm mb-6">{tier.description}</p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="museo-headline text-white text-5xl">${tier.price}</span>
                        <span className="museo-body text-white/40 line-through">${tier.originalPrice}</span>
                      </div>
                      <p className="museo-label text-white/50 text-xs mt-2">
                        Save ${tier.originalPrice - tier.price}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            isPopular ? 'text-white' : 'text-white/40'
                          }`} strokeWidth={2} />
                          <span className="museo-body text-white/70 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="#waitlist"
                      className={`block w-full py-4 rounded-xl text-center museo-label transition-all duration-300 ${
                        isPopular
                          ? 'bg-white text-[#050505] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {tier.cta}
                    </a>

                    {/* Spots left */}
                    {tier.spotsLeft && (
                      <p className="text-center mt-4 museo-label text-white/30 text-xs">
                        {tier.spotsLeft} spots left
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="mt-16 text-center">
          <p className="museo-body text-white/40">
            {pricingConfig.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
