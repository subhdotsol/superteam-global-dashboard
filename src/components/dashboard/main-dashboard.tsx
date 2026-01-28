"use client";

import { DashboardStateProvider, useDashboard } from "./dashboard-state-provider";
import { OverviewLayout } from "./overview-layout";
import { CountryView } from "./country-view";
import { ProfileDrawer } from "./profile-drawer";
import { DashboardStats } from "@/lib/types";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
                {/* Optional overlay for better text readability if needed, but per request just the image for now */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Top Bar - Simplified */}
                <header className="flex flex-col gap-4 mb-8 max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black transition-transform group-hover:scale-110">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <span className="font-bold font-handwriting text-xl hidden sm:inline">Back</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Data Disclaimer Banner */}
                    <div className="w-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm rounded-xl p-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left animate-slide-up">
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">DEMO DATA</span>
                        <p className="text-sm text-blue-200">
                            <span className="font-bold text-white">Real Data:</span> Title, Region, & Public Key.
                            <span className="mx-2 opacity-50">|</span>
                            <span className="font-bold text-white">Placeholder:</span> Earnings, Submissions, & Won (Pending integration).
                        </p>
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
