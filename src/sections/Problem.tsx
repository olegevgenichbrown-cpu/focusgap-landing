import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { problemConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const lines = text.querySelectorAll('.problem-line');
    gsap.set(lines, { opacity: 0, y: 40 });

    lines.forEach((line, i) => {
      const trigger = ScrollTrigger.create({
        trigger: line,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(line, {
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
      id="problem"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      <div ref={textRef} className="max-w-4xl mx-auto text-center">
        <h2 className="problem-line museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-16">
          {problemConfig.headline}
        </h2>
        <div className="space-y-8">
          {problemConfig.pains.map((pain, i) => (
            <p
              key={i}
              className="problem-line museo-body text-white/60 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
            >
              {pain}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
