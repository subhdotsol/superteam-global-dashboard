"use client";

import { useDashboard } from "./dashboard-state-provider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Github, Twitter, Linkedin, Copy } from "lucide-react";
import Image from "next/image";

export function ProfileDrawer() {
    const { selectedMember, selectMember } = useDashboard();

    if (!selectedMember) return null;

    return (
        <AnimatePresence>
            {selectedMember && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => selectMember(null)}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        key="profile-drawer"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
                    >
                        <div className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-t-[2rem] shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto">
                            <div className="p-8 relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => selectMember(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Left Column: Avatar & Basic Info */}
                                    <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4">
                                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-zinc-100">
                                            {selectedMember.avatar ? (
                                                <Image
                                                    src={selectedMember.avatar}
                                                    alt={selectedMember.title}
                                                    width={160}
                                                    height={160}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400 text-4xl font-bold">
                                                    {selectedMember.title.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column: Content */}
                                    <div className="flex-1 w-full">
                                        <div className="mb-6 text-center md:text-left">
                                            <h2 className="text-3xl font-bold mb-1">{selectedMember.title}</h2>
                                            <p className="text-zinc-500 font-medium text-lg">
                                                {selectedMember.socials?.twitter || `@${selectedMember.title.replace(/\s+/g, '').toLowerCase()}`}
                                            </p>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex justify-between md:justify-start gap-8 md:gap-16 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-8">
                                            <div>
                                                <p className="text-2xl font-bold text-black dark:text-white">
                                                    ${selectedMember.earned?.toLocaleString() || "0"}
                                                </p>
                                                <p className="text-zinc-500 font-medium">Earned</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-black dark:text-white">
                                                    {selectedMember.submissions || 0}
                                                </p>
                                                <p className="text-zinc-500 font-medium">Submissions</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-black dark:text-white">
                                                    {selectedMember.won || 0}
                                                </p>
                                                <p className="text-zinc-500 font-medium">Won</p>
                                            </div>
                                        </div>

                                        {/* Socials & Wallet */}
                                        <div className="flex flex-wrap items-center gap-4 mb-8">
                                            {selectedMember.socials?.twitter && (
                                                <a href={selectedMember.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                                    <Twitter className="w-5 h-5" />
                                                </a>
                                            )}
                                            {selectedMember.socials?.linkedin && (
                                                <a href={selectedMember.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                            )}
                                            {selectedMember.socials?.github && (
                                                <a href={selectedMember.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {selectedMember.socials?.website && (
                                                <a href={selectedMember.socials.website} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                                    <Globe className="w-5 h-5" />
                                                </a>
                                            )}

                                            <div className="ml-auto md:ml-4 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full flex items-center gap-2 text-zinc-500">
                                                {selectedMember.wallet.substring(0, 4)}...{selectedMember.wallet.substring(selectedMember.wallet.length - 4)}
                                                <Copy className="w-3 h-3 cursor-pointer hover:text-black" />
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-8">
                                            <h4 className="font-bold text-lg mb-4">Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMember.skills?.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
                                                    >
                                                        {/* Simple logic to add icons could go here, for now just text */}
                                                        {skill}
                                                    </span>
                                                ))}
                                                {(!selectedMember.skills || selectedMember.skills.length === 0) && (
                                                    <span className="text-zinc-500 text-sm">No specific skills listed.</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div>
                                            <button className="px-8 py-3 bg-white border-2 border-black text-black font-bold text-lg rounded-xl hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none font-handwriting">
                                                view submissions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
