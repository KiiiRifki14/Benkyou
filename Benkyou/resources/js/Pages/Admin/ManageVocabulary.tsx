import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Search, List } from 'lucide-react';
import Layout from '@/Components/Layout';
import { router } from '@inertiajs/react';

interface Vocabulary {
  id: number;
  word: string;
  romaji: string;
  meaning: string;
  type: string;
}

interface ManageVocabularyProps {
  vocabulariesData: Vocabulary[];
}

export default function ManageVocabulary({ vocabulariesData = [] }: ManageVocabularyProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(false);
  const [crudModal, setCrudModal] = useState<{ mode: 'add' | 'edit'; item?: Vocabulary } | null>(null);
  const [vocabForm, setVocabForm] = useState({ word: '', romaji: '', meaning: '', type: 'noun' });

  const filteredVocabs = vocabulariesData.filter(v => 
    v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCrud = (mode: 'add' | 'edit', item?: Vocabulary) => {
    setVocabForm(mode === 'edit' && item ? { word: item.word, romaji: item.romaji, meaning: item.meaning, type: item.type } : { word: '', romaji: '', meaning: '', type: 'noun' });
    setCrudModal({ mode, item });
  };

  const handleCrudSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crudModal) return;
    setProcessing(true);
    
    if (crudModal.mode === 'edit' && crudModal.item) {
      router.put(`/admin/vocabulary/${crudModal.item.id}`, vocabForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    } else {
      router.post('/admin/vocabulary', vocabForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini secara permanen?')) {
      router.delete(`/admin/vocabulary/${id}`);
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
            <List className="text-[var(--color-japan-red)]" size={36} />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-ink)]">Kelola Kosakata</h1>
          </div>
          <p className="text-[var(--color-ink-light)]">Tambah, ubah, dan hapus data Kosakata Benkyou.</p>
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
                <th className="py-4 px-6">Kata Jepang</th>
                <th className="py-4 px-6">Cara Baca (Romaji)</th>
                <th className="py-4 px-6">Arti / Makna</th>
                <th className="py-4 px-6 text-center">Golongan Kata</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-sm">
              {filteredVocabs.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-jp font-bold text-2xl text-gray-800">{v.word}</td>
                  <td className="py-4 px-6 font-mono font-bold text-base text-[var(--color-japan-red)]">{v.romaji}</td>
                  <td className="py-4 px-6 font-medium">{v.meaning}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold tracking-wider uppercase">
                      {v.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center space-x-2">
                    <button onClick={() => openCrud('edit', v)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {crudModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-[#E5E5E5]">
            <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-[var(--color-washi)]">
              <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)]">
                {crudModal.mode === 'add' ? 'Tambah' : 'Edit'} Kosakata
              </h3>
              <button onClick={() => setCrudModal(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCrudSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Kata Jepang (Karakter / Kanji)</label>
                <input 
                  type="text" 
                  required
                  value={vocabForm.word} 
                  onChange={(e) => setVocabForm({ ...vocabForm, word: e.target.value })}
                  placeholder="Contoh: 猫 (ねこ)"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Cara Baca (Romaji)</label>
                <input 
                  type="text" 
                  required
                  value={vocabForm.romaji} 
                  onChange={(e) => setVocabForm({ ...vocabForm, romaji: e.target.value })}
                  placeholder="Contoh: neko"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Arti / Terjemahan</label>
                <input 
                  type="text" 
                  required
                  value={vocabForm.meaning} 
                  onChange={(e) => setVocabForm({ ...vocabForm, meaning: e.target.value })}
                  placeholder="Contoh: Kucing"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Golongan Kata</label>
                <select 
                  value={vocabForm.type} 
                  onChange={(e) => setVocabForm({ ...vocabForm, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                >
                  <option value="noun">Noun (Kata Benda)</option>
                  <option value="verb">Verb (Kata Kerja)</option>
                  <option value="adjective">Adjective (Kata Sifat)</option>
                  <option value="greeting">Greeting (Salam)</option>
                  <option value="adverb">Adverb (Kata Keterangan)</option>
                </select>
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

ManageVocabulary.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
