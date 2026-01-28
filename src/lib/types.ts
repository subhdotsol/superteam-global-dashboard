export interface Builder {
  title: string;
  wallet: string;
  region: string;
  earned?: number;
  submissions?: number;
  won?: number;
  score?: number;
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
