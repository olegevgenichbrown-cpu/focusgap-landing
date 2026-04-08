import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqConfig } from '../config';
import { ChevronDown, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!faqConfig.headline || faqConfig.questions.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header reveal
    gsap.set('.faq-header', { opacity: 0, y: 40 });
    const headerTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.faq-header', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      },
    });
    triggersRef.current.push(headerTrigger);

    // FAQ items reveal
    const items = section.querySelectorAll('.faq-item');
    items.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
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

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[200px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="faq-header text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white/50 text-xs tracking-widest uppercase mb-6">
            <MessageCircle className="w-4 h-4" />
            {faqConfig.label}
          </span>
          <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            {faqConfig.headline}
          </h2>
          <p className="museo-body text-white/50 text-lg">
            {faqConfig.description}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqConfig.questions.map((item, i) => (
            <div
              key={i}
              className="faq-item group"
            >
              <button
                onClick={() => toggleQuestion(i)}
                className={`w-full flex items-center justify-between p-6 rounded-xl text-left transition-all duration-500 ${
                  openIndex === i 
                    ? 'bg-white/[0.08] border border-white/20' 
                    : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/15'
                }`}
                data-cursor="hover"
              >
                <span className={`museo-headline text-lg pr-8 transition-colors duration-300 ${
                  openIndex === i ? 'text-white' : 'text-white/80 group-hover:text-white'
                }`}>
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-500 ${
                    openIndex === i ? 'rotate-180 text-white' : ''
                  }`} 
                />
              </button>
              
              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-2 text-white/60 museo-body leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="museo-body text-white/40 mb-4">
            Still have questions?
          </p>
          <a
            href={`mailto:${faqConfig.contactEmail}`}
            className="inline-flex items-center gap-2 text-white hover:text-white/70 museo-label transition-colors"
            data-cursor="hover"
          >
            <MessageCircle className="w-4 h-4" />
            Contact our team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
