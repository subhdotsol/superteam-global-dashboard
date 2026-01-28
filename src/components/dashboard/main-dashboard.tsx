"use client";

import { StatsCards } from "./stats-cards";
import { CountryLeaderboard } from "./country-leaderboard";
import { WorldMap } from "./world-map";
import { BuilderSearch } from "./builder-search";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DashboardStats } from "@/lib/types";
import { Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MainDashboardProps {
    stats: DashboardStats;
    regionFilter?: string;
}

export function MainDashboard({ stats, regionFilter }: MainDashboardProps) {
    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {regionFilter && (
                            <Link
                                href="/"
                                className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        )}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">
                                {regionFilter ? `Builders in ${regionFilter}` : "Superteam Global"}
                            </h1>
                            <p className="text-xs text-[var(--muted-foreground)]">
                                {regionFilter ? "Regional View" : "Builder Dashboard"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--muted-foreground)] hidden sm:inline">
                            {stats.totalBuilders.toLocaleString()} builders {regionFilter ? `in ${regionFilter}` : "worldwide"}
                        </span>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Hero */}
                <div className="text-center mb-8 animate-fade-in">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                        Superteam Global Builder Dashboard
                    </h2>
                    <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
                        Visualize, rank, and celebrate Solana builders across the globe.
                        Discover the talent layer of Solana.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 animate-slide-up">
                    <StatsCards stats={stats} />
                </div>

                {/* World Map */}
                <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <WorldMap countries={stats.countries} />
                </div>

                {/* Leaderboard and Search */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <CountryLeaderboard countries={stats.countries} />
                    </div>
                    <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                        <BuilderSearch countries={stats.countries} />
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-sm text-[var(--muted-foreground)]">
                    <p>
                        Built for the Solana ecosystem • Inspired by{" "}
                        <a
                            href="https://superteam.fun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:underline"
                        >
                            Superteam
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    );
}
