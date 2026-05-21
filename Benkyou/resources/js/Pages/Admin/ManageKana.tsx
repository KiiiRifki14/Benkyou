import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Search, PenTool, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Layout from '@/Components/Layout';
import { router } from '@inertiajs/react';

interface Kana {
  id: number;
  category: string;
  romaji: string;
  kana: string;
}

interface ManageKanaProps {
  kanasData: Kana[];
}

const ROWS_PER_PAGE = 20;

export default function ManageKana({ kanasData = [] }: ManageKanaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'semua' | 'hiragana' | 'katakana'>('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [crudModal, setCrudModal] = useState<{ mode: 'add' | 'edit'; item?: Kana } | null>(null);
  const [kanaForm, setKanaForm] = useState({ category: 'hiragana', romaji: '', kana: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<Kana | null>(null);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: 'semua' | 'hiragana' | 'katakana') => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const filteredKanas = kanasData.filter(k => {
    const matchesSearch = k.kana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'semua' || k.category.toLowerCase() === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredKanas.length / ROWS_PER_PAGE));
  const paginatedKanas = filteredKanas.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const openCrud = (mode: 'add' | 'edit', item?: Kana) => {
    setKanaForm(mode === 'edit' && item ? { category: item.category, romaji: item.romaji, kana: item.kana } : { category: 'hiragana', romaji: '', kana: '' });
    setCrudModal({ mode, item });
  };

  const handleCrudSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crudModal) return;
    setProcessing(true);
    
    if (crudModal.mode === 'edit' && crudModal.item) {
      router.put(`/admin/kana/${crudModal.item.id}`, kanaForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    } else {
      router.post('/admin/kana', kanaForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    }
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    router.delete(`/admin/kana/${deleteConfirm.id}`, {
      onSuccess: () => {
        setDeleteConfirm(null);
        setCurrentPage(1);
      }
    });
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
            <PenTool className="text-[#bc002d]" size={28} />
            Kelola Huruf Kana
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Tambah, ubah, dan hapus data Hiragana dan Katakana Benkyou.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border text-[#bc002d] border-red-100 bg-red-50 shrink-0">
          {kanasData.length} Huruf
        </span>
      </div>

      {/* Toolbar & Filter Chips */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Cari huruf atau romaji..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={() => openCrud('add')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#bc002d] hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={16} /> Tambah Kana
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-slate-50 pt-4">
          {([
            { id: 'semua', label: 'Semua' },
            { id: 'hiragana', label: 'Hiragana' },
            { id: 'katakana', label: 'Katakana' }
          ] as const).map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleCategoryChange(chip.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === chip.id
                  ? 'bg-[#bc002d] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table & Pagination Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6">Huruf Kana</th>
                <th className="py-3.5 px-6">Romaji</th>
                <th className="py-3.5 px-6">Kategori</th>
                <th className="py-3.5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {paginatedKanas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <p className="font-jp text-5xl text-slate-200 mb-3">空</p>
                    <p className="text-slate-400 text-sm font-medium">Tidak ada data huruf Kana yang ditemukan.</p>
                    <button
                      onClick={() => openCrud('add')}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors"
                    >
                      <Plus size={14} /> Tambah Data Pertama
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedKanas.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-jp font-bold text-3xl text-[#bc002d]">{k.kana}</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-base text-slate-700">{k.romaji}</td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${
                        k.category.toLowerCase() === 'hiragana'
                          ? 'bg-rose-50 text-rose-600 border border-rose-100'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {k.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-center space-x-1.5">
                      <button
                        onClick={() => openCrud('edit', k)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-flex items-center"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(k)}
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
              {((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filteredKanas.length)} dari {filteredKanas.length}
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-slate-100"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-lg">
                  {crudModal.mode === 'add' ? 'Tambah' : 'Ubah'} Huruf Kana
                </h3>
                <button
                  onClick={() => setCrudModal(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCrudSubmit} className="p-6 space-y-4 bg-white">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Kategori Kana</label>
                  <select 
                    value={kanaForm.category} 
                    onChange={(e) => setKanaForm({ ...kanaForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  >
                    <option value="hiragana">Hiragana</option>
                    <option value="katakana">Katakana</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Huruf Jepang (Karakter)</label>
                  <input 
                    type="text" 
                    required
                    value={kanaForm.kana} 
                    onChange={(e) => setKanaForm({ ...kanaForm, kana: e.target.value })}
                    placeholder="Contoh: あ"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Cara Baca (Romaji)</label>
                  <input 
                    type="text" 
                    required
                    value={kanaForm.romaji} 
                    onChange={(e) => setKanaForm({ ...kanaForm, romaji: e.target.value })}
                    placeholder="Contoh: a"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
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
                  <h3 className="font-bold text-slate-800 text-lg">Hapus Huruf Kana?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Apakah Anda yakin ingin menghapus <strong>{deleteConfirm.kana} ({deleteConfirm.romaji})</strong>? Tindakan ini tidak dapat dibatalkan.
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

ManageKana.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
