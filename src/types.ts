export interface PortfolioProfile {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  subtext: string;
  email: string;
  telegramUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  figmaUrl?: string;
  bookCallUrl?: string;
  availableForHire: boolean;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  companyName: string;
  tagline: string;
  description: string;
  subtext: string;
  metrics: string[];
  tags: string[];
  imageUrl: string;
  logoUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export interface UIWork {
  id: string;
  title: string;
  category: 'Mobile Apps' | 'Websites' | 'Dashboard' | string;
  imageUrl: string;
  subtext: string;
  description?: string;
  tags: string[];
  client?: string;
  date?: string;
  liveUrl?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  avatarUrl: string;
  badgeBg: string;
}

export interface ToolItem {
  id: string;
  name: string;
  iconUrl?: string;
  iconSvg?: string;
  bgHex: string;
  rotationDeg: number;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  services: ServiceCard[];
  caseStudies: CaseStudy[];
  uiWorks: UIWork[];
  testimonials: Testimonial[];
  tools: ToolItem[];
}
