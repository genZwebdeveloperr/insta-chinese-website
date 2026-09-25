/**
 * Centralized business details and client-editable content for Insta Chinese.
 * Adheres strictly to verified business parameters:
 * - Name: Insta Chinese
 * - Location: Dehradun, Uttarakhand, India
 * - Phone: +91 97601 24125
 */

import heroImg from '../assets/images/hero_wok_sizzle_1790362173781.jpg';
import noodlesImg from '../assets/images/dish_szechuan_noodles_1790362187086.jpg';
import dimsumImg from '../assets/images/dish_dim_sum_dumplings_1790362200038.jpg';
import manchurianImg from '../assets/images/dish_crispy_manchurian_1790362211700.jpg';
import interiorImg from '../assets/images/dining_ambience_interior_1790362223492.jpg';

export const RESTAURANT_INFO = {
  name: 'Insta Chinese',
  city: 'Dehradun',
  state: 'Uttarakhand',
  country: 'India',
  displayLocation: 'Dehradun, Uttarakhand, India',
  phoneDisplay: '+91 97601 24125',
  phoneTel: 'tel:+919760124125',
  rawPhone: '919760124125',
  whatsappUrl: 'https://wa.me/919760124125?text=Hello%20Insta%20Chinese%2C%20I%20would%20like%20to%20inquire%20about%20your%20menu%20and%20dining%20options.',
  cuisineType: 'Chinese & Asian Cuisine',
};

export const RESTAURANT_IMAGES = {
  hero: heroImg,
  noodles: noodlesImg,
  dimsum: dimsumImg,
  manchurian: manchurianImg,
  interior: interiorImg,
};

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'main-course' | 'noodles' | 'rice' | 'specials' | 'beverages';
  description: string;
  priceFormatted: string;
  dietary: 'veg' | 'non-veg' | 'special';
  spicyLevel?: number; // 0 to 3
  image?: string;
  isPopular?: boolean;
}

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Full Menu' },
  { id: 'starters', label: 'Starters' },
  { id: 'main-course', label: 'Main Course' },
  { id: 'noodles', label: 'Noodles' },
  { id: 'rice', label: 'Rice' },
  { id: 'specials', label: 'Chinese Specials' },
  { id: 'beverages', label: 'Beverages' },
] as const;

/**
 * Replaceable sample menu items for client demo.
 * Easily adjusted to exact menu upon client provision.
 */
export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Steamed Classic Dumplings',
    category: 'starters',
    description: 'Delicate wrappers stuffed with seasoned fresh fillings, served with house red chili dipping oil.',
    priceFormatted: '₹220',
    dietary: 'veg',
    spicyLevel: 1,
    image: dimsumImg,
    isPopular: true,
  },
  {
    id: 'starter-2',
    name: 'Crispy Veg Spring Rolls',
    category: 'starters',
    description: 'Golden-fried crispy rolls loaded with julienned vegetables and aromatic Asian spices.',
    priceFormatted: '₹180',
    dietary: 'veg',
    spicyLevel: 0,
    isPopular: false,
  },
  {
    id: 'starter-3',
    name: 'Wok-Tossed Chili Paneer Dry',
    category: 'starters',
    description: 'Succulent cubes tossed at high flame with crisp bell peppers, shallots, and spicy soy reduction.',
    priceFormatted: '₹260',
    dietary: 'veg',
    spicyLevel: 2,
    image: manchurianImg,
    isPopular: true,
  },
  {
    id: 'starter-4',
    name: 'Crispy Honey Chili Potatoes',
    category: 'starters',
    description: 'Crisp hand-cut potato wedges glazed in a sweet chili reduction with toasted white sesame.',
    priceFormatted: '₹190',
    dietary: 'veg',
    spicyLevel: 1,
    isPopular: false,
  },

  // Main Course
  {
    id: 'main-1',
    name: 'Vegetable Manchurian Gravy',
    category: 'main-course',
    description: 'Handmade vegetable dumplings simmered in a dark, aromatic coriander garlic ginger gravy.',
    priceFormatted: '₹240',
    dietary: 'veg',
    spicyLevel: 1,
    image: manchurianImg,
    isPopular: true,
  },
  {
    id: 'main-2',
    name: 'Paneer in Hot Garlic Sauce',
    category: 'main-course',
    description: 'Fresh paneer tossed with scallions and crushed red chillies in a pungent garlic glaze.',
    priceFormatted: '₹270',
    dietary: 'veg',
    spicyLevel: 3,
    isPopular: false,
  },
  {
    id: 'main-3',
    name: 'Exotic Greens in Black Bean Sauce',
    category: 'main-course',
    description: 'Broccoli, mushrooms, bok choy, and baby corn wok-seared in rich fermented black bean gravy.',
    priceFormatted: '₹290',
    dietary: 'veg',
    spicyLevel: 1,
    isPopular: false,
  },

  // Noodles
  {
    id: 'noodle-1',
    name: 'Signature Szechuan Chili Noodles',
    category: 'noodles',
    description: 'Wok-charred noodles infused with crushed Sichuan peppercorns, scallions, and chili crisp oil.',
    priceFormatted: '₹230',
    dietary: 'special',
    spicyLevel: 3,
    image: noodlesImg,
    isPopular: true,
  },
  {
    id: 'noodle-2',
    name: 'Classic Hakka Veg Noodles',
    category: 'noodles',
    description: 'Lightly seasoned noodles stir-fried with shredded cabbage, carrots, and subtle white pepper.',
    priceFormatted: '₹190',
    dietary: 'veg',
    spicyLevel: 0,
    isPopular: false,
  },
  {
    id: 'noodle-3',
    name: 'Pan-Fried Crispy Noodles',
    category: 'noodles',
    description: 'Crispy noodle nest crowned with a savory vegetable chop suey gravy.',
    priceFormatted: '₹250',
    dietary: 'veg',
    spicyLevel: 1,
    isPopular: false,
  },

  // Rice
  {
    id: 'rice-1',
    name: 'Yangzhou Style Fried Rice',
    category: 'rice',
    description: 'Fragrant basmati wok-tossed with sweet green peas, crisp vegetables, and subtle soy essence.',
    priceFormatted: '₹210',
    dietary: 'veg',
    spicyLevel: 0,
    isPopular: true,
  },
  {
    id: 'rice-2',
    name: 'Burnt Garlic Fried Rice',
    category: 'rice',
    description: 'Slow-browned garlic crisps tossed through hot jasmine rice with fresh spring greens.',
    priceFormatted: '₹220',
    dietary: 'veg',
    spicyLevel: 1,
    isPopular: false,
  },
  {
    id: 'rice-3',
    name: 'Spicy Szechuan Fried Rice',
    category: 'rice',
    description: 'Fiery wok-tossed rice with chili paste, diced peppers, and cracked black pepper.',
    priceFormatted: '₹230',
    dietary: 'veg',
    spicyLevel: 2,
    isPopular: false,
  },

  // Chinese Specials
  {
    id: 'special-1',
    name: 'Chef’s Special Wok Master Bowl',
    category: 'specials',
    description: 'A layered signature bowl featuring hand-pulled noodles, braised greens, and house chili broth.',
    priceFormatted: '₹310',
    dietary: 'special',
    spicyLevel: 2,
    image: heroImg,
    isPopular: true,
  },
  {
    id: 'special-2',
    name: 'Crispy Mushroom & Baby Corn Salt ‘n Pepper',
    category: 'specials',
    description: 'Crunchy battered buttons and baby corn tossed in cracked pepper, roasted garlic, and scallions.',
    priceFormatted: '₹260',
    dietary: 'veg',
    spicyLevel: 1,
    isPopular: false,
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Fresh Lemongrass Iced Tea',
    category: 'beverages',
    description: 'Cold-steeped black tea infused with bruised Himalayan lemongrass and citrus zest.',
    priceFormatted: '₹120',
    dietary: 'veg',
    spicyLevel: 0,
    isPopular: true,
  },
  {
    id: 'bev-2',
    name: 'Classic Virgin Mojito',
    category: 'beverages',
    description: 'Muddled fresh garden mint, lime wedges, and sparkling soda over crushed ice.',
    priceFormatted: '₹130',
    dietary: 'veg',
    spicyLevel: 0,
    isPopular: false,
  },
];

export const SIGNATURE_DISHES = [
  {
    id: 'sig-1',
    title: 'Szechuan Wok Noodles',
    subtitle: 'Flames, Peppercorn & Scallion',
    description: 'High-heat wok-tossed noodles coated in aromatic chili oil with crunchy greens and toasted sesame.',
    image: noodlesImg,
    tag: 'Wok Signature',
  },
  {
    id: 'sig-2',
    title: 'Handmade Steamed Dim Sum',
    subtitle: 'Bamboo Basket Freshness',
    description: 'Tender steamed parcels packed with fine seasonings and served with house red chili reduction.',
    image: dimsumImg,
    tag: 'Hand-Crafted',
  },
  {
    id: 'sig-3',
    title: 'Crispy Glazed Manchurian',
    subtitle: 'Aromatic Garlic & Shallot Wok',
    description: 'Golden vegetable dumplings bathed in a savory, balanced ginger and spring onion glaze.',
    image: manchurianImg,
    tag: 'Classic Favorite',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'High Heat Wok Sizzle',
    caption: 'The essence of wok hei over roaring culinary flames',
    image: heroImg,
    span: 'col-span-12 md:col-span-7',
    aspect: 'aspect-video md:aspect-[16/10]',
  },
  {
    id: 'gal-2',
    title: 'Artisanal Steamed Dim Sum',
    caption: 'Delicate wrappers folded fresh daily',
    image: dimsumImg,
    span: 'col-span-12 md:col-span-5',
    aspect: 'aspect-square md:aspect-[4/5]',
  },
  {
    id: 'gal-3',
    title: 'Spicy Szechuan Bowls',
    caption: 'Silky noodles, chili crisp, and toasted sesame aromatics',
    image: noodlesImg,
    span: 'col-span-12 md:col-span-5',
    aspect: 'aspect-square md:aspect-[4/5]',
  },
  {
    id: 'gal-4',
    title: 'Intimate Dining Atmosphere',
    caption: 'A welcoming space for family, friends, and gatherings in Dehradun',
    image: interiorImg,
    span: 'col-span-12 md:col-span-7',
    aspect: 'aspect-video md:aspect-[16/10]',
  },
];
