"use client";

import { Builder } from "@/lib/types";
import { useDashboard } from "./dashboard-state-provider";
import Image from "next/image";
import { MapPin, DollarSign, Trophy, FileText } from "lucide-react";

interface MemberCardProps {
    member: Builder;
}

export function MemberCard({ member }: MemberCardProps) {
    const { selectMember } = useDashboard();

    // Generate a consistent gradient based on the name/wallet if no custom background
    // For now we'll just use a nice default gradient as seen in the design

    return (
        <div className="bg-black/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/10 flex flex-col h-[400px] text-white">
            {/* Header / Banner */}
            <div className="h-24 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 relative">
                {/* Badge/Icon overlay could go here */}
                {member.title === "Alex Turner" && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-black flex items-center gap-1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Adobe_Logos.svg/1200px-Adobe_Logos.svg.png" alt="Adobe" className="w-3 h-3" />
                        Adobe Co.
                    </div>
                )}
            </div>

            <div className="px-5 pb-5 flex-1 flex flex-col pt-0 transform -translate-y-8">
                {/* Avatar */}
                <div className="flex justify-between items-end mb-3">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100">
                            {member.avatar ? (
                                <Image
                                    src={member.avatar}
                                    alt={member.title}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400 text-xl font-bold">
                                    {member.title.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* QR Code / Share Icon placeholder */}
                    <button className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-4">
                        <span className="text-xs font-bold">qr</span>
                    </button>
                </div>

                {/* Info */}
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-white leading-tight">{member.title}</h3>
                    <p className="text-sm text-zinc-300">{member.role || "Member"}</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                            <span className="text-xs font-bold">★ 5.0</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Rating</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-blue-500 mb-0.5">
                            <span className="text-xs font-bold">$ {member.earned?.toLocaleString() || "0"}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Earned</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-purple-500 mb-0.5">
                            <span className="text-xs font-bold">{member.submissions || 0}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Submissions</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => selectMember(member)}
                        className="w-full py-2.5 rounded-full border-2 border-black dark:border-white text-black dark:text-white font-bold text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                        Show Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
