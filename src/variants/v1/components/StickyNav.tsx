import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Показываем навигацию после прокрутки 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLanding) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="mx-4 mt-4">
        <div className="max-w-6xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-center">
            {/* Logo only */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-black text-xs font-bold">FG</span>
              </div>
              <span className="text-white font-medium">
                FOCUS<span className="text-white/30">/</span>GAP
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
