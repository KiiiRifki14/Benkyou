import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
    Menu,
    Flame,
    Award,
    Palette,
    Bell,
    Search,
    ShieldCheck,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { usePage, Link } from "@inertiajs/react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url, props } = usePage() as any;
    const user = props?.auth?.user;
    const isAdminRoute = url.startsWith('/admin');

    // Determine current page based on URL
    const parts = url.split("/");
    let currentPage = "home";
    if (parts.length > 2 && (parts[1] === 'student' || parts[1] === 'admin')) {
        currentPage = parts[2] || "home";
    } else if (parts.length === 2 && parts[1] === 'admin') {
        currentPage = 'admin';
    } else {
        currentPage = parts[1] || "home";
    }

    const pageTitles: Record<string, { title: string; subtitle: string }> = {
        home: { title: "Beranda Belajar", subtitle: "Ringkasan Progres & Target Harian" },
        missions: { title: "Peta Petualangan (Journey)", subtitle: "Modul Belajar & Jalur Level" },
        kana: { title: "Huruf Kana", subtitle: "Latihan Hiragana & Katakana" },
        kanji: { title: "Karakter Kanji", subtitle: "Kamus & Latihan Stroke Order" },
        vocabulary: { title: "Kosakata (Kotoba)", subtitle: "Audio & Pemahaman Kosakata" },
        grammar: { title: "Tata Bahasa (Bunpou)", subtitle: "Struktur Kalimat & Partikel" },
        quiz: { title: "Latihan Harian", subtitle: "Evaluasi & Uji Pemahaman" },
        notes: { title: "Catatan Belajar", subtitle: "Tips Belajar dari Sensei" },
        themes: { title: "Koleksi Tema & Hadiah", subtitle: "Kustomisasi Tampilan Aplikasi" },
        certification: { title: "Sertifikasi Kelulusan", subtitle: "Bukti Pencapaian Belajar" },
        admin: { title: "Pusat Kendali Sensei", subtitle: "Ringkasan Statistik & Kurikulum" },
        question: { title: "Bank Soal & Quiz", subtitle: "Manajemen Soal Ujian" },
        landing: { title: "CMS Landing Page", subtitle: "Pengaturan Konten Publik" },
        activity: { title: "Log Aktivitas Siswa", subtitle: "Monitoring Belajar Siswa" },
    };

    const currentMeta = pageTitles[currentPage] || {
        title: isAdminRoute ? "Sensei Backoffice" : "Nihongo Journey",
        subtitle: isAdminRoute ? "Panel Pengelolaan Kurikulum" : "Platform Belajar Bahasa Jepang",
    };

    return (
        <div className={`flex h-[100dvh] min-h-[100dvh] w-full overflow-hidden ${isAdminRoute ? 'bg-[#f5ece7]' : 'bg-[#fff8f5]'}`}>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity backdrop-blur-xs"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block transition-transform duration-300 ease-in-out shrink-0`}
            >
                <div className="w-[260px] sm:w-[270px] h-full flex flex-col relative shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
                    <Sidebar
                        currentPage={currentPage}
                        onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Desktop Sticky Header */}
                <header className={`hidden lg:flex items-center justify-between px-8 h-16 border-b shrink-0 z-20 backdrop-blur-md ${
                    isAdminRoute
                        ? 'bg-white/90 border-[#efe6e2] text-[#1e1b18]'
                        : 'bg-white/90 border-[#efe6e2] text-[#1e1b18]'
                }`}>
                    {/* Left: Breadcrumbs & Page Title */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#79716b]">
                            {isAdminRoute ? 'Sensei Admin' : 'Siswa'}
                        </span>
                        <ChevronRight size={14} className="text-[#79716b]/50" />
                        <div>
                            <h2 className="font-outfit font-bold text-sm sm:text-base text-[#1e1b18] leading-tight">
                                {currentMeta.title}
                            </h2>
                        </div>
                    </div>

                    {/* Right: Stats & Indicators */}
                    <div className="flex items-center gap-3.5">
                        {isAdminRoute ? (
                            <>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5ece7] border border-[#efe6e2] text-[#326040] text-xs font-bold">
                                    <ShieldCheck size={16} />
                                    <span>Master Sensei</span>
                                </div>
                                <div className="h-4 w-px bg-[#efe6e2]" />
                                <div className="text-right">
                                    <p className="text-xs font-bold text-[#1e1b18] leading-tight">{user?.name || "Sensei"}</p>
                                    <p className="text-[10px] text-[#79716b]">Chief Curriculum</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fff0ef] border border-[#ffd9dd] text-[#c73e3a] text-xs font-bold shadow-xs">
                                    <Flame size={15} className="fill-[#c73e3a]" />
                                    <span>14 Hari Streak</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#fbf2ed] border border-[#efe6e2] text-xs font-semibold text-[#1e1b18]">
                                    <Award size={15} className="text-[#4b7957]" />
                                    <span>Level 14 • Senpai</span>
                                </div>
                                <Link
                                    href="/student/themes"
                                    className="p-2 text-[#79716b] hover:text-[#c73e3a] hover:bg-[#fff0ef] rounded-lg transition-colors"
                                    title="Koleksi Tema"
                                >
                                    <Palette size={18} />
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Mobile Header */}
                <div className={`lg:hidden backdrop-blur-md border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs ${
                    isAdminRoute ? 'bg-[#1e1b18]/95 text-white border-white/10' : 'bg-white/95 text-[#1e1b18] border-[#efe6e2]'
                }`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                        <Link href={isAdminRoute ? "/admin" : "/student/home"} className="w-8 h-8 rounded-lg bg-[#c73e3a] text-white font-jp font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                            勉
                        </Link>
                        <div className="min-w-0">
                            <h1 className="font-outfit font-bold text-sm leading-tight truncate">
                                {currentMeta.title}
                            </h1>
                            <p className={`text-[10px] font-medium truncate ${isAdminRoute ? 'text-white/60' : 'text-[#79716b]'}`}>
                                {user ? user.name : (isAdminRoute ? 'Sensei Backoffice' : 'Benkyou Academy')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {isAdminRoute ? (
                            <Link
                                href="/student/home"
                                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-semibold hover:bg-white/20 transition-colors"
                                title="Beralih ke Mode Murid"
                            >
                                <span className="text-[12px]">🎓</span>
                                <span>Murid</span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#fff0ef] text-[#c73e3a] text-[11px] font-bold border border-[#ffd9dd]">
                                    <Flame size={12} className="fill-[#c73e3a]" />
                                    <span>14</span>
                                </div>
                                <div className="px-2 py-1 rounded-full bg-[#fbf2ed] text-[#59413f] text-[10px] font-bold border border-[#efe6e2]">
                                    N4
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isAdminRoute ? 'text-white/80 hover:bg-white/10' : 'text-[#1e1b18] hover:bg-[#f5ece7]'
                            }`}
                            aria-label="Buka menu navigasi"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>

                {/* Page Content Canvas with mobile bottom padding */}
                <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 lg:pb-8">
                    <div className={isAdminRoute ? 'p-3.5 sm:p-6 lg:p-8' : 'p-3.5 sm:p-6 md:p-8 lg:p-10'}>
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Mobile Bottom Navigation Bar (Stich Mobile UI Pattern) */}
                <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl shadow-[0_-2px_12px_rgba(44,40,37,0.06)] ${
                    isAdminRoute ? 'bg-[#1e1b18]/95 border-white/10 text-white' : 'bg-white/95 border-[#efe6e2] text-[#1e1b18]'
                }`}>
                    <div className="flex items-center justify-around h-16 px-1">
                        {isAdminRoute ? (
                            <>
                                <Link
                                    href="/admin"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "home" || currentPage === "admin"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    <ShieldCheck size={20} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Ringkasan</span>
                                </Link>
                                <Link
                                    href="/admin/kana"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "kana" || currentPage === "kanji" || currentPage === "vocabulary" || currentPage === "grammar"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    <BookOpen size={20} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Materi</span>
                                </Link>
                                <Link
                                    href="/admin/question"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "question"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    <CheckCircle size={20} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Bank Soal</span>
                                </Link>
                                <Link
                                    href="/admin/activity"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "activity"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    <Activity size={20} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Aktivitas</span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="flex flex-col items-center justify-center min-w-[56px] py-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                                >
                                    <Menu size={20} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Menu</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/student/home"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "home"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-[#79716b] hover:text-[#1e1b18]"
                                    }`}
                                >
                                    <div className="relative">
                                        <span className="text-[18px] leading-none select-none">⛩️</span>
                                    </div>
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Beranda</span>
                                </Link>
                                <Link
                                    href="/student/missions"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "missions"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-[#79716b] hover:text-[#1e1b18]"
                                    }`}
                                >
                                    <Award size={20} className={currentPage === "missions" ? "text-[#c73e3a]" : ""} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Journey</span>
                                </Link>
                                <Link
                                    href="/student/kana"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "kana" || currentPage === "kanji" || currentPage === "vocabulary" || currentPage === "grammar"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-[#79716b] hover:text-[#1e1b18]"
                                    }`}
                                >
                                    <BookOpen size={20} className={currentPage === "kana" || currentPage === "kanji" || currentPage === "vocabulary" || currentPage === "grammar" ? "text-[#c73e3a]" : ""} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Materi</span>
                                </Link>
                                <Link
                                    href="/student/quiz"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "quiz"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-[#79716b] hover:text-[#1e1b18]"
                                    }`}
                                >
                                    <CheckCircle size={20} className={currentPage === "quiz" ? "text-[#c73e3a]" : ""} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Latihan</span>
                                </Link>
                                <Link
                                    href="/student/themes"
                                    className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                                        currentPage === "themes"
                                            ? "text-[#c73e3a] font-bold"
                                            : "text-[#79716b] hover:text-[#1e1b18]"
                                    }`}
                                >
                                    <Palette size={20} className={currentPage === "themes" ? "text-[#c73e3a]" : ""} />
                                    <span className="text-[10px] font-medium tracking-tight mt-0.5">Tema</span>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
