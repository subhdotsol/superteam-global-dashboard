"use client";

import { useDashboard } from "./dashboard-state-provider";
import { WorldMap } from "./world-map";
import { CountryStats } from "@/lib/types";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

// Update OverviewLayout to accept defaultCenter and apply new styles
interface OverviewLayoutProps {
    countries: CountryStats[];
    defaultCenter?: [number, number];
}

export function OverviewLayout({ countries, defaultCenter }: OverviewLayoutProps) {
    const { selectCountry } = useDashboard();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Left Panel: Leaderboard & Events */}
            <div className="lg:col-span-1 flex flex-col gap-6 h-full overflow-hidden">
                {/* Leaderboard Card - Glassmorphism */}
                <div className="flex-1 bg-black/20 backdrop-blur-md rounded-[2rem] border-4 border-white/10 p-6 flex flex-col overflow-hidden text-white">
                    <h3 className="text-xl font-bold font-handwriting mb-4">Leader board by countries</h3>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        {countries.map((country, idx) => (
                            <div
                                key={country.country}
                                onClick={() => selectCountry(country)}
                                className="group cursor-pointer p-4 rounded-xl border border-white/10 hover:bg-black/40 hover:border-white/30 transition-all flex items-center justify-between bg-black/20"
                            >
                                <div>
                                    <div className="font-bold text-lg group-hover:underline decoration-wavy">
                                        {country.country} #{idx + 1}
                                    </div>
                                    <div className="text-sm opacity-70 font-handwriting">
                                        member count - {country.builderCount}
                                    </div>
                                </div>
                                <div className="text-2xl opacity-50 group-hover:opacity-100">
                                    →
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t-2 border-dashed border-white/20 text-center font-handwriting font-bold cursor-pointer hover:text-purple-400">
                        ... View more
                    </div>
                </div>

                {/* Event Card (Friendship Day) - Keeping structure, adding border/glass adjustment if needed, but matched existing black style */}
                <div className="h-48 bg-black text-white rounded-[2rem] p-6 flex items-center relative overflow-hidden shrink-0 group cursor-pointer hover:scale-[1.02] transition-transform border border-white/10">
                    {/* Decorative circles/shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800 rounded-full blur-2xl opacity-50 translate-x-10 -translate-y-10"></div>

                    <div className="flex gap-4 relative z-10 w-full">
                        {/* Icon/Image Placeholder */}
                        <div className="w-20 h-full flex flex-col justify-center">
                            <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center mb-2">
                                <span className="text-2xl">🕊️</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Upcoming Event</div>
                            <h4 className="text-lg font-bold mb-2 leading-tight">Happy Friendship Day!</h4>
                            <p className="text-xs text-zinc-400 mb-3">Today is the perfect time to celebrate the good people in your life.</p>

                            <div className="inline-block px-3 py-1 rounded-full border border-zinc-600 text-xs">
                                in 1 week
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Map - Glassmorphism and full height */}
            <div className="lg:col-span-2 bg-black/20 backdrop-blur-md rounded-[2rem] border-4 border-white/10 p-2 overflow-hidden flex flex-col relative text-white">
                <div className="absolute top-6 left-0 right-0 text-center z-10 pointer-events-none">
                    <h2 className="text-3xl font-bold font-handwriting text-white drop-shadow-md">map</h2>
                </div>

                <div className="flex-1 rounded-[1.5rem] overflow-hidden relative">
                    <WorldMap countries={countries} center={defaultCenter} />
                </div>
            </div>
        </div>
    );
}
