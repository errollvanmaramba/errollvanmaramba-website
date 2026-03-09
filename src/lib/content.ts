import siteData from '../data/site.json';
import type {
  CaseStudy,
  ExperienceItem,
  FaqItem,
  ServiceItem,
  SiteSettings,
  Testimonial
} from './types';

function valuesFromGlob<T>(modules: Record<string, unknown>): T[] {
  return Object.values(modules).map((entry) => {
    const value = entry as { default?: T };
    return (value.default ?? entry) as T;
  });
}

export function getSiteSettings(): SiteSettings {
  return siteData as SiteSettings;
}

export function getCaseStudies(): CaseStudy[] {
  const modules = import.meta.glob('../data/case-studies/*.json', { eager: true });
  return valuesFromGlob<CaseStudy>(modules).sort((a, b) => a.order - b.order || b.year - a.year);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return getCaseStudies().filter((entry) => entry.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((entry) => entry.slug === slug);
}

export function getExperience(): ExperienceItem[] {
  const modules = import.meta.glob('../data/experience/*.json', { eager: true });
  return valuesFromGlob<ExperienceItem>(modules).sort((a, b) => a.order - b.order);
}

export function getServices(): ServiceItem[] {
  const modules = import.meta.glob('../data/services/*.json', { eager: true });
  return valuesFromGlob<ServiceItem>(modules).sort((a, b) => a.order - b.order);
}

export function getFaqs(): FaqItem[] {
  const modules = import.meta.glob('../data/faqs/*.json', { eager: true });
  return valuesFromGlob<FaqItem>(modules).sort((a, b) => a.order - b.order);
}

export function getTestimonials(): Testimonial[] {
  const modules = import.meta.glob('../data/testimonials/*.json', { eager: true });
  return valuesFromGlob<Testimonial>(modules);
}

export function getFeaturedTestimonial(): Testimonial | undefined {
  return getTestimonials().find((entry) => entry.featured);
}
