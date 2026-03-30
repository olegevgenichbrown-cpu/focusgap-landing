import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Delay video start to prevent jank on first frames
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 300); // 300ms delay for smooth initial render

    // Exit timer
    const exitTimer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      
      container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      container.style.opacity = '0';
      container.style.transform = 'translateY(-30px)';
      
      setTimeout(onComplete, 600);
    }, 2800);

    return () => {
      clearTimeout(videoTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
      style={{ 
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Static background (instant) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]"
      />
      
      {/* Video loads after 300ms */}
      {showVideo && (
        <video
          src="/videos/prehero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
          style={{ 
            opacity: 0.3,
            transform: 'translateZ(0)',
            willChange: 'opacity'
          }}
        />
      )}
      
      {/* Content - always visible immediately */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="flex items-center gap-1 animate-fadeInUp">
          <span className="text-white text-6xl md:text-8xl font-semibold tracking-tight">
            FOCUS
          </span>
          <span className="text-white/30 text-6xl md:text-8xl">/</span>
          <span className="text-white text-6xl md:text-8xl font-semibold tracking-tight">
            GAP
          </span>
        </div>
        
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase mt-6 animate-fadeInDelay">
          Modular Desk System
        </p>
        
        {/* Progress bar */}
        <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden mx-auto rounded-full">
          <div className="h-full bg-white animate-progress" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes fadeInDelay {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fadeInDelay {
          animation: fadeInDelay 1s ease-out forwards;
        }
        .animate-progress {
          animation: progress 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: left;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
