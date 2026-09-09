import { BrandConfig, SiteContactConfig } from '../types';

export const BRAND: BrandConfig = {
  name: 'MOBIXA',
  tagline: 'Everything Mobile. All in One Place.',
  // Provide empty or placeholder URL to trigger the text-based luxury logo by default
  logoUrl: '',
  shortName: 'MOBIXA',
};

export const COLOR_THEME = {
  primary: '#8B0000', // Deep luxury burgundy
  secondary: '#EDE7C7', // Soft luxury cream champagne
  darkBg: '#0B0B0C', // Near-black deep studio
  darkSurface: '#141315', // Dark charcoal card surface
  darkBorder: '#29181B', // Deep subtle burgundy border
  burgundyGlow: 'rgba(139, 0, 0, 0.45)',
  creamGlow: 'rgba(237, 231, 199, 0.25)',
  creamText: '#EDE7C7',
  mutedCream: '#B8B298',
};

export const CONTACT: SiteContactConfig = {
  businessName: 'MOBIXA',
  category: 'Mobile Store & Service Center',
  phone: '+91 98765 43210',
  displayPhone: '+91 98765 43210',
  email: 'hello@mobixa.example',
  address: '104 Anna Salai, Technology Enclave',
  cityState: 'Chennai, Tamil Nadu 600002, India',
  hoursWeekday: 'Monday – Saturday',
  hoursTime: '9:00 AM – 8:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Anna+Salai+Chennai',
  whatsappNumber: '919876543210',
};

export const SITE_IMAGES = {
  heroFrame: 'https://github.com/jachinbakhtsingh/website-images/blob/main/images/frame_00_delay-0.1s.webp',
  heroPoster: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
  aboutImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
  repairImage: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=1200&auto=format&fit=crop',
  showroomInterior: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop',
};

export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Mobiles', href: '#mobiles' },
  { name: 'Brands', href: '#brands' },
  { name: 'Services', href: '#services' },
  { name: 'Accessories', href: '#accessories' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com/mobixa.official' },
  { name: 'Facebook', url: 'https://facebook.com/mobixa.official' },
  { name: 'YouTube', url: 'https://youtube.com/@mobixa' },
  { name: 'WhatsApp', url: 'https://wa.me/919876543210' },
];
