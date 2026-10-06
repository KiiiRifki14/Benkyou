import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    BookOpen,
    Home,
    List,
    PenTool,
    CheckCircle,
    GraduationCap,
    Languages,
    Palette,
    LogOut,
    LogIn,
    UserPlus,
    ShieldAlert,
    LayoutDashboard,
    ChevronRight,
    LayoutTemplate,
    Mail,
    Activity,
    Sparkles,
    Flame,
    Award,
    Settings,
    FileText,
} from "lucide-react";

interface SidebarProps {
    currentPage: string;
    onNavigate?: () => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const { url } = usePage();
    const isAdminRoute = url.startsWith("/admin");

    const adminNavGroups = [
        {
            label: "Ikhtisar",
            items: [
                {
                    id: "admin",
                    label: "Ringkasan",
                    sublabel: "Overview",
                    icon: LayoutDashboard,
                    href: "/admin",
                },
            ],
        },
        {
            label: "Kelola Pembelajaran",
            items: [
                {
                    id: "kana",
                    label: "Huruf Kana",
                    sublabel: "Hiragana & Katakana",
                    icon: PenTool,
                    href: "/admin/kana",
                },
                {
                    id: "kanji",
                    label: "Karakter Kanji",
                    sublabel: "N5 - N1 Database",
                    icon: Languages,
                    href: "/admin/kanji",
                },
                {
                    id: "vocabulary",
                    label: "Kosakata",
                    sublabel: "Vocab & Audio",
                    icon: List,
                    href: "/admin/vocabulary",
                },
                {
                    id: "grammar",
                    label: "Tata Bahasa",
                    sublabel: "Bunpou Guide",
                    icon: BookOpen,
                    href: "/admin/grammar",
                },
                {
                    id: "question",
                    label: "Bank Soal & Quiz",
                    sublabel: "Latihan & Ujian",
                    icon: CheckCircle,
                    href: "/admin/question",
                },
                {
                    id: "notes",
                    label: "Catatan Belajar",
                    sublabel: "Sensei Notes",
                    icon: Mail,
                    href: "/admin/notes",
                },
            ],
        },
        {
            label: "Portal & Aktivitas",
            items: [
                {
                    id: "landing",
                    label: "CMS Landing Page",
                    sublabel: "Hero & Showcase",
                    icon: LayoutTemplate,
                    href: "/admin/landing",
                },
                {
                    id: "activity",
                    label: "Aktivitas Siswa",
                    sublabel: "Log Belajar & Skor",
                    icon: Activity,
                    href: "/admin/activity",
                },
            ],
        },
    ];

    const studentNavItems = [
        { id: "home", label: "Beranda", sub: "Dashboard Belajar", icon: Home, href: "/student/home" },
        { id: "missions", label: "Journey", sub: "Peta Petualangan", icon: GraduationCap, href: "/student/missions" },
        { id: "kana", label: "Huruf Kana", sub: "Hiragana & Katakana", icon: PenTool, href: "/student/kana" },
        { id: "kanji", label: "Karakter Kanji", sub: "Radikal & Stroke", icon: Languages, href: "/student/kanji" },
        { id: "vocabulary", label: "Kosakata", sub: "Kotoba & Audio", icon: List, href: "/student/vocabulary" },
        { id: "grammar", label: "Tata Bahasa", sub: "Pola Kalimat Bunpou", icon: BookOpen, href: "/student/grammar" },
        { id: "quiz", label: "Latihan Harian", sub: "Quiz Interaktif", icon: CheckCircle, href: "/student/quiz" },
        { id: "notes", label: "Catatan Belajar", sub: "Sensei Tips", icon: Mail, href: "/student/notes" },
        { id: "themes", label: "Tema & Hadiah", sub: "Koleksi Visual", icon: Palette, href: "/student/themes" },
    ];

    const getInitials = (name: string) => {
        if (!name) return "B";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    // Sensei / Admin Sidebar (Washi Dark Editorial)
    if (isAdminRoute) {
        return (
            <div className="flex flex-col h-full bg-[#1e1b18] text-[#fbf9f4] select-none">
                {/* Brand Header */}
                <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-[#c73e3a] text-white flex items-center justify-center font-jp font-bold text-lg shadow-[0_2px_10px_rgba(199,62,58,0.4)] shrink-0 transition-transform group-hover:scale-105">
                            勉
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-outfit font-bold text-base tracking-wide text-white leading-tight">
                                BENKYOU
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#d47a88] leading-none mt-0.5">
                                Sensei Backoffice
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto custom-scrollbar">
                    {adminNavGroups.map((group) => (
                        <div key={group.label} className="space-y-1">
                            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40">
                                {group.label}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive =
                                        currentPage === item.id ||
                                        (item.id === "admin" && currentPage === "home");
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={onNavigate}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                                                isActive
                                                    ? "bg-[#c73e3a] text-white font-semibold shadow-sm"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            <Icon
                                                size={17}
                                                className={isActive ? "text-white" : "text-white/60"}
                                            />
                                            <div className="flex flex-col min-w-0 flex-1 text-left">
                                                <span className="truncate leading-snug">{item.label}</span>
                                                <span className={`text-[10px] truncate ${isActive ? "text-white/80" : "text-white/40"}`}>
                                                    {item.sublabel}
                                                </span>
                                            </div>
                                            {isActive && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* System Status & Admin Profile Footer */}
                <div className="p-3 border-t border-white/10 bg-black/20 mt-auto space-y-2.5">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 text-[11px] text-white/70">
                        <span className="w-2 h-2 rounded-full bg-[#4b7957] animate-pulse shrink-0"></span>
                        <span className="truncate">JLPT N5-N1 Engine • Aktif</span>
                    </div>

                    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#c73e3a] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {getInitials(user?.name || "")}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-bold text-white truncate leading-tight">
                                {user?.name || "Sensei"}
                            </p>
                            <p className="text-[10px] text-white/40 truncate">
                                {user?.email || "sensei@benkyou.jp"}
                            </p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="p-1.5 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                            title="Keluar"
                        >
                            <LogOut size={15} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Student Sidebar (Washi Light Editorial)
    return (
        <div className="flex flex-col h-full bg-[#fbf9f4] text-[#1e1b18] select-none border-r border-[#efe6e2]">
            {/* Brand Header */}
            <div className="px-5 py-5 border-b border-[#efe6e2] flex items-center justify-between bg-white/50">
                <Link href="/student/home" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-[#c73e3a] text-white flex items-center justify-center font-jp font-bold text-lg shadow-[0_2px_8px_rgba(199,62,58,0.25)] shrink-0 transition-transform group-hover:scale-105">
                        勉
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-outfit font-bold text-base tracking-wide text-[#1e1b18] leading-tight">
                            BENKYOU
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#59413f]/70 leading-none mt-0.5">
                            Nihongo Academy
                        </span>
                    </div>
                </Link>
            </div>

            {/* Student Navigation */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto custom-scrollbar">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#59413f]/60 mb-2">
                    Menu Belajar
                </p>
                {studentNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={onNavigate}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150 group ${
                                isActive
                                    ? "bg-[#c73e3a] text-white font-semibold shadow-[0_2px_8px_rgba(199,62,58,0.2)]"
                                    : "text-[#59413f] hover:bg-[#f5ece7] hover:text-[#1e1b18]"
                            }`}
                        >
                            <Icon
                                size={17}
                                className={isActive ? "text-white" : "text-[#59413f] group-hover:text-[#c73e3a] transition-colors"}
                            />
                            <div className="flex flex-col min-w-0 flex-1 text-left">
                                <span className="truncate leading-snug">{item.label}</span>
                                <span className={`text-[10px] truncate ${isActive ? "text-white/85" : "text-[#79716b]"}`}>
                                    {item.sub}
                                </span>
                            </div>
                            {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Daily Target Widget & Profile Footer */}
            <div className="p-3 border-t border-[#efe6e2] bg-white/70 mt-auto space-y-2.5">
                {/* Target Progress Card */}
                <div className="p-3 rounded-xl bg-[#f5ece7] border border-[#e9e1dc]/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1e1b18]">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold">
                            <Flame size={13} className="text-[#c73e3a]" /> Target Harian
                        </span>
                        <span className="text-[11px] font-bold text-[#326040]">80%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#e9e1dc] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4b7957] rounded-full w-4/5"></div>
                    </div>
                    <p className="text-[10px] text-[#79716b]">4 dari 5 materi & latihan selesai</p>
                </div>

                {/* User / Auth Info */}
                {user ? (
                    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white border border-[#efe6e2] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#c73e3a] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {getInitials(user.name)}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-bold text-[#1e1b18] truncate leading-tight">
                                {user.name}
                            </p>
                            <p className="text-[10px] text-[#79716b] truncate">
                                {user.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            {user.role === "admin" && (
                                <Link
                                    href="/admin"
                                    className="p-1.5 text-[#c73e3a] hover:bg-[#fff0ef] rounded-lg transition-colors"
                                    title="Dashboard Sensei"
                                >
                                    <ShieldAlert size={15} />
                                </Link>
                            )}
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="p-1.5 text-[#79716b] hover:text-[#c73e3a] hover:bg-[#fff0ef] rounded-lg transition-colors cursor-pointer"
                                title="Keluar"
                            >
                                <LogOut size={15} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1.5">
                        <Link
                            href="/login"
                            className="w-full py-2 px-3 rounded-lg bg-[#c73e3a] text-white text-center text-xs font-bold hover:bg-[#a52525] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                            <LogIn size={14} /> Masuk Akun
                        </Link>
                        <Link
                            href="/register"
                            className="w-full py-2 px-3 rounded-lg bg-white border border-[#efe6e2] text-[#1e1b18] text-center text-xs font-bold hover:bg-[#f5ece7] transition-colors flex items-center justify-center gap-1.5"
                        >
                            <UserPlus size={14} /> Daftar Gratis
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
