import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  '/videos/component1.mp4',
  '/videos/component2.mp4',
  '/videos/component3.mp4',
  '/videos/component4.mp4',
  '/videos/component5.mp4',
  '/videos/component6.mp4',
];

const VideoItem = ({ src, index }: { src: string; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="component-item rounded-xl overflow-hidden bg-white/5 border border-white/10"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full aspect-square block object-cover"
      >
        <source src={src} />
      </video>
    </div>
  );
};

const ComponentGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.component-item');
    gsap.set(items, { opacity: 0, y: 30 });

    items.forEach((item, i) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
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
      id="components"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-16 lg:py-24 px-4 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
          {videos.map((src, i) => (
            <VideoItem key={i} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentGrid;
