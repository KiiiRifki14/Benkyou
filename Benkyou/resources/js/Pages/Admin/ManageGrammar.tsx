import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Search, BookOpen, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import Layout from '@/Components/Layout';
import { router } from '@inertiajs/react';

interface Grammar {
  id: number;
  title: string;
  description: string;
  examples: { jp: string; romaji: string; en: string }[] | string;
  notes: string;
}

interface ManageGrammarProps {
  grammarsData: Grammar[];
}

const ROWS_PER_PAGE = 20;

export default function ManageGrammar({ grammarsData = [] }: ManageGrammarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [crudModal, setCrudModal] = useState<{ mode: 'add' | 'edit'; item?: Grammar } | null>(null);
  const [grammarForm, setGrammarForm] = useState({
    title: '',
    description: '',
    notes: '',
    examples: [{ jp: '', romaji: '', en: '' }]
  });
  const [deleteConfirm, setDeleteConfirm] = useState<Grammar | null>(null);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const filteredGrammars = grammarsData.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredGrammars.length / ROWS_PER_PAGE));
  const paginatedGrammars = filteredGrammars.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const openCrud = (mode: 'add' | 'edit', item?: Grammar) => {
    let parsedExamples = [{ jp: '', romaji: '', en: '' }];
    if (mode === 'edit' && item) {
      try {
        parsedExamples = typeof item.examples === 'string' ? JSON.parse(item.examples) : item.examples;
      } catch(e) {
        parsedExamples = [{ jp: '', romaji: '', en: '' }];
      }
      setGrammarForm({
        title: item.title,
        description: item.description,
        notes: item.notes,
        examples: parsedExamples
      });
    } else {
      setGrammarForm({
        title: '',
        description: '',
        notes: '',
        examples: [{ jp: '', romaji: '', en: '' }]
      });
    }
    setCrudModal({ mode, item });
  };

  const handleCrudSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crudModal) return;
    setProcessing(true);
    
    if (crudModal.mode === 'edit' && crudModal.item) {
      router.put(`/admin/grammar/${crudModal.item.id}`, grammarForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    } else {
      router.post('/admin/grammar', grammarForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    }
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    router.delete(`/admin/grammar/${deleteConfirm.id}`, {
      onSuccess: () => {
        setDeleteConfirm(null);
        setCurrentPage(1);
      }
    });
  };

  const getFirstExample = (examples: { jp: string; romaji: string; en: string }[] | string) => {
    try {
      const parsed = typeof examples === 'string' ? JSON.parse(examples) : examples;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }
    } catch (e) {}
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-[#bc002d]" size={28} />
            Kelola Tata Bahasa
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Tambah, ubah, dan hapus pola Tata Bahasa (Grammar) Benkyou.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border text-[#bc002d] border-red-100 bg-red-50 shrink-0">
          {grammarsData.length} Pola
        </span>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Cari pola atau deskripsi..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={() => openCrud('add')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#bc002d] hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={16} /> Tambah Grammar
          </button>
        </div>
      </div>

      {/* Table & Pagination Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6 w-1/4">Pola Tata Bahasa</th>
                <th className="py-3.5 px-6 w-1/2">Deskripsi & Contoh</th>
                <th className="py-3.5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {paginatedGrammars.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <p className="font-jp text-5xl text-slate-200 mb-3">空</p>
                    <p className="text-slate-400 text-sm font-medium">Tidak ada data Grammar yang ditemukan.</p>
                    <button
                      onClick={() => openCrud('add')}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors"
                    >
                      <Plus size={14} /> Tambah Data Pertama
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedGrammars.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-serif font-bold text-lg text-slate-800 vertical-align-top">{g.title}</td>
                    <td className="py-4 px-6 text-slate-600 leading-relaxed">
                      <div className="font-medium">{g.description}</div>
                      {getFirstExample(g.examples) && (
                        <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs inline-flex flex-wrap items-center gap-2 max-w-full">
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold">Contoh 1</span>
                          <span className="font-jp font-bold text-slate-700 text-sm">{getFirstExample(g.examples)!.jp}</span>
                          <span className="text-slate-300">|</span>
                          <span className="font-mono text-slate-500">{getFirstExample(g.examples)!.romaji}</span>
                          <span className="text-slate-300">|</span>
                          <span className="text-slate-600 italic">"{getFirstExample(g.examples)!.en}"</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center space-x-1.5 vertical-align-top">
                      <button
                        onClick={() => openCrud('edit', g)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-flex items-center"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(g)}
                        className="p-2 text-slate-500 hover:text-[#bc002d] hover:bg-red-50 rounded-xl transition-colors inline-flex items-center"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm bg-white">
            <span className="text-slate-400 text-xs">
              {((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filteredGrammars.length)} dari {filteredGrammars.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages).map((p, idx, arr) => (
                <React.Fragment key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-slate-300 px-1">…</span>}
                  <button
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                      p === currentPage
                        ? 'bg-[#bc002d] text-white shadow-sm'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {crudModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden border border-slate-100 max-h-[90vh]"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-lg">
                  {crudModal.mode === 'add' ? 'Tambah' : 'Ubah'} Pola Tata Bahasa
                </h3>
                <button
                  onClick={() => setCrudModal(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCrudSubmit} className="p-6 overflow-y-auto space-y-4 bg-white flex-1">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Judul Pola Tata Bahasa</label>
                  <input 
                    type="text" 
                    required
                    value={grammarForm.title} 
                    onChange={(e) => setGrammarForm({ ...grammarForm, title: e.target.value })}
                    placeholder="Contoh: ~てみる (~te miru)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Deskripsi Pola</label>
                  <textarea 
                    required
                    rows={3}
                    value={grammarForm.description} 
                    onChange={(e) => setGrammarForm({ ...grammarForm, description: e.target.value })}
                    placeholder="Menjelaskan pencobaan suatu aktivitas (mencoba melakukan)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Catatan Tambahan</label>
                  <textarea 
                    rows={2}
                    value={grammarForm.notes} 
                    onChange={(e) => setGrammarForm({ ...grammarForm, notes: e.target.value })}
                    placeholder="Gunakan bentuk Te-form sebelum menambahkan miru."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
                </div>

                {/* Examples Repeater */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Contoh Kalimat</label>
                    <button 
                      type="button"
                      onClick={() => setGrammarForm({ ...grammarForm, examples: [...grammarForm.examples, { jp: '', romaji: '', en: '' }] })}
                      className="text-xs font-bold text-[#bc002d] hover:underline"
                    >
                      + Tambah Contoh
                    </button>
                  </div>
                  {grammarForm.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3 relative">
                      {grammarForm.examples.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => {
                            const newExamples = [...grammarForm.examples];
                            newExamples.splice(exIdx, 1);
                            setGrammarForm({ ...grammarForm, examples: newExamples });
                          }}
                          className="absolute top-3 right-4 text-xs text-red-500 font-bold hover:underline"
                        >
                          Hapus
                        </button>
                      )}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Contoh #{exIdx + 1}</span>
                        <input 
                          type="text" 
                          placeholder="Jepang (Contoh: 食べてみます)" 
                          required
                          value={ex.jp} 
                          onChange={(e) => {
                            const newExamples = [...grammarForm.examples];
                            newExamples[exIdx].jp = e.target.value;
                            setGrammarForm({ ...grammarForm, examples: newExamples });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#bc002d]"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input 
                            type="text" 
                            placeholder="Romaji (Contoh: tabete mimasu)" 
                            required
                            value={ex.romaji} 
                            onChange={(e) => {
                              const newExamples = [...grammarForm.examples];
                              newExamples[exIdx].romaji = e.target.value;
                              setGrammarForm({ ...grammarForm, examples: newExamples });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#bc002d]"
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            placeholder="Arti (Contoh: Saya akan mencoba memakannya)" 
                            required
                            value={ex.en} 
                            onChange={(e) => {
                              const newExamples = [...grammarForm.examples];
                              newExamples[exIdx].en = e.target.value;
                              setGrammarForm({ ...grammarForm, examples: newExamples });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#bc002d]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCrudModal(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2.5 rounded-xl bg-[#bc002d] text-white text-sm font-bold shadow-sm hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100"
            >
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 text-[#bc002d] rounded-full flex items-center justify-center mx-auto">
                  <Trash2 size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Hapus Pola Grammar?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Apakah Anda yakin ingin menghapus <strong>{deleteConfirm.title}</strong>? Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={executeDelete}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#bc002d] hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-colors"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

ManageGrammar.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
