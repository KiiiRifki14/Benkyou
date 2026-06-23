import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Heart, Plus, Trash2, Edit, X, Save, FileText } from "lucide-react";
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
    const [isOpen, setIsOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const fetchNotes = () => {
        setLoading(true);
        (window as any).axios
            .get("/student/notes/api")
            .then((res: any) => setNotes(res.data))
            .catch((err: any) => console.error("Failed to fetch notes:", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const handleOpenCreate = () => {
        setEditingNote(null);
        setTitle("");
        setContent("");
        setIsOpen(true);
    };

    const handleOpenEdit = (note: Note) => {
        setEditingNote(note);
        setTitle(note.title || "");
        setContent(note.content);
        setIsOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSubmitting(true);
        const payload = { title: title.trim() || null, content: content.trim() };

        if (editingNote) {
            // Update
            (window as any).axios
                .put(`/student/notes/api/${editingNote.id}`, payload)
                .then(() => {
                    showToast("Catatan berhasil diperbarui! 📝");
                    setIsOpen(false);
                    fetchNotes();
                })
                .catch((err: any) => console.error(err))
                .finally(() => setSubmitting(false));
        } else {
            // Create
            (window as any).axios
                .post("/student/notes/api", payload)
                .then(() => {
                    showToast("Catatan baru ditambahkan! ✨");
                    setIsOpen(false);
                    fetchNotes();
                })
                .catch((err: any) => console.error(err))
                .finally(() => setSubmitting(false));
        }
    };

    const handleDelete = (id: string) => {
        if (!confirm("Kamu yakin ingin menghapus catatan ini?")) return;

        (window as any).axios
            .delete(`/student/notes/api/${id}`)
            .then(() => {
                showToast("Catatan telah dihapus.");
                fetchNotes();
            })
            .catch((err: any) => console.error(err));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-8 pb-12 px-2 sm:px-4 relative"
        >
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-full shadow-xl flex items-center gap-2"
                    >
                        <Heart className="text-red-400 fill-red-400" size={16} />
                        <span>{toast}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
                <div className="space-y-1.5 text-left">
                    <h1 className="font-serif text-3xl font-light text-[var(--color-ink)] flex items-center gap-3">
                        <Mail className="text-[var(--color-japan-red)]" size={32} />
                        Catatan Kecilku
                    </h1>
                    <p className="text-[var(--color-ink-light)] text-sm">
                        Ruang rahasiamu untuk menulis ide, pengingat, atau cerita belajarmu. 🌸
                    </p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="px-5 py-3 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-red-600/10 flex items-center justify-center gap-2 cursor-pointer self-start sm:self-center"
                >
                    <Plus size={16} /> Tulis Catatan Baru
                </button>
            </header>

            {loading ? (
                <div className="text-center py-16">
                    <div className="inline-block w-8 h-8 border-2 border-[var(--color-japan-red)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : notes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#E5E5E5] space-y-4 shadow-sm">
                    <FileText className="mx-auto text-gray-300" size={48} />
                    <p className="text-[var(--color-ink-light)] text-sm max-w-sm mx-auto">
                        Belum ada catatan pribadi yang kamu buat. Yuk tulis catatan pertamamu sekarang! ✨
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {notes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-white rounded-3xl border border-[#E5E5E5] shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative"
                        >
                            {/* Letter header with date */}
                            <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-gray-100 bg-gradient-to-r from-[#fff9f9] to-white flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-japan-red)] bg-white/80 px-3 py-1 rounded-full border border-red-100">
                                    {note.date}
                                </span>
                                
                                {/* Edit & Delete Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleOpenEdit(note)}
                                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer"
                                        title="Edit Catatan"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                                        title="Hapus Catatan"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Letter body */}
                            <div className="px-6 sm:px-8 py-6 sm:py-7">
                                {note.title && (
                                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[var(--color-ink)] mb-4">
                                        {note.title}
                                    </h3>
                                )}
                                <p className="text-sm sm:text-base text-[var(--color-ink)] whitespace-pre-wrap leading-relaxed font-sans">
                                    {note.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Glassmorphic Modal Form */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-serif font-bold text-lg text-slate-800 flex items-center gap-2">
                                    {editingNote ? "✏️ Edit Catatan Kecil" : "✍️ Tulis Catatan Baru"}
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Judul (Opsional)</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Judul catatan..."
                                        maxLength={100}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-red-400 focus:ring focus:ring-red-100 transition-all font-medium text-slate-700 placeholder-slate-400"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Isi Catatan</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Tulis pesanmu di sini..."
                                        required
                                        rows={6}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-red-400 focus:ring focus:ring-red-100 transition-all font-medium text-slate-700 placeholder-slate-400 min-h-[150px]"
                                    />
                                </div>

                                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-5 py-2.5 rounded-full text-slate-500 hover:bg-slate-100 text-sm font-bold transition-all cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting || !content.trim()}
                                        className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                                    >
                                        <Save size={16} />
                                        {submitting ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

Notes.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
