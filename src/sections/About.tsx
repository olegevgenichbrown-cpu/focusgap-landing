import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.headline) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const stats = statsRef.current;

    if (!section || !text || !stats) return;

    // Text reveal
    const textElements = text.querySelectorAll('.reveal-text');
    textElements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Grid items reveal
    const gridItems = section.querySelectorAll<HTMLElement>('.grid-item');
    gridItems.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1, y: 0, duration: 0.6,
            delay: i * 0.1, ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Stats reveal
    const statItems = stats.querySelectorAll('.stat-item');
    statItems.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.8,
            delay: i * 0.1, ease: 'power3.out',
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

  // Get first 6 components for 3x2 grid
  const gridImages = aboutConfig.galleryImages.slice(0, 6);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative w-full bg-[#050505]"
    >
      {/* Section Header */}
      <div ref={textRef} className="max-w-6xl mx-auto pt-32 pb-20 px-8 lg:px-16">
        <p className="reveal-text museo-label text-white/50 mb-6" style={{ willChange: 'transform, opacity' }}>
          {aboutConfig.label}
        </p>
        <h2 className="reveal-text museo-headline text-white text-4xl md:text-5xl lg:text-7xl mb-8" style={{ willChange: 'transform, opacity' }}>
          {aboutConfig.headline}
        </h2>
        <p className="reveal-text museo-body text-white/60 text-lg md:text-xl max-w-2xl" style={{ willChange: 'transform, opacity' }}>
          {aboutConfig.description}
        </p>
      </div>

      {/* Gallery Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 space-y-6">
        
        {/* Component 8 — Full Width Hero */}
        <div className="grid-item w-full">
          <div className="overflow-hidden rounded-xl bg-black">
            <video
              src="/videos/component8.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover aspect-[4/3] sm:aspect-video"
            />
          </div>
          <p className="museo-label text-white/25 mt-3 text-[10px] uppercase tracking-wider">Complete Setup</p>
        </div>

        {/* Components Grid — 3x2, all 1:1 square */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {gridImages.map((img, i) => (
            <div key={i} className="grid-item overflow-hidden rounded-xl bg-black">
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                {img.type === 'video' ? (
                  <video 
                    src={img.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                )}
              </div>
              <p className="museo-label text-white/25 mt-3 text-[10px] uppercase tracking-wider">{img.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      {aboutConfig.stats.length > 0 && (
        <div ref={statsRef} className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-24 bg-[#050505]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            {aboutConfig.stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <p className="museo-headline text-white text-4xl md:text-5xl mb-2">{stat.value}</p>
                <p className="museo-label text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom text */}
      {aboutConfig.bottomText && (
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pb-32 bg-[#050505]">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="reveal-text museo-body text-white/50 text-base lg:text-lg">
                {aboutConfig.bottomText}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
