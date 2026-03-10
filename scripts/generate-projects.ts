import fs from "node:fs";
import path from "node:path";

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[+]/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const projects = [
  {
    title: "Fresh Rides Premium Car Care — WooCommerce Online Store",
    category: "eCommerce",
    year: "2023",
    clientType: "WooCommerce Storefront",
    summary:
      "A premium storefront presentation focused on a cleaner product experience and stronger visual merchandising.",
    problem:
      "The project needed a more polished online presentation that could support product clarity and premium positioning.",
    thoughtProcess:
      "The direction focused on structured content blocks, stronger hierarchy, and a cleaner visual rhythm to support product discovery.",
    solution:
      "A refined eCommerce concept that prioritizes product presentation, organized layout decisions, and modern storefront confidence.",
    behanceUrl:
      "https://www.behance.net/gallery/170828615/Fresh-Rides-Premium-Car-Care-Woocommerce-Online-Store",
    featured: true
  },
  {
    title: "Re-Design Web Site — ISUZU Web Page",
    category: "Web Redesign",
    year: "2023",
    clientType: "Brand Web Experience",
    summary:
      "A redesign concept aimed at improving visual clarity, structure, and modern brand presentation for a web page experience.",
    problem:
      "The page direction required a sharper visual identity and a clearer layout for brand communication.",
    thoughtProcess:
      "The work emphasized stronger layout control, clearer content hierarchy, and a more disciplined visual system.",
    solution:
      "A redesign concept with updated structure, more confident visual framing, and cleaner digital brand presentation.",
    behanceUrl:
      "https://www.behance.net/gallery/169404823/Re-Design-Web-Site-ISUZU-Web-Page",
    featured: true
  },
  {
    title: "Landing Page — Talyer+ Car Service Booking App",
    category: "Landing Page",
    year: "2023",
    clientType: "App Marketing Page",
    summary:
      "A focused landing page concept for an automotive service-booking product designed to communicate the value of the app quickly.",
    problem:
      "The concept needed a landing page that introduced the app clearly and supported the product story with stronger visual emphasis.",
    thoughtProcess:
      "The direction centered on a clearer first impression, more deliberate hierarchy, and a conversion-aware content flow.",
    solution:
      "A marketing page concept with structured storytelling, stronger section pacing, and a cleaner conversion path.",
    behanceUrl:
      "https://www.behance.net/gallery/169199077/Landing-Page-Talyer-(Car-Service-Booking-App)",
    featured: true
  },
  {
    title: "UX/UI Design — Talyer+ App",
    category: "UX/UI",
    year: "2023",
    clientType: "Product Interface",
    summary:
      "A mobile app interface concept for car-service booking focused on usability, information flow, and structured interaction design.",
    problem:
      "The interface needed a clearer user journey and a stronger visual system to support utility and trust.",
    thoughtProcess:
      "The design direction focused on usability, screen-to-screen clarity, and interface consistency for booking-related flows.",
    solution:
      "A UX/UI concept that organizes information clearly and supports a more confident service-booking experience.",
    behanceUrl:
      "https://www.behance.net/gallery/168621293/UXUI-Design-Talyer-App-(Car-Service-Booking-App)",
    featured: true
  }
].map((project) => ({
  slug: slugify(project.title),
  ...project
}));

const outputPath = path.resolve("src/content/projects.generated.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`Generated ${projects.length} project entries at ${outputPath}`);
