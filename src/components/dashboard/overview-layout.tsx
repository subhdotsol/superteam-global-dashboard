"use client";

import { useDashboard } from "./dashboard-state-provider";
import { WorldMap } from "./world-map";
import { CountryStats } from "@/lib/types";
import Image from "next/image";

interface OverviewLayoutProps {
    countries: CountryStats[];
    defaultCenter?: [number, number];
}

// Country logo mapping with correct extensions
const COUNTRY_LOGOS: Record<string, string> = {
    "India": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/india.jpg",
    "Germany": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/germany.jpg",
    "Nigeria": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/nigeria.png",
    "Brazil": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/brazil.png",
    "Kazakhstan": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/kazakhstan.png",
    "Malaysia": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/malaysia.png",
    "Balkan": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/balkan.png",
    "South Korea": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/korea.png",
    "Korea": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/korea.png",
    "Canada": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/canada.png",
    "Singapore": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/singapore.png",
    "Poland": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/poland.png",
    "Indonesia": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/indonesia.png",
    "Netherlands": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/netherlands.jpg",
    "Japan": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/japan.png",
    "UK": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/uk.png",
    "United Kingdom": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/uk.png",
    "UAE": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/uae.png",
    "United Arab Emirates": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/uae.png",
    "Georgia": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/georgia.png",
    "Ireland": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/ireland.png",
    "Spain": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/spain.jpg",
    "Ukraine": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/ukraine.jpg",
};

export function OverviewLayout({ countries, defaultCenter }: OverviewLayoutProps) {
    const { selectCountry } = useDashboard();

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] bg-black">
            {/* Country Tabs - Horizontal scrollable */}
            <div className="px-4 py-6">
                <div className="flex flex-wrap justify-center gap-3">
                    {countries.map((country) => {
                        const logoUrl = COUNTRY_LOGOS[country.country];
                        return (
                            <button
                                key={country.country}
                                onClick={() => selectCountry(country)}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-all hover:scale-105 hover:border-purple-500"
                            >
                                {logoUrl ? (
                                    <img
                                        src={logoUrl}
                                        alt={country.country}
                                        className="w-8 h-8 rounded object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                                        {country.country.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <span className="text-white font-medium">{country.country}</span>
                                <span className="text-zinc-400 text-sm">({country.builderCount})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Large Map - Takes remaining space */}
            <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden border border-zinc-800">
                <WorldMap countries={countries} center={defaultCenter} />
            </div>
        </div>
    );
}
