import { AppState } from './types';

export const WHATSAPP_NUMBER = "17865644249";
export const ADMIN_PASSWORD = "DrMoya2025"; // Updated Password

export const DEFAULT_APP_STATE: AppState = {
  products: [
    {
      id: "prod1",
      name: "Crema para Vitiligo",
      description: "Tratamiento especializado para la pigmentación de la piel.",
      baseCost: 45,
      itemID: "VIT-CREAM-001",
      paypalBusinessId: "paypal-business-email@example.com",
      imageUrl: "https://aahhoo.com/assets/img/vitiligo-cream.jpg",
      videoUrl: "https://aahhoo.com/assets/videos/vitiligo-demo.mp4"
    },
    {
      id: "prod2",
      name: "Suplemento Energético",
      description: "Fórmula avanzada para potenciar tu vitalidad diaria.",
      baseCost: 30,
      itemID: "ENERGY-SUP-002",
      paypalBusinessId: "paypal-business-email@example.com",
      imageUrl: "https://aahhoo.com/assets/img/energy-supplement.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: "prod3",
        name: "Kit de Crecimiento Capilar",
        description: "Solución integral para un cabello más fuerte y saludable.",
        baseCost: 65,
        itemID: "HAIR-GROWTH-003",
        paypalBusinessId: "paypal-business-email@example.com",
        imageUrl: "https://aahhoo.com/assets/img/hair-growth-kit.jpg",
        videoUrl: ""
    }
  ],
  config: {
    brandName: "AAHHOO Corp.",
    slogan: "resolver problemas, cumplir deseos y crear nuevos futuros.",
    adminMargin: 20,
    agentMargin: 20,
    promoterCommission: 10
  },
  sellers: []
};
