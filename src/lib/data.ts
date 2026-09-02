export const siteConfig = {
  name: "HTTPier",
  tagline: "Better Web, By Design.",
  description:
    "HTTPier is a web engineering studio building high-performance websites, web applications, SaaS products and e-commerce experiences engineered for speed, clarity and growth.",
  url: "https://httpier.com",
  email: "hello@httpier.com",
  phone: "+919489813846",
  social: {
    linkedin: "https://linkedin.com/company/httpier",
    instagram: "https://instagram.com/httpier",
    github: "https://github.com/httpier",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export type Service = {
  slug: string;
  index: string;
  name: string;
  short: string;
  description: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    index: "01",
    name: "Website Development",
    short: "Modern, responsive and conversion-focused websites.",
    description:
      "Marketing sites and brand experiences built on modern rendering, tuned for Core Web Vitals and engineered to convert visitors into customers.",
    capabilities: ["Marketing sites", "Landing pages", "Headless CMS", "Design systems"],
  },
  {
    slug: "web-applications",
    index: "02",
    name: "Web Applications",
    short: "Powerful applications built around real business workflows.",
    description:
      "Internal tools and customer-facing applications designed around how your team actually works - not a generic dashboard template.",
    capabilities: ["Dashboards", "Internal tools", "Workflow automation", "Data visualization"],
  },
  {
    slug: "saas-development",
    index: "03",
    name: "SaaS Development",
    short: "Scalable products designed from MVP through growth.",
    description:
      "Full-stack SaaS builds - auth, billing, multi-tenancy and infrastructure - architected so your first hundred users and your first hundred thousand run on the same foundation.",
    capabilities: ["MVP builds", "Billing & auth", "Multi-tenant architecture", "API design"],
  },
  {
    slug: "ecommerce",
    index: "04",
    name: "E-commerce",
    short: "Fast shopping experiences built around conversion.",
    description:
      "Storefronts engineered for speed and merchandising flexibility, from product discovery to checkout, on modern composable commerce infrastructure.",
    capabilities: ["Storefronts", "Checkout optimization", "Headless commerce", "Performance audits"],
  },
  {
    slug: "ui-ux-design",
    index: "05",
    name: "UI/UX Design",
    short: "Interfaces designed for clarity, usability and brand identity.",
    description:
      "Interface and interaction design grounded in real usability research, expressed through a visual identity that's unmistakably yours.",
    capabilities: ["Product design", "Design systems", "Prototyping", "User research"],
  },
  {
    slug: "performance-optimization",
    index: "06",
    name: "Performance Optimization",
    short: "Make existing websites significantly faster and smoother.",
    description:
      "Deep technical audits and remediation for existing sites - chasing down render-blocking scripts, layout shift and slow APIs until Core Web Vitals are green.",
    capabilities: ["Core Web Vitals audits", "Bundle optimization", "Rendering strategy", "Monitoring"],
  },
];

export type Project = {
  slug: string;
  name: string;
  url: string;
  industry: string;
  services: string[];
  result: string;
  year: string;
  image: string;
  imageAlt: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "profitpro",
    name: "ProfitPro",
    url: "https://www.profitproz.com",
    industry: "Hospitality SaaS",
    services: ["Website Development", "UI/UX Design"],
    result: "Live production website",
    year: "Live",
    image: "/work/profitpro.png",
    imageAlt: "ProfitPro hotel revenue platform homepage",
    summary:
      "A conversion-focused platform for hotel revenue management, dynamic pricing and OTA onboarding across multiple booking channels.",
  },
  {
    slug: "ayursarga",
    name: "Ayursarga",
    url: "https://www.ayursarga.com",
    industry: "Healthcare",
    services: ["UI/UX Design", "Website Development"],
    result: "Live production website",
    year: "Live",
    image: "/work/ayursarga.png",
    imageAlt: "Ayursarga Ayurvedic healthcare platform homepage",
    summary:
      "A healthcare discovery platform that helps people explore Ayurvedic hospitals in Kerala, compare services and request appointments.",
  },
  {
    slug: "amigos-fashion",
    name: "AMIGOS Fashion",
    url: "https://www.amigosfashion.com",
    industry: "Fashion E-commerce",
    services: ["E-commerce", "Website Development"],
    result: "Live production website",
    year: "Live",
    image: "/work/amigos-fashion.png",
    imageAlt: "AMIGOS Fashion storefront homepage",
    summary:
      "A responsive fashion storefront featuring curated collections for men, women and kids with a streamlined product-discovery experience.",
  },
  {
    slug: "space-d-infra",
    name: "Space-D Infra",
    url: "https://www.spacedinfra.com",
    industry: "Real Estate",
    services: ["Website Development", "UI/UX Design"],
    result: "Live production website",
    year: "Live",
    image: "/work/space-d-infra.png",
    imageAlt: "Space-D Infra Developers homepage",
    summary:
      "A polished corporate website presenting premium residential and commercial developments through a clear, project-led experience.",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    description: "Understand the business, audience and objective before a single pixel moves.",
  },
  {
    index: "02",
    title: "Design",
    description: "Build the structure, interaction system and visual direction.",
  },
  {
    index: "03",
    title: "Develop",
    description: "Engineer a fast, scalable, production-ready experience.",
  },
  {
    index: "04",
    title: "Refine",
    description: "Test responsiveness, usability, performance and accessibility.",
  },
  {
    index: "05",
    title: "Launch",
    description: "Deploy, monitor and optimize in the weeks after launch.",
  },
];

export const techStack = [
  { name: "Next.js", role: "Framework" },
  { name: "React", role: "UI library" },
  { name: "TypeScript", role: "Type safety" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Node.js", role: "Runtime" },
  { name: "PostgreSQL", role: "Database" },
  { name: "Firebase", role: "Realtime & auth" },
  { name: "Supabase", role: "Backend platform" },
  { name: "Vercel", role: "Deployment" },
  { name: "Cloudflare", role: "Edge & CDN" },
  { name: "GitHub", role: "Source control" },
  { name: "Docker", role: "Containerization" },
];

export const whyPrinciples = [
  {
    label: "Speed",
    detail: "Fast loading experiences.",
    more: "Lean code, optimized assets and thoughtful rendering keep every interaction quick from the first visit onward.",
    metric: "< 1.5s",
    metricLabel: "avg. LCP",
  },
  {
    label: "Responsive",
    detail: "Exceptional experiences across every screen.",
    more: "Layouts are deliberately tuned for phones, tablets, laptops and wide displays instead of simply being scaled down.",
    metric: "5",
    metricLabel: "breakpoints tuned",
  },
  {
    label: "SEO",
    detail: "Built to be discoverable.",
    more: "Semantic structure, useful metadata and strong technical foundations help search engines understand every page.",
    metric: "95+",
    metricLabel: "SEO score",
  },
  {
    label: "Scalable",
    detail: "Architecture that grows with the business.",
    more: "Reusable components and well-defined systems make it easier to add features, pages and users without rebuilding the foundation.",
    metric: "0→1M",
    metricLabel: "users, same base",
  },
  {
    label: "Accessible",
    detail: "Designed for everyone.",
    more: "Clear contrast, keyboard support, visible focus states and semantic markup make the experience usable by more people.",
    metric: "WCAG AA",
    metricLabel: "standard",
  },
  {
    label: "Maintainable",
    detail: "Clean engineering that remains manageable.",
    more: "A clear structure and typed codebase make future changes safer, faster and easier for any developer to understand.",
    metric: "100%",
    metricLabel: "typed codebase",
  },
];

export const performanceStats = [
  { value: 98, suffix: "", label: "Performance" },
  { value: 100, suffix: "", label: "Accessibility" },
  { value: 100, suffix: "", label: "Best Practices" },
  { value: 99, suffix: "", label: "SEO" },
];

export const projectTypes = [
  "Website",
  "Web Application",
  "SaaS",
  "E-commerce",
  "Redesign",
  "Other",
] as const;

export const timelines = [
  "ASAP",
  "1–2 months",
  "3–6 months",
  "Flexible",
] as const;
