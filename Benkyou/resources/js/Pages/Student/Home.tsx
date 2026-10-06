import React, { useState } from "react";
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
    Play,
    CheckCircle2,
    Sparkles,
    Volume2,
    Trophy,
    Award,
    Clock,
} from "lucide-react";
import Layout from "@/Components/Layout";

interface Feature {
    href: string;
    title: string;
    kanjiTag: string;
    description: string;
    iconType: string;
    color: string;
    tagBg: string;
    borderHover: string;
}

const features: Feature[] = [
    {
        href: "/student/missions",
        title: "Journey (Peta Belajar)",
        kanjiTag: "冒険",
        description: "Jalur petualangan belajar terstruktur dari level pemula hingga mahir.",
        iconType: "journey",
        color: "text-[#c73e3a]",
        tagBg: "bg-[#fff0ef] text-[#c73e3a]",
        borderHover: "hover:border-[#c73e3a]/40",
    },
    {
        href: "/student/kana",
        title: "Huruf Kana",
        kanjiTag: "仮名",
        description: "Latihan interaktif Hiragana & Katakana beserta stroke order.",
        iconType: "kana",
        color: "text-[#c73e3a]",
        tagBg: "bg-[#fff0ef] text-[#c73e3a]",
        borderHover: "hover:border-[#c73e3a]/40",
    },
    {
        href: "/student/kanji",
        title: "Karakter Kanji",
        kanjiTag: "漢字",
        description: "Koleksi Kanji JLPT N5 - N1 lengkap dengan makna, onyomi, & kunyomi.",
        iconType: "kanji",
        color: "text-[#944654]",
        tagBg: "bg-[#ffd9dd] text-[#79313f]",
        borderHover: "hover:border-[#944654]/40",
    },
    {
        href: "/student/vocabulary",
        title: "Kosakata (Kotoba)",
        kanjiTag: "単語",
        description: "Perkaya perbendaharaan kata dengan contoh kalimat dan audio pengucapan.",
        iconType: "vocab",
        color: "text-[#326040]",
        tagBg: "bg-[#d0ffd8] text-[#00210d]",
        borderHover: "hover:border-[#326040]/40",
    },
    {
        href: "/student/grammar",
        title: "Tata Bahasa (Bunpou)",
        kanjiTag: "文法",
        description: "Panduan pola kalimat, partikel penting, dan rumus tata bahasa Jepang.",
        iconType: "grammar",
        color: "text-[#0082b2]",
        tagBg: "bg-[#e0f4ff] text-[#0082b2]",
        borderHover: "hover:border-[#0082b2]/40",
    },
    {
        href: "/student/quiz",
        title: "Latihan & Quiz",
        kanjiTag: "練習",
        description: "Evaluasi harian acak untuk menguji kecepatan dan ketepatan pemahaman.",
        iconType: "quiz",
        color: "text-[#79313f]",
        tagBg: "bg-[#ffd9dd] text-[#79313f]",
        borderHover: "hover:border-[#79313f]/40",
    },
    {
        href: "/student/notes",
        title: "Catatan Belajar",
        kanjiTag: "筆記",
        description: "Catatan penting, rangkuman, dan tips berharga dari para Sensei.",
        iconType: "notes",
        color: "text-[#59413f]",
        tagBg: "bg-[#f5ece7] text-[#1e1b18]",
        borderHover: "hover:border-[#59413f]/40",
    },
    {
        href: "/student/themes",
        title: "Koleksi Tema",
        kanjiTag: "装飾",
        description: "Buka palet visual eksklusif bertema musim Jepang sebagai hadiah misi.",
        iconType: "themes",
        color: "text-[#c73e3a]",
        tagBg: "bg-[#fff0ef] text-[#c73e3a]",
        borderHover: "hover:border-[#c73e3a]/40",
    },
];

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

    const [dailyMissions, setDailyMissions] = useState([
        { id: 1, title: "Selesaikan 1 Modul Kana", xp: "+50 XP", done: true },
        { id: 2, title: "Kerjakan 1 Sesi Quiz Harian", xp: "+80 XP", done: false },
        { id: 3, title: "Hafalkan 5 Kosakata Baru", xp: "+60 XP", done: false },
    ]);

    const playAudio = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("さくら");
            utterance.lang = "ja-JP";
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 sm:space-y-8"
        >
            {/* ── 1. Washi Editorial Hero Banner ── */}
            <div className="relative overflow-hidden rounded-2xl bg-white border border-[#efe6e2] p-6 sm:p-8 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                {/* Background Subtle Watermark */}
                <div className="absolute -right-6 -bottom-10 select-none pointer-events-none opacity-[0.03] text-[#1e1b18] font-jp text-[140px] sm:text-[200px] leading-none font-bold">
                    日本語
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbf2ed] text-[#c73e3a] text-xs font-bold tracking-wide border border-[#efe6e2]">
                            <span>🌸</span>
                            <span>NIHONGO ACADEMY • PROGRAM BELAJAR AKTIF</span>
                        </div>
                        <h1 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b18] tracking-tight">
                            Konnichiwa, {user ? user.name : "Gakusei"}! <span className="font-jp text-lg sm:text-2xl font-normal text-[#79716b]">(こんにちは)</span>
                        </h1>
                        <p className="text-sm sm:text-base text-[#59413f] leading-relaxed">
                            Momentum yang sangat baik untuk belajar hari ini. Teruskan semangat latihan membaca, menulis, dan perbanyak kosakata untuk mencapai level berikutnya!
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Link
                                href="/student/missions"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c73e3a] hover:bg-[#a52525] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(199,62,58,0.25)] transition-all"
                            >
                                <Play size={16} className="fill-white" />
                                <span>Lanjut Belajar (Journey)</span>
                            </Link>
                            <Link
                                href="/student/quiz"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5ece7] hover:bg-[#efe6e2] text-[#1e1b18] font-semibold text-sm border border-[#efe6e2] transition-colors"
                            >
                                <HelpCircle size={16} />
                                <span>Kerjakan Quiz</span>
                            </Link>
                        </div>
                    </div>

                    {/* Stat Cards Pods */}
                    <div className="flex flex-row lg:flex-col gap-3 min-w-[240px] sm:min-w-[270px]">
                        {/* Streak Card */}
                        <div className="flex-1 p-3.5 sm:p-4 rounded-xl bg-[#fbf2ed] border border-[#efe6e2] shadow-xs flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#79716b]">Keaktifan Belajar</p>
                                <p className="font-outfit text-xl font-bold text-[#1e1b18]">{streak} Hari Streak</p>
                                <p className="text-[10px] text-[#4b7957] font-semibold">🔥 Konsisten Aktif</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#fff0ef] border border-[#ffd9dd] flex items-center justify-center text-[#c73e3a] shrink-0">
                                <Flame size={22} className="fill-[#c73e3a]" />
                            </div>
                        </div>

                        {/* Misi Tuntas Card */}
                        <div className="flex-1 p-3.5 sm:p-4 rounded-xl bg-[#fbf2ed] border border-[#efe6e2] shadow-xs flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#79716b]">Pencapaian Misi</p>
                                <p className="font-outfit text-xl font-bold text-[#1e1b18]">{passedMissions} Misi Tuntas</p>
                                <p className="text-[10px] text-[#326040] font-semibold">✨ Level Kohai • N5</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#d0ffd8] border border-[#bcefc6] flex items-center justify-center text-[#326040] shrink-0">
                                <Trophy size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. Daily Missions Checklist & Word of the Day Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                {/* Daily Quest Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-[#efe6e2] shadow-[0_1px_8px_rgba(0,0,0,0.04)] space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-5 rounded-full bg-[#c73e3a]" />
                            <h2 className="font-outfit text-base sm:text-lg font-bold text-[#1e1b18]">
                                Target & Misi Harian
                            </h2>
                        </div>
                        <span className="text-xs font-semibold text-[#4b7957] bg-[#d0ffd8] px-2.5 py-0.5 rounded-full">
                            1/3 Selesai
                        </span>
                    </div>

                    <div className="space-y-2.5">
                        {dailyMissions.map((mission) => (
                            <div
                                key={mission.id}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                    mission.done
                                        ? "bg-[#f5ece7]/60 border-[#efe6e2] text-[#79716b]"
                                        : "bg-white border-[#efe6e2] hover:border-[#c73e3a]/40 shadow-xs"
                                }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                        mission.done ? "bg-[#4b7957] text-white" : "border-2 border-[#e9e1dc]"
                                    }`}>
                                        {mission.done && <CheckCircle2 size={15} />}
                                    </div>
                                    <span className={`text-xs sm:text-sm font-semibold truncate ${mission.done ? "line-through text-[#79716b]" : "text-[#1e1b18]"}`}>
                                        {mission.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[11px] font-bold text-[#c73e3a] bg-[#fff0ef] px-2 py-0.5 rounded-md">
                                        {mission.xp}
                                    </span>
                                    {!mission.done && (
                                        <Link
                                            href="/student/quiz"
                                            className="text-[11px] font-bold text-[#1e1b18] hover:text-[#c73e3a] bg-[#f5ece7] hover:bg-[#efe6e2] px-2.5 py-1 rounded-md transition-colors"
                                        >
                                            Mulai
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Word of the Day Card */}
                <div className="bg-[#1e1b18] text-white rounded-2xl p-5 sm:p-6 border border-[#1e1b18] shadow-[0_1px_8px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -right-4 -bottom-6 font-jp text-[9rem] opacity-[0.05] select-none pointer-events-none leading-none font-bold">
                        桜
                    </div>

                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d47a88] bg-white/10 px-2.5 py-0.5 rounded-full">
                                Kata Hari Ini (今日の一言)
                            </span>
                            <button
                                onClick={playAudio}
                                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                                title="Dengarkan Audio"
                            >
                                <Volume2 size={15} />
                            </button>
                        </div>

                        <div className="pt-2">
                            <div className="flex items-baseline gap-3">
                                <span className="font-jp text-4xl sm:text-5xl font-bold leading-none">桜</span>
                                <div>
                                    <p className="font-outfit text-base font-bold text-[#f4c2c2]">sakura</p>
                                    <p className="text-xs text-white/70">Bunga sakura Jepang</p>
                                </div>
                            </div>
                            <div className="mt-3 p-2.5 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-white/90 font-jp">桜がとても綺麗ですね。</p>
                                <p className="text-[10px] text-white/60 italic mt-0.5">Bunga sakura sangat indah, ya.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-4 mt-auto">
                        <Link
                            href="/student/vocabulary"
                            className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                            <span>Buka Kamus Kosakata</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── 3. Bento Grid: Modul Pembelajaran Utama ── */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-5 rounded-full bg-[#c73e3a]" />
                        <h2 className="font-outfit text-base sm:text-lg font-bold text-[#1e1b18]">
                            Pilih Modul Pembelajaran
                        </h2>
                    </div>
                    <span className="text-xs text-[#79716b]">8 Modul Tersedia</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.href}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.3 }}
                        >
                            <Link
                                href={feature.href}
                                className={`group bg-white p-5 rounded-2xl border border-[#efe6e2] ${feature.borderHover} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col justify-between relative overflow-hidden`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${feature.tagBg} font-jp`}>
                                            {feature.kanjiTag}
                                        </span>
                                        <div className="w-7 h-7 rounded-lg bg-[#fbf2ed] flex items-center justify-center text-[#79716b] group-hover:text-[#c73e3a] group-hover:bg-[#fff0ef] transition-colors">
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-outfit font-bold text-sm sm:text-base text-[#1e1b18] group-hover:text-[#c73e3a] transition-colors leading-tight mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs text-[#79716b] leading-relaxed line-clamp-2">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#f5ece7] flex items-center justify-between text-[11px] font-semibold text-[#59413f]">
                                    <span>Pelajari Modul</span>
                                    <span className="text-[#c73e3a] font-bold group-hover:underline">Buka &rarr;</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
