import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import { founderConfig } from '../config';
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

const FounderStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useVideoAutoplay(videoRef);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const videoContainer = section.querySelector('.video-container');
    gsap.set(videoContainer, { opacity: 0, x: -60 });
    gsap.set(text.querySelectorAll('.reveal-text'), { opacity: 0, y: 40 });

    const videoTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(videoContainer, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(videoTrigger);

    const textEls = text.querySelectorAll('.reveal-text');
    textEls.forEach((el, i) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
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
    <>
      <section
      id="founder"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div 
            className="video-container lg:col-span-3 relative w-full rounded-3xl overflow-hidden bg-black border border-white/10 cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="w-full aspect-[4/5] lg:aspect-auto block object-cover"
            >
              <source src="/videos/trust2.mov" />
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

          <div ref={textRef} className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="reveal-text museo-headline text-white text-3xl md:text-4xl lg:text-5xl mb-8">
              {founderConfig.headline}
            </h2>
            <div className="reveal-text space-y-6 museo-body text-white/60 text-lg leading-relaxed mb-8">
              {founderConfig.story.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="reveal-text">
              <p className="museo-headline text-white text-lg">{founderConfig.authorName}</p>
              <p className="museo-label text-white/40 text-sm tracking-wider">{founderConfig.authorTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <VideoModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      videoSrc="/videos/trust2.mov"
    />
  </>
  );
};

export default FounderStory;
