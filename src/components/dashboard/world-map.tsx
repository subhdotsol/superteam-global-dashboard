"use client";

import { SVGWorldMap } from "./svg-world-map";
import { CountryStats } from "@/lib/types";

interface WorldMapProps {
    countries: CountryStats[];
    center?: [number, number];
    onHoverCountry?: (country: string | null) => void;
}

export function WorldMap({ countries, center, onHoverCountry }: WorldMapProps) {
    return (
        <div className="h-full w-full relative">
            <SVGWorldMap countries={countries} onHoverCountry={onHoverCountry} />
        </div>
    );
}
