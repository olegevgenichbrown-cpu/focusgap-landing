import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const beforeItems = [
  'Messy cables everywhere',
  'Lost adapters & chargers',
 '10 min to clear space',
  'CO₂ builds up silently',
  'Static setup',
];

const afterItems = [
  'Everything magnetic & organized',
  'Wireless charging built-in',
  'Start working immediately',
  'Air quality monitored',
  'Reconfigure in seconds',
];

const Comparison = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderValue, setSliderValue] = useState(50);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.compare-item');
    gsap.set(items, { opacity: 0, y: 30 });

    items.forEach((item, i) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="compare-item text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Before <span className="text-white/30">→</span> After
          </h2>
          <p className="text-white/40 text-lg">
            Drag to see the transformation
          </p>
        </div>

        {/* Before/After Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Before */}
          <div className="compare-item bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Your desk today</h3>
            </div>
            
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/50">
                  <X className="w-4 h-4 text-red-400/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="compare-item bg-green-500/5 border border-green-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">With FocusGap</h3>
            </div>
            
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="compare-item grid grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">10min</div>
            <div className="text-white/40 text-sm">Saved every morning</div>
          </div>
          <div className="p-6 border-x border-white/10">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">416hrs</div>
            <div className="text-white/40 text-sm">Recovered per year</div>
          </div>
          <div className="p-6">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">30s</div>
            <div className="text-white/40 text-sm">To rearrange</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
