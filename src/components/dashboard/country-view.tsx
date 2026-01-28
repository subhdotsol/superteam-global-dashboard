"use client";

import { useDashboard } from "./dashboard-state-provider";
import { MemberCard } from "./member-card";
import { ArrowLeft, Search, ChevronDown, X, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function CountryView() {
    const { selectedCountry, goBackToOverview } = useDashboard();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<"earned" | "submission" | "won" | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    if (!selectedCountry) return null;

    // Filter and sort builders
    const filteredBuilders = selectedCountry.builders
        .filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.role?.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (activeFilter === "earned") return (b.earned || 0) - (a.earned || 0);
            if (activeFilter === "submission") return (b.submissions || 0) - (a.submissions || 0);
            if (activeFilter === "won") return (b.won || 0) - (a.won || 0);
            return 0; // Default sort
        });

    return (
        <div className="w-full h-full flex flex-col animate-fade-in bg-white dark:bg-zinc-950 rounded-[2rem] border-4 border-black dark:border-zinc-800 overflow-hidden relative p-8">
            {/* Close Button */}
            <button
                onClick={goBackToOverview}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors z-10"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-10 mt-4">
                <div className="mb-4 shadow-lg transform -rotate-2">
                    <div className="relative w-24 h-16 bg-zinc-200 overflow-hidden rounded border border-zinc-300">
                        <img
                            src={`https://flagcdn.com/w160/${selectedCountry.countryCode.toLowerCase()}.png`}
                            alt={selectedCountry.country}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <h2 className="text-4xl font-bold font-handwriting mb-1">{selectedCountry.country}</h2>
                <p className="text-lg font-handwriting">{selectedCountry.builderCount} superteam members</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="search members"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-black font-handwriting text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    />
                </div>

                {/* Filter Button */}
                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="px-6 py-3 rounded-xl border-2 border-black font-handwriting text-lg flex items-center gap-2 hover:bg-zinc-50 bg-white"
                    >
                        Filters <ChevronDown className="w-5 h-5" />
                    </button>

                    {/* Filter Modal (Centered) */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
                                    onClick={() => setIsFilterOpen(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                                    animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                                    exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                                    className="fixed top-1/2 left-1/2 z-30 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border-2 border-black w-80 max-w-full"
                                >
                                    <h3 className="font-bold text-xl mb-4 text-center">Sort By</h3>
                                    <div className="space-y-2">
                                        {[
                                            { id: "earned", label: "Most Earned ($)" },
                                            { id: "submission", label: "Most Submissions" },
                                            { id: "won", label: "Most Won" }
                                        ].map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => {
                                                    setActiveFilter(activeFilter === opt.id ? null : opt.id as any);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition-all ${activeFilter === opt.id
                                                        ? 'border-black bg-zinc-100 dark:border-white dark:bg-zinc-800 font-bold'
                                                        : 'border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                                    }`}
                                            >
                                                {opt.label}
                                                {activeFilter === opt.id && <Check className="w-5 h-5" />}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => { setActiveFilter(null); setIsFilterOpen(false); }}
                                            className="w-full p-3 text-red-500 font-medium hover:bg-red-50 rounded-xl"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Grid - Updated to 4 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto pb-4 pr-2">
                {filteredBuilders.map((builder, idx) => (
                    <div key={idx} className="h-full">
                        <MemberCard member={builder} />
                    </div>
                ))}
            </div>
        </div>
    );
}
