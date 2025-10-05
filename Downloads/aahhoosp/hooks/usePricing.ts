import { useMemo } from 'react';
import { Product, PricingConfig, UserTier, CalculatedPrices } from '../types';

export const usePricing = (product: Product, config: PricingConfig): { tier: UserTier; prices: CalculatedPrices; ref: string } => {
  const { tier, ref } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    const promoterParam = params.get('promoter');
    
    let currentTier: UserTier = 'PUBLIC';
    if (promoterParam) {
      currentTier = 'PROMOTER';
    } else if (refParam) {
      currentTier = 'AGENT';
    }
    
    return { tier: currentTier, ref: refParam || promoterParam || 'Admin' };
  }, []);

  const prices = useMemo<CalculatedPrices>(() => {
    const { baseCost } = product;
    const { adminMargin, agentMargin, promoterCommission } = config;

    let totalMarginPercent = adminMargin;

    if (tier === 'AGENT') {
      totalMarginPercent += agentMargin;
    } else if (tier === 'PROMOTER') {
      // CORRECTED LOGIC: All margins and commissions are added for the promoter's final client price.
      totalMarginPercent += agentMargin + promoterCommission;
    }
    
    const finalPrice = baseCost + (baseCost * (totalMarginPercent / 100));
    
    // PVP is a suggested retail price, set slightly higher than the max possible price for a good "sale" effect.
    const pvp = baseCost + (baseCost * ((adminMargin + agentMargin + promoterCommission + 15) / 100));

    return { finalPrice, pvp };
  }, [product, config, tier]);

  return { tier, prices, ref };
};
