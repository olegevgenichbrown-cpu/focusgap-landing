import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const lineTop = lineTopRef.current;
    const lineBottom = lineBottomRef.current;
    const progressBar = progressRef.current;

    if (!container || !logo || !lineTop || !lineBottom || !progressBar) return;

    const tl = gsap.timeline();

    // Initial states
    gsap.set(lineTop, { scaleX: 0 });
    gsap.set(lineBottom, { scaleX: 0 });
    gsap.set(logo, { opacity: 0, y: 30 });
    gsap.set(progressBar, { scaleX: 0 });

    // Animation sequence
    tl.to(lineTop, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' })
      .to(lineBottom, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.6')
      .to(logo, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

    // Progress bar animation
    gsap.to(progressBar, {
      scaleX: 1,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: () => {
        // Exit animation
        gsap.to(container, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Background Video */}
      <video
        src="/videos/prehero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      
      {/* Top line */}
      <div
        ref={lineTopRef}
        className="absolute top-0 left-0 w-full h-px bg-white/20 origin-left"
      />

      {/* Logo */}
      <div ref={logoRef} className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          <span className="museo-headline text-white text-6xl md:text-8xl tracking-tight">FOCUS</span>
          <span className="museo-headline text-white/30 text-6xl md:text-8xl">/</span>
          <span className="museo-headline text-white text-6xl md:text-8xl tracking-tight">GAP</span>
        </div>
        <p className="museo-label text-white/40 text-xs tracking-[0.4em] uppercase mt-6">
          Modular Desk System
        </p>
      </div>

      {/* Progress */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48">
        <div className="h-px bg-white/10 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white origin-left"
          />
        </div>
        <p className="museo-label text-white/30 text-xs text-center mt-4 tracking-widest">
          {progress}%
        </p>
      </div>

      {/* Bottom line */}
      <div
        ref={lineBottomRef}
        className="absolute bottom-0 left-0 w-full h-px bg-white/20 origin-left"
      />
    </div>
  );
};

export default Preloader;
