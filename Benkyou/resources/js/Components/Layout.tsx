import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";
import { usePage } from "@inertiajs/react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url, props } = usePage() as any;
    const user = props?.auth?.user;
    const isAdmin = user?.role === 'admin';

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

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: isAdmin ? '#f1f5f9' : 'var(--color-washi)' }}>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block transition-transform duration-300 ease-in-out shrink-0`}
            >
                <div className={`${isAdmin ? 'w-64' : 'w-64'} h-full flex flex-col relative ${isAdmin ? '' : 'bg-white border-r border-[#E5E5E5]'}`}
                    style={isAdmin ? { boxShadow: '4px 0 32px rgba(0,0,0,0.15)' } : { boxShadow: '4px 0 24px rgba(0,0,0,0.02)' }}>
                    <button
                        className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-50"
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
                <div className={`lg:hidden backdrop-blur-md border-b p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm ${isAdmin ? 'bg-[#0f172a] border-white/10' : 'bg-white/80 border-[#E5E5E5]'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-jp font-bold text-base shrink-0`}
                            style={{ background: 'linear-gradient(135deg, #bc002d, #e53e3e)', boxShadow: '0 2px 10px rgba(188,0,45,0.3)' }}>
                            日
                        </div>
                        <div>
                            <h1 className={`font-serif font-bold text-lg leading-none ${isAdmin ? 'text-white' : 'text-[var(--color-ink)]'}`}>
                                Benkyou
                            </h1>
                            {isAdmin && <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Admin Panel</p>}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`p-2 -mr-2 transition-colors ${isAdmin ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <main className="flex-1 overflow-y-auto">
                    <div className={isAdmin ? 'p-4 sm:p-6 lg:p-8' : 'p-4 sm:p-8 md:p-10 lg:p-12'}>
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
