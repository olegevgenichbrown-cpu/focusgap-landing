import { useEffect, useRef, useState } from 'react';
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

// Sections
import Hero from './sections/Hero';
import Cinematic from './sections/Cinematic';
import About from './sections/About';
import Manufacturing from './sections/Manufacturing';
import Magnetic from './sections/Magnetic';
import Specs from './sections/Specs';
import Collections from './sections/Collections';
import Timeline from './sections/Timeline';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Testimonials from './sections/Testimonials';
import Visit from './sections/Visit';
import Footer from './sections/Footer';

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
        <About />

        {/* Manufacturing Section with GIFs */}
        <Manufacturing />

        {/* Magnetic Connection Section with GIFs */}
        <Magnetic />

        {/* Tech Specs Section */}
        <Specs />

        {/* Product Modules Section */}
        <Collections />

        {/* Timeline/Roadmap Section */}
        <Timeline />

        {/* Pricing Section */}
        <Pricing />

        {/* FAQ Section */}
        <FAQ />

        {/* Team/Testimonials Section */}
        <div id="team-section">
          <Testimonials />
        </div>

        {/* Waitlist/Visit Section */}
        <Visit />

        {/* Footer */}
        <div id="footer-section">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
