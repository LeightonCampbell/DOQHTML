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
    heroImage: "/plumbing-hero.png",
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
    heroImage: "/electrical-hero.png",
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
