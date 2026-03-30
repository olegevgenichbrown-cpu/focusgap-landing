import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manufacturingConfig } from '../config';
import { Cog, Hammer, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Manufacturing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!manufacturingConfig.headline || manufacturingConfig.processes.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Process cards reveal with stagger
    const cards = grid.querySelectorAll<HTMLElement>('.process-card');
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 60 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cog': return <Cog className="w-6 h-6" strokeWidth={1.5} />;
      case 'Hammer': return <Hammer className="w-6 h-6" strokeWidth={1.5} />;
      case 'CheckCircle': return <CheckCircle className="w-6 h-6" strokeWidth={1.5} />;
      default: return <Cog className="w-6 h-6" strokeWidth={1.5} />;
    }
  };

  return (
    <section
      id="manufacturing"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-32 px-8 lg:px-16 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-20 text-center">
        <p className="reveal-header museo-label text-white/40 mb-4 tracking-widest">
          {manufacturingConfig.label}
        </p>
        <h2 className="reveal-header museo-headline text-white text-4xl md:text-5xl lg:text-7xl mb-6">
          {manufacturingConfig.headline}
        </h2>
        <p className="reveal-header museo-body text-white/50 text-lg max-w-2xl mx-auto">
          {manufacturingConfig.description}
        </p>
      </div>

      {/* Process Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {manufacturingConfig.processes.map((process, i) => (
          <div
            key={i}
            className="process-card group relative"
            data-cursor="hover"
          >
            {/* GIF/Video Container */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[#1a1a1a] mb-6">
              {process.gif.endsWith('.mp4') ? (
                <video
                  src={process.gif}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={process.gif}
                  alt={process.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Play indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>

              {/* Step number */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="museo-headline text-white text-sm">0{i + 1}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-white/10 group-hover:text-white transition-all">
                {getIcon(process.icon)}
              </div>
              <div>
                <h3 className="museo-headline text-white text-xl mb-2 group-hover:text-white/90 transition-colors">
                  {process.title}
                </h3>
                <p className="museo-body text-white/40 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {manufacturingConfig.stats.map((stat, i) => (
            <div key={i} className="process-card">
              <p className="museo-headline text-white text-3xl md:text-4xl mb-2">{stat.value}</p>
              <p className="museo-label text-white/40 text-xs tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manufacturing;
