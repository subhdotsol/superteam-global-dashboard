import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function truncateWallet(wallet: string, chars = 6): string {
  if (!wallet || wallet.length <= chars * 2) return wallet;
  return `${wallet.slice(0, chars)}...${wallet.slice(-chars)}`;
}

export function getCountryCode(country: string): string {
  const countryMap: Record<string, string> = {
    "India": "IN",
    "Turkey": "TR",
    "Vietnam": "VN",
    "Germany": "DE",
    "Mexico": "MX",
    "United Kingdom": "GB",
    "UAE": "AE",
    "Nigeria": "NG",
    "United States": "US",
    "Brazil": "BR",
    "France": "FR",
    "Spain": "ES",
    "Indonesia": "ID",
    "Philippines": "PH",
    "Thailand": "TH",
    "Malaysia": "MY",
    "Singapore": "SG",
    "Japan": "JP",
    "South Korea": "KR",
    "Australia": "AU",
    "Canada": "CA",
    "Netherlands": "NL",
    "Poland": "PL",
    "Ukraine": "UA",
    "Russia": "RU",
    "Argentina": "AR",
    "Colombia": "CO",
    "Pakistan": "PK",
    "Bangladesh": "BD",
    "Kenya": "KE",
    "Ghana": "GH",
    "South Africa": "ZA",
    "Egypt": "EG",
  };
  return countryMap[country] || "XX";
}

// Country coordinates for map markers
export function getCountryCoordinates(country: string): { lat: number; lng: number } | null {
  const coordsMap: Record<string, { lat: number; lng: number }> = {
    "India": { lat: 20.5937, lng: 78.9629 },
    "Turkey": { lat: 38.9637, lng: 35.2433 },
    "Vietnam": { lat: 14.0583, lng: 108.2772 },
    "Germany": { lat: 51.1657, lng: 10.4515 },
    "Mexico": { lat: 23.6345, lng: -102.5528 },
    "United Kingdom": { lat: 55.3781, lng: -3.4360 },
    "UAE": { lat: 23.4241, lng: 53.8478 },
    "Nigeria": { lat: 9.0820, lng: 8.6753 },
    "United States": { lat: 37.0902, lng: -95.7129 },
    "Brazil": { lat: -14.2350, lng: -51.9253 },
    "France": { lat: 46.2276, lng: 2.2137 },
    "Spain": { lat: 40.4637, lng: -3.7492 },
    "Indonesia": { lat: -0.7893, lng: 113.9213 },
    "Philippines": { lat: 12.8797, lng: 121.7740 },
    "Thailand": { lat: 15.8700, lng: 100.9925 },
    "Malaysia": { lat: 4.2105, lng: 101.9758 },
    "Singapore": { lat: 1.3521, lng: 103.8198 },
    "Japan": { lat: 36.2048, lng: 138.2529 },
    "South Korea": { lat: 35.9078, lng: 127.7669 },
    "Australia": { lat: -25.2744, lng: 133.7751 },
    "Canada": { lat: 56.1304, lng: -106.3468 },
    "Netherlands": { lat: 52.1326, lng: 5.2913 },
    "Poland": { lat: 51.9194, lng: 19.1451 },
    "Ukraine": { lat: 48.3794, lng: 31.1656 },
    "Russia": { lat: 61.5240, lng: 105.3188 },
    "Argentina": { lat: -38.4161, lng: -63.6167 },
    "Colombia": { lat: 4.5709, lng: -74.2973 },
    "Pakistan": { lat: 30.3753, lng: 69.3451 },
    "Bangladesh": { lat: 23.6850, lng: 90.3563 },
    "Kenya": { lat: -0.0236, lng: 37.9062 },
    "Ghana": { lat: 7.9465, lng: -1.0232 },
    "South Africa": { lat: -30.5595, lng: 22.9375 },
    "Egypt": { lat: 26.8206, lng: 30.8025 },
  };
  return coordsMap[country] || null;
}
