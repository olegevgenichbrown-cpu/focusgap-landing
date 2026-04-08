import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { gsap } from 'gsap';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        gsap.fromTo('.cookie-banner', 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    gsap.to('.cookie-banner', {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        setIsVisible(false);
        localStorage.setItem('cookie-consent', 'true');
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] outline-none">
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-white/80" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium mb-1">We value your privacy</h3>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              We use cookies to enhance your experience, analyze site traffic, and support our launch campaign. By continuing to browse, you agree to our use of cookies. Read our <a href="/privacy" className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">Privacy Policy</a>.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="px-5 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 bg-white/5 text-white/70 text-xs font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
          <button 
            onClick={handleAccept}
            className="text-white/20 hover:text-white/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
