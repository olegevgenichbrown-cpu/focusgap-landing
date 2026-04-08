import { Link } from 'react-router-dom';
import { footerConfig } from '../config';

const Footer = () => {
  if (!footerConfig.brandName) return null;

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10">
      <div className="px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <p className="museo-body text-white/40 text-sm">
              {footerConfig.copyrightText}
            </p>
            <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
            <div className="text-white/20 text-sm text-center">
              FocusGap © 2026 — Pre-launch campaign<br />
              FocusGap L.L.C — Thirty North Gould Street, Suite N
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-white/20 hover:text-white/40 transition-colors text-xs uppercase tracking-widest">Privacy</Link>
              <Link to="/terms" className="text-white/20 hover:text-white/40 transition-colors text-xs uppercase tracking-widest">Terms</Link>
            </div>
          </div>
          </div>
          <div className="flex items-center gap-6">
            {footerConfig.bottomLinks.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="museo-body text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
