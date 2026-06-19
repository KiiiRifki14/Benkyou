import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import { motion } from "motion/react";
import { ArrowLeft, Play, CheckCircle, Lock } from "lucide-react";

declare function route(name: string, params?: any, absolute?: boolean): string;

interface SubLevel {
    id: number;
    title: string;
    questionCount: number;
}

interface MissionLevelProps {
    meta: {
        id: string;
        order: number;
        title: string;
        subtitle: string;
        goal: string;
        emoji: string;
    };
    subLevels: SubLevel[];
    userCerts: Record<number, boolean>;
}

export default function MissionLevel({
    meta,
    subLevels,
    userCerts,
}: MissionLevelProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
            <Head title={`${meta.title} - Tantangan`} />

            <Link
                href={route("student.missions")}
                className="inline-flex items-center gap-2 text-[var(--color-ink-light)] font-medium hover:text-[var(--color-japan-red)] transition-colors"
            >
                <ArrowLeft size={18} /> Kembali ke Daftar Level
            </Link>

            <div className="bg-white rounded-[2rem] border border-[#E5E5E5] p-8 md:p-12 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl bg-[var(--color-washi)] mb-6">
                    {meta.emoji}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] mb-2">
                    {meta.title}
                </h1>
                <p className="text-[var(--color-ink-light)] text-lg mb-6">
                    {meta.subtitle}
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-[var(--color-washi)] text-[var(--color-ink)] font-medium text-sm border border-[#E5E5E5]">
                    Target: {meta.goal}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subLevels.map((sub, idx) => {
                    const isPassed = !!userCerts[sub.id];
                    const isUnlocked =
                        idx === 0 || !!userCerts[subLevels[idx - 1].id];

                    return (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-white rounded-3xl border border-[#E5E5E5] p-6 md:p-8 flex flex-col justify-between transition-colors ${isUnlocked ? "hover:border-[var(--color-ink)]" : "opacity-70 grayscale"}`}
                        >
                            <div className="mb-8">
                                <div className="flex justify-between items-start mb-2">
                                    <h3
                                        className={`font-bold text-xl ${isUnlocked ? "text-[var(--color-ink)]" : "text-gray-400"}`}
                                    >
                                        Tahap {sub.id}
                                    </h3>
                                    {isPassed ? (
                                        <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
                                            <CheckCircle size={14} /> Tuntas
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--color-washi)] text-[var(--color-ink-light)]">
                                            Belum Tuntas
                                        </span>
                                    )}
                                </div>
                                <p className="text-[var(--color-ink-light)] text-sm">
                                    {sub.questionCount} Tantangan Seru
                                </p>
                            </div>

                            {isUnlocked ? (
                                <Link
                                    href={route("student.missions.start", {
                                        level: meta.id,
                                        subLevel: sub.id,
                                    })}
                                    className="w-full inline-flex justify-center items-center gap-2 bg-[var(--color-ink)] hover:bg-black text-white rounded-full px-6 py-3 font-medium transition-colors"
                                >
                                    <Play
                                        size={18}
                                        fill="currentColor"
                                        className="scale-75"
                                    />{" "}
                                    {isPassed
                                        ? "Ulangi Tahap"
                                        : "Mulai Tahap Ini"}
                                </Link>
                            ) : (
                                <div className="w-full inline-flex justify-center items-center gap-2 bg-gray-100 text-gray-400 rounded-full px-6 py-3 font-medium cursor-not-allowed">
                                    <Lock size={18} /> Terkunci
                                </div>
                            )}
                        </motion.div>
                    );
                })}

                {subLevels.length === 0 && (
                    <div className="col-span-1 md:col-span-2 text-center py-16 bg-white rounded-3xl border border-dashed border-[#E5E5E5]">
                        <p className="text-[var(--color-ink-light)] font-medium">
                            Belum ada soal untuk level ini.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

MissionLevel.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
