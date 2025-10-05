export interface Product {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  itemID: string;
  paypalBusinessId: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface PricingConfig {
  brandName: string;
  slogan: string;
  adminMargin: number;
  agentMargin: number;
  promoterCommission: number;
}

export interface TieredSeller {
  id: string;
  name: string;
  tier: 'agent' | 'promoter';
}

export interface AppState {
  products: Product[];
  config: PricingConfig;
  sellers: TieredSeller[];
}

export type UserTier = 'PUBLIC' | 'AGENT' | 'PROMOTER';

export interface CalculatedPrices {
  finalPrice: number;
  pvp: number;
}
