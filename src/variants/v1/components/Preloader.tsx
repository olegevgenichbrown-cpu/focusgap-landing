import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 50);

    // Exit timer
    const exitTimer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      
      container.style.transition = 'all 0.8s cubic-bezier(0.7, 0, 0.3, 1)';
      container.style.opacity = '0';
      container.style.transform = 'scale(1.1)';
      
      setTimeout(onComplete, 800);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Logo with reveal animation */}
      <div className="relative z-10 text-center">
        {/* Logo mark */}
        <div className="relative mb-8">
          <div 
            className="w-20 h-20 mx-auto rounded-2xl bg-white flex items-center justify-center animate-scaleIn"
            style={{
              animation: 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <span className="text-black text-2xl font-bold">FG</span>
          </div>
          
          {/* Ring animation */}
          <div 
            className="absolute inset-0 -m-2 rounded-3xl border border-white/20 animate-spin"
            style={{
              animation: 'spin 3s linear infinite',
            }}
          />
        </div>
        
        {/* Brand name */}
        <div 
          className="overflow-hidden"
          style={{
            animation: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
            opacity: 0,
          }}
        >
          <h1 className="text-white text-3xl font-medium tracking-tight">
            FOCUS<span className="text-white/30">/</span>GAP
          </h1>
        </div>
        
        {/* Tagline */}
        <p 
          className="text-white/40 text-sm tracking-widest uppercase mt-3"
          style={{
            animation: 'fadeIn 0.6s ease 0.6s forwards',
            opacity: 0,
          }}
        >
          Modular Desk System
        </p>
        
        {/* Progress bar */}
        <div className="mt-12 w-40 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress percentage */}
        <p className="text-white/20 text-xs mt-3 font-mono">
          {progress}%
        </p>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        @keyframes reveal {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
