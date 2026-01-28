"use client";

import { useState } from "react";
import { useDashboard } from "./dashboard-state-provider";
import { WorldMap } from "./world-map";
import { CountryStats } from "@/lib/types";

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
    "Turkey": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/turkey.png",
    "Vietnam": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/vietnam.png",
    "Mexico": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/mexico.png",
    "Philippines": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/philippines.png",
    "France": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/france.png",
    "Israel": "https://res.cloudinary.com/dgvnuwspr/image/upload/assets/superteams/logos/israel.png",
};

export function OverviewLayout({ countries, defaultCenter }: OverviewLayoutProps) {
    const { selectCountry } = useDashboard();
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    const handleHoverCountry = (country: string | null) => {
        setHoveredCountry(country);
    };

    // Check if a tab should be highlighted based on hover
    const isTabHighlighted = (countryName: string) => {
        if (!hoveredCountry) return true; // No hover = all visible
        return countryName.toLowerCase() === hoveredCountry.toLowerCase() ||
            countryName.toLowerCase().includes(hoveredCountry.toLowerCase()) ||
            hoveredCountry.toLowerCase().includes(countryName.toLowerCase());
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] bg-black">
            {/* Country Tabs - Horizontal scrollable */}
            <div className="px-4 py-6">
                <div className="flex flex-wrap justify-center gap-3">
                    {countries.map((country) => {
                        const logoUrl = COUNTRY_LOGOS[country.country];
                        const isHighlighted = isTabHighlighted(country.country);

                        return (
                            <button
                                key={country.country}
                                onClick={() => selectCountry(country)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isHighlighted
                                        ? 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:scale-105 hover:border-purple-500 opacity-100'
                                        : 'bg-zinc-900/30 border border-zinc-800/50 opacity-30 scale-95'
                                    } ${hoveredCountry && isHighlighted ? 'ring-2 ring-yellow-400 scale-110 bg-zinc-800' : ''}`}
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
                <WorldMap
                    countries={countries}
                    center={defaultCenter}
                    onHoverCountry={handleHoverCountry}
                />
            </div>
        </div>
    );
}
