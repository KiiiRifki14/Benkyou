import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    PenTool,
    Languages,
    GraduationCap,
    ArrowRight,
    Star,
    Heart,
    CheckCircle2,
    ChevronRight,
    Play,
    FileText,
    Compass,
    Award,
    ShieldCheck,
    Check,
    MapPin,
    Phone,
    Calendar,
    X,
    ExternalLink,
    AlertTriangle,
    Info,
    Clock,
    Sparkles,
    ArrowUp,
} from "lucide-react";

export default function Welcome({
    auth,
    landingSettings = {},
    adminNotes = [],
}) {
    const [activeTab, setActiveTab] = useState("pemula");
    const [activeAspect, setActiveAspect] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Section visibility helper — reads toggle from landing settings
    const isVisible = (key) => landingSettings[key] !== "0";
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const tabContents = {
        pemula: {
            name: landingSettings["tab1_name"] || "Tahap Awal",
            title:
                landingSettings["tab1_title"] ||
                "Langkah Pertama yang Menyenangkan~",
            subtitle:
                landingSettings["tab1_subtitle"] ||
                "Dari coretan pertama, kamu sudah keren!",
            desc1:
                landingSettings["tab1_desc1"] ||
                "Di sini kamu akan belajar huruf Hiragana & Katakana dengan cara yang fun — nggak bakal bikin pusing. Kita mulai pelan-pelan aja, yang penting enjoy~",
            desc2:
                landingSettings["tab1_desc2"] ||
                "Kosakata sehari-hari, cara baca yang benar, dan kenalan sama Kanji dasar. Setiap kuis dirancang biar kamu senyum pas jawabnya, bukan stres!",
            badge: "Kohai 🌱",
            stats:
                landingSettings["tab1_stats"] ||
                "120 Kanji • 800 Kosakata • 40 Tantangan Seru",
        },
        menengah: {
            name: landingSettings["tab2_name"] || "Tahap Seru",
            title: landingSettings["tab2_title"] || "Makin Jago, Makin Asyik!",
            subtitle:
                landingSettings["tab2_subtitle"] ||
                "Kamu udah mulai paham nih~",
            desc1:
                landingSettings["tab2_desc1"] ||
                "Sekarang kamu bisa baca teks yang lebih panjang dan mulai merangkai kalimat sendiri. Rasanya kayak lagi unlock skill baru di game, kan?",
            desc2:
                landingSettings["tab2_desc2"] ||
                "Latihan membaca yang dinamis dan Kanji yang makin banyak. Percaya deh, kamu bakal kaget sendiri sama progress-mu!",
            badge: "Senpai ⚡",
            stats:
                landingSettings["tab2_stats"] ||
                "650 Kanji • 3,500 Kosakata • 60 Tantangan",
        },
        lanjut: {
            name: landingSettings["tab3_name"] || "Tahap Legend",
            title:
                landingSettings["tab3_title"] ||
                "Siap Nonton Anime Tanpa Subtitle!",
            subtitle:
                landingSettings["tab3_subtitle"] || "Kamu udah level dewa nih~",
            desc1:
                landingSettings["tab3_desc1"] ||
                "Kanji tingkat lanjut, idiom, dan bahasa yang dipake di berita, manga, dan lagu J-Pop. Kamu bakal ngerti lirik lagu favoritmu tanpa buka kamus!",
            desc2:
                landingSettings["tab3_desc2"] ||
                "Latihan interaktif yang menantang tapi tetap seru. Dari baca panjang sampai dengerin percakapan — semua dirancang biar kamu siap jalan-jalan ke Jepang! ✈️",
            badge: "Shogun 👑",
            stats:
                landingSettings["tab3_stats"] ||
                "2,000 Kanji • 10,000 Kosakata • 80 Tantangan",
        },
    };

    const programs = [
        {
            title: "Huruf & Kanji",
            subtitle: "Kana, Kanji & Cara Menulis",
            desc: "Belajar coretan huruf Hiragana, Katakana, dan Kanji dengan cara yang seru — ada visualisasi lucu biar gampang ingat!",
            link: "/register",
            colorFront:
                "from-pink-500/10 to-red-500/5 text-[var(--color-japan-red)] border-red-200/60",
            colorBack: "bg-[var(--color-japan-red)] text-white",
            badge: "Menulis & Kanji",
            icon: <PenTool className="w-12 h-12" />,
        },
        {
            title: "Tata Bahasa",
            subtitle: "Pola Kalimat & Konjugasi",
            desc: "Racik kalimatmu sendiri kayak bikin resep rahasia~ Dari partikel dasar sampai pola yang bikin kamu terdengar kayak native!",
            link: "/register",
            colorFront:
                "from-emerald-500/10 to-teal-500/5 text-emerald-800 border-emerald-200/60",
            colorBack: "bg-emerald-800 text-white",
            badge: "Grammar & Percakapan",
            icon: <Languages className="w-12 h-12" />,
        },
        {
            title: "My Journey",
            subtitle: "Tantangan Naik Level",
            desc: "Dari Kohai sampai Shogun — setiap tantangan yang kamu selesaikan buka reward spesial. Ada pesan rahasia di setiap level!",
            link: "/register",
            colorFront:
                "from-blue-500/10 to-indigo-500/5 text-blue-800 border-blue-200/60",
            colorBack: "bg-blue-800 text-white",
            badge: "Gelar & Reward",
            icon: <GraduationCap className="w-12 h-12" />,
        },
    ];

    const aspects = [
        {
            title: "Mulai dari yang Mudah Dulu~",
            desc: "Nggak perlu langsung jago! Kita mulai dari huruf paling dasar, pelan-pelan aja. Yang penting kamu enjoy dan nggak merasa terbebani.",
            points: [
                "Nggak ada tes masuk",
                "Mulai dari nol pun bisa",
                "Progress sesuai kecepatanmu sendiri",
            ],
            bg: "bg-rose-50 border-rose-100",
            icon: <Compass className="w-8 h-8 text-[var(--color-japan-red)]" />,
        },
        {
            title: "Belajar Kapan Aja, di Mana Aja",
            desc: "Buka HP, langsung bisa belajar. Nggak perlu jadwal kaku — kamu yang tentuin kapan mau latihan. Mau tengah malam juga boleh~",
            points: [
                "Akses 24/7 dari mana aja",
                "Kuis acak biar nggak bosen",
                "Nggak ada deadline yang bikin stres",
            ],
            bg: "bg-emerald-50 border-emerald-100",
            icon: <Award className="w-8 h-8 text-emerald-600" />,
        },
        {
            title: "Setiap Langkah Ada Hadiahnya",
            desc: "Setiap kali kamu selesai satu tantangan, kamu naik level dan buka reward baru — dari tema cantik sampai pesan rahasia!",
            points: [
                "Naik gelar: Kohai → Shogun",
                "Unlock tema eksklusif",
                "Pesan surprise di setiap level",
            ],
            bg: "bg-blue-50 border-blue-100",
            icon: <BookOpen className="w-8 h-8 text-blue-600" />,
        },
        {
            title: "Feedback Instan + Kejutan",
            desc: "Setiap jawaban langsung dikasih tahu bener atau nggak — plus penjelasan yang gampang dimengerti. Kayak punya tutor pribadi 24 jam!",
            points: [
                "Nilai langsung muncul",
                "Penjelasan ramah, bukan textbook",
                "Ada Easter egg tersembunyi~",
            ],
            bg: "bg-amber-50 border-amber-100",
            icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
        },
    ];

    const testimonials = [
        {
            name: "Surat #1",
            role: "Pesan dari Pembuat",
            detail: "Hari spesialmu~ 🎂",
            avatar: "💌",
            color: "bg-pink-100 text-pink-800",
            quoteTitle: '"Aku bikin ini semua buat kamu, lho~"',
            quoteText:
                "Setiap huruf, setiap soal, setiap tantangan di sini aku rancang khusus buat kamu. Bukan buat ujian, bukan buat sertifikat — tapi biar kamu senyum setiap kali buka web ini. Happy birthday, sayang! 🌸",
        },
        {
            name: "Surat #2",
            role: "Kenapa Bahasa Jepang?",
            detail: "Karena kamu suka anime 📺",
            avatar: "🎌",
            color: "bg-blue-100 text-blue-800",
            quoteTitle:
                '"Suatu hari nanti, kita nonton anime bareng tanpa subtitle~"',
            quoteText:
                "Aku tahu kamu suka banget sama Jepang — dari anime, J-Pop, sampai makanan. Jadi aku bikin perjalanan kecil ini biar suatu hari kamu bisa jalan-jalan ke sana dan pesen ramen sendiri pakai bahasa Jepang! 🍜",
        },
        {
            name: "Surat #3",
            role: "Janji Kecil",
            detail: "Kita belajar bareng ya~",
            avatar: "🤝",
            color: "bg-emerald-100 text-emerald-800",
            quoteTitle: '"Kalau kamu stuck, aku selalu ada di sini."',
            quoteText:
                "Nggak usah buru-buru. Nggak usah sempurna. Yang penting kamu coba dan having fun. Kalau ada yang bikin bingung, tinggal bilang aja — aku siap jelasin sampai kamu paham. Kita team! 💪",
        },
        {
            name: "Surat #4",
            role: "Masa Depan Kita",
            detail: "Trip ke Jepang! ✈️",
            avatar: "🗾",
            color: "bg-purple-100 text-purple-800",
            quoteTitle: '"Reward terbesarnya? Jalan-jalan bareng ke Jepang~"',
            quoteText:
                "Kalau kamu udah sampai level Shogun, itu tandanya kamu udah siap diajak jalan-jalan ke Jepang. Dan tebak apa? Aku udah siapin itinerary-nya. Jadi... semangat belajarnya ya! ✈️🗻🌸",
        },
    ];

    const news = [
        {
            title: "💌 Surat rahasia baru udah ditambahkan di Level 3 — coba selesaikan tantangannya!",
            date: "Juli 2026",
            type: "SURPRISE",
        },
        {
            title: "🎵 Challenge baru: Coba terjemahin lirik lagu J-Pop favoritmu!",
            date: "Juli 2026",
            type: "FUN",
        },
        {
            title: "✈️ Kalau kamu sampai Level Shogun, ada hadiah spesial menunggumu~",
            date: "Rahasia",
            type: "MYSTERY",
        },
    ];

    return (
        <>
            <Head>
                <title>Benkyou — Untukmu, yang Spesial 🌸</title>
                <meta
                    name="description"
                    content="Sebuah dunia kecil berisi huruf, kata, dan cerita dalam bahasa Jepang — dibuat khusus untukmu."
                />
            </Head>

            <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-japan-red)] selection:text-white relative overflow-hidden">
                {/* Top Announcement Bar */}
                <div className="bg-[var(--color-ink)] text-white text-[11px] font-fredoka py-2 px-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <span className="font-light tracking-wider flex items-center gap-1.5">
                            <Sparkles size={12} className="text-yellow-400" />{" "}
                            Dibuat dengan sepenuh hati, khusus untukmu~
                        </span>
                        <div className="hidden sm:flex gap-5 items-center opacity-90">
                            <a
                                href="#kontak"
                                className="hover:text-[var(--color-sakura)] transition-colors"
                            >
                                Surat Rahasia
                            </a>
                            <span className="opacity-30">|</span>
                            <a
                                href="#manfaat"
                                className="hover:text-[var(--color-sakura)] transition-colors"
                            >
                                Perjalananmu
                            </a>
                            <span className="opacity-30">|</span>
                            <span className="flex items-center gap-1 font-medium">
                                💕 Made for You
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Header / Navigation */}
                <header className="sticky top-0 z-40 bg-[var(--color-washi)]/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm px-6 py-3.5">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                                日
                            </div>
                            <div>
                                <h1 className="font-fredoka font-bold text-2xl tracking-tight text-[var(--color-ink)] leading-none">
                                    Benkyou
                                </h1>
                                <p className="text-[10px] tracking-widest text-[var(--color-japan-red)] uppercase font-extrabold mt-0.5">
                                    Made for You
                                </p>
                            </div>
                        </Link>

                        {/* Navigation links (Kumon Style) */}
                        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-gray-700">
                            <a
                                href="#manfaat"
                                className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200"
                            >
                                Perjalananmu
                            </a>
                            <a
                                href="#metode"
                                className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200"
                            >
                                Kenapa Beda
                            </a>
                            <a
                                href="#modul"
                                className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200"
                            >
                                Yang Bisa Dipelajari
                            </a>
                            <a
                                href="#testimoni"
                                className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200"
                            >
                                Surat Rahasia
                            </a>
                            <a
                                href="#berita"
                                className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200"
                            >
                                Kejutan
                            </a>
                        </nav>

                        {/* Auth CTA */}
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-red-600/10 flex items-center gap-2"
                                >
                                    Dasbor Belajar <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-red-600/15 flex items-center gap-1.5"
                                    >
                                        Daftar Sekarang{" "}
                                        <ChevronRight size={16} />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#FDFBF7] via-[#f7f4ed] to-[#F1EDE2] border-b border-gray-200/80 overflow-hidden">
                    {/* Subtle Decorative Elements */}
                    <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[85dvh] lg:min-h-[90dvh] items-center relative pt-20 pb-16 lg:pt-12 lg:pb-12">
                        {/* Left Content Column */}
                        <div className="lg:col-span-6 px-6 sm:px-8 lg:px-16 py-6 lg:py-10 space-y-7 z-10">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-japan-red)]/10 text-[var(--color-japan-red)] text-[11px] font-extrabold uppercase tracking-widest border border-red-200/40">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-japan-red)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-japan-red)]"></span>
                                </span>
                                {landingSettings["hero_badge"] ||
                                    "Yuk Belajar Bareng!"}
                            </div>

                            <h2
                                className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-ink)] leading-[1.1]"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        landingSettings["hero_title"] ||
                                        'Ayo mulai perjalanan bahasamu hari ini, <br /><span class="text-[var(--color-japan-red)] font-bold">buat kamu!</span>',
                                }}
                            />

                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                                {landingSettings["hero_subtitle"] ||
                                    "Temukan cara paling asyik dan santai buat belajar bahasa Jepang bareng aku."}
                            </p>

                            <div className="pt-3 flex flex-wrap gap-4 items-center">
                                <Link
                                    href={
                                        auth?.user ? "/dashboard" : "/register"
                                    }
                                    className="px-8 py-3.5 rounded-full bg-[var(--color-japan-red)] text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/20 flex items-center gap-2 text-sm"
                                >
                                    {landingSettings["hero_cta_text"] ||
                                        "Mulai Belajar"}{" "}
                                    <ChevronRight size={18} />
                                </Link>

                                <button
                                    onClick={() => setIsVideoOpen(true)}
                                    className="px-6 py-3.5 rounded-full bg-white border border-gray-300 text-[var(--color-ink)] font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2 text-sm shadow-sm"
                                >
                                    <Play
                                        size={16}
                                        className="fill-[var(--color-japan-red)] text-[var(--color-japan-red)]"
                                    />{" "}
                                    Tonton Video Intro
                                </button>
                            </div>

                            <div className="pt-6 border-t border-gray-200/80 flex items-center gap-3 text-xs text-gray-500 font-medium">
                                <FileText
                                    size={16}
                                    className="text-[var(--color-japan-red)]"
                                />
                                <span>
                                    Unduh Buklet Panduan Belajar Mandiri Benkyou
                                    (PDF) •{" "}
                                    <a
                                        href="#"
                                        className="text-[var(--color-japan-red)] font-bold hover:underline"
                                    >
                                        Unduh (5.4 MB)
                                    </a>
                                </span>
                            </div>
                        </div>

                        {/* Right Banner Image Collage Column */}
                        <div className="lg:col-span-6 h-full min-h-[360px] lg:min-h-[580px] w-full relative flex items-center justify-center p-6 lg:p-0">
                            <div className="relative w-full max-w-[480px] h-[340px] lg:h-[420px] z-10">
                                {/* Collage Layer 1: Background Shape */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-orange-100/60 rounded-3xl transform rotate-3 shadow-sm border border-orange-200/30" />

                                {/* Collage Layer 2: Main Hero Image */}
                                <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/50">
                                    <img
                                        src="/images/benkyou_hero.png"
                                        alt="Benkyou Premium Japanese Learning"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Collage Layer 3: Overlapping Interactive Stat Badge */}
                                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center gap-3 animate-bounce-slow">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-bold">
                                        🇯🇵
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                                            Cocok Buat
                                        </p>
                                        <p className="text-sm font-fredoka font-semibold text-green-800 mt-1">
                                            Pemula s/d Mahir
                                        </p>
                                    </div>
                                </div>

                                {/* Collage Layer 4: Overlapping Info Badge */}
                                <div className="absolute -top-4 -right-4 bg-[var(--color-japan-red)] text-white p-4 rounded-2xl shadow-xl border border-red-500/20 text-center">
                                    <p className="text-xl font-bold font-fredoka leading-none">
                                        100%
                                    </p>
                                    <p className="text-[9px] font-extrabold uppercase tracking-widest mt-1 opacity-90">
                                        Digital Mandiri
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Program & Manfaatnya (Kumon-style Overlapping Tabs) */}
                {isVisible("section_program_visible") && (
                    <section
                        id="manfaat"
                        className="py-24 px-6 max-w-7xl mx-auto"
                    >
                        <div className="text-center space-y-2 max-w-2xl mx-auto">
                            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                                {landingSettings["program_title"] ||
                                    "Perjalanan Belajarmu~"}
                            </h2>
                            <div className="under-heading-wave" />
                            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                                {landingSettings["program_subtitle"] ||
                                    "Dari nol sampai bisa pesen ramen di Tokyo — semua dimulai dari langkah kecil ini."}
                            </p>
                        </div>

                        {/* Navigation Tabs (Kumon design style) */}
                        <div className="mt-14 flex justify-center border-b border-gray-200">
                            <div className="flex flex-wrap -mb-px justify-center gap-2 sm:gap-4">
                                {Object.keys(tabContents).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`py-4 px-6 sm:px-8 text-sm sm:text-base font-bold font-fredoka border-b-4 transition-all duration-200 ${
                                            activeTab === key
                                                ? "border-[var(--color-japan-red)] text-[var(--color-japan-red)] bg-white/50 rounded-t-xl"
                                                : "border-transparent text-gray-400 hover:text-gray-600"
                                        }`}
                                    >
                                        {key === "pemula" &&
                                            (landingSettings["tab1_name"] ||
                                                "Tahap Awal")}
                                        {key === "menengah" &&
                                            (landingSettings["tab2_name"] ||
                                                "Tahap Seru")}
                                        {key === "lanjut" &&
                                            (landingSettings["tab3_name"] ||
                                                "Tahap Legend")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Overlapping layout container */}
                        <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-6 sm:p-12 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.25 }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                                >
                                    {/* Collage / Image Layout Left (overlapping like Kumon page) */}
                                    <div className="lg:col-span-5 flex items-center justify-center p-4">
                                        <div className="relative w-full max-w-[340px] h-[300px]">
                                            {/* Layer 1: Colored base plate */}
                                            <div className="absolute inset-0 bg-rose-50 rounded-2xl transform rotate-6 border border-rose-100" />
                                            {/* Layer 2: Secondary plate */}
                                            <div className="absolute inset-4 bg-orange-50 rounded-2xl transform -rotate-3 border border-orange-100" />
                                            {/* Layer 3: Main photo (using our premium hero image as cover asset) */}
                                            <div className="absolute inset-6 bg-white rounded-xl overflow-hidden shadow-md border border-gray-200/60">
                                                <img
                                                    src="/images/benkyou_hero.png"
                                                    alt={
                                                        tabContents[activeTab]
                                                            .title
                                                    }
                                                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                            {/* Layer 4: Floating tag */}
                                            <div className="absolute -bottom-2 right-2 bg-[var(--color-ink)] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                🇯🇵{" "}
                                                {
                                                    tabContents[
                                                        activeTab
                                                    ].stats.split(" • ")[0]
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content Right */}
                                    <div className="lg:col-span-7 space-y-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-[var(--color-japan-red)] border border-red-200/50 text-[10px] font-bold uppercase tracking-wider font-fredoka">
                                            {tabContents[activeTab].badge}
                                        </div>

                                        <h3 className="font-fredoka text-2xl sm:text-3xl font-semibold leading-snug text-[var(--color-ink)]">
                                            {tabContents[activeTab].title}
                                        </h3>

                                        <p className="text-base font-serif italic text-gray-500 border-l-4 border-[var(--color-japan-red)]/30 pl-4 py-1 bg-rose-50/20">
                                            "{tabContents[activeTab].subtitle}"
                                        </p>

                                        <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                                            <p>
                                                {tabContents[activeTab].desc1}
                                            </p>
                                            <p>
                                                {tabContents[activeTab].desc2}
                                            </p>
                                        </div>

                                        {/* Program stats list */}
                                        <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-gray-500">
                                            {tabContents[activeTab].stats
                                                .split(" • ")
                                                .map((stat, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-gray-100/80 border border-gray-200/60 px-3 py-1.5 rounded-lg flex items-center gap-1"
                                                    >
                                                        <Check
                                                            size={12}
                                                            className="text-green-600"
                                                        />{" "}
                                                        {stat}
                                                    </span>
                                                ))}
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center">
                                            <Link
                                                href="/register"
                                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-japan-red)] text-white font-bold hover:bg-red-700 transition-all text-sm shadow-md shadow-red-600/10"
                                            >
                                                Daftar Program Ini{" "}
                                                <ArrowRight size={16} />
                                            </Link>
                                            <span className="text-xs text-gray-400 font-semibold">
                                                Tersedia coba gratis 7 hari
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </section>
                )}

                {/* Section: Program Belajar (3D Flip Cards) */}
                {isVisible("section_modul_visible") && (
                    <section
                        id="modul"
                        className="py-24 bg-gray-50/60 border-y border-gray-200/60 px-6"
                    >
                        <div className="max-w-7xl mx-auto space-y-16">
                            <div className="text-center space-y-2 max-w-2xl mx-auto">
                                <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                                    {landingSettings["modul_title"] ||
                                        "Apa Aja yang Bisa Kamu Pelajari~"}
                                </h2>
                                <div className="under-heading-wave" />
                                <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                                    {landingSettings["modul_subtitle"] ||
                                        "Pilih yang kamu suka, atau coba semuanya — yang penting having fun!"}
                                </p>
                            </div>

                            {/* Flip Cards Grid (Kumon-style 3D flip) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {programs.map((prog, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative h-[380px] w-full perspective-1000"
                                    >
                                        <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 transition-transform">
                                            {/* Front Side */}
                                            <div
                                                className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl border p-8 flex flex-col justify-between bg-gradient-to-br bg-white shadow-sm border-gray-200/80`}
                                            >
                                                <div className="space-y-4">
                                                    <div className="inline-block px-3 py-1 rounded-full bg-white border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                        {prog.badge}
                                                    </div>

                                                    <div className="text-[var(--color-japan-red)]/85 pt-2">
                                                        {prog.icon}
                                                    </div>

                                                    <h3 className="font-fredoka text-2xl font-bold text-[var(--color-ink)] pt-2">
                                                        {prog.title}
                                                    </h3>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                        {prog.subtitle}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs font-bold text-[var(--color-japan-red)]">
                                                    <span>
                                                        Lihat Detail Program
                                                    </span>
                                                    <div className="w-8 h-8 rounded-full bg-[var(--color-japan-red)]/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                        <ChevronRight
                                                            size={16}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Back Side */}
                                            <div
                                                className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-8 flex flex-col justify-between ${prog.colorBack} shadow-xl`}
                                            >
                                                <div className="space-y-4">
                                                    <h4 className="font-fredoka text-xl font-bold border-b border-white/20 pb-2">
                                                        Detail Kurikulum
                                                    </h4>
                                                    <p className="text-sm text-white/90 leading-relaxed font-sans">
                                                        {prog.desc}
                                                    </p>
                                                    <ul className="text-xs space-y-2 text-white/80 pt-2 font-medium">
                                                        <li className="flex items-center gap-1.5">
                                                            ✓ Materi Interaktif
                                                            Mudah Diakses
                                                        </li>
                                                        <li className="flex items-center gap-1.5">
                                                            ✓ Audio Penutur Asli
                                                            Jepang
                                                        </li>
                                                        <li className="flex items-center gap-1.5">
                                                            ✓ Evaluasi Kemajuan
                                                            Realtime
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div>
                                                    <Link
                                                        href={prog.link}
                                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-[var(--color-ink)] font-bold hover:bg-gray-100 transition-colors text-sm shadow-md"
                                                    >
                                                        Daftar Sekarang{" "}
                                                        <ArrowRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Section: 4 Aspek Penting (Horizontal Expanding Cards Accordion) */}
                {isVisible("section_method_visible") && (
                    <section
                        id="metode"
                        className="py-24 px-6 max-w-7xl mx-auto space-y-16"
                    >
                        <div className="text-center space-y-2 max-w-2xl mx-auto">
                            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                                {landingSettings["method_title"] ||
                                    "Kenapa Belajar di Sini Beda dari yang Lain?"}
                            </h2>
                            <div className="under-heading-wave" />
                            <p className="text-sm text-gray-500 font-medium">
                                {landingSettings["method_subtitle"] ||
                                    "Klik panel kartu buat baca selengkapnya~"}
                            </p>
                        </div>

                        {/* Horizontal Expanding Cards */}
                        <motion.div
                            layout
                            className="hidden md:flex flex-row gap-4 min-h-[380px] w-full"
                        >
                            {aspects.map((aspect, idx) => {
                                const isActive = activeAspect === idx;
                                return (
                                    <motion.div
                                        layout
                                        key={idx}
                                        onClick={() => setActiveAspect(idx)}
                                        transition={{
                                            type: "spring",
                                            stiffness: 180,
                                            damping: 25,
                                        }}
                                        className={`relative border rounded-3xl p-8 flex flex-col justify-between cursor-pointer shadow-sm overflow-hidden ${
                                            isActive
                                                ? `${aspect.bg} border-gray-300/40`
                                                : "bg-white hover:bg-gray-50/50 hover:border-gray-300 border-gray-200"
                                        }`}
                                        style={{
                                            flex: isActive ? 3 : 0.8,
                                        }}
                                    >
                                        {/* Decorative big index number background */}
                                        <div className="absolute right-4 top-4 font-fredoka font-black text-6xl opacity-[0.03] pointer-events-none select-none">
                                            {`0${idx + 1}`}
                                        </div>

                                        <motion.div
                                            layout
                                            className="flex flex-col h-full justify-between"
                                        >
                                            {/* Top element: icon or title depending on active state */}
                                            <motion.div
                                                layout
                                                className="flex flex-col gap-4"
                                            >
                                                <motion.div
                                                    layout
                                                    className={`flex gap-3 transition-all duration-300 ${
                                                        isActive
                                                            ? "flex-row items-center"
                                                            : "flex-col items-center"
                                                    }`}
                                                >
                                                    {/* Icon Container */}
                                                    <motion.div
                                                        layout
                                                        className={`rounded-2xl border transition-all duration-300 shrink-0 ${
                                                            isActive
                                                                ? "p-3 bg-white border-gray-100 shadow-sm"
                                                                : "p-2.5 bg-gray-50 border-gray-100"
                                                        }`}
                                                    >
                                                        {aspect.icon}
                                                    </motion.div>

                                                    {/* Title & Badge */}
                                                    <motion.div
                                                        layout
                                                        className={`flex flex-col ${!isActive ? "items-center" : ""}`}
                                                    >
                                                        <AnimatePresence mode="wait">
                                                            {isActive ? (
                                                                <motion.div
                                                                    key="active-title"
                                                                    initial={{
                                                                        opacity: 0,
                                                                        x: -10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        x: 0,
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        x: -10,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.15,
                                                                    }}
                                                                >
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-fredoka">
                                                                        Aspek{" "}
                                                                        {`0${idx + 1}`}
                                                                    </p>
                                                                    <h3 className="font-fredoka text-lg lg:text-xl font-bold text-[var(--color-ink)] leading-snug">
                                                                        {
                                                                            aspect.title
                                                                        }
                                                                    </h3>
                                                                </motion.div>
                                                            ) : (
                                                                <motion.span
                                                                    key="inactive-number"
                                                                    initial={{
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.15,
                                                                    }}
                                                                    className="font-fredoka font-bold text-sm text-gray-300"
                                                                >
                                                                    {`0${idx + 1}`}
                                                                </motion.span>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>

                                            {/* Middle Section: description + points (active) or vertical text (inactive) */}
                                            <div className="flex-1 flex flex-col justify-center">
                                                <AnimatePresence mode="wait">
                                                    {isActive ? (
                                                        <motion.div
                                                            key="active-content"
                                                            initial={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                                delay: 0.1,
                                                            }}
                                                            className="my-4 space-y-4"
                                                        >
                                                            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed font-sans">
                                                                {aspect.desc}
                                                            </p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                                                {aspect.points.map(
                                                                    (
                                                                        pt,
                                                                        pIdx,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                pIdx
                                                                            }
                                                                            className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-gray-700 bg-white/70 px-2.5 py-1.5 rounded-xl border border-gray-100 shadow-sm animate-fade-in"
                                                                        >
                                                                            <CheckCircle2
                                                                                size={
                                                                                    12
                                                                                }
                                                                                className="text-green-600 shrink-0"
                                                                            />
                                                                            <span className="truncate">
                                                                                {
                                                                                    pt
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="inactive-content"
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 0.4,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.15,
                                                            }}
                                                            className="flex justify-center w-full py-4"
                                                        >
                                                            <span className="writing-vertical font-fredoka font-semibold text-gray-600 tracking-wide text-center uppercase whitespace-nowrap leading-none text-xs">
                                                                {aspect.title.substring(
                                                                    0,
                                                                    24,
                                                                )}
                                                                ...
                                                            </span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Bottom: vertical text when collapsed, small link when active */}
                                            <motion.div
                                                layout
                                                className="mt-auto"
                                            >
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                            className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-japan-red)] mt-2"
                                                        >
                                                            <span>
                                                                Aspek Metode
                                                                Benkyou
                                                            </span>
                                                            <Sparkles
                                                                size={12}
                                                                className="animate-spin-slow"
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Fallback accordion for mobile */}
                        <div className="flex md:hidden flex-col gap-4">
                            {aspects.map((aspect, idx) => {
                                const isActive = activeAspect === idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveAspect(idx)}
                                        className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                                            isActive
                                                ? `${aspect.bg} border-gray-300/40 shadow-sm`
                                                : "bg-white border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center scale-90">
                                                    {aspect.icon}
                                                </div>
                                                <h3 className="font-fredoka text-sm font-bold text-[var(--color-ink)]">
                                                    {aspect.title}
                                                </h3>
                                            </div>
                                            <span className="font-fredoka font-black text-xs text-gray-300">
                                                {`0${idx + 1}`}
                                            </span>
                                        </div>

                                        {isActive && (
                                            <div className="mt-4 space-y-4 border-t border-gray-200/50 pt-4">
                                                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                                                    {aspect.desc}
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    {aspect.points.map(
                                                        (pt, pIdx) => (
                                                            <div
                                                                key={pIdx}
                                                                className="flex items-center gap-2 text-[10px] font-bold text-gray-700 bg-white/70 px-2 py-1.5 rounded-lg border border-gray-100 shadow-sm"
                                                            >
                                                                <CheckCircle2
                                                                    size={12}
                                                                    className="text-green-600"
                                                                />
                                                                <span>
                                                                    {pt}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Section: Testimonials & Kisah Sukses (Kumon Profile Selector Style) */}
                {isVisible("section_testi_visible") && (
                    <section
                        id="testimoni"
                        className="py-24 bg-white border-t border-gray-200/80 px-6"
                    >
                        <div className="max-w-7xl mx-auto space-y-16">
                            <div className="text-center space-y-2 max-w-2xl mx-auto">
                                <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                                    {landingSettings["testi_title"] ||
                                        "Surat-Surat Rahasia Untukmu"}
                                </h2>
                                <div className="under-heading-wave" />
                                <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                                    {landingSettings["testi_subtitle"] ||
                                        "Baca satu-satu ya~ Setiap surat punya cerita dan pesan yang berbeda. 💌"}
                                </p>
                            </div>

                            {/* Real Admin Notes from Database */}
                            {adminNotes && adminNotes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {adminNotes.map((note, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
                                        >
                                            <div className="absolute -right-2 -top-2 font-serif font-black text-[120px] text-gray-100/50 pointer-events-none select-none leading-none">
                                                "
                                            </div>
                                            <div className="relative z-10 space-y-4">
                                                <span className="inline-block text-[10px] font-bold text-[var(--color-japan-red)] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                                                    {note.date}
                                                </span>
                                                {note.title && (
                                                    <h3 className="font-fredoka text-lg font-bold text-[var(--color-ink)]">
                                                        {note.title}
                                                    </h3>
                                                )}
                                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                                    {note.content.length > 150
                                                        ? note.content.substring(
                                                              0,
                                                              150,
                                                          ) + "..."
                                                        : note.content}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-[var(--color-ink-light)] italic pt-2 border-t border-gray-100">
                                                    <span>— dengan 💕</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 text-gray-400">
                                    <p>
                                        Catatan-catatan kecil akan muncul di
                                        sini~ ✨
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Section: Berita Terbaru (Kumon News style with timeline illustration) */}
                {isVisible("section_berita_visible") && (
                    <section
                        id="berita"
                        className="py-24 bg-gray-50/60 border-t border-gray-200 px-6"
                    >
                        <div className="max-w-7xl mx-auto space-y-16">
                            <div className="text-center space-y-2 max-w-2xl mx-auto">
                                <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                                    Berita Terbaru
                                </h2>
                                <div className="under-heading-wave" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                                {/* Left Column: Timeline Graphic Card */}
                                <div className="lg:col-span-5 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
                                    <div className="space-y-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 text-[var(--color-japan-red)] flex items-center justify-center">
                                            <Calendar size={20} />
                                        </div>
                                        <h3 className="font-fredoka text-2xl font-bold text-[var(--color-ink)]">
                                            Roadmap Perjalananmu~
                                        </h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                            Dari Kohai sampai Shogun 🌸
                                        </p>

                                        {/* Timeline Graphic List */}
                                        <div className="pt-6 pl-4 space-y-6 timeline-dotted-line">
                                            <div className="relative flex gap-4 items-start">
                                                <div className="absolute -left-7 w-4 h-4 rounded-full bg-[var(--color-japan-red)] border-4 border-white shadow-sm z-10" />
                                                <div className="leading-tight">
                                                    <p className="text-[10px] font-bold text-[var(--color-japan-red)]">
                                                        TAHAP 01
                                                    </p>
                                                    <h4 className="text-xs font-bold text-gray-800">
                                                        Kenalan sama Huruf
                                                        Jepang
                                                    </h4>
                                                    <p className="text-[10px] text-gray-500">
                                                        Hiragana, Katakana, dan
                                                        Kanji dasar.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="relative flex gap-4 items-start">
                                                <div className="absolute -left-7 w-4 h-4 rounded-full bg-orange-400 border-4 border-white shadow-sm z-10" />
                                                <div className="leading-tight">
                                                    <p className="text-[10px] font-bold text-orange-500">
                                                        TAHAP 02
                                                    </p>
                                                    <h4 className="text-xs font-bold text-gray-800">
                                                        Latihan Seru Setiap Hari
                                                    </h4>
                                                    <p className="text-[10px] text-gray-500">
                                                        Kuis acak, tantangan
                                                        naik level~
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="relative flex gap-4 items-start">
                                                <div className="absolute -left-7 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm z-10" />
                                                <div className="leading-tight">
                                                    <p className="text-[10px] font-bold text-green-500">
                                                        TAHAP 03
                                                    </p>
                                                    <h4 className="text-xs font-bold text-gray-800">
                                                        Tantangan Seru dengan
                                                        Reward
                                                    </h4>
                                                    <p className="text-[10px] text-gray-500">
                                                        Setiap level buka hadiah
                                                        spesial~
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 mt-8">
                                        <a
                                            href="#manfaat"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-japan-red)] hover:underline"
                                        >
                                            <span>
                                                Lihat perjalanan lengkap yang
                                                menunggumu
                                            </span>
                                            <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>

                                {/* Right Column: News Articles List */}
                                <div className="lg:col-span-7 flex flex-col gap-4">
                                    {news.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href="#"
                                            className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between gap-4 group"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${
                                                            item.type ===
                                                            "SURPRISE"
                                                                ? "bg-pink-100 text-pink-800"
                                                                : item.type ===
                                                                    "FUN"
                                                                  ? "bg-green-100 text-green-800"
                                                                  : "bg-purple-100 text-purple-800"
                                                        }`}
                                                    >
                                                        {item.type}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold">
                                                        <Clock size={12} />
                                                        <span>{item.date}</span>
                                                    </div>
                                                </div>

                                                <h3 className="font-fredoka text-base sm:text-lg font-semibold text-gray-800 leading-snug group-hover:text-[var(--color-japan-red)] transition-colors">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-japan-red)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span>Baca artikel</span>
                                                <ChevronRight size={14} />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Section: Call to Action (Daftar Gratis) */}
                {isVisible("section_cta_visible") && (
                    <section className="py-24 px-6 max-w-7xl mx-auto text-center">
                        <div className="p-10 sm:p-20 rounded-3xl bg-[var(--color-ink)] text-white space-y-6 relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] font-jp font-bold text-[200px] pointer-events-none select-none">
                                日本
                            </div>
                            <div className="absolute bottom-0 left-0 p-8 opacity-[0.03] font-jp font-bold text-[200px] pointer-events-none select-none leading-none">
                                勉
                            </div>

                            <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
                                Siap Mulai{" "}
                                <span className="text-[var(--color-sakura)] font-bold">
                                    Petualanganmu
                                </span>
                                ?
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
                                Dunia kecil ini udah siap menunggumu. Mulai dari
                                huruf pertama, dan siapa tahu... suatu hari kita
                                ke Jepang bareng~ 🌸
                            </p>

                            <div className="pt-6 flex flex-wrap justify-center gap-4">
                                <Link
                                    href={
                                        auth?.user ? "/dashboard" : "/register"
                                    }
                                    className="px-8 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/20 text-sm"
                                >
                                    Yuk Mulai! 💕
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all text-sm"
                                >
                                    Masuk ke Dunia Kecil Kita
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer Area (Detailed Multi-column Kumon Style) */}
                <footer className="bg-[#1e1e1e] text-gray-300 border-t border-gray-800 py-16 px-6 relative z-10 font-sans">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
                        {/* Column 1: Brand & Site lists */}
                        <div className="md:col-span-4 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-base shadow-sm">
                                    日
                                </div>
                                <span className="font-fredoka font-bold text-xl text-white">
                                    Benkyou
                                </span>
                            </div>

                            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                                Sebuah dunia kecil penuh huruf, kata, dan cerita
                                dalam bahasa Jepang — dibuat dengan sepenuh hati
                                untuk seseorang yang spesial.
                            </p>

                            <div className="text-[11px] text-gray-500 space-y-1.5 pt-2 border-t border-gray-800/80">
                                <p>Dibuat dengan 💕 untuk ulang tahunmu</p>
                                <p>Juli 2026</p>
                            </div>
                        </div>

                        {/* Column 2: Navigation Links */}
                        <div className="md:col-span-4 space-y-4">
                            <h4 className="font-fredoka text-white text-sm font-bold tracking-wider uppercase">
                                Navigasi
                            </h4>
                            <ul className="text-xs space-y-2.5 font-semibold text-gray-400">
                                <li>
                                    <a
                                        href="#manfaat"
                                        className="hover:text-white transition-colors"
                                    >
                                        Perjalanan Belajarmu
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#modul"
                                        className="hover:text-white transition-colors"
                                    >
                                        Yang Bisa Kamu Pelajari
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#metode"
                                        className="hover:text-white transition-colors"
                                    >
                                        Kenapa Beda dari yang Lain
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="hover:text-white transition-colors"
                                    >
                                        Mulai Petualangan
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#testimoni"
                                        className="hover:text-white transition-colors"
                                    >
                                        Surat Rahasia
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Contact & Address Info */}
                        <div className="md:col-span-4 space-y-4">
                            <h4 className="font-fredoka text-white text-sm font-bold tracking-wider uppercase">
                                Dari Pembuat
                            </h4>

                            <div className="text-xs text-gray-400 space-y-3">
                                <p className="leading-relaxed">
                                    Ini bukan platform belajar biasa. Ini adalah
                                    hadiah kecil dari aku untukmu — berisi
                                    ratusan jam usaha, coding, dan cinta. Semoga
                                    kamu suka ya~ 💕
                                </p>
                                <div className="flex gap-2 items-center">
                                    <Heart
                                        size={14}
                                        className="text-[var(--color-japan-red)] fill-[var(--color-japan-red)]"
                                    />
                                    <p>
                                        <strong>Dengan cinta,</strong> untukmu
                                        yang spesial
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright bar at the bottom */}
                    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
                        <p>
                            © 2026 Benkyou — Made with 💕 for someone special.
                        </p>
                        <div className="flex gap-2 items-center">
                            <span>Dibuat dengan</span>
                            <Heart
                                size={10}
                                className="text-[var(--color-japan-red)] fill-[var(--color-japan-red)]"
                            />
                            <span>untuk pembelajar Bahasa Jepang.</span>
                        </div>
                    </div>
                </footer>

                {/* Video Introduction Modal (Kumon style responsive modal popup) */}
                {isVideoOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                        <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-scale-up">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                                aria-label="Tutup Video"
                            >
                                <X size={20} />
                            </button>

                            <div className="aspect-video w-full">
                                <video
                                    className="w-full h-full"
                                    src="https://id.kumonglobal.com/wp-content/uploads/2024/01/video-intro-kumon.mp4"
                                    controls
                                    autoPlay
                                    preload="metadata"
                                />
                            </div>

                            <div className="p-4 sm:px-6 bg-[#222] text-xs text-gray-400 flex justify-between items-center">
                                <span>
                                    Video Pengenalan Benkyou — Dunia Kecil
                                    Untukmu
                                </span>
                                <span className="flex items-center gap-1">
                                    <Info size={12} /> Durasi: 2 Menit
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Top Button */}
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            onClick={scrollToTop}
                            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--color-japan-red)] text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors focus:outline-none border border-red-500/20 group cursor-pointer"
                            title="Kembali ke atas"
                        >
                            <ArrowUp
                                size={20}
                                className="group-hover:-translate-y-0.5 transition-transform duration-200"
                            />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
