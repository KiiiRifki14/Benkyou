import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import { motion } from "motion/react";
import { Lock, CheckCircle, GraduationCap } from "lucide-react";

declare const route: any;

interface MissionLevel {
    id: string;
    order: number;
    title: string;
    subtitle: string;
    goal: string;
    emoji: string;
    reward: string;
    totalQuestions: number;
    highestCleared: number;
    bestScore: number;
    passed: boolean;
}

interface MissionsProps {
    levels: MissionLevel[];
}

export default function Missions({ levels }: MissionsProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Head title="Misi Rahasia" />

            <header className="text-center space-y-4 pt-8">
                <h1 className="font-serif text-4xl font-light">
                    My Journey ✨
                </h1>
                <p className="text-[var(--color-ink-light)]">
                    Selesaikan setiap level untuk membuktikan kemampuanmu.
                </p>
            </header>

            <div className="space-y-6">
                {levels.map((level, idx) => {
                    const isUnlocked = idx === 0 || levels[idx - 1].passed;

                    return (
                        <motion.div
                            key={level.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-white rounded-[2rem] border border-[#E5E5E5] p-6 md:p-8 transition-all ${!isUnlocked ? "opacity-60 grayscale" : "hover:border-[var(--color-ink)] shadow-sm"}`}
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-[var(--color-washi)] shrink-0">
                                        {level.emoji}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--color-ink)] text-white uppercase tracking-wider">
                                                Level {level.order}
                                            </span>
                                            {level.passed && (
                                                <span className="flex items-center gap-1 text-xs font-bold text-[var(--color-japan-red)]">
                                                    <CheckCircle size={14} />{" "}
                                                    Lulus
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                                            {level.title}
                                        </h2>
                                        <p className="text-[var(--color-ink-light)] mt-1">
                                            {level.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full md:w-auto flex flex-col items-end gap-3 mt-4 md:mt-0">
                                    {isUnlocked ? (
                                        <Link
                                            href={route(
                                                "student.missions.level",
                                                level.id,
                                            )}
                                            className="w-full md:w-auto text-center px-8 py-3 bg-[var(--color-japan-red)] text-white rounded-full text-sm font-medium hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <GraduationCap size={18} />{" "}
                                            {level.passed
                                                ? "Main Lagi"
                                                : "Mulai Tantangan"}
                                        </Link>
                                    ) : (
                                        <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-400 rounded-full text-sm font-medium cursor-not-allowed">
                                            <Lock size={16} /> Terkunci
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

Missions.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
