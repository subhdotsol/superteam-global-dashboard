"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, X } from "lucide-react";
import { Builder, CountryStats } from "@/lib/types";
import { truncateWallet, getCountryCode } from "@/lib/utils";

interface BuilderSearchProps {
    countries: CountryStats[];
}

export function BuilderSearch({ countries }: BuilderSearchProps) {
    const [search, setSearch] = useState("");
    const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);

    const allBuilders = useMemo(() => {
        return countries.flatMap((c) =>
            c.builders.map((b) => ({ ...b, country: c.country }))
        );
    }, [countries]);

    const filteredBuilders = useMemo(() => {
        if (!search.trim()) return [];
        const query = search.toLowerCase();
        return allBuilders
            .filter(
                (b) =>
                    b.title.toLowerCase().includes(query) ||
                    b.wallet.toLowerCase().includes(query) ||
                    b.country?.toLowerCase().includes(query)
            )
            .slice(0, 20);
    }, [search, allBuilders]);

    const getFlagEmoji = (country: string) => {
        const code = getCountryCode(country);
        if (code === "XX") return "🌍";
        const codePoints = code
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <>
            <Card className="border border-[var(--border)]">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Search className="w-5 h-5 text-green-500" />
                        Find Builders
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                        <input
                            type="text"
                            placeholder="Search by name, wallet, or country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {filteredBuilders.length > 0 && (
                        <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
                            {filteredBuilders.map((builder) => (
                                <div
                                    key={builder.wallet}
                                    onClick={() => setSelectedBuilder(builder)}
                                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">
                                            {getFlagEmoji(builder.country || "")}
                                        </span>
                                        <div>
                                            <p className="font-medium text-sm">{builder.title}</p>
                                            <p className="text-xs text-[var(--muted-foreground)] font-mono">
                                                {truncateWallet(builder.wallet)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-[var(--muted-foreground)]">
                                        {builder.country}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {search && filteredBuilders.length === 0 && (
                        <div className="mt-4 text-center py-8 text-[var(--muted-foreground)]">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No builders found</p>
                        </div>
                    )}

                    {!search && (
                        <div className="mt-4 text-center py-4 text-[var(--muted-foreground)]">
                            <p className="text-sm">
                                Search among {allBuilders.length.toLocaleString()} builders
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Builder Details Modal */}
            {selectedBuilder && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedBuilder(null)}
                >
                    <Card
                        className="w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">
                                    {getFlagEmoji((selectedBuilder as any).country || "")}
                                </span>
                                {selectedBuilder.title}
                            </CardTitle>
                            <button
                                onClick={() => setSelectedBuilder(null)}
                                className="p-1 rounded-md hover:bg-[var(--muted)]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs text-[var(--muted-foreground)] mb-1">
                                    Wallet Address
                                </p>
                                <p className="font-mono text-sm break-all bg-[var(--muted)] p-2 rounded-lg">
                                    {selectedBuilder.wallet}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-[var(--muted-foreground)] mb-1">
                                    Country
                                </p>
                                <p className="text-sm">{(selectedBuilder as any).country}</p>
                            </div>
                            <div className="pt-2 border-t border-[var(--border)]">
                                <p className="text-xs text-[var(--muted-foreground)]">
                                    Stats coming soon as more data becomes available.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
