import { useCallback } from 'react';

// A simple hook for formatting prices. Could be extended for currency conversion, etc.
export const usePricing = () => {
  const formatPrice = useCallback((price: number, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price);
  }, []);

  return { formatPrice };
};
