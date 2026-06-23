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
        return <span className={`font-jp text-2xl font-bold ${color}`}>{jpChar}</span>;
    }
    const iconMap: Record<string, React.ReactNode> = {
        vocab:   <List size={22} className={color} />,
        grammar: <BookOpen size={22} className={color} />,
        quiz:    <HelpCircle size={22} className={color} />,
        journey: <Compass size={22} className={color} />,
        notes:   <StickyNote size={22} className={color} />,
    };
    return <>{iconMap[type] ?? <PenTool size={22} className={color} />}</>;
}

export default function Home() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10 pb-12"
        >
            {/* ── Welcome Hero ── */}
            <div className="relative bg-gradient-to-br from-[var(--color-ink)] to-gray-800 text-white rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Decorative kanji watermarks */}
                <div className="absolute -right-6 -top-6 font-jp text-[10rem] font-bold opacity-[0.06] select-none pointer-events-none leading-none">
                    日本
                </div>
                <div className="absolute right-24 bottom-4 font-jp text-[5rem] font-bold opacity-[0.04] select-none pointer-events-none leading-none">
                    語
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-sakura)] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                Dashboard Belajar
                            </span>
                        </div>
                        <h1 className="font-fredoka text-4xl md:text-5xl font-bold leading-tight">
                            Hai,{" "}
                            <span className="text-[var(--color-sakura)]">
                                {user ? user.name : "Sayang"}
                            </span>{" "}
                            💕
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed">
                            Selamat datang di dunia kecil kita~ Yuk lanjut belajar bahasa Jepang bareng hari ini! 🌸
                        </p>
                    </div>

                    {/* Quick stats */}
                    <div className="flex gap-3 shrink-0">
                        <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10 min-w-[90px]">
                            <Flame size={20} className="text-orange-400 mx-auto mb-1" />
                            <p className="text-lg font-bold font-fredoka">7</p>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Hari Belajar</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10 min-w-[90px]">
                            <Star size={20} className="text-yellow-400 mx-auto mb-1" />
                            <p className="text-lg font-bold font-fredoka">✨</p>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Mulai Petualangan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Feature Grid ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 rounded-full bg-[var(--color-japan-red)]" />
                    <h2 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                        Pilih Materi Belajar
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.href}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07, duration: 0.4 }}
                        >
                            <Link
                                href={feature.href}
                                className={`group bg-white p-6 rounded-3xl border-2 border-transparent ${feature.hoverBorder} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block relative overflow-hidden`}
                            >
                                {/* Gradient tint on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <FeatureIcon type={feature.iconType} color={feature.color} jpChar={feature.jpChar} />
                                    </div>

                                    {/* Text */}
                                    <h3 className="font-bold text-base text-[var(--color-ink)] mb-1.5 group-hover:text-[var(--color-ink)] transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[var(--color-ink-light)] text-xs leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Arrow */}
                                    <div className="mt-4 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: feature.color.includes('japan-red') ? 'var(--color-japan-red)' : undefined }}>
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
            <section className="bg-[var(--color-ink)] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 font-jp text-[12rem] opacity-[0.05] select-none pointer-events-none leading-none font-bold">
                    桜
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-6 h-6 rounded-lg bg-[var(--color-japan-red)] flex items-center justify-center">
                            <Star size={12} className="text-white fill-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            Kata Hari Ini
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-8 mb-6">
                        <span className="font-jp text-6xl sm:text-7xl font-bold leading-none">桜</span>
                        <div className="pb-1">
                            <span className="text-xl sm:text-2xl text-[var(--color-sakura)] block font-fredoka font-bold">
                                sakura
                            </span>
                            <span className="text-base text-gray-400">
                                bunga sakura 🌸
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/student/vocabulary"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--color-ink)] font-bold text-sm hover:bg-[var(--color-washi)] transition-colors"
                    >
                        Lihat Lebih Banyak Kata
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </section>
        </motion.div>
    );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
