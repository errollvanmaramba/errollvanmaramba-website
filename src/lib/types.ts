export interface Metric {
  value: string;
  label: string;
}

export interface SiteSettings {
  name: string;
  headline: string;
  subheadline: string;
  shortBio: string;
  availability: string;
  location: string;
  email: string;
  linkedin: string;
  behance: string;
  resumePath: string;
  formAction: string;
  heroMetrics: Metric[];
  seo: {
    title: string;
    description: string;
  };
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  eyebrow: string;
  client: string;
  role: string;
  period: string;
  featured: boolean;
  year: number;
  order: number;
  category: string;
  summary: string;
  cover: string;
  externalUrl?: string;
  tags: string[];
  metrics: Metric[];
  challenge: string;
  approach: string[];
  results: string[];
  sections: CaseStudySection[];
}

export interface ExperienceItem {
  slug: string;
  company: string;
  role: string;
  period: string;
  location: string;
  order: number;
  summary: string;
  bullets: string[];
  tools: string[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  order: number;
}

export interface FaqItem {
  slug: string;
  question: string;
  answer: string;
  order: number;
}

export interface Testimonial {
  slug: string;
  quote: string;
  shortQuote: string;
  author: string;
  title: string;
  company: string;
  featured: boolean;
}
