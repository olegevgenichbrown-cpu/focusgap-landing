import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineConfig } from '../config';
import { Check, Clock, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!timelineConfig.headline) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const items = itemsRef.current;

    if (!section || !line || !items) return;

    // Header reveal
    gsap.set('.timeline-header', { opacity: 0, y: 40 });
    const headerTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.timeline-header', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(headerTrigger);

    // Progress line animation
    const lineTrigger = ScrollTrigger.create({
      trigger: items,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(line, { transform: `scaleY(${self.progress})` });
      },
    });
    triggersRef.current.push(lineTrigger);

    // Timeline items reveal
    const timelineItems = items.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
          });
          setActiveIndex(i);
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'current':
        return <Clock className="w-4 h-4 animate-pulse" />;
      case 'upcoming':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Check className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-32 px-8 lg:px-16 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="timeline-header text-center mb-20">
          <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-white/50 text-xs tracking-widest uppercase mb-6">
            {timelineConfig.label}
          </span>
          <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            {timelineConfig.headline}
          </h2>
          <p className="museo-body text-white/50 text-lg max-w-2xl mx-auto">
            {timelineConfig.description}
          </p>
        </div>

        {/* Timeline */}
        <div ref={itemsRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-white via-white/50 to-transparent origin-top"
              style={{ height: '100%', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-16">
            {timelineConfig.milestones.map((milestone, i) => (
              <div
                key={i}
                className={`timeline-item relative flex items-start gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-20 md:ml-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-4 ${
                    milestone.status === 'completed' ? 'bg-white/10 text-white/70' :
                    milestone.status === 'current' ? 'bg-white/20 text-white' :
                    'bg-white/5 text-white/40'
                  }`}>
                    {getStatusIcon(milestone.status)}
                    {milestone.status}
                  </div>
                  
                  <h3 className="museo-headline text-white text-2xl mb-2">{milestone.title}</h3>
                  <p className="museo-label text-white/40 text-sm mb-3">{milestone.date}</p>
                  <p className="museo-body text-white/50">{milestone.description}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2">
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    activeIndex >= i 
                      ? 'bg-white border-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                      : 'bg-[#0a0a0a] border-white/30'
                  }`} />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#050505] museo-label hover:bg-white/90 transition-all"
            data-cursor="hover"
          >
            <Rocket className="w-4 h-4" />
            Be Part of the Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
