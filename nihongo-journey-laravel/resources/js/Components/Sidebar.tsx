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
} from "lucide-react";

interface SidebarProps {
    currentPage: string;
    onNavigate?: () => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const navItems = [
        { id: "home", label: "Beranda", icon: Home, href: "/home" },
        { id: "kana", label: "Kana", icon: PenTool, href: "/kana" },
        { id: "kanji", label: "Kanji", icon: Languages, href: "/kanji" },
        {
            id: "vocabulary",
            label: "Kosakata",
            icon: List,
            href: "/vocabulary",
        },
        {
            id: "grammar",
            label: "Tata Bahasa",
            icon: BookOpen,
            href: "/grammar",
        },
        {
            id: "quiz",
            label: "Latihan Harian",
            icon: CheckCircle,
            href: "/quiz",
        },
        {
            id: "certification",
            label: "Sertifikasi",
            icon: GraduationCap,
            href: "/certification",
        },
        { id: "notes", label: "Catatan Pribadi", icon: Book, href: "/notes" },
        {
            id: "themes",
            label: "Tema Aplikasi",
            icon: Palette,
            href: "/themes",
        },
    ];

    return (
        <>
            <div className="p-6 md:p-8 flex items-center gap-3">
                <Link href="/" className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-sm shrink-0 hover:opacity-90 transition-opacity">
                    日
                </Link>
                <Link href="/" className="shrink-0 flex items-center gap-4 group">
                    <div>
                        <h1 className="font-serif font-bold text-xl leading-tight group-hover:text-[var(--color-japan-red)] transition-colors">
                            Nihongo
                        </h1>
                        <p className="text-xs text-[var(--color-ink-light)] tracking-widest uppercase">
                            Journey
                        </p>
                    </div>
                    <Cat
                        className="text-[var(--color-japan-red)] opacity-80 group-hover:scale-110 transition-transform"
                        size={24}
                    />
                </Link>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
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
                            <Icon
                                size={20}
                                className={
                                    isActive ? "stroke-2" : "stroke-[1.5]"
                                }
                            />
                            <span className="font-medium text-left truncate">
                                {item.label}
                            </span>
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
