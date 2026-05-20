import React from 'react';
import { Link } from '@inertiajs/react';
import { Cat } from 'lucide-react';
import { motion } from 'motion/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-ink)] flex flex-col justify-center items-center p-6 relative overflow-hidden selection:bg-[var(--color-japan-red)] selection:text-white">
            
            {/* Background Decorative Blurs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-sakura)]/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-matcha)]/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            {/* Header / Logo */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 z-10"
            >
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-3xl shadow-lg group-hover:scale-105 transition-transform">
                        日
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <h1 className="font-serif font-bold text-3xl tracking-tight leading-none group-hover:text-[var(--color-japan-red)] transition-colors">
                                Benkyou
                            </h1>
                        </div>
                        <Cat className="text-[var(--color-japan-red)] opacity-80 group-hover:scale-110 transition-transform" size={28} />
                    </div>
                </Link>
            </motion.div>

            {/* Main Form Card */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E5E5E5] p-8 sm:p-10 relative overflow-hidden z-10"
            >
                {/* Subtle Kanji Watermark */}
                <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 text-[var(--color-washi)] opacity-50 font-jp font-bold text-[180px] pointer-events-none select-none">
                    旅
                </div>

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 text-xs text-[var(--color-ink-light)] text-center z-10 font-medium"
            >
                <p>Benkyou • Platform Belajar Bahasa Jepang Eksklusif</p>
                <Link href="/" className="underline hover:text-[var(--color-japan-red)] transition-colors mt-2 inline-block">Kembali ke Halaman Utama</Link>
            </motion.div>

        </div>
    );
}
