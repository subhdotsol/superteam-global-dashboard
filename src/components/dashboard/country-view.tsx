"use client";

import { useDashboard } from "./dashboard-state-provider";
import { MemberCard } from "./member-card";
import { Search, ChevronDown, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import heroImage from "@/images/image.png";

// Meteor particle component with Framer Motion
function MeteorParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
    const [height, setHeight] = useState(1000);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    return (
        <motion.div
            className="absolute rounded-full bg-white"
            style={{
                width: size,
                height: size,
                left: `${x}%`,
                bottom: -10,
                boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.3)`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
                y: [0, -height - 100],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: 4 + Math.random() * 3,
                delay: delay,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

// Meteor shower background
function MeteorShower() {
    const [meteors, setMeteors] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

    useEffect(() => {
        const newMeteors = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 8,
            size: 1 + Math.random() * 3,
        }));
        setMeteors(newMeteors);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {meteors.map((meteor) => (
                <MeteorParticle key={meteor.id} x={meteor.x} delay={meteor.delay} size={meteor.size} />
            ))}
        </div>
    );
}

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
            return 0;
        });

    return (
        <div className="w-full h-full relative bg-black">
            {/* Fixed Background Layer - Same as landing page */}
            <div className="fixed inset-0 bg-black z-0">
                <MeteorShower />
            </div>

            {/* Fixed Hero image at the bottom - exactly like landing page */}
            <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
                <div className="w-full relative">
                    <Image
                        src={heroImage}
                        alt="Background"
                        className="w-full h-auto object-cover translate-y-[25%]"
                        priority
                        placeholder="blur"
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* Scrollable Content Layer */}
            <div className="relative z-20 w-full min-h-full p-8 max-w-[1600px] mx-auto text-white">
                {/* Header - Side by Side Layout */}
                <div className="flex items-center gap-6 mb-10 mt-4">
                    {/* Flag */}
                    <div className="relative w-20 h-14 shadow-md rounded overflow-hidden border border-zinc-300">
                        <img
                            src={`https://flagcdn.com/w160/${selectedCountry.countryCode.toLowerCase()}.png`}
                            alt={selectedCountry.country}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col">
                        <h2 className="text-4xl font-bold font-handwriting leading-tight">{selectedCountry.country}</h2>
                        <p className="text-xl font-handwriting opacity-80">{selectedCountry.builderCount} superteam members</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="search members"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-zinc-600 bg-black/50 backdrop-blur-sm text-white placeholder:text-zinc-500 font-handwriting text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="px-6 py-3 rounded-xl border-2 border-zinc-600 bg-black/50 backdrop-blur-sm font-handwriting text-lg flex items-center gap-2 hover:bg-white/10 text-white"
                        >
                            Filters <ChevronDown className="w-5 h-5 text-zinc-400" />
                        </button>

                        {/* Filter Modal */}
                        <AnimatePresence>
                            {isFilterOpen && typeof document !== "undefined" && createPortal(
                                <>
                                    <motion.div
                                        key="filter-backdrop"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                                        onClick={() => setIsFilterOpen(false)}
                                    />
                                    <motion.div
                                        key="filter-modal"
                                        initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                                        exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                                        className="fixed top-1/2 left-1/2 z-[101] bg-zinc-900 p-6 rounded-2xl shadow-xl border-2 border-zinc-700 w-80 max-w-full pointer-events-auto"
                                    >
                                        <h3 className="font-bold text-xl mb-4 text-center text-white">Sort By</h3>
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
                                                    className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition-all text-white ${activeFilter === opt.id
                                                        ? 'border-purple-500 bg-purple-500/20 font-bold'
                                                        : 'border-transparent hover:bg-zinc-800'
                                                        }`}
                                                >
                                                    {opt.label}
                                                    {activeFilter === opt.id && <Check className="w-5 h-5" />}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => { setActiveFilter(null); setIsFilterOpen(false); }}
                                                className="w-full p-3 text-red-400 font-medium hover:bg-red-500/10 rounded-xl"
                                            >
                                                Clear Filters
                                            </button>
                                        </div>
                                    </motion.div>
                                </>,
                                document.body
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Close Button - Next to Filter */}
                    <button
                        onClick={goBackToOverview}
                        className="w-12 h-12 flex items-center justify-center border-2 border-zinc-600 rounded-xl hover:bg-white/10 transition-colors text-white bg-black/50 backdrop-blur-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                    {filteredBuilders.map((builder, idx) => (
                        <div key={idx} className="h-full">
                            <MemberCard member={builder} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
