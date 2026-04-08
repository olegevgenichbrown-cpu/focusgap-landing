import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import posthog from 'posthog-js';
import './App.css';

// Config
import { siteConfig } from './config';

// Hooks - disabled for performance
// import useLenis from './hooks/useLenis';
// import useCustomCursor from './hooks/useCustomCursor';

// Components
import Preloader from './components/Preloader';
import StickyNav from './components/StickyNav';
import CookieConsent from './components/CookieConsent';

// Sections
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import MainProduct from './sections/MainProduct';
import Features from './sections/Features';
import ComponentGrid from './sections/ComponentGrid';
import FounderStory from './sections/FounderStory';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

// Pages
import VIP from './pages/VIP';

gsap.registerPlugin(ScrollTrigger);

// Main Landing Page
const LandingPage = ({ onComplete }: { onComplete: () => void }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sections = [
      { selector: '#hero-section', color: '#020202' },
      { selector: '#problem', color: '#050505' },
      { selector: '#main-product', color: '#050505' },
      { selector: '#features', color: '#050505' },
      { selector: '#components', color: '#050505' },
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
        onEnter: () => { gsap.to('body', { backgroundColor: color, duration: 0.6, ease: 'power2.out' }); },
        onEnterBack: () => { gsap.to('body', { backgroundColor: color, duration: 0.6, ease: 'power2.out' }); },
      });
      triggersRef.current.push(trigger);
    });

    return () => { triggersRef.current.forEach((t) => t.kill()); triggersRef.current = []; };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    onComplete();
  };

  return (
    <div ref={mainRef} className="relative">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <StickyNav />
      <CookieConsent />
      <div style={{ opacity: isLoading ? 0 : 1 }}>
        <div id="hero-section"><Hero /></div>
        <Problem />
        <MainProduct />
        <Features />
        <ComponentGrid />
        <FounderStory />
        <FinalCTA />
        <div id="footer-section"><Footer /></div>
      </div>
    </div>
  );
};

export default function VariantV1() {
  const [page, setPage] = useState<'home' | 'vip'>(() => window.location.pathname === '/vip' ? 'vip' : 'home');

  useEffect(() => {
    if (siteConfig.language) document.documentElement.lang = siteConfig.language;
    if (siteConfig.title) document.title = siteConfig.title;
  }, []);

  if (page === 'vip') return <div className="v1-root"><VIP /><CookieConsent /></div>;

  return (
    <div className="v1-root">
      <LandingPage onComplete={() => {}} />
    </div>
  );
}
