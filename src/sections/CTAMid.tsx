import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finalCTAConfig } from '../config';
import EmailForm from '../components/EmailForm';

gsap.registerPlugin(ScrollTrigger);

const CTAMid = () => {
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
      id="cta-mid"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-24 px-8 lg:px-16"
    >
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="museo-headline text-white text-3xl md:text-4xl mb-8">
          Join the VIP list
        </h2>
        <p className="museo-body text-white/50 text-lg mb-8 max-w-xl mx-auto">
          Be the first to know when we launch on Kickstarter. Early backers get 40% off and priority shipping.
        </p>
        <div className="flex justify-center">
          <EmailForm buttonText={finalCTAConfig.ctaText} />
        </div>
      </div>
    </section>
  );
};

export default CTAMid;
