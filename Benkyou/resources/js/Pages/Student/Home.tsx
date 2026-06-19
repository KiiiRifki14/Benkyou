import React from "react";
import { motion } from "motion/react";
import { Link, usePage } from "@inertiajs/react";
import { BookOpen, PenTool, List } from "lucide-react";
import Layout from "@/Components/Layout";

export default function Home() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const features = [
        {
            href: "/student/kana",
            title: "Huruf Kana",
            description: "Hiragana & Katakana — fondasi pertama yang seru~",
            icon: "あ",
            borderColor: "hover:border-[var(--color-sakura)]",
        },
        {
            href: "/student/kanji",
            title: "Kanji",
            description: "Karakter cantik yang bikin kamu kelihatan keren.",
            icon: "漢",
            borderColor: "hover:border-[#F5A623]",
        },
        {
            href: "/student/vocabulary",
            title: "Kosakata",
            description: "Kata-kata yang sering muncul di anime & J-Pop!",
            icon: "list",
            borderColor: "hover:border-[var(--color-matcha)]",
        },
        {
            href: "/student/grammar",
            title: "Tata Bahasa",
            description: "Racik kalimatmu sendiri — kayak bikin resep rahasia~",
            icon: "grammar",
            borderColor: "hover:border-[#4A90E2]",
        },
        {
            href: "/student/quiz",
            title: "Latihan Seru",
            description: "Kuis acak setiap sesi — nggak bakal bosen!",
            icon: "?",
            borderColor: "hover:border-[#9B51E0]",
        },
        {
            href: "/student/missions",
            title: "My Journey",
            description:
                "Tantangan seru buat naik level — dari Kohai sampai Shogun!",
            icon: "★",
            borderColor: "hover:border-[var(--color-japan-red)]",
        },
        {
            href: "/student/notes",
            title: "Catatan Kecil",
            description: "Pesan-pesan manis yang ditulis khusus untukmu~",
            icon: "notes",
            borderColor: "hover:border-[#50E3C2]",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            <header className="space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-ink)]">
                    Hai,{" "}
                    <span className="text-[var(--color-japan-red)] block sm:inline mt-2 sm:mt-0">
                        {user ? user.name : "Sayang"} 💕
                    </span>
                </h1>
                <p className="text-base md:text-lg text-[var(--color-ink-light)] max-w-2xl">
                    Selamat datang di dunia kecil kita~ Yuk lanjut belajar
                    bahasa Jepang bareng! 🌸
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <Link
                        key={feature.href}
                        href={feature.href}
                        className={`bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 border border-transparent ${feature.borderColor} block`}
                    >
                        <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                            {feature.icon === "list" ? (
                                <List
                                    className="text-[var(--color-matcha)]"
                                    size={24}
                                />
                            ) : feature.icon === "grammar" ? (
                                <BookOpen
                                    className="text-[#4A90E2]"
                                    size={24}
                                />
                            ) : feature.icon === "notes" ? (
                                <PenTool className="text-[#50E3C2]" size={24} />
                            ) : feature.icon === "?" ? (
                                <span className="text-[#9B51E0]">
                                    {feature.icon}
                                </span>
                            ) : feature.icon === "★" ? (
                                <span className="text-[var(--color-japan-red)]">
                                    {feature.icon}
                                </span>
                            ) : feature.icon === "あ" ? (
                                <span className="text-[var(--color-japan-red)] font-jp">
                                    {feature.icon}
                                </span>
                            ) : (
                                <span className="text-[#F5A623] font-jp">
                                    {feature.icon}
                                </span>
                            )}
                        </div>
                        <h3 className="font-serif text-xl mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-[var(--color-ink-light)] text-sm">
                            {feature.description}
                        </p>
                    </Link>
                ))}
            </section>
            <section className="bg-[var(--color-ink)] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-[10rem] sm:text-[12rem] font-jp opacity-5 select-none pointer-events-none">
                    日本
                </div>
                <div className="relative z-10">
                    <h2 className="font-serif text-2xl sm:text-3xl mb-4">
                        Kata Hari Ini
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 mb-6">
                        <span className="font-jp text-5xl sm:text-6xl font-bold">
                            桜
                        </span>
                        <div className="pb-2">
                            <span className="text-lg sm:text-xl text-[var(--color-sakura)] block">
                                sakura
                            </span>
                            <span className="text-base sm:text-lg text-gray-300">
                                bunga sakura
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/student/vocabulary"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[var(--color-ink)] font-medium text-sm hover:bg-[var(--color-washi)] transition-colors inline-block text-center"
                    >
                        Lihat lebih banyak kata
                    </Link>
                </div>
            </section>
        </motion.div>
    );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
