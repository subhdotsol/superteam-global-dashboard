"use client";

import { Builder } from "@/lib/types";
import { useDashboard } from "./dashboard-state-provider";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MemberCardProps {
    member: Builder;
}

export function MemberCard({ member }: MemberCardProps) {
    const { selectMember } = useDashboard();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!member.wallet) return;

        // Use the clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(member.wallet)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => {
                    console.error('Clipboard write failed:', err);
                    // Fallback for older browsers
                    fallbackCopy(member.wallet);
                });
        } else {
            // Fallback for older browsers
            fallbackCopy(member.wallet);
        }
    };

    const fallbackCopy = (text: string) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    };

    // Truncate wallet address for display
    const truncatedWallet = member.wallet
        ? `${member.wallet.slice(0, 4)}...${member.wallet.slice(-4)}`
        : null;

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

            <div className="px-5 pb-5 flex-1 flex flex-col pt-0 transform -translate-y-12">
                {/* Avatar - Bigger */}
                <div className="flex justify-start items-end mb-3">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100 shadow-lg">
                            {member.avatar ? (
                                <Image
                                    src={member.avatar}
                                    alt={member.title}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400 text-2xl font-bold">
                                    {member.title.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="mb-2">
                    <h3 className="font-bold text-lg text-white leading-tight">{member.title}</h3>
                    <p className="text-sm text-zinc-300">{member.role || "Member"}</p>
                </div>

                {/* Wallet/Public Key - Clickable to copy */}
                {truncatedWallet && (
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors text-xs text-zinc-300 w-fit group"
                    >
                        <span className="font-mono">{truncatedWallet}</span>
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                        )}
                    </button>
                )}

                {/* Stats Row - Earned, Submissions, Won */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-green-400 mb-0.5">
                            <span className="text-xs font-bold">$ {member.earned?.toLocaleString() || "0"}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Earned</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-blue-400 mb-0.5">
                            <span className="text-xs font-bold">{member.submissions || 0}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Submissions</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                            <span className="text-xs font-bold">{member.won || 0}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Won</span>
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
