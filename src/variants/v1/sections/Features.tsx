import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuresConfig } from '../config';
import { Layers, Wind, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Layers,
  Wind,
  Shield,
};

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.feature-item');
    gsap.set(items, { opacity: 0, y: 40 });

    items.forEach((item, i) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
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
      id="features"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-32 px-6 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="museo-headline text-white text-3xl md:text-4xl lg:text-5xl text-center mb-20">
          {featuresConfig.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {featuresConfig.items.map((feature, i) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div
                key={i}
                className="feature-item text-center px-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  {IconComponent && <IconComponent className="w-7 h-7 text-white/60" strokeWidth={1.5} />}
                </div>
                <h3 className="museo-headline text-white text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="museo-body text-white/50 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
