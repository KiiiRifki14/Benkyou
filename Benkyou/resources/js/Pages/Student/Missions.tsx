import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import { motion } from "motion/react";
import {
    Lock,
    CheckCircle2,
    ChevronRight,
    Flame,
    Sparkles,
    ScrollText,
    Star,
    Shield,
    Sword,
    Crown,
    Trophy,
    Zap,
    Target,
} from "lucide-react";

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

// Rank config based on level order
const rankConfig = [
    {
        rank: "Kohai",
        sub: "Murid Baru",
        icon: ScrollText,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-800",
        glow: "shadow-emerald-100",
        accent: "#10b981",
        bannerBg: "from-emerald-50 to-teal-50",
    },
    {
        rank: "Senpai",
        sub: "Senior Berpengalaman",
        icon: Star,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-800",
        glow: "shadow-blue-100",
        accent: "#3b82f6",
        bannerBg: "from-blue-50 to-indigo-50",
    },
    {
        rank: "Samurai",
        sub: "Prajurit Tangguh",
        icon: Sword,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        badge: "bg-orange-100 text-orange-800",
        glow: "shadow-orange-100",
        accent: "#f97316",
        bannerBg: "from-orange-50 to-amber-50",
    },
    {
        rank: "Shogun",
        sub: "Sang Penakluk",
        icon: Crown,
        color: "text-[var(--color-japan-red)]",
        bg: "bg-rose-50",
        border: "border-rose-200",
        badge: "bg-rose-100 text-rose-800",
        glow: "shadow-rose-100",
        accent: "#bc002d",
        bannerBg: "from-rose-50 to-pink-50",
    },
];

function getRankConfig(order: number) {
    return rankConfig[Math.min(order - 1, rankConfig.length - 1)];
}

function ScoreBar({ score }: { score: number }) {
    const pct = Math.min(Math.max(score, 0), 100);
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                <span className="text-[var(--color-ink-light)]">Skor Tertinggi</span>
                <span className="text-[var(--color-ink)]">{pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
            </div>
        </div>
    );
}

export default function Missions({ levels }: MissionsProps) {
    const passedCount = levels.filter((l) => l.passed).length;
    const totalCount = levels.length;
    const progressPct = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-12">
            <Head title="My Journey ✨" />

            {/* ── Hero Header ── */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-[var(--color-ink)] text-white rounded-3xl p-8 md:p-12 overflow-hidden"
            >
                {/* Decorative BG characters */}
                <div className="absolute -right-6 -top-6 text-[9rem] font-jp opacity-[0.07] select-none pointer-events-none leading-none">
                    旅
                </div>
                <div className="absolute right-20 bottom-4 text-[5rem] font-jp opacity-[0.05] select-none pointer-events-none leading-none">
                    道
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-xl bg-[var(--color-japan-red)] flex items-center justify-center">
                                <Trophy size={16} className="text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                Perjalanan Ajaib
                            </span>
                        </div>
                        <h1 className="font-fredoka text-4xl md:text-5xl font-bold leading-tight">
                            My Journey
                            <span className="ml-2 text-[var(--color-sakura)]">✨</span>
                        </h1>
                        <p className="mt-2 text-gray-300 text-sm md:text-base max-w-md">
                            Setiap level yang kamu selesaikan adalah langkah nyata menuju{" "}
                            <span className="text-[var(--color-sakura)] font-semibold">gelar Shogun</span>~
                        </p>
                    </div>

                    {/* Progress Ring Summary */}
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 shrink-0">
                        <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="26"
                                    fill="none"
                                    stroke="#f4c2c2"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 26}`}
                                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - progressPct / 100)}`}
                                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">{progressPct}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white font-fredoka">
                                {passedCount}
                                <span className="text-gray-400 text-base font-normal"> / {totalCount}</span>
                            </p>
                            <p className="text-xs text-gray-400 font-medium">Level Selesai</p>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* ── Level Cards ── */}
            <div className="space-y-5">
                {levels.map((level, idx) => {
                    const isUnlocked = idx === 0 || levels[idx - 1].passed;
                    const cfg = getRankConfig(level.order);
                    const RankIcon = cfg.icon;
                    const scorePercent = level.bestScore;

                    return (
                        <motion.div
                            key={level.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.09, duration: 0.45 }}
                            className={`relative bg-white rounded-[2rem] border-2 overflow-hidden transition-all duration-300 ${
                                !isUnlocked
                                    ? "opacity-55 grayscale border-gray-200"
                                    : level.passed
                                    ? `${cfg.border} shadow-lg ${cfg.glow}`
                                    : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                            }`}
                        >
                            {/* Passed: soft colored top accent stripe */}
                            {level.passed && isUnlocked && (
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
                                    style={{ backgroundColor: cfg.accent }}
                                />
                            )}

                            {/* Decorative kanji watermark */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[6rem] font-jp opacity-[0.04] select-none pointer-events-none leading-none">
                                {level.emoji}
                            </div>

                            <div className="relative z-10 p-6 md:p-8">
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                                    {/* Left: Rank Icon + Info */}
                                    <div className="flex items-start gap-5">
                                        {/* Rank Icon Box */}
                                        <div
                                            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.border} border-2`}
                                        >
                                            {isUnlocked ? (
                                                <RankIcon size={28} className={cfg.color} strokeWidth={1.8} />
                                            ) : (
                                                <Lock size={24} className="text-gray-400" strokeWidth={1.8} />
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            {/* Tags row */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-ink)] text-white">
                                                    Level {level.order}
                                                </span>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${cfg.badge}`}>
                                                    {cfg.rank}
                                                </span>
                                                {level.passed && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                                                        <CheckCircle2 size={11} /> Tuntas
                                                    </span>
                                                )}
                                                {!isUnlocked && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                                                        <Lock size={11} /> Terkunci
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-ink)] leading-snug">
                                                {level.title}
                                            </h2>
                                            <p className="text-sm text-[var(--color-ink-light)]">
                                                {level.subtitle}
                                            </p>

                                            {/* Meta info row */}
                                            <div className="flex flex-wrap gap-4 pt-1 text-xs text-[var(--color-ink-light)] font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Target size={12} className={cfg.color} />
                                                    {level.goal}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Zap size={12} className="text-amber-500" />
                                                    {level.totalQuestions} Tantangan
                                                </span>
                                                {level.passed && level.bestScore > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <Flame size={12} className="text-orange-500" />
                                                        Skor: {level.bestScore}%
                                                    </span>
                                                )}
                                                {level.reward && (
                                                    <span className="flex items-center gap-1">
                                                        <Sparkles size={12} className="text-purple-400" />
                                                        Reward: {level.reward}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Score bar (only if passed or started) */}
                                            {isUnlocked && level.bestScore > 0 && (
                                                <div className="pt-2 max-w-xs">
                                                    <ScoreBar score={level.bestScore} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: CTA */}
                                    <div className="w-full md:w-auto shrink-0 flex flex-col items-stretch md:items-end gap-2">
                                        {isUnlocked ? (
                                            <Link
                                                href={route("student.missions.level", level.id)}
                                                className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all duration-200 group ${
                                                    level.passed
                                                        ? "bg-[var(--color-ink)] text-white hover:bg-black"
                                                        : "bg-[var(--color-japan-red)] text-white hover:bg-red-800 shadow-md shadow-red-600/20"
                                                }`}
                                            >
                                                {level.passed ? (
                                                    <>
                                                        <Shield size={16} strokeWidth={2} />
                                                        Main Lagi
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles size={16} strokeWidth={2} />
                                                        Mulai Tantangan
                                                    </>
                                                )}
                                                <ChevronRight
                                                    size={16}
                                                    className="group-hover:translate-x-0.5 transition-transform"
                                                />
                                            </Link>
                                        ) : (
                                            <div className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-gray-100 text-gray-400 rounded-full text-sm font-bold cursor-not-allowed">
                                                <Lock size={16} />
                                                Selesaikan level sebelumnya dulu~
                                            </div>
                                        )}
                                        {level.passed && (
                                            <p className="text-center text-[10px] text-[var(--color-ink-light)] font-medium">
                                                ✓ {scorePercent}% — {scorePercent >= 80 ? "Sempurna! 🌟" : scorePercent >= 60 ? "Bagus! ✨" : "Coba tingkatkan~"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Empty state ── */}
            {levels.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                >
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="font-serif text-2xl text-[var(--color-ink)] mb-2">Belum ada misi tersedia</h3>
                    <p className="text-[var(--color-ink-light)] text-sm">
                        Admin lagi nyiapin misi seru buat kamu~ Nantikan ya! ✨
                    </p>
                </motion.div>
            )}

            {/* ── Legend / Rank Guide ── */}
            {levels.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-3xl border border-gray-100 p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy size={16} className="text-[var(--color-japan-red)]" />
                        <h3 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Jalur Gelar</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {rankConfig.map((r) => {
                            const Icon = r.icon;
                            return (
                                <div
                                    key={r.rank}
                                    className={`flex items-center gap-3 p-3 rounded-2xl ${r.bg} border ${r.border}`}
                                >
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white border ${r.border} shrink-0`}>
                                        <Icon size={18} className={r.color} strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold ${r.color}`}>{r.rank}</p>
                                        <p className="text-[10px] text-[var(--color-ink-light)] font-medium leading-tight">{r.sub}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

Missions.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
