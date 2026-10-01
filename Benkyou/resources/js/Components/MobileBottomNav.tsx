import React from "react";
import { Link } from "@inertiajs/react";
import { Home, BookOpen, Sparkles, Heart, Menu } from "lucide-react";

interface MobileBottomNavProps {
    currentPage: string;
    onOpenMenu: () => void;
}

export default function MobileBottomNav({
    currentPage,
    onOpenMenu,
}: MobileBottomNavProps) {
    const navItems = [
        {
            id: "home",
            label: "Beranda",
            href: "/dashboard",
            icon: Home,
            match: ["home", "dashboard"],
        },
        {
            id: "kana",
            label: "Materi",
            href: "/student/kana",
            icon: BookOpen,
            match: ["kana", "kanji", "vocabulary", "grammar"],
        },
        {
            id: "quiz",
            label: "Kuis",
            href: "/student/quiz",
            icon: Sparkles,
            match: ["quiz", "missions"],
        },
        {
            id: "notes",
            label: "Catatan",
            href: "/student/notes",
            icon: Heart,
            match: ["notes"],
        },
    ];

    return (
        <nav
            aria-label="Navigasi Bawah Mobile"
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E5E5E5] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
            style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
        >
            <div className="flex items-center justify-around max-w-md mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.match.includes(currentPage);
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 min-w-[56px] ${
                                isActive
                                    ? "text-[var(--color-japan-red)] font-bold scale-105"
                                    : "text-gray-500 hover:text-[var(--color-ink)] font-medium"
                            }`}
                        >
                            <div className="relative">
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-japan-red)]" />
                                )}
                            </div>
                            <span className="text-[10px] mt-1 tracking-tight">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                <button
                    onClick={onOpenMenu}
                    type="button"
                    className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-gray-500 hover:text-[var(--color-ink)] transition-all min-w-[56px] cursor-pointer"
                >
                    <Menu size={20} strokeWidth={2} />
                    <span className="text-[10px] mt-1 tracking-tight font-medium">
                        Menu
                    </span>
                </button>
            </div>
        </nav>
    );
}
