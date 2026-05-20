import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";
import { usePage } from "@inertiajs/react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();

    // Determine current page based on URL
    const parts = url.split("/");
    let currentPage = "home";
    if (parts.length > 2 && (parts[1] === 'student' || parts[1] === 'admin')) {
        currentPage = parts[2] || "home";
    } else {
        currentPage = parts[1] || "home";
    }

    return (
        <div className="flex h-screen bg-[var(--color-washi)] overflow-hidden">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block transition-transform duration-300 ease-in-out`}
            >
                <div className="w-64 h-full bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-[#E5E5E5] flex flex-col relative">
                    <button
                        className="lg:hidden absolute top-7 right-4 p-2 text-gray-400 hover:text-black transition-colors z-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={20} />
                    </button>
                    <Sidebar
                        currentPage={currentPage}
                        onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-[#E5E5E5] p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-base shadow-[0_2px_10px_rgba(211,47,47,0.3)] shrink-0">
                            日
                        </div>
                        <div>
                            <h1 className="font-serif font-bold text-lg leading-none">
                                Nihongo
                            </h1>
                            <p className="text-[10px] text-[var(--color-ink-light)] tracking-widest uppercase mt-0.5">
                                Journey
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -mr-2 text-gray-600 hover:text-black transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 lg:p-16">
                    <div className="max-w-6xl mx-auto h-full">{children}</div>
                </main>
            </div>
        </div>
    );
}
