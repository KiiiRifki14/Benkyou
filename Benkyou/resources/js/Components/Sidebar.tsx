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
    Book,
    Palette,
    Cat,
    LogOut,
    LogIn,
    UserPlus,
    ShieldAlert,
    LayoutDashboard,
    ChevronRight,
} from "lucide-react";

interface SidebarProps {
    currentPage: string;
    onNavigate?: () => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const adminNavGroups = [
        {
            label: "Ikhtisar",
            items: [
                { id: "admin", label: "Dashboard Admin", icon: LayoutDashboard, href: "/admin" },
            ],
        },
        {
            label: "Kelola Konten",
            items: [
                { id: "kana", label: "Huruf Kana", icon: PenTool, href: "/admin/kana" },
                { id: "kanji", label: "Karakter Kanji", icon: Languages, href: "/admin/kanji" },
                { id: "vocabulary", label: "Kosakata", icon: List, href: "/admin/vocabulary" },
                { id: "grammar", label: "Tata Bahasa", icon: BookOpen, href: "/admin/grammar" },
                { id: "question", label: "Kuis & Sertifikasi", icon: CheckCircle, href: "/admin/question" },
            ],
        },
        {
            label: "Pengaturan",
            items: [
                { id: "themes", label: "Tema Aplikasi", icon: Palette, href: "/student/themes" },
            ],
        },
    ];

    const studentNavItems = [
        { id: "home", label: "Beranda", icon: Home, href: "/student/home" },
        { id: "kana", label: "Kana", icon: PenTool, href: "/student/kana" },
        { id: "kanji", label: "Kanji", icon: Languages, href: "/student/kanji" },
        { id: "vocabulary", label: "Kosakata", icon: List, href: "/student/vocabulary" },
        { id: "grammar", label: "Tata Bahasa", icon: BookOpen, href: "/student/grammar" },
        { id: "quiz", label: "Latihan Harian", icon: CheckCircle, href: "/student/quiz" },
        { id: "missions", label: "My Journey", icon: GraduationCap, href: "/student/missions" },
        { id: "notes", label: "Catatan Pribadi", icon: Book, href: "/student/notes" },
        { id: "themes", label: "Tema Aplikasi", icon: Palette, href: "/student/themes" },
    ];

    const { url } = usePage();
    const isAdminRoute = url.startsWith('/admin');

    // Generate avatar initials
    const getInitials = (name: string) => {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    if (isAdminRoute) {
        return (
            <div className="flex flex-col h-full" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)' }}>
                {/* Logo */}
                <div className="px-5 py-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-jp font-bold text-xl shadow-lg shrink-0 transition-transform group-hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #bc002d, #e53e3e)' }}>
                            日
                        </div>
                        <div>
                            <h1 className="font-serif font-bold text-lg leading-tight text-white group-hover:text-red-300 transition-colors">
                                Benkyou
                            </h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Admin Panel</p>
                        </div>
                        <Cat className="ml-auto text-white/20 group-hover:text-red-400 transition-colors shrink-0" size={20} />
                    </Link>
                </div>

                {/* Navigation Groups */}
                <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
                    {adminNavGroups.map((group) => (
                        <div key={group.label}>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 mb-1.5">
                                {group.label}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = currentPage === item.id || (item.id === 'admin' && currentPage === 'home');
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={onNavigate}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                                isActive
                                                    ? "bg-white/15 text-white shadow-sm"
                                                    : "text-white/50 hover:bg-white/8 hover:text-white/80"
                                            }`}
                                            style={isActive ? { boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' } : {}}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-[#bc002d] text-white shadow-md'
                                                    : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/70'
                                            }`}
                                                style={isActive ? { boxShadow: '0 4px 12px rgba(188,0,45,0.4)' } : {}}>
                                                <Icon size={15} />
                                            </div>
                                            <span className="font-medium text-sm truncate">{item.label}</span>
                                            {isActive && (
                                                <ChevronRight size={14} className="ml-auto text-white/40 shrink-0" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User Footer */}
                <div className="px-3 py-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                            style={{ background: 'linear-gradient(135deg, #bc002d, #e53e3e)' }}>
                            {getInitials(user?.name || '')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate leading-tight">{user?.name}</p>
                            <p className="text-[10px] text-white/40 truncate">{user?.email}</p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                            title="Keluar"
                        >
                            <LogOut size={15} />
                        </Link>
                    </div>
                    <div className="mt-2 px-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/25">
                            <ShieldAlert size={10} /> Administrator Sensei
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Student sidebar (light theme)
    return (
        <>
            <div className="p-6 md:p-8 flex items-center gap-3">
                <Link href="/" className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-sm shrink-0 hover:opacity-90 transition-opacity">
                    日
                </Link>
                <Link href="/" className="shrink-0 flex items-center gap-4 group">
                    <div>
                        <h1 className="font-serif font-bold text-xl leading-tight group-hover:text-[var(--color-japan-red)] transition-colors">
                            Benkyou
                        </h1>
                    </div>
                    <Cat
                        className="text-[var(--color-japan-red)] opacity-80 group-hover:scale-110 transition-transform"
                        size={24}
                    />
                </Link>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
                {studentNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={onNavigate}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 block ${
                                isActive
                                    ? "bg-[var(--color-washi)] text-[var(--color-japan-red)] shadow-sm"
                                    : "text-[var(--color-ink-light)] hover:bg-[var(--color-washi)] hover:text-[var(--color-ink)]"
                            }`}
                        >
                            <Icon size={20} className={isActive ? "stroke-2" : "stroke-[1.5]"} />
                            <span className="font-medium text-left truncate">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-japan-red)] shrink-0" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#E5E5E5] bg-[var(--color-washi)]/30 mt-auto">
                {user ? (
                    <div className="flex items-center justify-between gap-2">
                        <div className="truncate">
                            <p className="text-sm font-bold text-[var(--color-ink)] truncate">{user.name}</p>
                            <p className="text-[10px] text-[var(--color-ink-light)] truncate">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            {user.role === 'admin' && (
                                <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Dashboard Admin">
                                    <ShieldAlert size={18} />
                                </Link>
                            )}
                            <Link href="/logout" method="post" as="button" className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Keluar">
                                <LogOut size={18} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Link href="/login" className="w-full py-2 px-4 rounded-xl bg-[var(--color-japan-red)] text-white text-center text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <LogIn size={16} /> Masuk
                        </Link>
                        <Link href="/register" className="w-full py-2 px-4 rounded-xl bg-white border border-[#E5E5E5] text-[var(--color-ink)] text-center text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <UserPlus size={16} /> Daftar
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
