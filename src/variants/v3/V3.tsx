import { useEffect, useRef, useState } from 'react';
import posthog from 'posthog-js';
import './styles.css';

function useSectionTracker<T extends HTMLElement>(name: string) {
  const ref = useRef<T>(null);
  const entry = useRef<number | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const flush = () => { if (entry.current) { const d = Math.min(Date.now() - entry.current, 600_000) / 1000; if (d > 0.5) posthog.capture('section_exited', { section_name: name, duration_seconds: +d.toFixed(1) }, { transport: 'sendBeacon' }); entry.current = null; } };
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !entry.current) { entry.current = Date.now(); posthog.capture('section_entered', { section_name: name }); } else if (!e.isIntersecting) flush(); }, { threshold: 0.15 });
    window.addEventListener('visibilitychange', () => { if (document.hidden) flush(); }); window.addEventListener('pagehide', flush); obs.observe(el);
    return () => { flush(); obs.disconnect(); };
  }, [name]);
  return ref;
}

function useAutoplay(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => { const v = ref.current; if (!v) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { threshold: 0.2 }); o.observe(v); return () => o.disconnect(); }, [ref]);
}

function Nav({ onCTA }: { onCTA: () => void }) {
  return (
    <nav className="nav">
      <div className="nav-logo"><div className="nav-dot" />FOCUS/GAP</div>
      <button className="nav-cta" onClick={onCTA}>Get 15% Off</button>
    </nav>
  );
}

function Hero({ onCTA }: { onCTA: () => void }) {
  const ref = useSectionTracker<HTMLElement>('Hero');
  const vRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { vRef.current?.play().catch(() => {}); }, []);
  return (
    <section ref={ref} className="hero" id="hero">
      <div className="hero-video-bg"><video ref={vRef} autoPlay muted loop playsInline poster="/images/hero-premium.jpg"><source src="/videos/hero2.mp4" type="video/mp4" /></video></div>
      <div className="hero-content container">
        <h1 className="display hero-title">Your desk<br /><span className="accent-word">fights you.</span></h1>
        <div className="hero-right">
          <p>The modular desk system that brings order to your workspace and clarity to your mind.</p>
          <button className="submit-btn" onClick={onCTA} style={{ padding: '14px 28px' }}>Join VIP · 15% Off →</button>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = ['±50ppm CO₂ accuracy', 'Aircraft-grade aluminum', 'N52 magnets', '5-year warranty', 'Modular by design', 'Ships globally', '500 early backer spots', '<2s sensor response', 'App integrated'];
  return (
    <div className="trust-bar">
      <div className="marquee-track">{[...items, ...items].map((item, i) => (<div key={i} className="marquee-item"><div className="marquee-dot" />{item}</div>))}</div>
    </div>
  );
}

function Problem() {
  const ref = useSectionTracker<HTMLElement>('Problem');
  const vRef = useRef<HTMLVideoElement>(null); useAutoplay(vRef);
  return (
    <section ref={ref} className="section problem-section" id="problem">
      <div className="container problem-grid">
        <div style={{ position: 'relative' }}>
          <div className="big-number">23</div>
          <div className="video-reveal" style={{ marginTop: 40 }}><video ref={vRef} muted loop playsInline><source src="/videos/mess.mov" type="video/mp4" /></video></div>
          <p className="label" style={{ marginTop: 20 }}>minutes to refocus after a distraction</p>
        </div>
        <div className="problem-text-col">
          <p className="label">The real cost of chaos</p>
          <h2 className="headline">Your environment is costing you 416 hours a year.</h2>
          {[{ lead: '10 minutes', rest: ' wasted every morning.' }, { lead: '23 minutes', rest: ' to regain focus.' }, { lead: 'CO₂ at 1000ppm', rest: ' degrades performance.' }].map((p, i) => (
            <div key={i} className="problem-pain"><strong>{p.lead}</strong>{p.rest}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumbersBar() {
  const ref = useSectionTracker<HTMLElement>('NumbersBar');
  return (
    <section ref={ref} className="numbers-bar">
      <div className="numbers-grid">
        {[{ val: '±50', unit: 'ppm', lbl: 'CO₂ sensor accuracy' }, { val: '2s', unit: '', lbl: 'sensor response time' }, { val: '5yr', unit: '', lbl: 'warranty included' }].map((n, i) => (
          <div key={i} className="number-item">
            <div className="number-val">{n.val}<span style={{ fontSize: '0.55em', opacity: 0.5 }}>{n.unit}</span></div>
            <div className="number-label">{n.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MainProduct({ onCTA }: { onCTA: () => void }) {
  const ref = useSectionTracker<HTMLElement>('MainProduct');
  const v1 = useRef<HTMLVideoElement>(null); const v2 = useRef<HTMLVideoElement>(null); useAutoplay(v1); useAutoplay(v2);
  return (
    <section ref={ref} className="section product-section" id="product">
      <div className="container">
        <div className="product-header">
          <div><p className="label">The flagship module</p><h2 className="headline">The CO₂ Sensor Module</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="subhead" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>When CO₂ exceeds 1000ppm, your brain operates in a fog. FocusGap alerts you before you even notice.</p>
            <button className="submit-btn" onClick={onCTA} style={{ alignSelf: 'flex-start' }}>Reserve Your Spot →</button>
          </div>
        </div>
        <div className="product-videos">
          <div className="product-video-item"><video ref={v1} muted loop playsInline><source src="/videos/co2-component.mp4" type="video/mp4" /></video><div className="video-label">Precision</div></div>
          <div className="product-video-item"><video ref={v2} muted loop playsInline><source src="/videos/co2-actor.mp4" type="video/mp4" /></video><div className="video-label">In action</div></div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const ref = useSectionTracker<HTMLElement>('Features');
  return (
    <section ref={ref} className="section features-section" id="features">
      <div className="container">
        <p className="label">Different by design</p><h2 className="headline" style={{ marginTop: 16, maxWidth: 600 }}>Built for deep work.</h2>
        <div className="features-grid">{[{ title: 'Modular', desc: 'Snap together with N52 magnets.' }, { title: 'Air Monitor', desc: 'Real-time CO₂ tracking.' }, { title: 'CNC Machined', desc: 'Aircraft-grade aluminum.' }].map((f, i) => (
          <div key={i} className="feature-card"><div className="feature-title">{f.title}</div><div className="feature-desc">{f.desc}</div></div>
        ))}</div>
      </div>
    </section>
  );
}

function ComponentGrid() {
  const ref = useSectionTracker<HTMLElement>('ComponentGrid');
  const vids = ['/videos/component1.mp4', '/videos/component2.mp4', '/videos/component3.mp4', '/videos/component4.mp4', '/videos/component5.mp4', '/videos/component6.mp4'];
  return (
    <section ref={ref} className="components-section">
      <div className="components-label"><p className="label">All Module System</p><h2 className="headline" style={{ marginTop: 8 }}>One ecosystem.</h2></div>
      <div className="components-scroll">{vids.map((s, i) => <CompVid key={i} src={s} />)}</div>
    </section>
  );
}

function CompVid({ src }: { src: string }) {
  const r = useRef<HTMLVideoElement>(null); useAutoplay(r);
  return <div className="comp-item"><video ref={r} muted loop playsInline><source src={src} type="video/mp4" /></video></div>;
}

function FinalCTA({ onSubmit }: { onSubmit: (email: string) => void }) {
  const ref = useSectionTracker<HTMLElement>('FinalCTA');
  const [email, setEmail] = useState('');
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) { posthog.capture('email_submitted', { email }); posthog.identify(email); onSubmit(email); } };
  return (
    <section ref={ref} className="cta-section" id="join">
      <div className="cta-inner"><h2 className="headline">Don't miss the launch.</h2>
        <form className="email-form" onSubmit={submit}><input type="email" required className="email-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" /><button type="submit" className="submit-btn" style={{ padding: '0 25px' }}>Join VIP →</button></form>
      </div>
    </section>
  );
}

export default function VariantV3() {
  const [done, setDone] = useState(false);
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  if (done) return <div className="v3-root" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎉 Registered</div>;
  return (
    <div className="v3-root">
      <Nav onCTA={() => scroll('join')} />
      <Hero onCTA={() => scroll('join')} /><TrustBar /><Problem /><NumbersBar /><MainProduct onCTA={() => scroll('join')} /><Features /><ComponentGrid />
      <FinalCTA onSubmit={() => setDone(true)} />
    </div>
  );
}
