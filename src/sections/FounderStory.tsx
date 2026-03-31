import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { founderConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const FounderStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    gsap.set(image, { opacity: 0, x: -60 });
    gsap.set(text.querySelectorAll('.reveal-text'), { opacity: 0, y: 40 });

    const imgTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(image, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(imgTrigger);

    const textEls = text.querySelectorAll('.reveal-text');
    textEls.forEach((el, i) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
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
      id="founder"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={imageRef} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            <img
              src={founderConfig.authorImage}
              alt={founderConfig.authorName}
              className="w-full h-full object-cover"
            />
          </div>

          <div ref={textRef} className="flex flex-col justify-center">
            <h2 className="reveal-text museo-headline text-white text-3xl md:text-4xl lg:text-5xl mb-8">
              {founderConfig.headline}
            </h2>
            <div className="reveal-text space-y-6 museo-body text-white/60 text-lg leading-relaxed mb-8">
              {founderConfig.story.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="reveal-text">
              <p className="museo-headline text-white text-lg">{founderConfig.authorName}</p>
              <p className="museo-label text-white/40 text-sm tracking-wider">{founderConfig.authorTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
