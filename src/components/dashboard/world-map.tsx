"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { CountryStats } from "@/lib/types";

const MapComponentWithNoSSR = dynamic(
    () => import("./map-component"),
    {
        ssr: false,
        loading: () => (
            <div className="h-[400px] w-full bg-[var(--muted)] rounded-lg animate-pulse flex items-center justify-center">
                <p className="text-[var(--muted-foreground)]">Loading map...</p>
            </div>
        )
    }
);

interface WorldMapProps {
    countries: CountryStats[];
    center?: [number, number];
}

export function WorldMap({ countries, center }: WorldMapProps) {
    return (
        <div className="h-full w-full">
            <MapComponentWithNoSSR countries={countries} center={center} />
        </div>
    );
}
