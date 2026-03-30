// FocusGap Pre-Launch Site Configuration
// Kickstarter campaign landing page for modular desk organization system

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  email: string;
  heroImage: string;
  heroImageAlt: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  type?: 'image' | 'video';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Exhibition {
  id: number;
  title: string;
  image: string;
  date: string;
}

export interface ExhibitionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  exhibitions: Exhibition[];
}

export interface Collection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface CollectionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  collections: Collection[];
}

export interface TestimonialsConfig {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface VisitConfig {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

export interface ManufacturingProcess {
  title: string;
  description: string;
  gif: string;
  icon: string;
}

export interface ManufacturingConfig {
  label: string;
  headline: string;
  description: string;
  processes: ManufacturingProcess[];
  stats: StatItem[];
}

export interface MagneticFeature {
  title: string;
  description: string;
  icon: string;
}

export interface MagneticConfiguration {
  title: string;
  image: string;
  type?: 'image' | 'video';
}

export interface MagneticConfig {
  label: string;
  headline: string;
  description: string;
  mainGif: string;
  features: MagneticFeature[];
  configurations: MagneticConfiguration[];
}

export interface SpecItem {
  icon: string;
  label: string;
  value: string;
}

export interface SpecsConfig {
  label: string;
  headline: string;
  description: string;
  image: string;
  specs: SpecItem[];
}

export interface TimelineMilestone {
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface TimelineConfig {
  label: string;
  headline: string;
  description: string;
  milestones: TimelineMilestone[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  label: string;
  headline: string;
  description: string;
  questions: FAQItem[];
  contactEmail: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  icon: string;
  features: string[];
  cta: string;
  popular?: boolean;
  spotsLeft?: string;
}

export interface PricingConfig {
  label: string;
  headline: string;
  description: string;
  guarantee: string;
  tiers: PricingTier[];
}

// Site Configuration
export const siteConfig: SiteConfig = {
  language: "en",
  title: "FocusGap | Modular Desk System - Coming to Kickstarter",
  description: "Premium modular desk organization system crafted from aluminum and walnut. Featuring CO2 air quality monitoring. Join the waitlist for early access.",
};

// Hero Section - Main product showcase
export const heroConfig: HeroConfig = {
  brandLeft: "FOCUS",
  brandRight: "GAP",
  tagline: "Modular desk system that brings order to your workspace and clarity to your mind",
  badge: "Coming to Kickstarter",
  since: "2025",
  email: "hello@focusgap.co",
  heroImage: "/images/hero-premium.png",
  heroImageAlt: "FocusGap Modular Desk System - Complete Setup",
  scrollText: "Scroll to explore",
  copyrightText: "© 2025 FocusGap",
  navLinks: [
    { label: "Mission", href: "#mission" },
    { label: "Specs", href: "#specs" },
    { label: "Modules", href: "#modules" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/focusgap" },
    { label: "Twitter", href: "https://twitter.com/focusgap" },
    { label: "LinkedIn", href: "https://linkedin.com/company/focusgap" },
  ],
};

// About/Mission Section
export const aboutConfig: AboutConfig = {
  label: "Our Mission",
  headline: "Crafting Focus, One Module at a Time",
  description: "In a world of constant distractions, we believe your workspace should be a sanctuary of clarity. FocusGap combines premium materials—aircraft-grade aluminum and sustainable walnut—with intelligent design to create a modular system that adapts to your workflow. Every element is engineered to eliminate friction, from the magnetic connections to the integrated CO2 sensor that ensures your air quality supports deep work.",
  bottomText: "We're not just building desk accessories. We're architecting the environment where your best ideas come to life.",
  galleryImages: [
    { src: "/videos/component1.mp4", alt: "FocusGap Component 1", label: "Component 1", type: "video" },
    { src: "/videos/component2.mp4", alt: "FocusGap Component 2", label: "Component 2", type: "video" },
    { src: "/videos/component3.mp4", alt: "FocusGap Component 3", label: "Component 3", type: "video" },
    { src: "/videos/component4.mp4", alt: "FocusGap Component 4", label: "Component 4", type: "video" },
    { src: "/videos/component7.mp4", alt: "FocusGap Component 7 - Coming Soon", label: "Component 7", type: "video" },
    { src: "/videos/component6.mp4", alt: "FocusGap Component 6", label: "Component 6", type: "video" },
  ],
  stats: [
    { value: "12+", label: "Modular Components" },
    { value: "6061", label: "Aircraft Aluminum" },
    { value: "100%", label: "Sustainable Walnut" },
    { value: "450ppm", label: "CO2 Monitoring" },
  ],
};

// Development/Process Section (using exhibitions)
export const exhibitionsConfig: ExhibitionsConfig = {
  label: "Development Journey",
  headline: "From Concept to Creation",
  ctaText: "Learn More",
  exhibitions: [
    {
      id: 1,
      title: "Research & Ideation",
      image: "/images/image(8).png",
      date: "Phase 01",
    },
    {
      id: 2,
      title: "Material Selection",
      image: "/images/image(9).png",
      date: "Phase 02",
    },
    {
      id: 3,
      title: "Prototype Testing",
      image: "/images/image(3).png",
      date: "Phase 03",
    },
    {
      id: 4,
      title: "Final Production",
      image: "/images/image(7).png",
      date: "Phase 04",
    },
  ],
};

// Product Modules Section (using collections)
export const collectionsConfig: CollectionsConfig = {
  label: "The System",
  headline: "Modules That Work Together",
  ctaText: "View Details",
  collections: [
    {
      id: 1,
      title: "Air Monitor Hub",
      year: "Core Module",
      description: "Integrated CO2 sensor with real-time air quality display. Know when to ventilate for optimal cognitive performance.",
      image: "/images/image(4).png",
    },
    {
      id: 2,
      title: "Wireless Charging Base",
      year: "Power Module",
      description: "15W fast wireless charging with premium walnut surface. Keep your devices powered without cable clutter.",
      image: "/images/image(5).png",
    },
    {
      id: 3,
      title: "Headphone Stand",
      year: "Accessory",
      description: "Elegant vertical stand with soft-touch aluminum and walnut accent. Protects your headphones in style.",
      image: "/images/image(3).png",
    },
    {
      id: 4,
      title: "Laptop Vertical Dock",
      year: "Space Saver",
      description: "Maximize desk space with vertical laptop storage. Precision-fit for MacBook and premium ultrabooks.",
      image: "/images/image(10).png",
    },
  ],
};

// Team/Testimonial Section
export const testimonialsConfig: TestimonialsConfig = {
  quote: "We started FocusGap because we were tired of desk organizers that looked like afterthoughts. Our goal was to create something that feels as intentional as the work you do—where every material choice, every magnet, every sensor serves a purpose. This isn't just about organizing your desk. It's about designing the space where focus happens.",
  authorName: "The FocusGap Team",
  authorTitle: "Designers & Engineers",
  authorImage: "/images/image(2).png",
};

// Waitlist/Contact Section
export const visitConfig: VisitConfig = {
  label: "Join the Movement",
  headline: "Be the First to Experience<br />FocusGap",
  description: "Sign up for exclusive early access to our Kickstarter campaign. Early supporters receive special pricing and limited-edition finishes.",
  ctaText: "Join Waitlist",
  infoCards: [
    {
      icon: "Calendar",
      title: "Launch Date",
      content: "Q2 2025<br />Kickstarter Campaign",
    },
    {
      icon: "Ticket",
      title: "Early Bird",
      content: "40% Off Retail<br />Limited to 500 backers",
    },
    {
      icon: "Clock",
      title: "Shipping",
      content: "Q4 2025<br />Worldwide Delivery",
    },
    {
      icon: "MapPin",
      title: "Made In",
      content: "Designed in Copenhagen<br />Crafted in Germany",
    },
  ],
};

// Manufacturing Section
export const manufacturingConfig: ManufacturingConfig = {
  label: "Craftsmanship",
  headline: "Precision in Every Detail",
  description: "From raw material to finished product, every step of our manufacturing process is designed to deliver uncompromising quality.",
  processes: [
    {
      title: "CNC Machining",
      description: "Aircraft-grade 6061 aluminum precision-milled to 0.01mm tolerance for perfect fit and finish.",
      gif: "/images/block1.jpg",
      icon: "Cog",
    },
    {
      title: "Magnetic Assembly",
      description: "Neodymium magnets precisely embedded for seamless, satisfying connections between modules.",
      gif: "/videos/block2.mp4",
      icon: "Hammer",
    },
    {
      title: "Quality Control",
      description: "Every module undergoes rigorous inspection to ensure flawless performance and durability.",
      gif: "/images/manufacturing-qc.png",
      icon: "CheckCircle",
    },
  ],
  stats: [
    { value: "0.01mm", label: "Precision Tolerance" },
    { value: "12", label: "Production Steps" },
    { value: "100%", label: "Quality Tested" },
    { value: "5yr", label: "Warranty" },
  ],
};

// Magnetic Connection Section
export const magneticConfig: MagneticConfig = {
  label: "Magnetic System",
  headline: "Connections That Click",
  description: "Our proprietary magnetic connection system allows modules to snap together with satisfying precision. Rearrange your workspace in seconds.",
  mainGif: "/videos/click.mp4",
  features: [
    {
      title: "Neodymium Magnets",
      description: "N52 grade magnets for secure hold",
      icon: "Magnet",
    },
    {
      title: "Modular Stack",
      description: "Stack up to 5 modules vertically",
      icon: "Layers",
    },
    {
      title: "Instant Connect",
      description: "Snap together in under 1 second",
      icon: "Zap",
    },
  ],
  configurations: [
    { title: "Linear Setup", image: "/videos/configuration1.mp4", type: "video" },
    { title: "L-Shape", image: "/videos/configuration2.mp4", type: "video" },
    { title: "Stacked", image: "/videos/configuration3.mp4", type: "video" },
    { title: "Minimal", image: "/videos/configuration4.mp4", type: "video" },
    { title: "Full Desk", image: "/videos/configuration5.mp4", type: "video" },
    { title: "Compact", image: "/videos/configuration6.mp4", type: "video" },
  ],
};

// Tech Specs Section
export const specsConfig: SpecsConfig = {
  label: "Technical Specs",
  headline: "Engineered to Perfection",
  description: "Every detail meticulously crafted for performance, durability, and aesthetic excellence.",
  image: "/images/picture.png",
  specs: [
    { icon: "Ruler", label: "Dimensions", value: "240 × 120 × 45 mm" },
    { icon: "Weight", label: "Weight", value: "1.2 kg (base module)" },
    { icon: "Battery", label: "Power", value: "USB-C, 15W output" },
    { icon: "Wifi", label: "Connectivity", value: "Bluetooth 5.2" },
    { icon: "Wind", label: "CO2 Sensor", value: "NDIR, ±50ppm accuracy" },
    { icon: "Layers", label: "Materials", value: "6061 Al + Walnut" },
  ],
};

// Timeline Section
export const timelineConfig: TimelineConfig = {
  label: "Roadmap",
  headline: "Our Journey",
  description: "From concept to your desk—follow our progress.",
  milestones: [
    {
      title: "Concept & Design",
      date: "Q3 2023",
      description: "Initial ideation, market research, and industrial design completed.",
      status: "completed",
    },
    {
      title: "Prototype Development",
      date: "Q1 2024",
      description: "First working prototypes, material testing, and user feedback.",
      status: "completed",
    },
    {
      title: "Manufacturing Setup",
      date: "Q3 2024",
      description: "Partnering with precision manufacturers in Germany.",
      status: "completed",
    },
    {
      title: "Kickstarter Launch",
      date: "Q2 2025",
      description: "Campaign goes live with exclusive early bird pricing.",
      status: "current",
    },
    {
      title: "Production & Shipping",
      date: "Q4 2025",
      description: "Full-scale production and worldwide delivery.",
      status: "upcoming",
    },
  ],
};

// FAQ Section
export const faqConfig: FAQConfig = {
  label: "FAQ",
  headline: "Questions? Answered.",
  description: "Everything you need to know about FocusGap.",
  contactEmail: "hello@focusgap.co",
  questions: [
    {
      question: "When will FocusGap be available?",
      answer: "We're launching on Kickstarter in Q2 2025. Early backers will receive their units in Q4 2025. Sign up for our waitlist to get notified the moment we go live.",
    },
    {
      question: "How does the magnetic system work?",
      answer: "Each module contains N52-grade neodymium magnets precisely positioned for perfect alignment. Simply bring two modules close together and they'll snap into place with a satisfying click.",
    },
    {
      question: "What materials are used?",
      answer: "We use aircraft-grade 6061 aluminum for the frame and sustainably sourced American walnut for the surfaces. All materials are carefully selected for durability, aesthetics, and environmental responsibility.",
    },
    {
      question: "Is the CO2 sensor accurate?",
      answer: "Yes! Our NDIR (Non-Dispersive Infrared) sensor provides ±50ppm accuracy, calibrated to detect CO2 levels from 400 to 5000ppm. It updates every 2 seconds for real-time monitoring.",
    },
    {
      question: "Can I buy individual modules?",
      answer: "Absolutely. While we offer starter kits, every module is available individually so you can build your perfect setup over time.",
    },
    {
      question: "What's the warranty?",
      answer: "All FocusGap products come with a 5-year warranty covering manufacturing defects. We stand behind our craftsmanship.",
    },
  ],
};

// Pricing Section
export const pricingConfig: PricingConfig = {
  label: "Early Access",
  headline: "Choose Your Setup",
  description: "Exclusive Kickstarter pricing. Limited quantities available.",
  guarantee: "30-day money-back guarantee. No questions asked.",
  tiers: [
    {
      name: "Starter",
      description: "Perfect for minimalists",
      price: 149,
      originalPrice: 249,
      icon: "Star",
      features: [
        "Air Monitor Hub",
        "Pen Holder Module",
        "USB-C cable included",
        "Free worldwide shipping",
      ],
      cta: "Get Early Access",
      spotsLeft: "47",
    },
    {
      name: "Professional",
      description: "Complete workspace solution",
      price: 299,
      originalPrice: 499,
      icon: "Zap",
      features: [
        "Everything in Starter",
        "Wireless Charging Base",
        "Headphone Stand",
        "Cable Organizer",
        "Priority support",
      ],
      cta: "Get Early Access",
      popular: true,
      spotsLeft: "23",
    },
    {
      name: "Ultimate",
      description: "The complete collection",
      price: 499,
      originalPrice: 799,
      icon: "Crown",
      features: [
        "Everything in Professional",
        "Laptop Vertical Dock",
        "Monitor Stand Riser",
        "Plant Pot Module",
        "Limited edition finish",
        "Lifetime warranty",
      ],
      cta: "Get Early Access",
      spotsLeft: "12",
    },
  ],
};

// Footer Configuration
export const footerConfig: FooterConfig = {
  marqueeText: "FOCUSGAP • MODULAR DESK SYSTEM • COMING TO KICKSTARTER • JOIN THE WAITLIST • PREMIUM ALUMINUM & WALNUT • CO2 MONITORING • WIRELESS CHARGING • ",
  brandName: "FOCUSGAP",
  brandDescription: "Premium modular desk organization system. Crafted from aircraft-grade aluminum and sustainable walnut. Designed for deep work.",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/focusgap" },
    { label: "Twitter", href: "https://twitter.com/focusgap" },
    { label: "LinkedIn", href: "https://linkedin.com/company/focusgap" },
    { label: "Youtube", href: "https://youtube.com/focusgap" },
  ],
  quickLinks: [
    { label: "Mission", href: "#mission" },
    { label: "Development", href: "#development" },
    { label: "Modules", href: "#modules" },
    { label: "Team", href: "#team" },
  ],
  quickLinksTitle: "Explore",
  contactTitle: "Contact",
  contactItems: [
    "hello@focusgap.co",
    "Copenhagen, Denmark",
  ],
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
};
