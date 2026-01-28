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
}

export function WorldMap({ countries }: WorldMapProps) {
    return (
        <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Map className="w-5 h-5 text-blue-500" />
                    Global Builder Distribution
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="h-[400px] w-full rounded-b-xl overflow-hidden">
                    <MapComponentWithNoSSR countries={countries} />
                </div>
            </CardContent>
        </Card>
    );
}
