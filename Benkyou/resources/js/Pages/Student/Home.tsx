import React from "react";
import { motion } from "motion/react";
import { Link, usePage } from "@inertiajs/react";
import {
    BookOpen,
    PenTool,
    List,
    HelpCircle,
    Compass,
    StickyNote,
    ArrowRight,
    Flame,
    Star,
} from "lucide-react";
import Layout from "@/Components/Layout";

interface Feature {
    href: string;
    title: string;
    description: string;
    iconType: string;
    color: string;
    bgGradient: string;
    hoverBorder: string;
    jpChar?: string;
}

const features: Feature[] = [
    {
        href: "/student/kana",
        title: "Huruf Kana",
        description: "Hiragana & Katakana — fondasi pertama yang paling penting~",
        iconType: "kana",
        color: "text-[var(--color-japan-red)]",
        bgGradient: "from-rose-50 to-red-50",
        hoverBorder: "hover:border-[var(--color-sakura)]",
        jpChar: "あ",
    },
    {
        href: "/student/kanji",
        title: "Kanji",
        description: "Karakter cantik yang bikin kamu kelihatan keren banget!",
        iconType: "kanji",
        color: "text-amber-600",
        bgGradient: "from-amber-50 to-orange-50",
        hoverBorder: "hover:border-amber-300",
        jpChar: "漢",
    },
    {
        href: "/student/vocabulary",
        title: "Kosakata",
        description: "Kata-kata yang sering muncul di anime & J-Pop favorit~",
        iconType: "vocab",
        color: "text-[var(--color-matcha-dark)]",
        bgGradient: "from-emerald-50 to-teal-50",
        hoverBorder: "hover:border-[var(--color-matcha)]",
    },
    {
        href: "/student/grammar",
        title: "Tata Bahasa",
        description: "Racik kalimatmu sendiri — kayak bikin resep rahasia~",
        iconType: "grammar",
        color: "text-blue-600",
        bgGradient: "from-blue-50 to-indigo-50",
        hoverBorder: "hover:border-blue-300",
    },
    {
        href: "/student/quiz",
        title: "Latihan Seru",
        description: "Kuis acak setiap sesi — nggak bakal bosen!",
        iconType: "quiz",
        color: "text-purple-600",
        bgGradient: "from-purple-50 to-violet-50",
        hoverBorder: "hover:border-purple-300",
    },
    {
        href: "/student/missions",
        title: "My Journey",
        description: "Dari Kohai sampai Shogun — petualangan seru dimulai!",
        iconType: "journey",
        color: "text-[var(--color-japan-red)]",
        bgGradient: "from-rose-50 to-pink-50",
        hoverBorder: "hover:border-[var(--color-japan-red)]/40",
    },
    {
        href: "/student/notes",
        title: "Catatan Belajar",
        description: "Jurnal pribadi untuk menulis catatan, ide, atau cerita belajarmu~",
        iconType: "notes",
        color: "text-teal-600",
        bgGradient: "from-teal-50 to-cyan-50",
        hoverBorder: "hover:border-teal-300",
    },
];

function FeatureIcon({ type, color, jpChar }: { type: string; color: string; jpChar?: string }) {
    if (type === "kana" || type === "kanji") {
        return <span className={`font-jp text-lg sm:text-2xl font-bold ${color}`}>{jpChar}</span>;
    }
    const iconMap: Record<string, React.ReactNode> = {
        vocab:   <List className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />,
        grammar: <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />,
        quiz:    <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />,
        journey: <Compass className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />,
        notes:   <StickyNote className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />,
    };
    return <>{iconMap[type] ?? <PenTool className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />}</>;
}

interface HomeProps {
    stats?: {
        streak: number;
        passedMissions: number;
    };
}

export default function Home({ stats }: HomeProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const streak = stats?.streak ?? 1;
    const passedMissions = stats?.passedMissions ?? 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5 sm:space-y-8 pb-12"
        >
            {/* ── Welcome Hero ── */}
            <div className="relative bg-gradient-to-br from-[var(--color-ink)] to-gray-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-10 overflow-hidden shadow-sm">
                {/* Decorative kanji watermarks */}
                <div className="absolute -right-4 -top-4 font-jp text-[4rem] sm:text-[7rem] md:text-[10rem] font-bold opacity-[0.05] select-none pointer-events-none leading-none">
                    日本
                </div>
                <div className="absolute right-20 bottom-3 font-jp text-[2.5rem] sm:text-[4rem] md:text-[5rem] font-bold opacity-[0.03] select-none pointer-events-none leading-none">
                    語
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2.5">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sakura)] animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                                Dashboard Belajar
                            </span>
                        </div>
                        <h1 className="font-fredoka text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
                            Hai,{" "}
                            <span className="text-[var(--color-sakura)]">
                                {user ? user.name : "Teman Belajar"}
                            </span>{" "}
                            ✨
                        </h1>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
                            Selamat datang di Benkyou! Yuk lanjut belajar bahasa Jepang hari ini! 🌸
                        </p>
                    </div>

                    {/* Quick stats */}
                    <div className="flex flex-row gap-2 sm:gap-3 shrink-0">
                        <div className="bg-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center border border-white/10 min-w-[70px] sm:min-w-[90px] flex-1 sm:flex-initial">
                            <Flame size={16} className="text-orange-400 mx-auto mb-0.5 sm:mb-1" />
                            <p className="text-sm sm:text-lg font-bold font-fredoka">{streak}</p>
                            <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest">Hari Belajar</p>
                        </div>
                        <div className="bg-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center border border-white/10 min-w-[70px] sm:min-w-[90px] flex-1 sm:flex-initial">
                            <Star size={16} className="text-yellow-400 mx-auto mb-0.5 sm:mb-1" />
                            <p className="text-sm sm:text-lg font-bold font-fredoka">{passedMissions}</p>
                            <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest">Misi Tuntas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Feature Grid ── */}
            <section className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-5 sm:h-6 rounded-full bg-[var(--color-japan-red)]" />
                    <h2 className="font-serif text-base sm:text-xl font-medium text-[var(--color-ink)]">
                        Pilih Materi Belajar
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.href}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.35 }}
                        >
                            <Link
                                href={feature.href}
                                className={`group bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-transparent ${feature.hoverBorder} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between`}
                            >
                                {/* Gradient tint on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl`} />

                                <div className="relative z-10 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Icon */}
                                        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-white flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                                            <FeatureIcon type={feature.iconType} color={feature.color} jpChar={feature.jpChar} />
                                        </div>

                                        {/* Text */}
                                        <h3 className="font-bold text-xs sm:text-base text-[var(--color-ink)] mb-0.5 sm:mb-1 group-hover:text-[var(--color-ink)] transition-colors leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[var(--color-ink-light)] text-[10px] sm:text-xs leading-snug line-clamp-2">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="mt-2.5 sm:mt-3 flex items-center gap-1 text-[10px] sm:text-xs font-bold opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: feature.color.includes('japan-red') ? 'var(--color-japan-red)' : undefined }}>
                                        <span className={feature.color}>Mulai</span>
                                        <ArrowRight size={12} className={`${feature.color} group-hover:translate-x-0.5 transition-transform`} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Word of the Day ── */}
            <section className="bg-[var(--color-ink)] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 font-jp text-[8rem] sm:text-[12rem] opacity-[0.05] select-none pointer-events-none leading-none font-bold">
                    桜
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 sm:mb-5">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[var(--color-japan-red)] flex items-center justify-center">
                            <Star size={11} className="text-white fill-white" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                            Kata Hari Ini
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-8 mb-4 sm:mb-6">
                        <span className="font-jp text-4xl sm:text-6xl md:text-7xl font-bold leading-none">桜</span>
                        <div className="pb-0.5 sm:pb-1">
                            <span className="text-lg sm:text-2xl text-[var(--color-sakura)] block font-fredoka font-bold">
                                sakura
                            </span>
                            <span className="text-xs sm:text-base text-gray-400">
                                bunga sakura 🌸
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/student/vocabulary"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white text-[var(--color-ink)] font-bold text-xs sm:text-sm hover:bg-[var(--color-washi)] transition-colors"
                    >
                        Lihat Lebih Banyak Kata
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>
        </motion.div>
    );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
