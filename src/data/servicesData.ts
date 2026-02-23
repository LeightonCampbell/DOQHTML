/**
 * Service catalog for static path generation and navigation.
 * Ported from legacy React servicesData; no React/Lucide dependencies.
 */

export interface ServiceItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  badge?: "New" | "Hot";
}

export interface ServiceCategory {
  title: string;
  services: ServiceItem[];
}

/** Slug derived from href (e.g. /services/plumbing/ -> plumbing). Silo: all service hrefs live under /services/. */
export function hrefToSlug(href: string): string {
  const path = href.replace(/^\/|\/$/g, "") || "home";
  return path.startsWith("services/") ? path.replace(/^services\//, "") : path;
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Home Improvement & Outdoor",
    services: [
      { id: "handyman", label: "Handyman Services", href: "/services/handyman-services/", description: "Furniture assembly, repairs & odd jobs" },
      { id: "painting", label: "Painting (Interior & Exterior)", href: "/services/painting/", description: "Interior and exterior painting services" },
      { id: "kitchen-remodeling", label: "Kitchen Remodeling", href: "/services/kitchen-remodeling/", badge: "Hot", description: "Complete kitchen renovation services" },
      { id: "bathroom-remodeling", label: "Bathroom Remodeling", href: "/services/bathroom-remodeling/", description: "Bathroom renovation and remodeling" },
      { id: "landscaping", label: "Landscaping", href: "/services/landscaping/", description: "Landscape design and maintenance" },
      { id: "smart-irrigation", label: "Smart Irrigation", href: "/services/smart-irrigation-installation/", description: "Smart irrigation system installation" },
      { id: "fence-gate", label: "Fence & Gate Installation", href: "/services/fence-installation/", description: "Fence and gate installation services" },
      { id: "holiday-lighting", label: "Holiday Lighting", href: "/services/holiday-lighting-installation/", description: "Holiday lighting installation and removal" },
    ],
  },
  {
    title: "Cleaning & Property Care",
    services: [
      { id: "house-cleaning", label: "House Cleaning / Maid Service", href: "/services/house-cleaning/", badge: "Hot", description: "Professional house cleaning and maid services" },
      { id: "carpet-cleaning", label: "Carpet Cleaning", href: "/services/carpet-cleaning/", description: "Professional carpet cleaning services" },
      { id: "window-cleaning", label: "Window Cleaning", href: "/services/window-cleaning/", description: "Interior and exterior window cleaning" },
      { id: "gutter-cleaning", label: "Gutter Cleaning", href: "/services/gutter-cleaning/", description: "Professional gutter cleaning services" },
      { id: "pressure-washing", label: "Pressure Washing", href: "/services/pressure-washing/", description: "Exterior cleaning & maintenance" },
      { id: "junk-removal", label: "Junk Removal", href: "/services/junk-removal/", description: "Junk and debris removal services" },
    ],
  },
  {
    title: "Repairs & Electrical",
    services: [
      { id: "plumbing", label: "Plumbing Services", href: "/services/plumbing/", description: "Repairs, installations & emergencies" },
      { id: "electrical", label: "Electrical Services", href: "/services/electrical/", description: "Safe, licensed electrical work" },
      { id: "light-fixture", label: "Light Fixture Replacement", href: "/services/light-fixture-replacement/", description: "Safe, licensed electrical work" },
      { id: "hvac", label: "HVAC (Heating & Air)", href: "/services/hvac/", description: "HVAC installation, repair, and maintenance" },
      { id: "appliance-repair", label: "Appliance Repair", href: "/services/appliance-repair/", description: "Professional appliance repair services" },
      { id: "roofing", label: "Roofing", href: "/services/roofing/", description: "Roofing installation and repair" },
      { id: "drywall-repair", label: "Drywall Repair", href: "/services/drywall-installation/", description: "Drywall installation and repair" },
    ],
  },
  {
    title: "Smart Home & Security",
    services: [
      { id: "wifi-networking", label: "Wi-Fi & Networking", href: "/services/router-setup/", badge: "Hot", description: "Setup, optimization & dead zones" },
      { id: "security-cameras", label: "Security Camera Setup", href: "/services/security-cameras/", badge: "Hot", description: "Professional camera installation" },
      { id: "video-doorbell", label: "Video Doorbell Setup", href: "/services/video-doorbells/", description: "Video doorbell installation" },
      { id: "smart-lock", label: "Smart Lock Install", href: "/services/smart-locks/", description: "Smart lock installation and setup" },
      { id: "smart-thermostats", label: "Smart Thermostats", href: "/services/smart-thermostats/", description: "Smart thermostat installation" },
      { id: "smart-home-integration", label: "Smart Home Integration", href: "/services/smart-home-integration/", description: "Complete smart home system integration" },
      { id: "motion-sensors", label: "Motion Sensors", href: "/services/motion-sensors/", description: "Motion sensor installation and setup" },
      { id: "smoke-detector", label: "Smoke Detector Install", href: "/services/smoke-detector-installation/", description: "Smoke detector installation and testing" },
    ],
  },
  {
    title: "TV Mounting & Entertainment",
    services: [
      { id: "tv-cable-concealment", label: "TV Cable Concealment", href: "/services/tv-cable-concealment/", description: "Hide and organize TV cables professionally" },
      { id: "soundbar-installation", label: "Soundbar Installation", href: "/services/soundbar-installation/", description: "Professional soundbar installation and setup" },
      { id: "tv-dismount-remount", label: "TV Dismount & Remount", href: "/services/tv-dismount-remount/", description: "TV removal and reinstallation services" },
      { id: "home-theater", label: "Home Theater Setup", href: "/services/home-theater/", description: "Surround sound & streaming setup" },
      { id: "surround-sound", label: "Surround Sound", href: "/services/surround-sound/", description: "Surround sound system installation" },
      { id: "gaming-setup", label: "Gaming Setup", href: "/services/gaming-setup/", description: "Gaming console setup and optimization" },
      { id: "streaming-setup", label: "Streaming Setup", href: "/services/streaming-setup/", description: "Streaming device setup and configuration" },
    ],
  },
  {
    title: "Computers & Printers",
    services: [
      { id: "computer-repair", label: "Computer Repair", href: "/services/computer-repair/", description: "PC and Mac repair services" },
      { id: "virus-removal", label: "Virus Removal", href: "/services/virus-removal/", description: "Virus and malware removal services" },
      { id: "printer-setup", label: "Printer Setup", href: "/services/printer-setup/", description: "Printer installation and configuration" },
      { id: "data-backup", label: "Data Backup", href: "/services/data-backup/", description: "Data backup and recovery services" },
    ],
  },
  {
    title: "Business Services",
    services: [
      { id: "website-design", label: "Website Design", href: "/services/website-design/", description: "Professional website design for businesses" },
      { id: "remote-support", label: "Remote Support", href: "/remote-support/", description: "Remote technical support services" },
      { id: "business-it-solutions", label: "Business IT Solutions", href: "/services/business-it-solutions/", description: "Complete IT solutions for businesses" },
      { id: "custom-solutions", label: "Custom Solutions", href: "/services/custom-solutions/", description: "Custom technology solutions" },
    ],
  },
];

/** Flatten all services; each has slug from href for getStaticPaths */
export const allServices = serviceCategories.flatMap((cat) =>
  cat.services.map((s) => ({ ...s, slug: hrefToSlug(s.href) }))
);
