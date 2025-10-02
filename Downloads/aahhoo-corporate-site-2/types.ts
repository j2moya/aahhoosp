export type Language = 'en' | 'es';

export interface Service {
  title: string;
  description: string;
}

export interface ExternalLink {
  title: string;
  url: string;
  description: string;
  icon: string;
}

export interface OfficeLocation {
    city: string;
    addresses: string[];
}

export interface Associate {
    name: string;
    location: string;
}

export interface MexicoLocation {
  city: string;
  address: string;
  provider: string;
}

export interface Content {
  [key: string]: {
    tagline: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutText: string;
    servicesTitle: string;
    services: Service[];
    locationsTitle: string;
    locationsSubtitle: string;
    locations: OfficeLocation[];
    locationsMexicoLink: string;
    locationsMexicoModalTitle: string;
    associatesTitle: string;
    associatesSubtitle: string;
    associates: Associate[];
    externalLinksTitle: string;
    streamTitle: string;
    streamText: string;
    booksTitle: string;
    booksText: string;
    moreLinksTitle: string;
    moreLinksSubtitle: string;
    moreLinks: ExternalLink[];
    exploreMoreTitle: string;
    exploreMoreLinks: ExternalLink[];
    contactTitle: string;
    investmentPrice: string;
    bookingLink: string;
    callToAction: string;
    loginText: string;
    registerText: string;
    footerRights: string;
  };
}