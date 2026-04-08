import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'When will FocusGap ship?',
    answer: 'We\'re targeting Q2 2026 for shipping. As a pre-launch campaign, we\'re gathering reservations to fund the first production run. Backers will receive regular updates on manufacturing progress.',
  },
  {
    question: 'What modules are available?',
    answer: 'We\'re launching with 9 modules: Base Station, CO₂ Sensor, Wireless Charger, Cable Manager, Headstand, Phone Dock, Tablet Stand, Pen Holder, and Light Bar. Each connects magnetically and works independently.',
  },
  {
    question: 'How does the CO₂ sensor work?',
    answer: 'The CO₂ module monitors air quality in real-time. When levels exceed 1000ppm (when focus drops), the LED indicator changes color. It\'s powered by the base station and requires no charging.',
  },
  {
    question: 'What\'s the $1 reservation for?',
    answer: 'The $1 deposit shows serious interest and reserves your discount: 20% off the CO₂ module or 25% off any other module. It\'s fully refundable anytime before launch.',
  },
  {
    question: 'Will it work with my setup?',
    answer: 'The base station is 12" x 8" and fits most desks. All modules use USB-C for power (included). The magnetic system works with the included metal plate or directly on magnetic surfaces.',
  },
  {
    question: 'What if the campaign doesn\'t fund?',
    answer: 'If we don\'t reach our funding goal, all reservations are automatically refunded. We only charge the full amount when the product ships.',
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: { 
  faq: typeof faqs[0]; 
  index: number; 
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div 
      className="faq-item border-b border-white/10 last:border-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-white text-lg font-medium pr-8 group-hover:text-white/80 transition-colors">
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 transition-all ${
          isOpen ? 'bg-white border-white' : 'group-hover:border-white/40'
        }`}>
          {isOpen ? (
            <Minus className={`w-4 h-4 ${isOpen ? 'text-black' : 'text-white'}`} />
          ) : (
            <Plus className="w-4 h-4 text-white" />
          )}
        </div>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ height }}
      >
        <div ref={contentRef} className="pb-6">
          <p className="text-white/50 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.faq-item');
    gsap.set(items, { opacity: 0, y: 20 });

    items.forEach((item, i) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.05,
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
      id="faq"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Questions?
          </h2>
          <p className="text-white/40 text-lg">
            Everything you need to know
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/40 mb-4">Still have questions?</p>
          <a 
            href="mailto:hello@focusgap.co"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            hello@focusgap.co
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
