/**
 * City slugs and display names for TV Mounting spoke pages.
 * Legacy URLs: /services/tv-mounting-{slug}/
 */

export const TV_MOUNTING_CITIES: { slug: string; name: string }[] = [
  { slug: "beverly-hills", name: "Beverly Hills" },
  { slug: "brentwood", name: "Brentwood" },
  { slug: "burbank", name: "Burbank" },
  { slug: "culver-city", name: "Culver City" },
  { slug: "encino", name: "Encino" },
  { slug: "glendale", name: "Glendale" },
  { slug: "hollywood", name: "Hollywood" },
  { slug: "los-angeles", name: "Los Angeles" },
  { slug: "malibu", name: "Malibu" },
  { slug: "manhattan-beach", name: "Manhattan Beach" },
  { slug: "marina-del-rey", name: "Marina Del Rey" },
  { slug: "pacific-palisades", name: "Pacific Palisades" },
  { slug: "pasadena", name: "Pasadena" },
  { slug: "santa-monica", name: "Santa Monica" },
  { slug: "sherman-oaks", name: "Sherman Oaks" },
  { slug: "silver-lake", name: "Silver Lake" },
  { slug: "studio-city", name: "Studio City" },
];

export function getServiceAreaText(cityName: string): string {
  if (cityName === "Los Angeles") {
    return "Serving Hollywood, Silver Lake, Downtown, Beverly Hills, Santa Monica, Pasadena, Burbank, Glendale, West Hollywood, Echo Park, Los Feliz, Studio City, Sherman Oaks, Encino, Venice, Culver City & other neighborhoods.";
  }
  return `Serving ${cityName} and surrounding neighborhoods.`;
}

export const TV_MOUNTING_FAQS = [
  { q: "Do you provide the mount?", a: "Yes! You can select 'Supply Mount' in the form, or we can install one you already bought." },
  { q: "Can you hide wires without cutting the wall?", a: "Yes, we offer external raceways (covers) or in-wall concealment. Select your preference when booking." },
  { q: "Do you install Samsung The Frame TVs?", a: "Absolutely. We are experts in the specific 'No Gap' flush mounts required for Frame TVs." },
  { q: "Can you dismount my old TV?", a: "Yes, simply check the 'Dismount Old TV' option when getting your quote." },
];

export const TV_MOUNTING_REVIEWS = [
  { quote: "In just 4 hours, we managed to install 3 TVs and set up new Wi-Fi in our new office. The pro was professional and knew exactly what he was doing.", author: "Mark L.", rating: 5, location: "Los Angeles, CA" },
  { quote: "They mounted our 75-inch TV above the fireplace perfectly. The cables are hidden, everything is level, and they even helped us set up the soundbar. Couldn't be happier!", author: "David P.", rating: 5, location: "Denver, CO" },
  { quote: "They installed our Samsung The Frame with the no-gap mount. Looks like art on the wall. Very clean install.", author: "Sarah M.", rating: 5, location: "Burbank, CA" },
];
