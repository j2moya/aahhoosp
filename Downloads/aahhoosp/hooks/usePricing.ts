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
      // The user confirmed a summative logic where all margins are added to the price.
      // For promoters, the final price is the same as the agent's. The commission is handled separately.
      totalMarginPercent += agentMargin;
    }
    
    const finalPrice = baseCost + (baseCost * (totalMarginPercent / 100));
    const pvp = baseCost + (baseCost * ((adminMargin + agentMargin + 15) / 100));

    // Correction on promoter logic: The price for the client is the same as the Agent's.
    // The commission is a portion of the profit, not an addition to the price.
    let promoterFinalPrice = baseCost + (baseCost * ((adminMargin + agentMargin) / 100));

    return { finalPrice: tier === 'PROMOTER' ? promoterFinalPrice : finalPrice, pvp };
  }, [product, config, tier]);

  return { tier, prices, ref };
};
