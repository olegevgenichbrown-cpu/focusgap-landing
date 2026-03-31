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
import Problem from './sections/Problem';
import Features from './sections/Features';
import CTAMid from './sections/CTAMid';
import FounderStory from './sections/FounderStory';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLenis();
  useCustomCursor();

  useEffect(() => {
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
  }, []);

  useEffect(() => {
    const sections = [
      { selector: '#hero-section', color: '#020202' },
      { selector: '#problem', color: '#050505' },
      { selector: '#features', color: '#050505' },
      { selector: '#cta-mid', color: '#050505' },
      { selector: '#founder', color: '#050505' },
      { selector: '#final-cta', color: '#0a0a0a' },
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
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div ref={mainRef} className="relative" style={{ opacity: isLoading ? 0 : 1 }}>
        <div id="hero-section">
          <Hero />
        </div>

        <Problem />
        <Features />
        <CTAMid />
        <FounderStory />
        <FinalCTA />

        <div id="footer-section">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
