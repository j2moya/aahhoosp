import { AppState } from './types';

export const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'Handmade T-Shirt',
    price: 25.00,
    description: 'A comfortable, 100% cotton t-shirt with a unique handmade design.',
    image: 'https://via.placeholder.com/300x300.png?text=T-Shirt'
  },
  {
    id: '2',
    name: 'Crafted Mug',
    price: 15.50,
    description: 'A beautiful ceramic mug, perfect for your morning coffee.',
    image: 'https://via.placeholder.com/300x300.png?text=Mug'
  },
  {
    id: '3',
    name: 'Artisan Soap',
    price: 8.00,
    description: 'Natural soap made with essential oils.',
    image: 'https://via.placeholder.com/300x300.png?text=Soap'
  },
];

export const DEFAULT_APP_STATE: AppState = {
  products: DEFAULT_PRODUCTS,
  businessDetails: {
    name: 'My Pop-Up Store',
    whatsapp: '+1234567890',
    paypal: 'your-paypal-email@example.com',
  },
  appearance: {
    primaryColor: '#3498db',
    font: 'Arial, sans-serif',
  },
  title: 'Welcome to My Store!',
  subtitle: 'Check out our amazing handmade products.',
};
