"use client";

import { DashboardStateProvider, useDashboard } from "./dashboard-state-provider";
import { OverviewLayout } from "./overview-layout";
import { CountryView } from "./country-view";
import { ProfileDrawer } from "./profile-drawer";
import { DashboardStats } from "@/lib/types";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import dashboardBg from "@/images/dashboard.png";

interface MainDashboardProps {
    stats: DashboardStats;
    regionFilter?: string;
}

// Inner component to consume the context
function DashboardShell({ stats }: { stats: DashboardStats }) {
    const { currentView } = useDashboard();

    return (
        <div className="min-h-screen relative font-sans p-4 md:p-8 transition-colors overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={dashboardBg}
                    alt="Dashboard Background"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                    placeholder="blur"
                />
                {/* Subtle overlay for readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Top Bar - Simplified */}
                <header className="flex flex-col gap-4 mb-8 max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center group">
                            <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white transition-all group-hover:bg-white/10 group-hover:scale-110">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                        </Link>


                    </div>

                    {/* Data Disclaimer Banner - Pill Style */}
                    <div className="w-full flex justify-center animate-slide-up">
                        <div className="bg-gradient-to-r from-[#9d5cff] via-[#d667ae] to-[#ff8c7f] text-black px-5 py-2 rounded-full font-semibold shadow-lg flex items-center gap-3 text-sm">
                            <span>✨</span>
                            <span>Real: Name, Region & Wallet</span>
                            <span className="opacity-50">•</span>
                            <span>Demo: Earnings, Submissions & Won</span>
                        </div>
                    </div>
                </header>

                <main className="w-full h-full relative flex-1 px-4">
                    {currentView === "overview" ? (
                        <OverviewLayout countries={stats.countries} />
                    ) : (
                        <CountryView />
                    )}
                </main>

                <ProfileDrawer />
            </div>
        </div>
    );
}

export function MainDashboard({ stats, regionFilter }: MainDashboardProps) {
    return (
        <DashboardStateProvider>
            <DashboardShell stats={stats} />
        </DashboardStateProvider>
    );
}
