export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  clientType: string;
  summary: string;
  problem: string;
  thoughtProcess: string;
  solution: string;
  behanceUrl: string;
  featured: boolean;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  logo: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  highlight: string;
};
