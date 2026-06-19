import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Heart } from "lucide-react";
import Layout from "@/Components/Layout";

interface Note {
    id: string;
    title: string | null;
    date: string;
    content: string;
    fromAdmin: boolean;
    authorName: string | null;
}

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (window as any).axios
            .get("/student/notes/api")
            .then((res: any) => setNotes(res.data))
            .catch((err: any) => console.error("Failed to fetch notes:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-8 pb-12 px-2 sm:px-4"
        >
            <header className="text-center space-y-4 mb-10">
                <h1 className="font-serif text-3xl sm:text-4xl font-light text-[var(--color-ink)] flex items-center justify-center gap-3">
                    <Mail className="text-[var(--color-japan-red)]" size={32} />
                    Catatan Kecil
                </h1>
                <p className="text-[var(--color-ink-light)] text-sm sm:text-base max-w-md mx-auto">
                    Pesan-pesan kecil yang ditulis khusus untukmu~ Baca
                    satu-satu ya 💌
                </p>
            </header>

            {loading ? (
                <div className="text-center py-16">
                    <div className="inline-block w-8 h-8 border-2 border-[var(--color-japan-red)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : notes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#E5E5E5] space-y-4">
                    <Mail className="mx-auto text-gray-300" size={48} />
                    <p className="text-[var(--color-ink-light)]">
                        Belum ada catatan~ Tapi tenang, sesuatu yang spesial
                        sedang ditulis untukmu 🌸
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {notes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-3xl border border-[#E5E5E5] shadow-sm overflow-hidden"
                        >
                            {/* Letter header with date */}
                            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-100 bg-gradient-to-r from-[#fff9f9] to-white">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-japan-red)] bg-white/80 px-3 py-1 rounded-full border border-red-100">
                                        {note.date}
                                    </span>
                                    {note.fromAdmin && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-japan-red)] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                                            <Heart
                                                size={10}
                                                className="fill-current"
                                            />{" "}
                                            Dari Aku
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Letter body */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8">
                                {note.title && (
                                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[var(--color-ink)] mb-4">
                                        {note.title}
                                    </h3>
                                )}
                                <p className="text-sm sm:text-base text-[var(--color-ink)] whitespace-pre-wrap leading-relaxed font-sans">
                                    {note.content}
                                </p>
                            </div>

                            {/* Letter footer */}
                            {note.fromAdmin && (
                                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                                    <div className="flex items-center gap-2 text-xs text-[var(--color-ink-light)] italic">
                                        <span>— dengan 💕</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

Notes.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
