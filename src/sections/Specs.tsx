import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { specsConfig } from '../config';
import { Ruler, Weight, Battery, Wifi, Wind, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Ruler,
  Weight,
  Battery,
  Wifi,
  Wind,
  Layers,
};

const Specs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [hoveredSpec, setHoveredSpec] = useState<number | null>(null);

  if (!specsConfig.headline) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const specs = specsRef.current;

    if (!section || !image || !specs) return;

    // Image parallax reveal
    gsap.set(image, { opacity: 0, x: -80 });
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(image, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(imageTrigger);

    // Specs stagger reveal
    const specItems = specs.querySelectorAll('.spec-item');
    specItems.forEach((item, i) => {
      gsap.set(item, { opacity: 0, x: 60 });
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.8,
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

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16 overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[200px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-white/50 text-xs tracking-widest uppercase mb-6">
            {specsConfig.label}
          </span>
          <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            {specsConfig.headline}
          </h2>
          <p className="museo-body text-white/50 text-lg max-w-2xl mx-auto">
            {specsConfig.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
              <img
                src={specsConfig.image}
                alt="Product exploded view"
                className="w-full h-full object-cover"
              />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 px-6 py-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <p className="museo-headline text-white text-2xl">12+</p>
              <p className="museo-label text-white/50 text-xs">Modular Parts</p>
            </div>
          </div>

          {/* Specs Grid */}
          <div ref={specsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specsConfig.specs.map((spec, i) => {
              const IconComponent = iconMap[spec.icon];
              return (
                <div
                  key={i}
                  className="spec-item group relative p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 cursor-pointer"
                  onMouseEnter={() => setHoveredSpec(i)}
                  onMouseLeave={() => setHoveredSpec(null)}
                  data-cursor="hover"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-500 mb-4">
                      {IconComponent && <IconComponent className="w-5 h-5" strokeWidth={1.5} />}
                    </div>
                    
                    <p className="museo-label text-white/40 text-xs tracking-wider uppercase mb-2">
                      {spec.label}
                    </p>
                    <p className="museo-headline text-white text-xl group-hover:text-white transition-colors">
                      {spec.value}
                    </p>
                    
                    {/* Animated underline */}
                    <div className={`h-px bg-gradient-to-r from-white to-transparent mt-4 transition-all duration-500 ${hoveredSpec === i ? 'w-full' : 'w-0'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
