import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import {
    LayoutTemplate,
    Save,
    Info,
    Image as ImageIcon,
    Type,
    Eye,
    EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

declare const route: any;
export default function ManageLanding({
    landingSettings,
}: {
    landingSettings: Record<string, string>;
}) {
     const { data, setData, post, processing, recentlySuccessful } = useForm({
        // Announcement & Logo & Nav
        announcement_text: landingSettings["announcement_text"] || "",
        site_logo_sub: landingSettings["site_logo_sub"] || "",
        site_title: landingSettings["site_title"] || "",
        site_meta_desc: landingSettings["site_meta_desc"] || "",
        site_brand_name: landingSettings["site_brand_name"] || "",
        site_logo_char: landingSettings["site_logo_char"] || "",
        nav_link1: landingSettings["nav_link1"] || "",
        nav_link2: landingSettings["nav_link2"] || "",
        nav_link3: landingSettings["nav_link3"] || "",
        nav_link4: landingSettings["nav_link4"] || "",
        nav_link5: landingSettings["nav_link5"] || "",

        // Hero
        hero_badge: landingSettings["hero_badge"] || "",
        hero_title: landingSettings["hero_title"] || "",
        hero_subtitle: landingSettings["hero_subtitle"] || "",
        hero_cta_text: landingSettings["hero_cta_text"] || "",
        hero_image: landingSettings["hero_image"] || "",
        hero_stat_badge: landingSettings["hero_stat_badge"] || "",
        hero_stat_label: landingSettings["hero_stat_label"] || "",
        hero_info_badge: landingSettings["hero_info_badge"] || "",
        hero_doc_text: landingSettings["hero_doc_text"] || "",
        hero_doc_link: landingSettings["hero_doc_link"] || "",
        hero_doc_link_text: landingSettings["hero_doc_link_text"] || "",
        hero_video_btn_text: landingSettings["hero_video_btn_text"] || "",
        hero_video_url: landingSettings["hero_video_url"] || "",
        hero_video_label: landingSettings["hero_video_label"] || "",
        hero_video_duration: landingSettings["hero_video_duration"] || "",

        // Program Tabs Header
        program_title: landingSettings["program_title"] || "",
        program_subtitle: landingSettings["program_subtitle"] || "",
        tab_cta_text: landingSettings["tab_cta_text"] || "",
        tab_cta_sub: landingSettings["tab_cta_sub"] || "",

        // Tabs
        tab1_name: landingSettings["tab1_name"] || "",
        tab1_title: landingSettings["tab1_title"] || "",
        tab1_subtitle: landingSettings["tab1_subtitle"] || "",
        tab1_desc1: landingSettings["tab1_desc1"] || "",
        tab1_desc2: landingSettings["tab1_desc2"] || "",
        tab1_stats: landingSettings["tab1_stats"] || "",
        tab1_badge: landingSettings["tab1_badge"] || "",
        tab1_image: landingSettings["tab1_image"] || "",

        tab2_name: landingSettings["tab2_name"] || "",
        tab2_title: landingSettings["tab2_title"] || "",
        tab2_subtitle: landingSettings["tab2_subtitle"] || "",
        tab2_desc1: landingSettings["tab2_desc1"] || "",
        tab2_desc2: landingSettings["tab2_desc2"] || "",
        tab2_stats: landingSettings["tab2_stats"] || "",
        tab2_badge: landingSettings["tab2_badge"] || "",
        tab2_image: landingSettings["tab2_image"] || "",

        tab3_name: landingSettings["tab3_name"] || "",
        tab3_title: landingSettings["tab3_title"] || "",
        tab3_subtitle: landingSettings["tab3_subtitle"] || "",
        tab3_desc1: landingSettings["tab3_desc1"] || "",
        tab3_desc2: landingSettings["tab3_desc2"] || "",
        tab3_stats: landingSettings["tab3_stats"] || "",
        tab3_badge: landingSettings["tab3_badge"] || "",
        tab3_image: landingSettings["tab3_image"] || "",

        // Modul Cards
        modul_title: landingSettings["modul_title"] || "",
        modul_subtitle: landingSettings["modul_subtitle"] || "",
        modul_detail_text: landingSettings["modul_detail_text"] || "",
        modul_curriculum_text: landingSettings["modul_curriculum_text"] || "",
        modul_register_text: landingSettings["modul_register_text"] || "",
        modul_point1: landingSettings["modul_point1"] || "",
        modul_point2: landingSettings["modul_point2"] || "",
        modul_point3: landingSettings["modul_point3"] || "",

        prog1_title: landingSettings["prog1_title"] || "",
        prog1_subtitle: landingSettings["prog1_subtitle"] || "",
        prog1_desc: landingSettings["prog1_desc"] || "",
        prog1_badge: landingSettings["prog1_badge"] || "",

        prog2_title: landingSettings["prog2_title"] || "",
        prog2_subtitle: landingSettings["prog2_subtitle"] || "",
        prog2_desc: landingSettings["prog2_desc"] || "",
        prog2_badge: landingSettings["prog2_badge"] || "",

        prog3_title: landingSettings["prog3_title"] || "",
        prog3_subtitle: landingSettings["prog3_subtitle"] || "",
        prog3_desc: landingSettings["prog3_desc"] || "",
        prog3_badge: landingSettings["prog3_badge"] || "",
        prog1_link: landingSettings["prog1_link"] || "",
        prog2_link: landingSettings["prog2_link"] || "",
        prog3_link: landingSettings["prog3_link"] || "",

        // Aspects (Methods)
        method_title: landingSettings["method_title"] || "",
        method_subtitle: landingSettings["method_subtitle"] || "",

        aspect1_title: landingSettings["aspect1_title"] || "",
        aspect1_desc: landingSettings["aspect1_desc"] || "",
        aspect1_point1: landingSettings["aspect1_point1"] || "",
        aspect1_point2: landingSettings["aspect1_point2"] || "",
        aspect1_point3: landingSettings["aspect1_point3"] || "",

        aspect2_title: landingSettings["aspect2_title"] || "",
        aspect2_desc: landingSettings["aspect2_desc"] || "",
        aspect2_point1: landingSettings["aspect2_point1"] || "",
        aspect2_point2: landingSettings["aspect2_point2"] || "",
        aspect2_point3: landingSettings["aspect2_point3"] || "",

        aspect3_title: landingSettings["aspect3_title"] || "",
        aspect3_desc: landingSettings["aspect3_desc"] || "",
        aspect3_point1: landingSettings["aspect3_point1"] || "",
        aspect3_point2: landingSettings["aspect3_point2"] || "",
        aspect3_point3: landingSettings["aspect3_point3"] || "",

        aspect4_title: landingSettings["aspect4_title"] || "",
        aspect4_desc: landingSettings["aspect4_desc"] || "",
        aspect4_point1: landingSettings["aspect4_point1"] || "",
        aspect4_point2: landingSettings["aspect4_point2"] || "",
        aspect4_point3: landingSettings["aspect4_point3"] || "",
        aspect_badge_text: landingSettings["aspect_badge_text"] || "",

        // Roadmap
        roadmap_title: landingSettings["roadmap_title"] || "",
        roadmap_subtitle: landingSettings["roadmap_subtitle"] || "",

        roadmap1_title: landingSettings["roadmap1_title"] || "",
        roadmap1_desc: landingSettings["roadmap1_desc"] || "",

        roadmap2_title: landingSettings["roadmap2_title"] || "",
        roadmap2_desc: landingSettings["roadmap2_desc"] || "",

        roadmap3_title: landingSettings["roadmap3_title"] || "",
        roadmap3_desc: landingSettings["roadmap3_desc"] || "",
        roadmap_link_text: landingSettings["roadmap_link_text"] || "",

        // News
        news1_title: landingSettings["news1_title"] || "",
        news1_date: landingSettings["news1_date"] || "",
        news1_type: landingSettings["news1_type"] || "",

        news2_title: landingSettings["news2_title"] || "",
        news2_date: landingSettings["news2_date"] || "",
        news2_type: landingSettings["news2_type"] || "",

        news3_title: landingSettings["news3_title"] || "",
        news3_date: landingSettings["news3_date"] || "",
        news3_type: landingSettings["news3_type"] || "",
        news1_link: landingSettings["news1_link"] || "",
        news2_link: landingSettings["news2_link"] || "",
        news3_link: landingSettings["news3_link"] || "",
        news_link_text: landingSettings["news_link_text"] || "",

        testi_title: landingSettings["testi_title"] || "",
        testi_subtitle: landingSettings["testi_subtitle"] || "",
        testi_fallback: landingSettings["testi_fallback"] || "",

        // CTA
        cta_title: landingSettings["cta_title"] || "",
        cta_desc: landingSettings["cta_desc"] || "",
        cta_button_text: landingSettings["cta_button_text"] || "",
        cta_button_sub: landingSettings["cta_button_sub"] || "",

        // Footer
        footer_desc: landingSettings["footer_desc"] || "",
        footer_love_text: landingSettings["footer_love_text"] || "",
        footer_about: landingSettings["footer_about"] || "",
        footer_nav_header: landingSettings["footer_nav_header"] || "",
        footer_creator_header: landingSettings["footer_creator_header"] || "",
        footer_copy_text: landingSettings["footer_copy_text"] || "",
        footer_made_with: landingSettings["footer_made_with"] || "",
        footer_for_learners: landingSettings["footer_for_learners"] || "",
        back_to_top_title: landingSettings["back_to_top_title"] || "",

        // Section visibility toggles
        section_program_visible:
            landingSettings["section_program_visible"] || "1",
        section_modul_visible: landingSettings["section_modul_visible"] || "1",
        section_method_visible:
            landingSettings["section_method_visible"] || "1",
        section_testi_visible: landingSettings["section_testi_visible"] || "1",
        section_berita_visible:
            landingSettings["section_berita_visible"] || "1",
        section_cta_visible: landingSettings["section_cta_visible"] || "1",
    });

    const [activeTab, setActiveTab] = useState("hero");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.landing.update"));
    };

    const renderInput = (
        key: keyof typeof data,
        label: string,
        type: "text" | "textarea" = "text",
    ) => (
        <div className="space-y-1.5 mb-4">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            {type === "textarea" ? (
                <textarea
                    value={data[key]}
                    onChange={(e) => setData(key, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:border-red-400 focus:ring focus:ring-red-100 transition-all font-medium text-slate-700 min-h-[100px]"
                />
            ) : (
                <input
                    type="text"
                    value={data[key]}
                    onChange={(e) => setData(key, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:border-red-400 focus:ring focus:ring-red-100 transition-all font-medium text-slate-700"
                />
            )}
        </div>
    );

    return (
        <Layout>
            <Head title="Kelola Landing Page" />

            <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                                <LayoutTemplate size={20} />
                            </div>
                            Pengaturan Landing Page
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Ubah keseluruhan konten teks yang muncul di halaman
                            beranda.
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#bc002d] text-white font-bold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                        <Save size={18} />
                        {processing ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>

                {recentlySuccessful && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 font-medium"
                    >
                        <Info size={18} /> Berhasil menyimpan perubahan! Halaman
                        landing sekarang sudah diperbarui.
                    </motion.div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50">
                        {[
                            { id: "hero", label: "Hero & Branding" },
                            { id: "program_tabs", label: "Tab Perjalanan" },
                            { id: "modul_aspek", label: "Modul & Aspek" },
                            { id: "roadmap_berita", label: "Roadmap & Berita" },
                            { id: "cta_footer", label: "CTA & Footer" },
                            { id: "visibility", label: "Tampilan ON/OFF" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-4 text-xs lg:text-sm font-bold transition-colors ${
                                    activeTab === tab.id
                                        ? "text-[#bc002d] border-b-2 border-[#bc002d] bg-white"
                                        : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
                        {activeTab === "hero" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 gap-6"
                            >
                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2 text-sm">
                                        📢 Pengumuman & Header
                                    </h3>
                                    {renderInput("announcement_text", "Teks Bar Pengumuman Atas")}
                                    {renderInput("site_logo_sub", "Subtitle Logo / Motto (contoh: Made for You)")}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        {renderInput("nav_link1", "Menu 1")}
                                        {renderInput("nav_link2", "Menu 2")}
                                        {renderInput("nav_link3", "Menu 3")}
                                        {renderInput("nav_link4", "Menu 4")}
                                        {renderInput("nav_link5", "Menu 5")}
                                    </div>
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2 text-sm">
                                        🏷️ Branding & SEO Meta (Judul & Logo)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {renderInput("site_brand_name", "Nama Brand (contoh: Benkyou)")}
                                        {renderInput("site_logo_char", "Karakter Logo (contoh: 日)")}
                                        {renderInput("site_title", "Judul Tab Browser (Meta Title)")}
                                    </div>
                                    {renderInput("site_meta_desc", "Deskripsi SEO Halaman (Meta Description)", "textarea")}
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2 text-sm">
                                        ✨ Hero Section Teks
                                    </h3>
                                    {renderInput("hero_badge", "Badge Teks")}
                                    {renderInput("hero_title", "Judul Utama (Gunakan HTML <span> untuk warna merah)")}
                                    {renderInput("hero_subtitle", "Sub-Judul / Deskripsi", "textarea")}
                                    {renderInput("hero_cta_text", "Teks Tombol Utama")}
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2 text-sm">
                                        🖼️ Hero Image & Collage Badges
                                    </h3>
                                    {renderInput("hero_image", "URL Gambar Utama Hero")}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {renderInput("hero_stat_label", "Label Badge Status (contoh: Cocok Buat)")}
                                        {renderInput("hero_stat_badge", "Teks Badge Status (contoh: Pemula s/d Mahir)")}
                                    </div>
                                    {renderInput("hero_info_badge", "Teks Badge Kolase Kanan (Info)")}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {renderInput("hero_doc_text", "Teks Unduh PDF Booklet")}
                                        {renderInput("hero_doc_link", "Link URL PDF Booklet")}
                                        {renderInput("hero_doc_link_text", "Teks Link Unduh (contoh: Unduh)")}
                                    </div>
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2 text-sm">
                                        🎥 Video Intro Modal
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {renderInput("hero_video_btn_text", "Teks Tombol Buka Video")}
                                        {renderInput("hero_video_duration", "Teks Durasi Video (contoh: Durasi: 2 Menit)")}
                                    </div>
                                    {renderInput("hero_video_url", "URL Video (MP4 / streaming link)")}
                                    {renderInput("hero_video_label", "Teks Label Keterangan Video")}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "program_tabs" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        <Type size={16} /> Header Tab Program
                                    </h3>
                                    {renderInput("program_title", "Judul Bagian Program")}
                                    {renderInput("program_subtitle", "Sub-Judul Bagian Program")}
                                </div>

                                <div className="space-y-6">
                                    {[1, 2, 3].map((num) => (
                                        <div
                                            key={num}
                                            className="p-5 border border-slate-200 rounded-2xl space-y-3 bg-white"
                                        >
                                            <h4 className="font-bold text-indigo-600 mb-3 border-b pb-2 text-sm">
                                                Konten Tab {num} ({num === 1 ? "Pemula" : num === 2 ? "Menengah" : "Lanjut"})
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {renderInput(`tab${num}_name` as any, "Nama Tab (Tombol)")}
                                                {renderInput(`tab${num}_badge` as any, "Teks Badge Kecil")}
                                                {renderInput(`tab${num}_image` as any, "URL Gambar Tab")}
                                            </div>
                                            {renderInput(`tab${num}_title` as any, "Judul Konten")}
                                            {renderInput(`tab${num}_subtitle` as any, "Kutipan / Sub-judul")}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {renderInput(`tab${num}_desc1` as any, "Deskripsi Paragraf 1", "textarea")}
                                                {renderInput(`tab${num}_desc2` as any, "Deskripsi Paragraf 2", "textarea")}
                                            </div>
                                            {renderInput(`tab${num}_stats` as any, "Statistik Poin (Pisahkan dengan •)")}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2 text-sm">
                                        🔗 Tombol Aksi Tab (CTA)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {renderInput("tab_cta_text", "Teks Tombol Daftar Tab")}
                                        {renderInput("tab_cta_sub", "Teks Sub-keterangan di bawah Tombol")}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "modul_aspek" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        📦 Bagian Modul Belajar (3D Flip Cards)
                                    </h3>
                                    {renderInput("modul_title", "Judul Bagian Modul")}
                                    {renderInput("modul_subtitle", "Sub-judul Bagian Modul")}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((num) => (
                                        <div key={num} className="p-4 border border-slate-200 rounded-2xl bg-white space-y-2">
                                            <h4 className="font-bold text-red-600 border-b pb-1.5 text-xs uppercase tracking-wider">
                                                Modul Card {num}
                                            </h4>
                                            {renderInput(`prog${num}_title` as any, "Judul")}
                                            {renderInput(`prog${num}_subtitle` as any, "Sub-judul")}
                                            {renderInput(`prog${num}_badge` as any, "Teks Badge")}
                                            {renderInput(`prog${num}_desc` as any, "Deskripsi Detil", "textarea")}
                                            {renderInput(`prog${num}_link` as any, "Link URL (Belakang)")}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        ⚙️ Pengaturan Global Modul (Teks & Poin)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {renderInput("modul_detail_text", "Teks Link Detail (Depan)")}
                                        {renderInput("modul_curriculum_text", "Judul Kurikulum (Belakang)")}
                                        {renderInput("modul_register_text", "Teks Tombol Daftar (Belakang)")}
                                    </div>
                                    <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 mt-4">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Poin Kurikulum Default (Belakang):</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {renderInput("modul_point1", "Poin Kurikulum 1")}
                                            {renderInput("modul_point2", "Poin Kurikulum 2")}
                                            {renderInput("modul_point3", "Poin Kurikulum 3")}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 mt-8">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        💡 Bagian Aspek Metode Belajar (Horizontal Accordion)
                                    </h3>
                                    {renderInput("method_title", "Judul Bagian Aspek")}
                                    {renderInput("method_subtitle", "Sub-judul Bagian Aspek")}
                                    {renderInput("aspect_badge_text", "Teks Badge Kecil (Aspek Aktif)")}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div key={num} className="p-5 border border-slate-200 rounded-2xl bg-white space-y-2">
                                            <h4 className="font-bold text-emerald-600 border-b pb-1.5 text-xs uppercase tracking-wider">
                                                Aspek Card {num}
                                            </h4>
                                            {renderInput(`aspect${num}_title` as any, "Judul Aspek")}
                                            {renderInput(`aspect${num}_desc` as any, "Deskripsi Aspek", "textarea")}
                                            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                                                <span className="text-xs font-bold text-slate-500">Poin Bullet list:</span>
                                                {renderInput(`aspect${num}_point1` as any, "Poin 1")}
                                                {renderInput(`aspect${num}_point2` as any, "Poin 2")}
                                                {renderInput(`aspect${num}_point3` as any, "Poin 3")}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "roadmap_berita" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        🗺️ Bagian Roadmap (Timeline Kiri)
                                    </h3>
                                    {renderInput("roadmap_title", "Judul Roadmap")}
                                    {renderInput("roadmap_subtitle", "Sub-judul Roadmap")}
                                    <div className="space-y-4 mt-4">
                                        {[1, 2, 3].map((num) => (
                                            <div key={num} className="p-4 border border-slate-100 rounded-xl bg-white">
                                                <h4 className="text-xs font-bold text-amber-600 mb-2">Roadmap Tahap 0{num}</h4>
                                                {renderInput(`roadmap${num}_title` as any, "Judul Tahap")}
                                                {renderInput(`roadmap${num}_desc` as any, "Deskripsi Singkat")}
                                            </div>
                                        ))}
                                    </div>
                                    {renderInput("roadmap_link_text", "Teks Link di Bawah Timeline")}
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        📰 Bagian Berita / Update (List Kanan)
                                    </h3>
                                    {renderInput("news_link_text", "Teks Link Baca Artikel (muncul saat hover)")}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                        {[1, 2, 3].map((num) => (
                                            <div key={num} className="p-4 border border-slate-200 rounded-xl bg-white space-y-2">
                                                <h4 className="text-xs font-bold text-purple-600 border-b pb-1">Berita {num}</h4>
                                                {renderInput(`news${num}_title` as any, "Isi Berita")}
                                                {renderInput(`news${num}_date` as any, "Tanggal / Keterangan")}
                                                {renderInput(`news${num}_type` as any, "Tipe (contoh: FUN, SURPRISE)")}
                                                {renderInput(`news${num}_link` as any, "Link URL Berita")}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        💬 Bagian Surat Rahasia (Header Teks)
                                    </h3>
                                    {renderInput("testi_title", "Judul Bagian Surat")}
                                    {renderInput("testi_subtitle", "Sub-judul Bagian Surat")}
                                    {renderInput("testi_fallback", "Teks Fallback Jika Surat Kosong")}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "cta_footer" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        ❤️ Bagian Call To Action (Ajakan Daftar Bawah)
                                    </h3>
                                    {renderInput("cta_title", "Judul Ajakan")}
                                    {renderInput("cta_desc", "Deskripsi Ajakan", "textarea")}
                                    {renderInput("cta_button_text", "Teks Tombol Aksi Utama")}
                                    {renderInput("cta_button_sub", "Teks Tombol Aksi Kedua")}
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30">
                                    <h3 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                                        📝 Bagian Footer (Hak Cipta & Info)
                                    </h3>
                                    {renderInput("footer_desc", "Deskripsi Brand Kiri", "textarea")}
                                    {renderInput("footer_love_text", "Teks Love Note Tengah (contoh: Dibuat dengan 💕...)")}
                                    {renderInput("footer_about", "Teks Tentang Pembuat Kanan", "textarea")}

                                    <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 mt-4">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teks Label Kolom & Hak Cipta:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {renderInput("footer_nav_header", "Judul Kolom Navigasi (Navigasi)")}
                                            {renderInput("footer_creator_header", "Judul Kolom Pembuat (Dari Pembuat)")}
                                        </div>
                                        {renderInput("footer_copy_text", "Teks Hak Cipta Bawah")}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {renderInput("footer_made_with", "Teks Dibuat Dengan (Dibuat dengan)")}
                                            {renderInput("footer_for_learners", "Teks Target Pembelajar (untuk pembelajar...)")}
                                        </div>
                                        {renderInput("back_to_top_title", "Teks Tombol Kembali Ke Atas (Kembali ke atas)")}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "visibility" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-4"
                            >
                                <p className="text-xs text-slate-500 mb-4 font-medium">
                                    Nyalakan atau matikan setiap bagian di halaman landing. Bagian yang dimatikan tidak akan muncul untuk pengunjung.
                                </p>
                                {[
                                    {
                                        key: "section_program_visible" as const,
                                        label: "Perjalanan Belajarmu (Program Tabs)",
                                        desc: "Bagian tab program belajar dengan 3 tahapan",
                                    },
                                    {
                                        key: "section_modul_visible" as const,
                                        label: "Modul Spesial Buatmu",
                                        desc: "Kartu flip: Huruf & Kanji, Tata Bahasa, My Journey",
                                    },
                                    {
                                        key: "section_method_visible" as const,
                                        label: "Cara Belajar Asyik",
                                        desc: "4 aspek metode belajar (accordion cards)",
                                    },
                                    {
                                        key: "section_testi_visible" as const,
                                        label: "Catatan Kecil",
                                        desc: "Pesan-pesan pribadi dari database admin",
                                    },
                                    {
                                        key: "section_berita_visible" as const,
                                        label: "Berita Terbaru",
                                        desc: "Timeline roadmap dan berita terbaru",
                                    },
                                    {
                                        key: "section_cta_visible" as const,
                                        label: "Call to Action",
                                        desc: "Bagian ajakan daftar di bagian bawah",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.key}
                                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-700 text-sm">
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {item.desc}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    item.key,
                                                    data[item.key] === "1"
                                                        ? "0"
                                                        : "1",
                                                )
                                            }
                                            className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                                                data[item.key] === "1"
                                                    ? "bg-green-500"
                                                    : "bg-slate-300"
                                            }`}
                                        >
                                            <div
                                                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                                                    data[item.key] === "1"
                                                        ? "translate-x-7"
                                                        : "translate-x-0.5"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
