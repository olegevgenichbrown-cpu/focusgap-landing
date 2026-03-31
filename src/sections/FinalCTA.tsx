import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finalCTAConfig } from '../config';
import { Check } from 'lucide-react';
import EmailForm from '../components/EmailForm';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

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

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-32 px-8 lg:px-16"
    >
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-10">
          {finalCTAConfig.headline}
        </h2>

        <div className="flex flex-col items-center gap-4 mb-10">
          {finalCTAConfig.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <span className="museo-body text-white/80 text-lg">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <EmailForm buttonText={finalCTAConfig.ctaText} />
        </div>

        <p className="museo-label text-white/40 text-sm tracking-wider">
          {finalCTAConfig.scarcityText}
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
