export interface BentoItem {
  title: string;
  description: string;
  colSpan: 1 | 2 | 3;
  icon: React.ReactNode;
  image?: { src: string; alt: string };
  imagePosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  imageSize?: string;
}

export interface HeroSection {
  id: string;
  company: 'onemoney' | 'moneyone' | 'equal';
  badgeText: string;
  badgeIcon: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  gradient: string;
  bentoComponent: React.ComponentType;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
} 