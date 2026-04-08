// FocusGap Pre-Launch Site Configuration
// LaunchBoom-style pre-launch funnel

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  heroImage: string;
  heroImageAlt: string;
  ctaText: string;
  ctaSubtext: string;
}

export interface ProblemConfig {
  headline: string;
  pains: string[];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesConfig {
  headline: string;
  items: Feature[];
}

export interface FounderConfig {
  headline: string;
  story: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export interface FinalCTAConfig {
  headline: string;
  benefits: string[];
  scarcityText: string;
  ctaText: string;
}

export interface FooterConfig {
  brandName: string;
  copyrightText: string;
  bottomLinks: { label: string; href: string }[];
}

// Site Configuration
export const siteConfig: SiteConfig = {
  language: "en",
  title: "FocusGap | Join the VIP List — 15% Off Early Access",
  description: "The modular desk system that brings order to your workspace. Join 500+ VIPs for 15% off on Kickstarter launch.",
};

// Hero Section
export const heroConfig: HeroConfig = {
  brandLeft: "FOCUS",
  brandRight: "GAP",
  tagline: "The modular desk system that brings order to your workspace and clarity to your mind.",
  badge: "Coming to Kickstarter",
  heroImage: "/images/hero-premium.jpg",
  heroImageAlt: "FocusGap Modular Desk System",
  ctaText: "JOIN THE VIP LIST — GET 15% OFF",
  ctaSubtext: "⚡ Launching on Kickstarter soon. Only 500 early backer spots.",
};

// Problem Section
export const problemConfig: ProblemConfig = {
  headline: "Your desk is a mess.",
  pains: [
    "Wires everywhere, adapters, sticky notes.",
    "You sit down to work and spend the first 10 minutes just clearing space.",
    "Your environment fights your focus—instead of supporting it.",
  ],
};

// Features Section
export const featuresConfig: FeaturesConfig = {
  headline: "Built for deep work",
  items: [
    {
      icon: "Layers",
      title: "Modular by design",
      description: "Snap together the exact setup you need. Rearrange in seconds.",
    },
    {
      icon: "Wind",
      title: "Knows your air",
      description: "Built-in CO₂ sensor tells you when to ventilate for peak focus.",
    },
    {
      icon: "Shield",
      title: "Built to last",
      description: "Aircraft-grade aluminum, N52 magnets, and a 5-year warranty.",
    },
  ],
};

// Founder Story Section
export const founderConfig: FounderConfig = {
  headline: "Why we built this",
  story: `We started FocusGap because we were tired of desk organizers that looked like afterthoughts. Our goal was to create something that feels as intentional as the work you do—where every material choice, every magnet, every sensor serves a purpose.

This isn't just about organizing your desk. It's about designing the space where focus happens.`,
  authorName: "The FocusGap Team",
  authorTitle: "Designers & Engineers",
  authorImage: "/images/image(2).jpg",
};

// Final CTA Section
export const finalCTAConfig: FinalCTAConfig = {
  headline: "Don't miss the launch",
  benefits: [
    "15% off retail price",
    "First priority shipping",
    "Exclusive early-backer access",
  ],
  scarcityText: "500 VIP spots. 312 already claimed.",
  ctaText: "JOIN THE VIP LIST — GET 15% OFF",
};

// Footer Configuration
export const footerConfig: FooterConfig = {
  brandName: "FOCUSGAP",
  copyrightText: "© 2026 FocusGap. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "mailto:hello@focusgap.co" },
  ],
};
