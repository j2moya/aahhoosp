export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface BusinessDetails {
  name: string;
  whatsapp: string;
  paypal: string;
}

export interface Appearance {
  primaryColor: string;
  font: string;
}

export interface AppState {
  products: Product[];
  businessDetails: BusinessDetails;
  appearance: Appearance;
  title: string;
  subtitle: string;
}
