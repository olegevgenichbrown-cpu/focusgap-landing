import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wind, Check, ArrowRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useVideoAutoplay = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef]);
};

const MainProduct = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const componentVideoRef = useRef<HTMLVideoElement>(null);
  const actorVideoRef = useRef<HTMLVideoElement>(null);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const navigate = useNavigate();

  useVideoAutoplay(componentVideoRef);
  useVideoAutoplay(actorVideoRef);
  useVideoAutoplay(ctaVideoRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.main-product-item');
    gsap.set(items, { opacity: 0, y: 50 });

    items.forEach((item, i) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
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
      id="main-product"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="main-product-item text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Wind className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs tracking-widest uppercase">Flagship Module</span>
          </div>
          <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            The CO₂ Sensor Module
          </h2>
          <p className="museo-body text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            When CO₂ hits 1000ppm, your brain slows down 20%. 
            We alert you before you even notice.
          </p>
        </div>

        {/* Two Videos Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Component Detail Video */}
          <div className="main-product-item">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <video
                ref={componentVideoRef}
                muted
                loop
                playsInline
                className="w-full aspect-[4/5] lg:aspect-square object-cover"
              >
                <source src="/videos/co2-component.mp4" />
              </video>
            </div>
            <div className="mt-4 text-center">
              <h3 className="museo-headline text-white text-lg mb-1">Precision Engineering</h3>
              <p className="text-white/40 text-sm">N52 sensor • ±50ppm accuracy • 2s response time</p>
            </div>
          </div>

          {/* Actor / Usage Video */}
          <div className="main-product-item">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <video
                ref={actorVideoRef}
                muted
                loop
                playsInline
                className="w-full aspect-[4/5] lg:aspect-square object-cover"
              >
                <source src="/videos/co2-actor.mp4" />
              </video>
            </div>
            <div className="mt-4 text-center">
              <h3 className="museo-headline text-white text-lg mb-1">In Action</h3>
              <p className="text-white/40 text-sm">Real-time monitoring • Visual LED indicator • App sync</p>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="main-product-item mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '±50', label: 'ppm accuracy' },
            { value: '<2s', label: 'response time' },
            { value: '5yr', label: 'sensor life' },
            { value: 'App', label: 'integrated' },
          ].map((spec, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{spec.value}</div>
              <div className="text-white/40 text-sm">{spec.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Block with Video */}
        <div className="main-product-item mt-20">
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Video Left */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <video
                  ref={ctaVideoRef}
                  muted
                  loop
                  playsInline
                  className="w-full aspect-[4/5] lg:aspect-square object-cover"
                >
                  <source src="/videos/component0.mp4" />
                </video>
              </div>

              {/* Content Right */}
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Claim your early backer spot
                </h3>
                
                <div className="flex flex-col items-center lg:items-start gap-4 mb-8">
                  {[
                    '15% off retail price',
                    'First priority shipping',
                    'Free worldwide shipping',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-white/80 text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/vip')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all group mb-6"
                >
                  JOIN THE VIP LIST — GET 15% OFF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center lg:justify-start gap-2 text-white/40 text-sm">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  500 spots. 312 already claimed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProduct;
