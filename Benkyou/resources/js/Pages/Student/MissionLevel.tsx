import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import { motion, AnimatePresence } from "motion/react";
import {
    ArrowLeft,
    Play,
    CheckCircle2,
    Lock,
    Star,
    Sparkles,
    MapPin,
    Scroll,
    Shield,
    ChevronRight,
    HelpCircle,
} from "lucide-react";

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
    userCerts: Record<number, { passed: boolean; score: number }>;
}

// Rank theming per level order — matches blueprint N5→N1
const levelThemes: Record<number, {
    rank: string;
    jlpt: string;
    location: string;
    locationJp: string;
    story: string;
    storyEmoji: string;
    bg: string;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
    watermark: string;
}> = {
    1: {
        rank: "Kohai 🔰",
        jlpt: "N5",
        location: "Tokyo · Haneda",
        locationJp: "東京",
        story: "Lapar di Tokyo — selamat datang di Jepang! Kamu harus bisa pesan sushi tanpa menu bahasa Inggris~",
        storyEmoji: "🍣",
        bg: "from-emerald-800 to-teal-900",
        accentColor: "#10b981",
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-800",
        borderColor: "border-emerald-200",
        watermark: "食",
    },
    2: {
        rank: "Senpai 🦊",
        jlpt: "N4",
        location: "Kyoto · Fushimi",
        locationJp: "京都",
        story: "Tersesat di Kyoto — kamu harus membaca peta dan petunjuk arah untuk menemukanku di Kuil Fushimi Inari~",
        storyEmoji: "⛩️",
        bg: "from-blue-800 to-indigo-900",
        accentColor: "#3b82f6",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-800",
        borderColor: "border-blue-200",
        watermark: "道",
    },
    3: {
        rank: "Sensei 🎓",
        jlpt: "N3",
        location: "Shibuya · Tokyo",
        locationJp: "渋谷",
        story: "Magang di Kafe Buku Shibuya — kamu harus menguasai bahasa formal agar diterima kerja. Kita rayakan bersama~",
        storyEmoji: "☕",
        bg: "from-amber-800 to-orange-900",
        accentColor: "#f59e0b",
        badgeBg: "bg-amber-100",
        badgeText: "text-amber-800",
        borderColor: "border-amber-200",
        watermark: "仕",
    },
    4: {
        rank: "Tensai ⚡",
        jlpt: "N2",
        location: "Osaka · Dotonbori",
        locationJp: "大阪",
        story: "Festival Musim Panas Osaka — yukata, kembang api, dan akhirnya... kita ungkapkan perasaan satu sama lain~",
        storyEmoji: "🎆",
        bg: "from-purple-800 to-violet-900",
        accentColor: "#8b5cf6",
        badgeBg: "bg-purple-100",
        badgeText: "text-purple-800",
        borderColor: "border-purple-200",
        watermark: "祭",
    },
    5: {
        rank: "Shogun 👑",
        jlpt: "N1",
        location: "Gunung Fuji · Puncak",
        locationJp: "富士山",
        story: "Penaklukan Gunung Fuji — di puncaknya, ada surat cinta terakhir yang menunggumu. Selesaikan ini~",
        storyEmoji: "🗻",
        bg: "from-[#bc002d] to-rose-900",
        accentColor: "#bc002d",
        badgeBg: "bg-rose-100",
        badgeText: "text-rose-800",
        borderColor: "border-rose-200",
        watermark: "頂",
    },
};

function getTheme(order: number) {
    return levelThemes[order] ?? levelThemes[1];
}

export default function MissionLevel({ meta, subLevels, userCerts }: MissionLevelProps) {
    const theme = getTheme(meta.order);
    const passedCount = Object.values(userCerts).filter((cert) => cert?.passed).length;
    const totalSubs = subLevels.length;

    const [confirmModal, setConfirmModal] = React.useState<{
        isOpen: boolean;
        subId: number | null;
        href: string | null;
    }>({
        isOpen: false,
        subId: null,
        href: null,
    });

    const handleRepeatClick = (e: React.MouseEvent, subId: number, href: string) => {
        e.preventDefault();
        setConfirmModal({
            isOpen: true,
            subId,
            href,
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <Head title={`${meta.title} — ${theme.jlpt}`} />

            {/* ── Back link ── */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href={route("student.missions")}
                    className="inline-flex items-center gap-2 text-[var(--color-ink-light)] font-medium hover:text-[var(--color-japan-red)] transition-colors group text-sm"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    Kembali ke My Journey
                </Link>
            </motion.div>

            {/* ── Story Banner ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative bg-gradient-to-br ${theme.bg} text-white rounded-3xl overflow-hidden`}
            >
                {/* Watermark kanji */}
                <div className="absolute -right-4 -bottom-6 text-[11rem] font-jp font-bold opacity-[0.07] select-none pointer-events-none leading-none">
                    {theme.watermark}
                </div>
                <div className="absolute top-6 right-8 text-[4rem] font-jp opacity-[0.06] select-none pointer-events-none leading-none">
                    {theme.locationJp}
                </div>

                <div className="relative z-10 p-8 md:p-12">
                    {/* Header tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/15 rounded-full">
                            Level {meta.order} · {theme.jlpt}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full flex items-center gap-1">
                            <MapPin size={9} /> {theme.location}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full">
                            {theme.rank}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="text-4xl">{meta.emoji}</div>
                                <h1 className="font-fredoka text-3xl md:text-4xl font-bold leading-tight">
                                    {meta.title}
                                </h1>
                            </div>
                            <p className="text-white/70 text-sm max-w-lg leading-relaxed">
                                {theme.storyEmoji} {theme.story}
                            </p>
                            <div className="pt-1">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
                                    <Scroll size={12} className="opacity-70" />
                                    Target: {meta.goal}
                                </div>
                            </div>
                        </div>

                        {/* Mini progress */}
                        <div className="shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center min-w-[120px] border border-white/10">
                            <p className="text-3xl font-bold font-fredoka">
                                {passedCount}
                                <span className="text-lg text-white/50">/{totalSubs}</span>
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">Tahap Selesai</p>
                            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white/70 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: totalSubs > 0 ? `${(passedCount / totalSubs) * 100}%` : "0%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Sub Level Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {subLevels.map((sub, idx) => {
                    const cert = userCerts[sub.id];
                    const isPassed = !!cert?.passed;
                    const isUnlocked = idx === 0 || !!userCerts[subLevels[idx - 1].id]?.passed;

                    return (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 ${
                                !isUnlocked
                                    ? "opacity-55 grayscale border-gray-200"
                                    : isPassed
                                    ? `${theme.borderColor} shadow-md`
                                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                            }`}
                        >
                            {/* Top accent */}
                            {isPassed && (
                                <div
                                    className="absolute top-0 left-0 right-0 h-0.5"
                                    style={{ backgroundColor: theme.accentColor }}
                                />
                            )}

                            {/* Step number watermark */}
                            <div className="absolute right-4 bottom-4 font-jp text-[5rem] font-bold opacity-[0.04] select-none pointer-events-none leading-none">
                                {sub.id}
                            </div>

                            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    {/* Step badge */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white`}
                                            style={{ backgroundColor: isUnlocked ? theme.accentColor : "#9ca3af" }}
                                        >
                                            {isUnlocked ? (isPassed ? <CheckCircle2 size={18} /> : <Play size={14} fill="currentColor" />) : <Lock size={14} />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-light)]">
                                                Tahap {sub.id}
                                            </p>
                                            <h3
                                                className={`font-bold text-lg leading-tight ${
                                                    isUnlocked ? "text-[var(--color-ink)]" : "text-gray-400"
                                                }`}
                                            >
                                                {sub.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Status badge */}
                                    {isPassed ? (
                                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.borderColor} shrink-0`}>
                                            <Star size={10} fill="currentColor" /> Tuntas ({cert?.score}%)
                                        </span>
                                    ) : !isUnlocked ? (
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 shrink-0">
                                            Terkunci
                                        </span>
                                    ) : null}
                                </div>

                                {/* Question count */}
                                <p className="text-sm text-[var(--color-ink-light)] mb-6 flex items-center gap-1.5">
                                    <Sparkles size={13} style={{ color: theme.accentColor }} />
                                    {sub.questionCount} tantangan menunggumu
                                </p>

                                {/* CTA */}
                                <div className="mt-auto">
                                    {isUnlocked ? (
                                        <Link
                                            href={route("student.missions.start", { level: meta.id, subLevel: sub.id })}
                                            onClick={(e) => {
                                                if (isPassed) {
                                                    handleRepeatClick(
                                                        e,
                                                        sub.id,
                                                        route("student.missions.start", { level: meta.id, subLevel: sub.id })
                                                    );
                                                }
                                            }}
                                            className="w-full inline-flex justify-center items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 group"
                                            style={{
                                                backgroundColor: isPassed ? "#1a1a1a" : theme.accentColor,
                                                color: "white",
                                            }}
                                        >
                                            {isPassed ? (
                                                <>
                                                    <Shield size={15} />
                                                    Ulangi Tahap
                                                </>
                                            ) : (
                                                <>
                                                    <Play size={14} fill="currentColor" />
                                                    Mulai Tahap Ini
                                                </>
                                            )}
                                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    ) : (
                                        <div className="w-full inline-flex justify-center items-center gap-2 bg-gray-100 text-gray-400 rounded-full px-6 py-3 text-sm font-bold cursor-not-allowed">
                                            <Lock size={14} /> Selesaikan tahap sebelumnya
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Empty state */}
                {subLevels.length === 0 && (
                    <div className="col-span-1 md:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="text-5xl mb-4">🗺️</div>
                        <p className="text-[var(--color-ink-light)] font-medium">
                            Belum ada soal untuk level ini — nantikan ya! ✨
                        </p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {confirmModal.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center border-4 border-white"
                        >
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <HelpCircle
                                    size={32}
                                    style={{ color: theme.accentColor }}
                                />
                            </div>

                            <h3 className="text-2xl font-black text-[var(--color-ink)] mb-2 tracking-tight">
                                Ulangi Tahap Ini?
                            </h3>
                            
                            <p className="text-[var(--color-ink-light)] text-sm mb-8 leading-relaxed">
                                Apakah kamu yakin ingin mengulangi tahap ini? Progress pengerjaan kamu pada tahap ini akan diulang dari awal.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmModal({ isOpen: false, subId: null, href: null })}
                                    className="flex-1 bg-white text-[var(--color-ink)] border-2 border-gray-200 font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirmModal.href) {
                                            router.visit(confirmModal.href);
                                        }
                                    }}
                                    className="flex-1 text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-md"
                                    style={{ backgroundColor: theme.accentColor }}
                                >
                                    Ya, Ulangi
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

MissionLevel.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
