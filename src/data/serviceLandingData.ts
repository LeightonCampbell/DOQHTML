/**
 * Extended landing content for service pages.
 * Used by [slug].astro to render ServiceLandingPage-style layout.
 */

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface HowItWorksItem {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  rating: number;
  location?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceLandingContent {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  /** Optional trust strip phrases (replaces default "Licensed & Insured" / "Vetted Pros") */
  trustWords?: [string, string];
  initialService: string;
  whatWeDoTitle: string;
  whatWeDoItems: string[];
  whyChooseUs: WhyChooseItem[];
  howItWorks: HowItWorksItem[];
  testimonials: TestimonialItem[];
  faqs?: FAQItem[];
}

const defaultWhyChooseUs: WhyChooseItem[] = [
  { title: "Licensed & Insured", description: "Every pro is licensed and insured so you're protected and your work meets code." },
  { title: "Quality Work", description: "We use quality materials and stand behind our repairs and installations." },
  { title: "Vetted Pros", description: "Background-checked, highly-rated professionals who show up on time." },
];

const defaultHowItWorks: HowItWorksItem[] = [
  { step: "1", title: "Tell Us What You Need", description: "Describe your project or issue and we'll match you with the right pro." },
  { step: "2", title: "Get Matched", description: "A qualified pro will reach out to confirm details and schedule your visit." },
  { step: "3", title: "Get It Done", description: "We show up on time, complete the work, and leave your space clean." },
];

const defaultTestimonials: TestimonialItem[] = [
  { quote: "Professional from start to finish. They showed up on time and did exactly what we needed. Will use again.", author: "Satisfied Customer", rating: 5, location: "LA Area" },
  { quote: "Great experience. Fair pricing and the work was done right the first time. Highly recommend.", author: "Happy Homeowner", rating: 5, location: "California" },
  { quote: "Finally found a service I can trust. Quality work and they stand behind it.", author: "Repeat Customer", rating: 5, location: "Greater LA" },
];

/** Full landing content for services we've ported in detail; others get defaults from label/description */
const landingBySlug: Record<string, ServiceLandingContent> = {
  plumbing: {
    metaTitle: "Plumbing Services | Licensed Plumbers | Deals Of Quality",
    metaDescription: "Professional plumbing services for repairs, installations, and emergencies. Licensed plumbers available for all your plumbing needs.",
    canonicalPath: "services/plumbing",
    heroBadge: "Licensed Plumbing in LA",
    heroTitle: "Reliable Plumbing When You Need It",
    heroSubtitle: "From leak repairs and drain cleaning to water heaters and fixture installation. Licensed, insured plumbers ready to help—including emergency service.",
    heroImage: "/plumbing-hero.jpg",
    initialService: "plumbing",
    whatWeDoTitle: "What We Do",
    whatWeDoItems: [
      "Leak detection and repair",
      "Drain cleaning and unclogging",
      "Fixture installation and repair",
      "Water heater installation and repair",
      "Pipe repair and replacement",
      "Toilet and sink repairs",
      "Emergency plumbing service",
    ],
    whyChooseUs: [
      { title: "Licensed & Insured", description: "Every plumber is licensed and insured so you're protected and your work meets code." },
      { title: "Emergency Available", description: "When you have a burst pipe or major leak, we can get a pro out quickly." },
      { title: "Quality Work", description: "We use quality parts and stand behind our repairs and installations." },
    ],
    howItWorks: [
      { step: "1", title: "Tell Us What You Need", description: "Describe your plumbing issue or project and we'll match you with the right pro." },
      { step: "2", title: "Get Matched", description: "A licensed plumber will reach out to confirm details and schedule your visit." },
      { step: "3", title: "Get It Done", description: "We show up on time, complete the work to code, and leave your space clean." },
    ],
    testimonials: [
      { quote: "Had a burst pipe at 2 AM. They came out within an hour and fixed it professionally. Saved us from a major flood. Couldn't ask for better emergency service.", author: "James T.", rating: 5, location: "Los Angeles, CA" },
      { quote: "Our water heater died on a Friday. They had a new one installed by Saturday afternoon. Fair pricing and very clean work. Highly recommend.", author: "Patricia L.", rating: 5, location: "Glendale, CA" },
      { quote: "They've done multiple jobs for us—drain cleaning, new faucets, toilet repair. Always on time, explain everything clearly, and leave the area spotless.", author: "Robert K.", rating: 5, location: "Burbank, CA" },
      { quote: "Finally found a plumber I trust. Licensed, polite, and they stand behind their work. Will use them for all our plumbing needs from now on.", author: "Linda M.", rating: 5, location: "Pasadena, CA" },
    ],
  },
  electrical: {
    metaTitle: "Electrical Services | Licensed Electricians | Deals Of Quality",
    metaDescription: "Professional electrical services from licensed electricians. Installations, repairs, upgrades, and electrical safety inspections.",
    canonicalPath: "services/electrical",
    heroBadge: "Licensed Electrical in LA",
    heroTitle: "Safe, Code-Compliant Electrical Work",
    heroSubtitle: "From panel upgrades and new wiring to lighting, outlets, and safety inspections. Licensed electricians who handle permits and get it done right.",
    heroImage: "/electrical-hero.jpg",
    initialService: "electrical",
    whatWeDoTitle: "What We Do",
    whatWeDoItems: [
      "Electrical panel upgrades",
      "Outlet and switch installation",
      "Lighting installation",
      "Ceiling fan installation",
      "Electrical troubleshooting and repair",
      "Safety inspections",
      "Code compliance work",
    ],
    whyChooseUs: [
      { title: "Licensed & Bonded", description: "All electricians are licensed, bonded, and insured for your safety and peace of mind." },
      { title: "Permits & Code", description: "We handle permits when required and ensure all work meets local electrical codes." },
      { title: "Quality Installations", description: "We use quality materials and follow best practices for lasting, safe results." },
    ],
    howItWorks: [
      { step: "1", title: "Tell Us What You Need", description: "Describe your electrical project or issue and we'll match you with a licensed pro." },
      { step: "2", title: "Get Matched", description: "An electrician will contact you to confirm scope, timeline, and schedule." },
      { step: "3", title: "Get It Done", description: "We complete the work to code, pull permits when needed, and leave your home safe." },
    ],
    testimonials: [
      { quote: "Needed our panel upgraded before a solar install. They handled the permit and did a flawless job. The inspector had no notes. Very professional.", author: "Michael S.", rating: 5, location: "Torrance, CA" },
      { quote: "Had several outlets and switches that weren't working. They diagnosed and fixed everything in one visit. Clear explanation and fair price.", author: "Nancy W.", rating: 5, location: "Santa Monica, CA" },
      { quote: "We had recessed lighting and a ceiling fan installed. The electrician was neat, on time, and the work looks great. Will use again for our next project.", author: "Steven H.", rating: 5, location: "Culver City, CA" },
      { quote: "Needed an electrical safety inspection before selling our home. They were thorough, explained everything, and gave us a detailed report. Highly recommend.", author: "Karen P.", rating: 5, location: "Redondo Beach, CA" },
    ],
  },
  "website-design": {
    metaTitle: "Website Design | Modern Business Websites | Deals Of Quality",
    metaDescription: "Professional website design for local businesses. Modern, mobile-friendly sites that help you get found online and convert visitors into customers.",
    canonicalPath: "services/website-design",
    heroBadge: "Websites That Convert",
    heroTitle: "Website Design",
    heroSubtitle: "Get a modern, mobile-friendly website that works for you. We build sites that load fast, rank in local search, and turn visitors into customers.",
    heroImage: "/blog/website-article-thumb.png",
    trustWords: ["Websites That Work For You", "Get Found Online"],
    initialService: "website-design",
    whatWeDoTitle: "What We Offer",
    whatWeDoItems: [
      "Modern, responsive website design",
      "Mobile-first and fast-loading sites",
      "Local SEO so customers can find you",
      "Clear calls-to-action that convert",
      "Security (HTTPS) and accessibility",
    ],
    whyChooseUs: [
      { title: "Websites That Work For You", description: "Your site is built to attract local customers and support your business goals, not just look good." },
      { title: "Get Found Online", description: "We structure and optimize your site so it shows up when people search for your services." },
      { title: "Modern & Maintainable", description: "Clean, standards-based design that’s easy to update and ready for the future." },
    ],
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
  "computer-repair": {
    metaTitle: "Computer Repair | PC & Mac Repair Services | Deals Of Quality",
    metaDescription: "Professional computer repair for PC and Mac. Diagnostics, virus removal, hardware upgrades, and more. Get your computer running smoothly again.",
    canonicalPath: "services/computer-repair",
    heroBadge: "Expert Computer Support",
    heroTitle: "Computer Repair",
    heroSubtitle: "PC and Mac repair, diagnostics, virus removal, and hardware upgrades. When your computer needs professional help, we're here.",
    heroImage: "/blog/computer-support-thumb.png",
    initialService: "computer-repair",
    whatWeDoTitle: "What We Do",
    whatWeDoItems: [
      "Diagnostics and troubleshooting",
      "Virus and malware removal",
      "Hardware repairs and upgrades",
      "Data backup and recovery",
      "Slow computer fixes",
      "Software installation and support",
    ],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
  "house-cleaning": {
    metaTitle: "House Cleaning Services | Professional Cleaning | Deals Of Quality",
    metaDescription: "Professional house cleaning services. Regular cleaning, deep cleaning, move-in/move-out cleaning. Reliable, insured cleaners for your home.",
    canonicalPath: "services/house-cleaning",
    heroBadge: "A+ rated Cleaning Service in LA",
    heroTitle: "House Cleaning / Maid Service",
    heroSubtitle: "Professional house cleaning tailored to your needs. Weekly, bi-weekly, or one-time deep cleans.",
    heroImage: "/cleaning-hero.jpg",
    initialService: "house-cleaning",
    whatWeDoTitle: "What We Do",
    whatWeDoItems: [
      "Regular and deep cleaning",
      "Kitchen and bathroom focus",
      "Move-in / move-out cleaning",
      "Eco-friendly products available",
      "Flexible scheduling",
    ],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
  "handyman-services": {
    metaTitle: "Handyman Services | Vetted Pros | Deals Of Quality",
    metaDescription: "Vetted handyman services. Repairs, assembly, TV mounting, and more. Licensed, insured pros ready to help.",
    canonicalPath: "services/handyman-services",
    heroBadge: "Vetted Handyman Pros",
    heroTitle: "Handyman Services",
    heroSubtitle: "Furniture assembly, repairs, TV mounting, and odd jobs. Quality work from background-checked pros.",
    heroImage: "/handyman-hero.jpg",
    initialService: "handyman-services",
    whatWeDoTitle: "What We Offer",
    whatWeDoItems: ["Furniture assembly", "Repairs and odd jobs", "TV mounting", "Fixture upgrades", "Drywall and paint touch-ups"],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
  "router-setup": {
    metaTitle: "Wi-Fi & Networking | Router Setup | Deals Of Quality",
    metaDescription: "Professional Wi-Fi and router setup. Mesh networks, dead zone elimination, and network optimization.",
    canonicalPath: "services/router-setup",
    heroBadge: "Wi-Fi & Networking",
    heroTitle: "Wi-Fi & Networking",
    heroSubtitle: "Router setup, mesh networks, and dead zone elimination. Get a strong, reliable signal everywhere.",
    heroImage: "/wifi-hero.jpg",
    initialService: "router-setup",
    whatWeDoTitle: "What We Offer",
    whatWeDoItems: ["Router setup and configuration", "Mesh network installation", "Dead zone elimination", "Network optimization"],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
  "security-cameras": {
    metaTitle: "Security Camera Setup | Professional Installation | Deals Of Quality",
    metaDescription: "Professional security camera installation. Indoor, outdoor, and smart home integration.",
    canonicalPath: "services/security-cameras",
    heroBadge: "Security & Smart Home",
    heroTitle: "Security Camera Setup",
    heroSubtitle: "Indoor and outdoor camera installation. Professional setup so you can monitor your home from anywhere.",
    heroImage: "/security-camera-hero.jpg",
    initialService: "security-cameras",
    whatWeDoTitle: "What We Offer",
    whatWeDoItems: ["Indoor and outdoor camera installation", "Video doorbell setup", "DVR/NVR configuration", "Smart home integration"],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
  "bathroom-remodeling": {
    metaTitle: "Bathroom Remodeling | Professional Renovation | Deals Of Quality",
    metaDescription: "Professional bathroom remodeling. From cosmetic updates to full renovations. Licensed, insured pros for your bathroom project.",
    canonicalPath: "services/bathroom-remodeling",
    heroBadge: "Bathroom Remodeling",
    heroTitle: "Bathroom Remodeling",
    heroSubtitle: "From cosmetic updates to full renovations. Quality work that adds value and style to your home.",
    heroImage: "/bathroom-remodel-hero.jpg",
    initialService: "bathroom-remodeling",
    whatWeDoTitle: "What We Offer",
    whatWeDoItems: ["Full and partial bathroom remodels", "Vanity and fixture installation", "Tile and flooring", "Shower and tub installation"],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  },
};

function defaultContent(slug: string, label: string, description: string): ServiceLandingContent {
  return {
    metaTitle: `${label} | Deals Of Quality`,
    metaDescription: description || `Professional ${label.toLowerCase()}. Book vetted local pros. Same-day service available.`,
    canonicalPath: `services/${slug}`,
    heroBadge: "Vetted Local Pros",
    heroTitle: label,
    heroSubtitle: description || `Quality ${label.toLowerCase()} when you need it. Licensed, insured pros ready to help.`,
    initialService: slug,
    whatWeDoTitle: "What We Offer",
    whatWeDoItems: description ? [description] : ["Professional service", "Licensed & insured pros", "Same-day availability when you need it."],
    whyChooseUs: defaultWhyChooseUs,
    howItWorks: defaultHowItWorks,
    testimonials: defaultTestimonials,
  };
}

/** Get landing content for a service slug; uses ported data or builds from catalog. */
export function getServiceLandingContent(
  slug: string,
  label: string,
  description: string
): ServiceLandingContent {
  const existing = landingBySlug[slug];
  if (existing) return existing;
  return defaultContent(slug, label, description);
}
