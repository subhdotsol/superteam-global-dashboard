"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useTheme } from "next-themes";
import { CountryStats } from "@/lib/types";
import { formatNumber, getCountryCode } from "@/lib/utils";

interface MapComponentProps {
    countries: CountryStats[];
}

export default function MapComponent({ countries }: MapComponentProps) {
    const { theme } = useTheme();

    const getTileLayer = () => {
        if (theme === "dark") {
            return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
        }
        return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    };

    const getMarkerSize = (builderCount: number): number => {
        const maxCount = Math.max(...countries.map((c) => c.builderCount));
        const minSize = 8;
        const maxSize = 40;
        return minSize + (builderCount / maxCount) * (maxSize - minSize);
    };

    const getFlagEmoji = (countryCode: string) => {
        if (countryCode === "XX") return "🌍";
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            className="h-full w-full"
            style={{ background: theme === "dark" ? "#1e1b4b" : "#f0f0f0" }}
            minZoom={1.5}
            maxZoom={6}
            scrollWheelZoom={true}
        >
            <TileLayer
                url={getTileLayer()}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {countries
                .filter((country) => country.coordinates)
                .map((country) => {
                    const countryCode = getCountryCode(country.country);
                    return (
                        <CircleMarker
                            key={country.country}
                            center={[country.coordinates!.lat, country.coordinates!.lng]}
                            radius={getMarkerSize(country.builderCount)}
                            pathOptions={{
                                fillColor: "#8b5cf6",
                                fillOpacity: 0.7,
                                color: "#a78bfa",
                                weight: 2,
                            }}
                        >
                            <Tooltip>
                                <div className="p-2 min-w-[150px]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">{getFlagEmoji(countryCode)}</span>
                                        <span className="font-semibold">{country.country}</span>
                                    </div>
                                    <p className="text-sm">
                                        <strong>{formatNumber(country.builderCount)}</strong> builders
                                    </p>
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    );
                })}
        </MapContainer>
    );
}
