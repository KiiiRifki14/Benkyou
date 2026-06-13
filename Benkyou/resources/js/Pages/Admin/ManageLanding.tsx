import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';
import { LayoutTemplate, Save, Info, Image as ImageIcon, Type } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageLanding({ landingSettings }: { landingSettings: Record<string, string> }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        hero_badge: landingSettings['hero_badge'] || '',
        hero_title: landingSettings['hero_title'] || '',
        hero_subtitle: landingSettings['hero_subtitle'] || '',
        hero_cta_text: landingSettings['hero_cta_text'] || '',
        
        program_title: landingSettings['program_title'] || '',
        program_subtitle: landingSettings['program_subtitle'] || '',
        
        tab1_name: landingSettings['tab1_name'] || '',
        tab1_title: landingSettings['tab1_title'] || '',
        tab1_subtitle: landingSettings['tab1_subtitle'] || '',
        tab1_desc1: landingSettings['tab1_desc1'] || '',
        tab1_desc2: landingSettings['tab1_desc2'] || '',
        tab1_stats: landingSettings['tab1_stats'] || '',
        
        tab2_name: landingSettings['tab2_name'] || '',
        tab2_title: landingSettings['tab2_title'] || '',
        tab2_subtitle: landingSettings['tab2_subtitle'] || '',
        tab2_desc1: landingSettings['tab2_desc1'] || '',
        tab2_desc2: landingSettings['tab2_desc2'] || '',
        tab2_stats: landingSettings['tab2_stats'] || '',
        
        tab3_name: landingSettings['tab3_name'] || '',
        tab3_title: landingSettings['tab3_title'] || '',
        tab3_subtitle: landingSettings['tab3_subtitle'] || '',
        tab3_desc1: landingSettings['tab3_desc1'] || '',
        tab3_desc2: landingSettings['tab3_desc2'] || '',
        tab3_stats: landingSettings['tab3_stats'] || '',

        modul_title: landingSettings['modul_title'] || '',
        modul_subtitle: landingSettings['modul_subtitle'] || '',
        method_title: landingSettings['method_title'] || '',
        method_subtitle: landingSettings['method_subtitle'] || '',
        testi_title: landingSettings['testi_title'] || '',
        testi_subtitle: landingSettings['testi_subtitle'] || '',
        
        // Add more fields if needed
    });

    const [activeTab, setActiveTab] = useState('hero');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.landing.update'));
    };

    const renderInput = (key: keyof typeof data, label: string, type: 'text' | 'textarea' = 'text') => (
        <div className="space-y-1.5 mb-4">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            {type === 'textarea' ? (
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
                        <p className="text-slate-500 mt-2 font-medium">Ubah keseluruhan konten teks yang muncul di halaman beranda.</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#bc002d] text-white font-bold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                        <Save size={18} />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>

                {recentlySuccessful && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 font-medium">
                        <Info size={18} /> Berhasil menyimpan perubahan! Halaman landing sekarang sudah diperbarui.
                    </motion.div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50">
                        {['hero', 'program_tabs', 'other'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-sm font-bold transition-colors ${
                                    activeTab === tab 
                                    ? 'text-[#bc002d] border-b-2 border-[#bc002d] bg-white' 
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {tab === 'hero' ? 'Bagian Atas (Hero)' : tab === 'program_tabs' ? 'Tab Program Belajar' : 'Lainnya'}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 lg:p-8">
                        {activeTab === 'hero' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4">
                                {renderInput('hero_badge', 'Badge Teks Atas (contoh: Yuk Belajar Bareng!)')}
                                {renderInput('hero_title', 'Judul Utama (bisa pakai HTML <span> untuk warna merah)')}
                                {renderInput('hero_subtitle', 'Sub-Judul (Deskripsi bawah judul)', 'textarea')}
                                {renderInput('hero_cta_text', 'Teks Tombol Aksi')}
                            </motion.div>
                        )}

                        {activeTab === 'program_tabs' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Type size={16}/> Header Bagian</h3>
                                    {renderInput('program_title', 'Judul Bagian Program')}
                                    {renderInput('program_subtitle', 'Sub-Judul Bagian Program')}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((num) => (
                                        <div key={num} className="p-4 border border-slate-200 rounded-2xl space-y-2 bg-white">
                                            <h4 className="font-bold text-indigo-600 mb-3 border-b pb-2">Konten Tab {num}</h4>
                                            {renderInput(`tab${num}_name` as any, 'Nama Tab (Tombol)')}
                                            {renderInput(`tab${num}_title` as any, 'Judul Tab')}
                                            {renderInput(`tab${num}_subtitle` as any, 'Sub-judul/Kutipan')}
                                            {renderInput(`tab${num}_desc1` as any, 'Deskripsi 1', 'textarea')}
                                            {renderInput(`tab${num}_desc2` as any, 'Deskripsi 2', 'textarea')}
                                            {renderInput(`tab${num}_stats` as any, 'Poin (pisahkan dengan •)')}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'other' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 border border-slate-200 rounded-2xl">
                                    <h4 className="font-bold text-slate-700 mb-3 border-b pb-2">Kartu Modul</h4>
                                    {renderInput('modul_title', 'Judul Bagian Modul')}
                                    {renderInput('modul_subtitle', 'Sub-judul Bagian Modul')}
                                </div>
                                <div className="p-4 border border-slate-200 rounded-2xl">
                                    <h4 className="font-bold text-slate-700 mb-3 border-b pb-2">Aspek Belajar</h4>
                                    {renderInput('method_title', 'Judul Aspek Belajar')}
                                    {renderInput('method_subtitle', 'Sub-judul Aspek Belajar')}
                                </div>
                                <div className="p-4 border border-slate-200 rounded-2xl">
                                    <h4 className="font-bold text-slate-700 mb-3 border-b pb-2">Catatan/Testimoni</h4>
                                    {renderInput('testi_title', 'Judul Catatan')}
                                    {renderInput('testi_subtitle', 'Sub-judul Catatan')}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
