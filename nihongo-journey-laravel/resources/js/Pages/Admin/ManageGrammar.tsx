import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Search, BookOpen } from 'lucide-react';
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

export default function ManageGrammar({ grammarsData = [] }: ManageGrammarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(false);
  const [crudModal, setCrudModal] = useState<{ mode: 'add' | 'edit'; item?: Grammar } | null>(null);
  const [grammarForm, setGrammarForm] = useState({
    title: '',
    description: '',
    notes: '',
    examples: [{ jp: '', romaji: '', en: '' }]
  });

  const filteredGrammars = grammarsData.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCrud = (mode: 'add' | 'edit', item?: Grammar) => {
    let parsedExamples = [{ jp: '', romaji: '', en: '' }];
    if (mode === 'edit' && item) {
      try {
        parsedExamples = typeof item.examples === 'string' ? JSON.parse(item.examples) : item.examples;
      } catch(e) {
        parsedExamples = item.examples || [{ jp: '', romaji: '', en: '' }];
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

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini secara permanen?')) {
      router.delete(`/admin/grammar/${id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 pb-12"
    >
      <header className="border-b border-[#E5E5E5] pb-6 flex justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-[var(--color-japan-red)]" size={36} />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-ink)]">Kelola Tata Bahasa</h1>
          </div>
          <p className="text-[var(--color-ink-light)]">Tambah, ubah, dan hapus pola Tata Bahasa (Grammar) Nihongo Journey.</p>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5] overflow-hidden">
        <div className="p-6 border-b border-[#E5E5E5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Cari di menu ini...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full text-sm border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-transparent focus:outline-none transition-all shadow-sm"
            />
          </div>

          <button
            onClick={() => openCrud('add')}
            className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] hover:opacity-90 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Tambah Data Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-washi)] text-[var(--color-ink-light)] text-xs font-bold uppercase tracking-wider border-b border-[#E5E5E5]">
                <th className="py-4 px-6 w-1/4">Pola Tata Bahasa</th>
                <th className="py-4 px-6 w-1/2">Deskripsi Pelajaran</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-sm">
              {filteredGrammars.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-serif font-bold text-lg text-gray-800">{g.title}</td>
                  <td className="py-4 px-6 text-[var(--color-ink-light)] line-clamp-2 mt-2 leading-relaxed">{g.description}</td>
                  <td className="py-4 px-6 text-center space-x-2">
                    <button onClick={() => openCrud('edit', g)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(g.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {crudModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-[#E5E5E5] max-h-[90vh]">
            <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-[var(--color-washi)]">
              <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)]">
                {crudModal.mode === 'add' ? 'Tambah' : 'Edit'} Pola Tata Bahasa
              </h3>
              <button onClick={() => setCrudModal(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCrudSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Judul Pola Tata Bahasa</label>
                <input 
                  type="text" 
                  required
                  value={grammarForm.title} 
                  onChange={(e) => setGrammarForm({ ...grammarForm, title: e.target.value })}
                  placeholder="Contoh: ~てみる (~te miru)"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Deskripsi Pola</label>
                <textarea 
                  required
                  rows={3}
                  value={grammarForm.description} 
                  onChange={(e) => setGrammarForm({ ...grammarForm, description: e.target.value })}
                  placeholder="Menjelaskan pencobaan suatu aktivitas (mencoba melakukan)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Catatan Tambahan</label>
                <textarea 
                  rows={2}
                  value={grammarForm.notes} 
                  onChange={(e) => setGrammarForm({ ...grammarForm, notes: e.target.value })}
                  placeholder="Gunakan bentuk Te-form sebelum menambahkan miru."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>

              {/* Examples Repeater */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)]">Contoh Kalimat</label>
                  <button 
                    type="button"
                    onClick={() => setGrammarForm({ ...grammarForm, examples: [...grammarForm.examples, { jp: '', romaji: '', en: '' }] })}
                    className="text-xs font-bold text-[var(--color-japan-red)] hover:underline"
                  >
                    + Tambah Contoh
                  </button>
                </div>
                {grammarForm.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="p-3 border border-dashed rounded-xl bg-gray-50 space-y-2 relative">
                    {grammarForm.examples.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => {
                          const newExamples = [...grammarForm.examples];
                          newExamples.splice(exIdx, 1);
                          setGrammarForm({ ...grammarForm, examples: newExamples });
                        }}
                        className="absolute top-2 right-2 text-xs text-red-500 font-bold hover:underline"
                      >
                        Hapus
                      </button>
                    )}
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
                      className="w-full px-3 py-1.5 rounded-lg border text-sm"
                    />
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
                      className="w-full px-3 py-1.5 rounded-lg border text-sm"
                    />
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
                      className="w-full px-3 py-1.5 rounded-lg border text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setCrudModal(null)} className="px-6 py-2.5 rounded-full border text-sm font-bold hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold shadow-md hover:opacity-90">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}

ManageGrammar.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
