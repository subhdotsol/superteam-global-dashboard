export interface Builder {
  title: string;
  wallet: string;
  region: string;
  role?: string;
  bio?: string;
  avatar?: string;
  earned?: number;
  submissions?: number;
  won?: number;
  score?: number;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  skills?: string[];
}

export interface CountryStats {
  country: string;
  countryCode: string;
  builderCount: number;
  totalScore: number;
  topBuilder?: Builder;
  builders: Builder[];
  coordinates?: { lat: number; lng: number };
}

export interface DashboardStats {
  totalBuilders: number;
  totalCountries: number;
  topCountry: CountryStats | null;
  countries: CountryStats[];
}
