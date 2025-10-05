export interface Translations {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  baseCost: number;
  itemId: string;
  paypalEmail: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface PricingConfig {
  configVersion: number;
  adminMargin: number;
  agentMargin: number;
  promoterCommission: number;
}

export interface BrandConfig {
  name: string;
  slogan: {
    es: string;
    en: string;
  };
}

export interface TieredSeller {
  id: string;
  name: string;
  role: 'Agent' | 'Promoter';
}

export interface AppState {
  brand: BrandConfig;
  pricing: PricingConfig;
  products: Product[];
  sellers: TieredSeller[];
}

export type Tier = 'Admin' | 'Agent' | 'Promoter' | null;

export type PricingResult = {
  finalPrice: number;
  pvp: number;
  tier: Tier;
  ref: string | null;
  isStale: boolean;
};
