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
    const vis = () => { if (document.hidden) flush(); };
    window.addEventListener('visibilitychange', vis); window.addEventListener('pagehide', flush); obs.observe(el);
    return () => { flush(); obs.disconnect(); window.removeEventListener('visibilitychange', vis); window.removeEventListener('pagehide', flush); };
  }, [name]);
  return ref;
}

function useAutoplay(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => { const v = ref.current; if (!v) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { threshold: 0.2 }); o.observe(v); return () => o.disconnect(); }, [ref]);
}

function Nav({ onCTA }: { onCTA: () => void }) {
  return (
    <nav className="nav">
      <span className="nav-logo">FOCUSGAP</span>
      <ul className="nav-links">
        {['Mission', 'Specs', 'Modules', 'Pricing', 'FAQ'].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} className="nav-link">{l}</a></li>
        ))}
      </ul>
      <button className="nav-cta-btn" onClick={onCTA}>Join VIP List</button>
    </nav>
  );
}

function Hero({ onCTA }: { onCTA: () => void }) {
  const ref = useSectionTracker<HTMLElement>('Hero');
  const vRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { vRef.current?.play().catch(() => {}); }, []);
  return (
    <section ref={ref} className="hero" id="hero">
      <div className="hero-media"><video ref={vRef} autoPlay muted loop playsInline poster="/images/hero-premium.jpg"><source src="/videos/hero2.mp4" type="video/mp4" /></video></div>
      <div className="hero-content">
        <div className="hero-badge">⚡ Coming to Kickstarter</div>
        <h1 className="display hero-title">Where focus<br /><em>happens.</em></h1>
        <div className="hero-bottom">
          <p className="hero-desc">The modular desk system crafted from aircraft-grade aluminum and sustainable walnut. Designed for deep work, not decoration.</p>
          <button className="hero-cta" onClick={onCTA}>Get Early Access — 15% Off →</button>
        </div>
      </div>
      <div className="hero-scroll">Scroll<div className="scroll-line" /></div>
    </section>
  );
}

function Cinematic() {
  const ref = useSectionTracker<HTMLElement>('Cinematic');
  const vRef = useRef<HTMLVideoElement>(null);
  useAutoplay(vRef);
  return (
    <section ref={ref} className="cinematic" id="cinematic">
      <video ref={vRef} muted loop playsInline><source src="/videos/present.mov" type="video/mp4" /></video>
    </section>
  );
}

function About() {
  const ref = useSectionTracker<HTMLElement>('About');
  const vids = ['/videos/component1.mp4', '/videos/component2.mp4', '/videos/component3.mp4', '/videos/component4.mp4'];
  return (
    <section ref={ref} className="section" id="mission">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-text">
            <span className="label">Our Mission</span>
            <h2 className="h1">Crafting Focus,<br />One Module at a Time</h2>
            <p className="body-lg">Every element is engineered to eliminate friction — from the magnetic connections to the integrated CO₂ sensor.</p>
          </div>
          <div className="about-gallery">{vids.map((s, i) => <GalleryVid key={i} src={s} />)}</div>
        </div>
        <div className="stats-row">
          {[{ val: '12+', lbl: 'Modular Components' }, { val: '6061', lbl: 'Aircraft Aluminum' }, { val: '100%', lbl: 'Sustainable Walnut' }, { val: '±50ppm', lbl: 'CO₂ Monitoring' }].map((s, i) => (
            <div key={i} className="stat-item"><div className="number-display stat-val">{s.val}</div><div className="stat-label">{s.lbl}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryVid({ src }: { src: string }) {
  const r = useRef<HTMLVideoElement>(null); useAutoplay(r);
  return <div className="about-gallery-item"><video ref={r} muted loop playsInline><source src={src} type="video/mp4" /></video></div>;
}

function Manufacturing() {
  const ref = useSectionTracker<HTMLElement>('Manufacturing');
  const procs = [
    { title: 'CNC Machining', desc: 'Aircraft-grade aluminum.', media: '/images/block1.jpg', type: 'image' as const },
    { title: 'Magnetic Assembly', desc: 'N52 magnets.', media: '/videos/block2.mp4', type: 'video' as const },
    { title: 'Quality Control', desc: 'Rigorous inspection.', media: '/images/manufacturing-qc.jpg', type: 'image' as const },
  ];
  return (
    <section ref={ref} className="section" id="manufacturing" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">
        <div className="mfg-header"><span className="label">Craftsmanship</span><h2 className="h1">Precision Detail</h2></div>
        <div className="mfg-grid">
          {procs.map((p, i) => (
            <div key={i} className="mfg-card">
              <div className="mfg-card-media">{p.type === 'video' ? <MfgVid src={p.media} /> : <img src={p.media} alt={p.title} />}</div>
              <div className="mfg-card-body"><h3 className="h3">{p.title}</h3><p className="caption">{p.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MfgVid({ src }: { src: string }) {
  const r = useRef<HTMLVideoElement>(null); useAutoplay(r);
  return <video ref={r} muted loop playsInline><source src={src} type="video/mp4" /></video>;
}

function Magnetic() {
  const ref = useSectionTracker<HTMLElement>('Magnetic');
  const vRef = useRef<HTMLVideoElement>(null); useAutoplay(vRef);
  const cfgs = ['/videos/configuration1.mp4', '/videos/configuration2.mp4', '/videos/configuration3.mp4', '/videos/configuration4.mp4', '/videos/configuration5.mp4', '/videos/configuration6.mp4'];
  return (
    <section ref={ref} className="section" id="magnetic">
      <div className="wrap">
        <div className="magnetic-layout">
          <div className="magnetic-video"><video ref={vRef} muted loop playsInline><source src="/videos/click.mp4" type="video/mp4" /></video></div>
          <div><span className="label">Magnetic System</span><h2 className="h1">Connections That Click</h2></div>
        </div>
        <div className="configs-grid">{cfgs.map((s, i) => <ConfigVid key={i} src={s} />)}</div>
      </div>
    </section>
  );
}

function ConfigVid({ src }: { src: string }) {
  const r = useRef<HTMLVideoElement>(null); useAutoplay(r);
  return <div className="config-item"><video ref={r} muted loop playsInline><source src={src} type="video/mp4" /></video></div>;
}

function Specs() {
  const ref = useSectionTracker<HTMLElement>('Specs');
  const specs = [{ lbl: 'Dimensions', val: '240 × 120 × 45 mm' }, { lbl: 'Weight', val: '1.2 kg' }, { lbl: 'Power', val: 'USB-C' }, { lbl: 'Connectivity', val: 'Bluetooth 5.2' }, { lbl: 'CO₂ Sensor', val: 'NDIR' }, { lbl: 'Materials', val: 'Aluminum + Walnut' }];
  return (
    <section ref={ref} className="section specs-section" id="specs">
      <div className="wrap">
        <div className="specs-layout">
          <div className="specs-img"><img src="/images/picture.jpg" alt="FocusGap detail" /></div>
          <div><span className="label" style={{ color: 'var(--accent)' }}>Technical Specs</span><h2 className="h1" style={{ color: '#fff' }}>Engineered to Perfection</h2>
            <div className="spec-list" style={{ marginTop: 40 }}>{specs.map((s, i) => (<div key={i} className="spec-row"><span className="spec-row-label">{s.lbl}</span><span className="spec-row-val">{s.val}</span></div>))}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  const ref = useSectionTracker<HTMLElement>('Modules');
  const items = [{ title: 'Air Monitor Hub', badge: 'Core', img: '/images/image(4).jpg' }, { title: 'Wireless Base', badge: 'Power', img: '/images/image(5).jpg' }, { title: 'Headphone Stand', badge: 'Accessory', img: '/images/image(3).jpg' }, { title: 'Laptop Dock', badge: 'Space', img: '/images/image(10).jpg' }];
  return (
    <section ref={ref} className="section modules-section" id="modules">
      <div className="wrap">
        <span className="label">The System</span><h2 className="h1">Modules That Work Together</h2>
        <div className="modules-grid">{items.map((m, i) => (
          <div key={i} className="module-card">
            <div className="module-card-img"><img src={m.img} alt={m.title} /></div>
            <div className="module-card-body"><span className="module-badge">{m.badge}</span><h3 className="h3">{m.title}</h3></div>
          </div>
        ))}</div>
      </div>
    </section>
  );
}

function Pricing({ onCTA }: { onCTA: () => void }) {
  const ref = useSectionTracker<HTMLElement>('Pricing');
  const tiers = [{ name: 'Starter', price: 149, popular: false }, { name: 'Professional', price: 299, popular: true }, { name: 'Ultimate', price: 499, popular: false }];
  return (
    <section ref={ref} className="section" id="pricing">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <span className="label">Early Access</span><h2 className="h1">Choose Your Setup</h2>
        <div className="pricing-grid">{tiers.map((t, i) => (
          <div key={i} className={`price-card ${t.popular ? 'price-card--popular' : ''}`} style={{ textAlign: 'left' }}>
            {t.popular && <div className="pop-badge">Most Popular</div>}
            <span className="label">{t.name}</span><div className="price-val">${t.price}</div>
            <button className="price-cta" onClick={onCTA}>Get Early Access</button>
          </div>
        ))}</div>
      </div>
    </section>
  );
}

function FAQ() {
  const ref = useSectionTracker<HTMLElement>('FAQ');
  const [open, setOpen] = useState<number | null>(null);
  const items = [{ q: 'When will FocusGap be available?', a: 'Launching on Kickstarter in Q2 2025.' }, { q: 'How does the magnetic system work?', a: 'N52-grade neodymium magnets.' }];
  return (
    <section ref={ref} className="section" id="faq">
      <div className="wrap">
        <span className="label">FAQ</span><h2 className="h1" style={{ textAlign: 'center' }}>Questions? Answered.</h2>
        <div className="faq-list">{items.map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{f.q}<span className={`faq-arrow ${open === i ? 'open' : ''}`}>▾</span></button>
            <div className={`faq-a ${open === i ? 'open' : ''}`}>{f.a}</div>
          </div>
        ))}</div>
      </div>
    </section>
  );
}

function FinalCTA({ onSubmit }: { onSubmit: (email: string) => void }) {
  const ref = useSectionTracker<HTMLElement>('FinalCTA');
  const [email, setEmail] = useState('');
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) { posthog.capture('email_submitted', { email }); posthog.identify(email); onSubmit(email); } };
  return (
    <section ref={ref} className="section final-cta" id="waitlist">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2 className="h1">Be the First to Experience<br />FocusGap</h2>
        <form className="email-row" style={{ maxWidth: 400, margin: '40px auto 0', display: 'flex', gap: 10 }} onSubmit={submit}>
          <input type="email" required className="email-input" style={{ flex: 1, padding: 15, borderRadius: 12, border: '1px solid #ccc' }} value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
          <button type="submit" className="submit-btn" style={{ padding: '0 25px', background: '#000', color: '#fff', borderRadius: 12 }}>Join VIP</button>
        </form>
      </div>
    </section>
  );
}

export default function VariantV4() {
  const [done, setDone] = useState(false);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  if (done) return <div className="v4-root" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎉 Registered</div>;
  return (
    <div className="v4-root">
      <Nav onCTA={() => scrollTo('waitlist')} />
      <Hero onCTA={() => scrollTo('waitlist')} />
      <Cinematic />
      <About />
      <Manufacturing />
      <Magnetic />
      <Specs />
      <Modules />
      <Pricing onCTA={() => scrollTo('waitlist')} />
      <FAQ />
      <FinalCTA onSubmit={() => setDone(true)} />
    </div>
  );
}
