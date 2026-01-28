"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, ChevronDown, ChevronUp, Users, Eye, X } from "lucide-react";
import { CountryStats, Builder } from "@/lib/types";
import { formatNumber, truncateWallet, getCountryCode } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CountryLeaderboardProps {
    countries: CountryStats[];
}

const RANK_ICONS = [Trophy, Medal, Medal];
const RANK_COLORS = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export function CountryLeaderboard({ countries }: CountryLeaderboardProps) {
    const [showAll, setShowAll] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(null);

    const displayedCountries = showAll ? countries : countries.slice(0, 10);

    const getFlagEmoji = (countryCode: string) => {
        if (countryCode === "XX") return "🌍";
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <>
            <Card className="border border-[var(--border)]">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Country Leaderboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Top 3 Podium */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {countries.slice(0, 3).map((country, index) => {
                            const RankIcon = RANK_ICONS[index];
                            const rankColor = RANK_COLORS[index];
                            const countryCode = getCountryCode(country.country);

                            return (
                                <div
                                    key={country.country}
                                    onClick={() => setSelectedCountry(country)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${index === 0
                                            ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30"
                                            : "bg-[var(--muted)]"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <RankIcon className={`w-5 h-5 ${rankColor}`} />
                                            <span className="text-lg font-bold">#{index + 1}</span>
                                        </div>
                                        <span className="text-2xl">{getFlagEmoji(countryCode)}</span>
                                    </div>
                                    <p className="font-semibold text-sm mb-1">{country.country}</p>
                                    <p className="text-xs text-[var(--muted-foreground)]">
                                        {formatNumber(country.builderCount)} builders
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Full Table */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full min-w-[500px]">
                            <thead>
                                <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--muted-foreground)]">
                                    <th className="py-2 px-2 w-12">#</th>
                                    <th className="py-2 px-2">Country</th>
                                    <th className="py-2 px-2 text-right">Builders</th>
                                    <th className="py-2 px-2 text-right">% of Total</th>
                                    <th className="py-2 px-2 w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedCountries.map((country, index) => {
                                    const countryCode = getCountryCode(country.country);
                                    const totalBuilders = countries.reduce((sum, c) => sum + c.builderCount, 0);
                                    const percentage = ((country.builderCount / totalBuilders) * 100).toFixed(1);

                                    return (
                                        <tr
                                            key={country.country}
                                            className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 cursor-pointer transition-colors"
                                            onClick={() => setSelectedCountry(country)}
                                        >
                                            <td className="py-3 px-2">
                                                <span
                                                    className={`font-bold text-sm ${index < 3 ? RANK_COLORS[index] : ""
                                                        }`}
                                                >
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{getFlagEmoji(countryCode)}</span>
                                                    <span className="font-medium text-sm">{country.country}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-right font-semibold">
                                                {formatNumber(country.builderCount)}
                                            </td>
                                            <td className="py-3 px-2 text-right text-[var(--muted-foreground)] text-sm">
                                                {percentage}%
                                            </td>
                                            <td className="py-3 px-2">
                                                <Eye className="w-4 h-4 text-[var(--muted-foreground)]" />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {countries.length > 10 && (
                        <Button
                            variant="ghost"
                            className="w-full mt-4"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? (
                                <>
                                    <ChevronUp className="w-4 h-4 mr-2" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4 mr-2" />
                                    Show All {countries.length} Countries
                                </>
                            )}
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Country Details Modal */}
            {selectedCountry && (
                <CountryModal
                    country={selectedCountry}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
        </>
    );
}

function CountryModal({
    country,
    onClose,
}: {
    country: CountryStats;
    onClose: () => void;
}) {
    const countryCode = getCountryCode(country.country);
    const getFlagEmoji = (code: string) => {
        if (code === "XX") return "🌍";
        const codePoints = code
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <Card
                className="w-full max-w-lg max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="flex items-center gap-3">
                        <span className="text-3xl">{getFlagEmoji(countryCode)}</span>
                        {country.country}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                        <Users className="w-4 h-4" />
                        <span>{formatNumber(country.builderCount)} builders</span>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Top Builders</h4>
                        <div className="space-y-2">
                            {country.builders.slice(0, 10).map((builder, idx) => (
                                <div
                                    key={builder.wallet}
                                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-[var(--muted-foreground)]">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <p className="font-medium text-sm">{builder.title}</p>
                                            <p className="text-xs text-[var(--muted-foreground)] font-mono">
                                                {truncateWallet(builder.wallet)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {country.builders.length > 10 && (
                            <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">
                                +{country.builders.length - 10} more builders
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
