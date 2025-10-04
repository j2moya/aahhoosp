
import { useMemo } from 'react';
import { Product, PricingConfig, UserTier, CalculatedPrices } from '../types';

export const usePricing = (product: Product, config: PricingConfig): { tier: UserTier; prices: CalculatedPrices } => {
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
      // The user confirmed a summative logic where all margins are added to the price.
      totalMarginPercent += agentMargin + promoterCommission;
    }

    const finalPrice = baseCost + (baseCost * (totalMarginPercent / 100));
    
    // Calculate a higher "P.V.P" to show as a striked-out price
    const pvp = baseCost + (baseCost * ((adminMargin + agentMargin + promoterCommission + 15) / 100));

    return { finalPrice, pvp };
  }, [product, config, tier]);

  return { tier, prices };
};
