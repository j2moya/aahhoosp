import { AppState, Tier, PricingResult, PricingConfig } from '../types';

const PVP_MARGIN = 0.15; // 15% higher than the highest possible price

const decodeConfig = (cfg: string): PricingConfig | null => {
  try {
    const decoded = atob(cfg);
    const parsed = JSON.parse(decoded);
    if (
      typeof parsed.v === 'number' &&
      typeof parsed.a === 'number' &&
      typeof parsed.g === 'number' &&
      typeof parsed.p === 'number'
    ) {
      return {
        configVersion: parsed.v,
        adminMargin: parsed.a,
        agentMargin: parsed.g,
        promoterCommission: parsed.p,
      };
    }
    return null;
  } catch (e) {
    return null;
  }
};


export const usePricing = (productBaseCost: number, appState: AppState): PricingResult => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  const promoter = params.get('promoter');
  const cfg = params.get('cfg');

  const linkConfig = cfg ? decodeConfig(cfg) : null;
  const currentConfig = appState.pricing;

  const isStale = linkConfig ? linkConfig.configVersion !== currentConfig.configVersion : false;

  const configToUse = linkConfig || currentConfig;

  let tier: Tier = 'Admin';
  let finalPrice = productBaseCost * (1 + configToUse.adminMargin / 100);
  let refId = null;

  if (ref) {
    tier = 'Agent';
    finalPrice += productBaseCost * (configToUse.agentMargin / 100);
    refId = ref;
  } else if (promoter) {
    tier = 'Promoter';
    finalPrice += productBaseCost * (configToUse.agentMargin / 100) + productBaseCost * (configToUse.promoterCommission / 100);
    refId = promoter;
  }
  
  const promoterPrice = productBaseCost * (1 + (configToUse.adminMargin + configToUse.agentMargin + configToUse.promoterCommission) / 100);
  const pvp = promoterPrice * (1 + PVP_MARGIN);

  return {
    finalPrice: parseFloat(finalPrice.toFixed(2)),
    pvp: parseFloat(pvp.toFixed(2)),
    tier,
    ref: refId,
    isStale
  };
};
