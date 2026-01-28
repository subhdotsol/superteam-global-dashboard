"use client";

import { SVGWorldMap } from "./svg-world-map";
import { CountryStats } from "@/lib/types";

interface WorldMapProps {
    countries: CountryStats[];
    center?: [number, number];
}

export function WorldMap({ countries, center }: WorldMapProps) {
    return (
        <div className="h-full w-full relative">
            <SVGWorldMap countries={countries} />
        </div>
    );
}
