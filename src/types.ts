export interface BrandConfig {
  name: string;
  tagline: string;
  logoUrl?: string;
  shortName: string;
}

export interface SiteContactConfig {
  businessName: string;
  category: string;
  phone: string;
  displayPhone: string;
  email: string;
  address: string;
  cityState: string;
  hoursWeekday: string;
  hoursTime: string;
  googleMapsUrl: string;
  whatsappNumber: string;
}

export interface FrameConfigType {
  firstFrameUrl: string;
  totalFrames: number;
  filenamePattern: string;
}

export interface SmartphoneProduct {
  id: string;
  brand: string;
  name: string;
  description: string;
  badge?: string;
  price: string;
  originalPrice?: string;
  image: string;
  specs: {
    display: string;
    processor: string;
    camera: string;
    battery: string;
    storage: string;
  };
  colors: { name: string; hex: string }[];
  storageOptions: string[];
}

export interface BrandItem {
  id: string;
  name: string;
  tagline: string;
  logoUrl?: string;
  monogram: string;
  popularModels: string[];
}

export interface RepairServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  turnaround: string;
  warranty: string;
  startingPrice: string;
  popularFor: string;
}

export interface RepairStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface AccessoryCategory {
  id: string;
  name: string;
  count: number;
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  features: string[];
  inStock: boolean;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  device: string;
  serviceType: string;
  rating: number;
}
