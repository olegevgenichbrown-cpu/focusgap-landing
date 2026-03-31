import { footerConfig } from '../config';

const Footer = () => {
  if (!footerConfig.brandName) return null;

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10">
      <div className="px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="museo-body text-white/40 text-sm text-center md:text-left">
            {footerConfig.copyrightText}
          </p>
          <div className="flex items-center gap-6">
            {footerConfig.bottomLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="museo-body text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
