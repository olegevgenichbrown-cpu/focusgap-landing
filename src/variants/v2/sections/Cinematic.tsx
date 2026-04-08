import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clapperboard, Sparkles, Focus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Cinematic = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    // Parallax image
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(image, { y: self.progress * 100 - 50 });
      },
    });
    triggersRef.current.push(imageTrigger);

    // Text reveal
    const textElements = text.querySelectorAll('.reveal-text');
    textElements.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 60 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
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
      id="cinematic"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#020202] overflow-hidden"
    >
      {/* Cinematic bars (letterbox) */}
      <div className="absolute top-0 left-0 right-0 h-[8vh] bg-black z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black z-30 pointer-events-none" />

      {/* Film grain overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none film-grain opacity-40" />

      {/* Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none vignette" />

      {/* Background video with parallax */}
      <div
        ref={imageRef}
        className="absolute inset-[-100px] z-0 will-change-transform"
      >
        <video
          src="/videos/hero2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Lens flare effects */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-[60px] z-5 animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-[40px] z-5" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8 py-[15vh]"
      >
        {/* Movie-style badge */}
        <div className="reveal-text mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/30 rounded-full bg-black/50 backdrop-blur-sm">
            <Clapperboard className="w-4 h-4 text-white/70" />
            <span className="museo-label text-white/70 text-xs tracking-[0.3em] uppercase">
              The Experience
            </span>
          </div>
        </div>

        {/* Main title - Movie poster style */}
        <h2 className="reveal-text museo-headline text-white text-5xl md:text-7xl lg:text-8xl text-center leading-[0.9] tracking-tight mb-6">
          <span className="block">THE</span>
          <span className="block text-white/90">DESK</span>
        </h2>

        {/* Tagline */}
        <p className="reveal-text museo-body text-white/50 text-lg md:text-xl tracking-[0.2em] uppercase mb-12">
          Organize. Create. Conquer.
        </p>

        {/* Feature highlights - Movie credits style */}
        <div className="reveal-text grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-4xl">
          <div className="text-center">
            <Focus className="w-8 h-8 text-white/40 mx-auto mb-4" strokeWidth={1} />
            <p className="museo-label text-white/30 text-xs tracking-widest uppercase mb-2">Precision</p>
            <p className="museo-headline text-white text-lg">0.01mm</p>
          </div>
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-white/40 mx-auto mb-4" strokeWidth={1} />
            <p className="museo-label text-white/30 text-xs tracking-widest uppercase mb-2">Materials</p>
            <p className="museo-headline text-white text-lg">Aircraft Al</p>
          </div>
          <div className="text-center">
            <Clapperboard className="w-8 h-8 text-white/40 mx-auto mb-4" strokeWidth={1} />
            <p className="museo-label text-white/30 text-xs tracking-widest uppercase mb-2">Crafted</p>
            <p className="museo-headline text-white text-lg">Germany</p>
          </div>
        </div>

        {/* Scroll indicator - Movie style */}
        <div className="reveal-text absolute bottom-[12vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span className="museo-label text-white/30 text-[10px] tracking-[0.3em]">SCROLL</span>
        </div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 z-25 pointer-events-none scanlines opacity-10" />
    </section>
  );
};

export default Cinematic;
