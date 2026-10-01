import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Mail, Plus, Trash2, Edit3, X, Send } from "lucide-react";
import Layout from "@/Components/Layout";

interface Note {
    id: number;
    title: string | null;
    content: string;
    date: string;
    author_id: number | null;
}

export default function ManageNotes({
    notesData = [],
}: {
    notesData?: Note[];
}) {
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<Note | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        title: "",
        content: "",
    });

    const openCreate = () => {
        setEditItem(null);
        reset();
        setShowForm(true);
    };

    const openEdit = (note: Note) => {
        setEditItem(note);
        setData({ title: note.title || "", content: note.content });
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem) {
            put(`/admin/notes/${editItem.id}`, {
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        } else {
            post("/admin/notes", {
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Hapus catatan ini?")) {
            destroy(`/admin/notes/${id}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pt-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Mail className="text-[#bc002d]" size={28} />
                        Catatan Kecil
                    </h1>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Tulis pesan-pesan manis untuknya. Dia akan membaca ini
                        di halaman "Catatan Kecil" 💌
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bc002d] text-white text-sm font-bold hover:bg-red-700 transition-colors shadow-sm"
                >
                    <Plus size={16} /> Tulis Catatan Baru
                </button>
            </div>

            {/* Create/Edit Form */}
            {showForm && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-slate-700">
                            {editItem ? "Edit Catatan" : "Catatan Baru"}
                        </h2>
                        <button
                            onClick={() => setShowForm(false)}
                            className="p-1 text-slate-400 hover:text-slate-600"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                                Judul (Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                placeholder="Contoh: Surat Pertama, Untukmu yang Spesial..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#bc002d] focus:ring-1 focus:ring-[#bc002d]/20"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                                Isi Pesan
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                rows={6}
                                placeholder="Tulis pesan manismu di sini... 💕"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#bc002d] focus:ring-1 focus:ring-[#bc002d]/20 resize-none leading-relaxed"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing || !data.content.trim()}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#bc002d] text-white text-sm font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                                <Send size={14} />
                                {editItem
                                    ? "Simpan Perubahan"
                                    : "Kirim Catatan"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Notes List */}
            <div className="space-y-4">
                {notesData.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
                        <Mail className="mx-auto text-slate-300" size={40} />
                        <p className="text-slate-400 text-sm">
                            Belum ada catatan. Tulis pesan pertamamu untuknya!
                        </p>
                    </div>
                ) : (
                    notesData.map((note: Note) => (
                        <div
                            key={note.id}
                            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    {note.title && (
                                        <h3 className="font-serif text-base font-semibold text-slate-800 mb-1">
                                            {note.title}
                                        </h3>
                                    )}
                                    <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed line-clamp-3">
                                        {note.content}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3">
                                        {note.date}
                                    </p>
                                </div>

                                <div className="flex gap-1 shrink-0">
                                    <button
                                        onClick={() => openEdit(note)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

ManageNotes.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
