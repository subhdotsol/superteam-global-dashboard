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

  const builders = lines.slice(1).map((line) => {
    const values = line.split(",");
    return {
      title: values[titleIdx]?.trim() || "",
      wallet: values[walletIdx]?.trim() || "",
      region: values[regionIdx]?.trim() || "",
      score: 0,
      role: "Member",
      earned: 0,
      submissions: 0,
      won: 0,
      skills: ["Solana", "Rust"],
    };
  }).filter(b => b.title && b.wallet);

  // Mock Data Injection for specific demo users
  const mockBuilders: Builder[] = [
    {
      title: "Subhajit Chaudhury",
      wallet: "8WjXrdfSLKt9kk58w3AHMLdm4GNigRW3ub8SHy88KSTp",
      region: "India",
      role: "Superteam Member",
      bio: "Full stack developer building on Solana. Obsessed with performance and clean code.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60", // Placeholder for Subhajit
      earned: 0,
      submissions: 5,
      won: 0,
      score: 50,
      socials: {
        twitter: "@subhdotsol",
        linkedin: "linkedin.com/in/subh",
        github: "github.com/subh",
        website: "subh.sol",
      },
      skills: ["Anchor", "Rust", "Solana", "Borsh", "Serde", "Poem", "Diesel", "Solidity", "Foundry", "Prisma", "TailwindCSS", "Next.js", "TypeScript", "Bun.js", "Postgres", "NextAuth", "Docker", "Websockets", "Redis"],
    },
    {
      title: "Alex Turner",
      wallet: "8Wj...Mock",
      region: "United Kingdom",
      role: "Creative Director",
      bio: "Creative Director at Superteam UK. Building the next generation of Solana consumer apps.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60",
      earned: 160000,
      submissions: 24,
      won: 12,
      score: 1200,
      socials: {
        twitter: "https://x.com",
        github: "https://github.com",
      },
      skills: ["Design", "UI/UX", "Frontend", "React"],
    },
    {
      title: "Jone Doe",
      wallet: "G7x...Mock",
      region: "United Kingdom",
      role: "Full Stack Developer",
      bio: "Passionate about decentralized systems and high-frequency trading.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
      earned: 4500,
      submissions: 10,
      won: 2,
      score: 450,
      socials: {
        twitter: "https://x.com",
      },
      skills: ["Rust", "Solana", "TypeScript"],
    },
    {
      title: "Subhajit Chaudhury",
      wallet: "8WjXrdfSLKt9kk58w3AHMLdm4GNigRW3ub8SHy88KSTp",
      region: "India",
      role: "Superteam Member",
      bio: "Full stack developer building on Solana. Obsessed with performance and clean code.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60", // Placeholder for Subhajit
      earned: 0,
      submissions: 5,
      won: 0,
      score: 50,
      socials: {
        twitter: "@subhdotsol",
        linkedin: "linkedin.com/in/subh",
        github: "github.com/subh",
        website: "subh.sol",
      },
      skills: ["Anchor", "Rust", "Solana", "Borsh", "Serde", "Poem", "Diesel", "Solidity", "Foundry", "Prisma", "TailwindCSS", "Next.js", "TypeScript", "Bun.js", "Postgres", "NextAuth", "Docker", "Websockets", "Redis"],
    }
  ];

  // Merge mock builders. For demo purposes, we ensure they appear in their regions.
  // We'll prepend them so they show up at the top of lists.
  return [...mockBuilders, ...builders];
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
