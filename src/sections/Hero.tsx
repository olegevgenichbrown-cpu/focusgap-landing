import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { Volume2, VolumeX, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const nav = navRef.current;

    if (!section || !content || !nav) return;

    // Set initial states
    gsap.set(content.querySelectorAll('.hero-text'), { opacity: 0, y: 40 });
    gsap.set(nav, { opacity: 0, y: -20 });
    gsap.set('.scroll-indicator', { opacity: 0, y: 20 });

    // Entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 4.5,
    });

    tl.to(nav, { opacity: 1, y: 0, duration: 0.8 })
      .to(content.querySelectorAll('.hero-text'), { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.6 }, '-=0.6');

    // Scroll parallax - content fades and moves up
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(content, { 
          y: p * 200,
          opacity: 1 - p * 0.9 
        });
      },
    });
    triggersRef.current.push(scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      tl.kill();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#020202]"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Video/Image Background with parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroConfig.heroImage}
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full z-50 px-8 lg:px-16 py-6 flex items-center justify-between will-change-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
            <span className="text-white text-xs font-bold">FG</span>
          </div>
          <div className="museo-label text-white/90 tracking-widest text-sm">
            {heroConfig.brandLeft}<span className="text-white/40">/</span>{heroConfig.brandRight}
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 px-6 py-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
          {heroConfig.navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="museo-label text-white/60 hover:text-white transition-colors text-xs tracking-wider"
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Video Controls */}
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
          data-cursor="hover"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </nav>

      {/* Desktop Content - centered */}
      <div
        ref={contentRef}
        className="hidden sm:flex relative flex-col items-center justify-center h-full px-6 text-center"
        style={{
          transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* Badge */}
        <div className="hero-text mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {heroConfig.badge}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-text museo-headline text-white text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight mb-8">
          <span className="inline-block">{heroConfig.brandLeft}</span>
          <span className="inline-block text-white/30 mx-2 md:mx-4">/</span>
          <span className="inline-block">{heroConfig.brandRight}</span>
        </h1>

        {/* Tagline */}
        <p className="hero-text museo-body text-white/50 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed tracking-wide">
          {heroConfig.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="hero-text flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#waitlist"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#050505] museo-label overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            data-cursor="hover"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative flex items-center gap-3">
              <Play className="w-4 h-4" />
              Join Waitlist
            </span>
          </a>
          <a
            href="#modules"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white museo-label hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
            data-cursor="hover"
          >
            Explore Modules
          </a>
        </div>

        {/* Social Links */}
        <div className="hero-text absolute bottom-24 left-8 lg:left-16 flex items-center gap-6">
          {heroConfig.socialLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="museo-label text-white/30 hover:text-white transition-colors text-[10px] tracking-wider"
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Year */}
        <div className="hero-text absolute bottom-24 right-8 lg:right-16">
          <p className="museo-label text-white/30 text-[10px] tracking-widest">{heroConfig.since}</p>
        </div>
      </div>

      {/* Mobile Content - stretched vertically */}
      <div
        className="flex sm:hidden relative flex-col h-full px-6 text-center pt-24 pb-4"
        style={{
          transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* Badge at top */}
        <div className="hero-text">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 text-[10px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {heroConfig.badge}
          </span>
        </div>

        {/* Main content - centered with flex-1 */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="hero-text museo-headline text-white text-[12vw] leading-[0.85] tracking-tight mb-4">
            <span className="inline-block">{heroConfig.brandLeft}</span>
            <span className="inline-block text-white/30 mx-2">/</span>
            <span className="inline-block">{heroConfig.brandRight}</span>
          </h1>
          <p className="hero-text museo-body text-white/50 text-base max-w-xl leading-relaxed tracking-wide px-4">
            {heroConfig.tagline}
          </p>
        </div>

        {/* Buttons at bottom */}
        <div className="hero-text flex flex-row items-center justify-center gap-3 relative -top-24">
          <a
            href="#waitlist"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-[#050505] museo-label text-xs overflow-hidden transition-all"
            data-cursor="hover"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative flex items-center gap-2">
              <Play className="w-3 h-3" />
              Join Waitlist
            </span>
          </a>
          <a
            href="#modules"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white museo-label text-xs hover:bg-white/10 transition-all"
            data-cursor="hover"
          >
            Explore
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="museo-label text-white/30 text-[10px] tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
