import clientConfig from '../config/client.yaml';

export interface ClientConfig {
  business: {
    name: string;
    legal_name: string;
    slogan: Record<string, string>;
    founded: number;
    uid: string;
    logo: string;
    favicon: string;
  };
  i18n: {
    default: string;
    available: string[];
  };
  contact: {
    phone: string;
    phone_display: string;
    email: string;
    whatsapp: string | null;
    website: string;
  };
  location: {
    street: string;
    zip: string;
    city: string;
    canton: string;
    country: string;
    geo: { lat: number; lng: number };
    google_maps_embed: string;
    google_place_id: string;
  };
  hours: Array<{ days: string; time: string }>;
  appointment_note?: Record<string, string>;
  emergency: { enabled: boolean; phone: string };
  theme: {
    primary: string;
    secondary: string;
    accent?: string;
    bg?: string;
    bg_alt?: string;
    text_heading?: string;
    text_body?: string;
    divider?: string;
    bg_mode: string;
    card_style: string;
    site_bg?: string;
    hero_bg: string;
    hero_portrait?: string;
    hero_portrait_cutout?: string;
    hero_overlay: number;
    border_radius: string;
    font: string;
  };
  reviews: { average: number; count: number; source: string };
  services: Array<{
    icon: string;
    title: Record<string, string>;
    description: Record<string, string>;
  }>;
  trust: {
    reasons: Array<Record<string, string>>;
    certifications: string[];
    memberships: Array<{ name: string; logo: string }>;
  };
  gallery: Array<{ image: string; alt: Record<string, string> }>;
  testimonials: Array<{
    name: string;
    location: string;
    rating: number;
    text: Record<string, string>;
    date: string;
  }>;
  team: {
    show: boolean;
    members: Array<{
      name: string;
      role: Record<string, string>;
      image: string;
    }>;
  };
  faq: Array<{
    question: Record<string, string>;
    answer: Record<string, string>;
  }>;
  cta: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    action: string;
    url?: string;
    email?: {
      subject: Record<string, string>;
      body: Record<string, string>;
    };
  };
  cards: string[];
  seo: {
    title: Record<string, string>;
    description: Record<string, string>;
    keywords: Record<string, string[]>;
    og_image: string;
    schema_type: string;
    service_area: string[];
  };
  analytics?: {
    google?: {
      gtag_id?: string;
    };
  };
}

export const config = clientConfig as unknown as ClientConfig;

export function t(field: Record<string, string> | string, lang: string): string {
  if (typeof field === 'string') return field;
  return (
    field[lang] ||
    field[config.i18n.default] ||
    Object.values(field)[0] ||
    ''
  );
}

