import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { magneticConfig } from '../config';
import { Magnet, Layers, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Magnetic = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const configsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!magneticConfig.headline) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const showcase = showcaseRef.current;
    const configs = configsRef.current;

    if (!section || !header || !showcase || !configs) return;

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

    // Main showcase reveal
    const showcaseEl = showcase.querySelector('.magnetic-showcase');
    if (showcaseEl) {
      gsap.set(showcaseEl, { opacity: 0, scale: 0.95 });
      const trigger = ScrollTrigger.create({
        trigger: showcaseEl,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(showcaseEl, { 
            opacity: 1, 
            scale: 1, 
            duration: 1.2, 
            ease: 'power3.out' 
          });
        },
      });
      triggersRef.current.push(trigger);
    }

    // Feature cards reveal
    const features = showcase.querySelectorAll<HTMLElement>('.feature-card');
    features.forEach((card, i) => {
      gsap.set(card, { opacity: 0, x: i % 2 === 0 ? -40 : 40 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Configs grid reveal
    const configItems = configs.querySelectorAll<HTMLElement>('.config-item');
    configItems.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
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
      case 'Magnet': return <Magnet className="w-6 h-6" strokeWidth={1.5} />;
      case 'Layers': return <Layers className="w-6 h-6" strokeWidth={1.5} />;
      case 'Zap': return <Zap className="w-6 h-6" strokeWidth={1.5} />;
      default: return <Magnet className="w-6 h-6" strokeWidth={1.5} />;
    }
  };

  return (
    <section
      id="magnetic"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <div className="reveal-header inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white/60 text-xs tracking-widest uppercase mb-6">
          <Magnet className="w-4 h-4" />
          {magneticConfig.label}
        </div>
        <h2 className="reveal-header museo-headline text-white text-4xl md:text-5xl lg:text-7xl mb-6">
          {magneticConfig.headline}
        </h2>
        <p className="reveal-header museo-body text-white/50 text-lg max-w-2xl mx-auto">
          {magneticConfig.description}
        </p>
      </div>

      {/* Main Magnetic Showcase */}
      <div ref={showcaseRef} className="max-w-7xl mx-auto mb-24 relative z-10">
        <div className="magnetic-showcase relative aspect-[4/3] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          {/* Main Video */}
          <video
            src={magneticConfig.mainGif}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          
          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>

          {/* Floating feature cards - desktop only */}
          <div className="absolute bottom-8 left-8 right-8 hidden sm:flex flex-wrap gap-4">
            {magneticConfig.features.map((feature, i) => (
              <div
                key={i}
                className="feature-card flex items-center gap-3 px-5 py-3 bg-black/60 backdrop-blur-md rounded-lg border border-white/10"
              >
                <div className="text-white/60">
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <p className="museo-headline text-white text-sm">{feature.title}</p>
                  <p className="museo-body text-white/40 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile feature cards - 3 lines below video */}
        <div className="sm:hidden mt-4 grid grid-cols-1 gap-3">
          {magneticConfig.features.map((feature, i) => (
            <div
              key={i}
              className="feature-card flex items-center gap-4 px-4 py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10"
            >
              <div className="text-white/60">
                {getIcon(feature.icon)}
              </div>
              <div>
                <p className="museo-headline text-white text-sm">{feature.title}</p>
                <p className="museo-body text-white/40 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Variations */}
      <div ref={configsRef} className="max-w-7xl mx-auto relative z-10">
        <h3 className="museo-headline text-white text-2xl mb-8 text-center">
          Endless Configurations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magneticConfig.configurations.map((config, i) => (
            <div
              key={i}
              className="config-item group relative rounded-xl overflow-hidden bg-black cursor-pointer" style={{ aspectRatio: '1/1' }}
              data-cursor="hover"
            >
              {config.type === 'video' ? (
                <video
                  src={config.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={config.image}
                  alt={config.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Config label */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="museo-label text-white/60 text-[10px] tracking-widest uppercase mb-1">
                  Configuration {i + 1}
                </p>
                <p className="museo-headline text-white text-lg">{config.title}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto mt-16 text-center relative z-10">
        <p className="museo-body text-white/40 mb-6">
          Mix and match modules to create your perfect workspace
        </p>
        <a
          href="#modules"
          className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white museo-label hover:bg-white hover:text-[#050505] transition-all"
          data-cursor="hover"
        >
          <Layers className="w-4 h-4" />
          View All Modules
        </a>
      </div>
    </section>
  );
};

export default Magnetic;
