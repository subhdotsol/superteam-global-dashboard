import { Builder, CountryStats, DashboardStats } from "./types";
import { getCountryCode, getCountryCoordinates } from "./utils";
import fs from "fs";
import path from "path";

function parseCSV(csvContent: string): Builder[] {
  const lines = csvContent.trim().split("\n");
  const headers = lines[0].split(",");

  const titleIdx = headers.indexOf("Title");
  const walletIdx = headers.indexOf("Wallet");
  const regionIdx = headers.indexOf("Region");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return {
      title: values[titleIdx]?.trim() || "",
      wallet: values[walletIdx]?.trim() || "",
      region: values[regionIdx]?.trim() || "",
      score: 0, // Will calculate when more data is available
    };
  }).filter(b => b.title && b.wallet);
}

function aggregateByCountry(builders: Builder[]): CountryStats[] {
  const countryMap = new Map<string, Builder[]>();

  builders.forEach((builder) => {
    const country = builder.region;
    if (!countryMap.has(country)) {
      countryMap.set(country, []);
    }
    countryMap.get(country)!.push(builder);
  });

  return Array.from(countryMap.entries())
    .map(([country, countryBuilders]) => ({
      country,
      countryCode: getCountryCode(country),
      builderCount: countryBuilders.length,
      totalScore: countryBuilders.reduce((sum, b) => sum + (b.score || 0), 0),
      topBuilder: countryBuilders[0],
      builders: countryBuilders,
      coordinates: getCountryCoordinates(country) || undefined,
    }))
    .sort((a, b) => b.builderCount - a.builderCount);
}

let cachedData: DashboardStats | null = null;

export function loadDashboardData(): DashboardStats {
  if (cachedData) return cachedData;

  const csvPath = path.join(process.cwd(), "src/data/members.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const builders = parseCSV(csvContent);
  const countries = aggregateByCountry(builders);

  cachedData = {
    totalBuilders: builders.length,
    totalCountries: countries.length,
    topCountry: countries[0] || null,
    countries,
  };

  return cachedData;
}

// Client-side version that expects pre-loaded data
export function parseCSVContent(csvContent: string): DashboardStats {
  const builders = parseCSV(csvContent);
  const countries = aggregateByCountry(builders);

  return {
    totalBuilders: builders.length,
    totalCountries: countries.length,
    topCountry: countries[0] || null,
    countries,
  };
}
