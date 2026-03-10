import type { NavItem } from "../types/content";

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" }
];

export const siteConfig = {
  siteUrl: "https://example.com",
  name: "Erroll Van Maramba",
  shortName: "EVM",
  role: "Creative Marketing Designer for eCommerce Brands",
  tagline: "I design high-converting creative for eCommerce brands and modern digital campaigns.",
  locationLabel: "Remote creative partner for eCommerce brands",
  availability: "Currently available for freelance work",
  email: "erroll.maramba18@gmail.com",
  linkedin: "https://www.linkedin.com/in/errollvanmaramba/",
  behance: "https://www.behance.net/errollvanmaramba",
  primaryCta: {
    label: "Work with me",
    href: "/contact"
  },
  secondaryCta: {
    label: "View projects",
    href: "/projects"
  },
  homeMeta: {
    title: "Erroll Van Maramba — Creative Marketing Designer for eCommerce Brands",
    description:
      "Professional personal website for Erroll Van Maramba, a creative marketing designer focused on eCommerce creative, Shopify support, campaign visuals, and conversion-oriented brand assets."
  },
  heroMeta: [
    "Remote creative partner",
    "Available for freelance work",
    "Shopify • campaign creative • social design"
  ],
  stats: [
    { label: "Roles across eCommerce and creative operations", value: "5+" },
    { label: "Core freelance focus areas", value: "4" },
    { label: "Selected featured projects", value: "4" }
  ]
};
