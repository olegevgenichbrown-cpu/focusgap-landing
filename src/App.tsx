import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Config
import { siteConfig } from './config';

// Hooks
import useLenis from './hooks/useLenis';
import useCustomCursor from './hooks/useCustomCursor';

// Components
import Preloader from './components/Preloader';

// Critical Sections (load immediately)
import Hero from './sections/Hero';
import Cinematic from './sections/Cinematic';

// Lazy load non-critical sections
const About = lazy(() => import('./sections/About'));
const Manufacturing = lazy(() => import('./sections/Manufacturing'));
const Magnetic = lazy(() => import('./sections/Magnetic'));
const Specs = lazy(() => import('./sections/Specs'));
const Collections = lazy(() => import('./sections/Collections'));
const Timeline = lazy(() => import('./sections/Timeline'));
const Pricing = lazy(() => import('./sections/Pricing'));
const FAQ = lazy(() => import('./sections/FAQ'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Visit = lazy(() => import('./sections/Visit'));
const Footer = lazy(() => import('./sections/Footer')); 

// Simple loading placeholder
const SectionLoader = () => <div className="min-h-[50vh] bg-[#050505]" />;

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scroll
  useLenis();

  // Initialize custom cursor
  useCustomCursor();

  // Set document language
  useEffect(() => {
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
  }, []);

  useEffect(() => {
    // Background color transitions based on sections
    const sections = [
      { selector: '#hero-section', color: '#020202' },
      { selector: '#cinematic', color: '#020202' },
      { selector: '#mission', color: '#050505' },
      { selector: '#manufacturing', color: '#0a0a0a' },
      { selector: '#magnetic', color: '#050505' },
      { selector: '#specs', color: '#050505' },
      { selector: '#modules', color: '#f0f0f0' },
      { selector: '#timeline', color: '#0a0a0a' },
      { selector: '#pricing', color: '#0a0a0a' },
      { selector: '#faq', color: '#050505' },
      { selector: '#team', color: '#8c8c91' },
      { selector: '#waitlist', color: '#050505' },
      { selector: '#footer-section', color: '#050505' },
    ];

    sections.forEach(({ selector, color }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: color,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: color,
            duration: 0.6,
            ease: 'power2.out',
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

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Animate main content entrance
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  };

  return (
    <>


      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div ref={mainRef} className="relative" style={{ opacity: isLoading ? 0 : 1 }}>
        {/* Hero Section - Full Screen Video */}
        <div id="hero-section">
          <Hero />
        </div>

        {/* Cinematic Experience Section */}
        <Cinematic />

        {/* About/Mission Section */}
        <Suspense fallback={<SectionLoader />}><About /></Suspense>

        {/* Manufacturing Section with GIFs */}
        <Suspense fallback={<SectionLoader />}><Manufacturing /></Suspense>

        {/* Magnetic Connection Section with GIFs */}
        <Suspense fallback={<SectionLoader />}><Magnetic /></Suspense>

        {/* Tech Specs Section */}
        <Suspense fallback={<SectionLoader />}><Specs /></Suspense>

        {/* Product Modules Section */}
        <Suspense fallback={<SectionLoader />}><Collections /></Suspense>

        {/* Timeline/Roadmap Section */}
        <Suspense fallback={<SectionLoader />}><Timeline /></Suspense>

        {/* Pricing Section */}
        <Suspense fallback={<SectionLoader />}><Pricing /></Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<SectionLoader />}><FAQ /></Suspense>

        {/* Team/Testimonials Section */}
        <div id="team-section">
          <Suspense fallback={<SectionLoader />}><Testimonials /></Suspense>
        </div>

        {/* Waitlist/Visit Section */}
        <Suspense fallback={<SectionLoader />}><Visit /></Suspense>

        {/* Footer */}
        <div id="footer-section">
          <Suspense fallback={<SectionLoader />}><Footer /></Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
