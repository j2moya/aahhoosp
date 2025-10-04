
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

export interface AppState {
  products: Product[];
  config: PricingConfig;
}

export type UserTier = 'PUBLIC' | 'AGENT' | 'PROMOTER';

export interface CalculatedPrices {
  finalPrice: number;
  pvp: number;
}