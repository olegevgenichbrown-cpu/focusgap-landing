import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const modules = [
  { id: 0, name: 'Base Station', desc: 'Magnetic foundation with USB-C hub' },
  { id: 1, name: 'CO₂ Sensor', desc: 'Air quality monitoring' },
  { id: 2, name: 'Wireless Charger', desc: '15W fast charging pad' },
  { id: 3, name: 'Cable Manager', desc: 'Hidden wire routing' },
  { id: 4, name: 'Headstand', desc: 'Premium aluminum holder' },
  { id: 5, name: 'Phone Dock', desc: 'Adjustable viewing angle' },
  { id: 6, name: 'Tablet Stand', desc: 'Universal mount system' },
  { id: 7, name: 'Pen Holder', desc: 'Magnetic tool storage' },
  { id: 8, name: 'Light Bar', desc: 'Adjustable LED lighting' },
];

const ModuleCard = ({ module }: { module: typeof modules[0]; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Lazy load video only when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Load video source only when visible
          if (video.dataset.src && !video.src) {
            video.src = video.dataset.src;
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="module-card group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:bg-white/[0.04] card-hover">
      <div className="aspect-square relative overflow-hidden img-zoom">
        <video
          ref={videoRef}
          data-src={`/videos/module-${module.id}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'
          }`}
        />
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="museo-headline text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">
          {module.name}
        </h3>
        <p className="text-white/40 text-sm">{module.desc}</p>
      </div>
    </div>
  );
};

const Modules = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.module-card');
    gsap.set(cards, { opacity: 0, y: 40 });

    cards.forEach((card, i) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
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
      id="modules"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-32 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-white/50 text-xs tracking-widest uppercase">9 Modules</span>
          </div>
          <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            Build your perfect setup
          </h2>
          <p className="museo-body text-white/40 text-lg max-w-2xl mx-auto">
            Mix and match. Snap together. Reconfigure anytime. Each module connects magnetically in seconds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {modules.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/30 text-sm mb-4">Starting at $49 per module</p>
          <div className="inline-flex items-center gap-2 text-white/50 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            All modules in stock — ships within 48h
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modules;
