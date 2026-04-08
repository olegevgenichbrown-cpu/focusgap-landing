import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import VideoModal from '../components/VideoModal';

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

interface PainPoint {
  number: string;
  label: string;
}

const painPoints: PainPoint[] = [
  { number: '10', label: 'minutes to clear space' },
  { number: '23', label: 'minutes to refocus' },
  { number: '416', label: 'hours lost per year' },
];

const AnimatedNumber = ({ value, inView }: { value: string; inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;

    const numericValue = parseInt(value);
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: numericValue,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => setDisplayValue(Math.round(obj.val).toString()),
    });
  }, [inView, value]);

  return <span ref={numRef}>{displayValue}</span>;
};

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useVideoAutoplay(videoRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Main trigger for numbers
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => setInView(true),
    });
    triggersRef.current.push(trigger);

    // Animate pain points
    const items = section.querySelectorAll('.pain-item');
    gsap.set(items, { opacity: 0, y: 60, scale: 0.95 });

    items.forEach((item, i) => {
      const animTrigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(animTrigger);
    });

    // Animate hook text
    const hook = section.querySelector('.hook-text');
    if (hook) {
      gsap.set(hook, { opacity: 0, y: 40 });
      const hookTrigger = ScrollTrigger.create({
        trigger: hook,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(hook, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(hookTrigger);
    }

    // Animate solution label
    const label = section.querySelector('.solution-label');
    if (label) {
      gsap.set(label, { opacity: 0, y: 20 });
      const labelTrigger = ScrollTrigger.create({
        trigger: label,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(label, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(labelTrigger);
    }

    // Animate video
    const video = section.querySelector('.video-container');
    if (video) {
      gsap.set(video, { opacity: 0, y: 60, scale: 0.98 });
      const videoTrigger = ScrollTrigger.create({
        trigger: video,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(video, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(videoTrigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden"
    >
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(239,68,68,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="pain-item text-center md:text-left"
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-3 tracking-tighter">
                <AnimatedNumber value={point.number} inView={inView} />
              </div>
              <div className="text-white/40 text-lg md:text-xl museo-body tracking-wide">
                {point.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hook */}
        <div className="hook-text text-center mb-20">
          <div className="inline-block">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your desk costs more than{' '}
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                your rent
              </span>
            </h2>
          </div>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto">
            Every distraction steals focus you never get back.
          </p>
        </div>

        {/* Solution Label */}
        <div className="solution-label text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white/70 text-sm tracking-widest uppercase museo-label">
              Introducing the solution
            </span>
          </div>
        </div>

        {/* Video */}
        <div className="video-container max-w-6xl mx-auto">
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="w-full aspect-[4/5] lg:aspect-video object-cover"
            >
              <source src="/videos/present.mov" />
            </video>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Video Modal */}
        <VideoModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoSrc="/videos/present.mov"
        />
      </div>
    </section>
  );
};

export default Problem;
