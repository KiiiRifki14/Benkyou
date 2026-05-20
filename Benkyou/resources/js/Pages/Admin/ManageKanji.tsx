import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Search, Languages } from 'lucide-react';
import Layout from '@/Components/Layout';
import { router } from '@inertiajs/react';

interface Kanji {
  id: number;
  kanji: string;
  romaji: string;
  meaning: string;
  level: string;
}

interface ManageKanjiProps {
  kanjisData: Kanji[];
}

export default function ManageKanji({ kanjisData = [] }: ManageKanjiProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(false);
  const [crudModal, setCrudModal] = useState<{ mode: 'add' | 'edit'; item?: Kanji } | null>(null);
  const [kanjiForm, setKanjiForm] = useState({ kanji: '', romaji: '', meaning: '', level: 'N5' });

  const filteredKanjis = kanjisData.filter(k => 
    k.kanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCrud = (mode: 'add' | 'edit', item?: Kanji) => {
    setKanjiForm(mode === 'edit' && item ? { kanji: item.kanji, romaji: item.romaji, meaning: item.meaning, level: item.level } : { kanji: '', romaji: '', meaning: '', level: 'N5' });
    setCrudModal({ mode, item });
  };

  const handleCrudSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crudModal) return;
    setProcessing(true);
    
    if (crudModal.mode === 'edit' && crudModal.item) {
      router.put(`/admin/kanji/${crudModal.item.id}`, kanjiForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    } else {
      router.post('/admin/kanji', kanjiForm, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini secara permanen?')) {
      router.delete(`/admin/kanji/${id}`);
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
            <Languages className="text-[var(--color-japan-red)]" size={36} />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-ink)]">Kelola Kanji</h1>
          </div>
          <p className="text-[var(--color-ink-light)]">Tambah, ubah, dan hapus data karakter Kanji Benkyou.</p>
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
                <th className="py-4 px-6">Karakter Kanji</th>
                <th className="py-4 px-6">Cara Baca (Romaji)</th>
                <th className="py-4 px-6">Arti / Makna</th>
                <th className="py-4 px-6 text-center">Level</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-sm">
              {filteredKanjis.map((k) => (
                <tr key={k.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-jp font-bold text-3xl text-gray-800">{k.kanji}</td>
                  <td className="py-4 px-6 font-mono font-bold text-base text-[var(--color-japan-red)]">{k.romaji}</td>
                  <td className="py-4 px-6 font-medium">{k.meaning}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                      {k.level}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center space-x-2">
                    <button onClick={() => openCrud('edit', k)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(k.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} /></button>
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
                {crudModal.mode === 'add' ? 'Tambah' : 'Edit'} Karakter Kanji
              </h3>
              <button onClick={() => setCrudModal(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCrudSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Karakter Kanji</label>
                <input 
                  type="text" 
                  required
                  value={kanjiForm.kanji} 
                  onChange={(e) => setKanjiForm({ ...kanjiForm, kanji: e.target.value })}
                  placeholder="Contoh: 日"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Cara Baca (Romaji)</label>
                <input 
                  type="text" 
                  required
                  value={kanjiForm.romaji} 
                  onChange={(e) => setKanjiForm({ ...kanjiForm, romaji: e.target.value })}
                  placeholder="Contoh: hi, nichi"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Arti / Makna</label>
                <input 
                  type="text" 
                  required
                  value={kanjiForm.meaning} 
                  onChange={(e) => setKanjiForm({ ...kanjiForm, meaning: e.target.value })}
                  placeholder="Contoh: Hari, Matahari"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Tingkat Kesulitan (JLPT)</label>
                <select 
                  value={kanjiForm.level} 
                  onChange={(e) => setKanjiForm({ ...kanjiForm, level: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none"
                >
                  <option value="N5">N5 (Sangat Dasar)</option>
                  <option value="N4">N4 (Dasar)</option>
                  <option value="N3">N3 (Menengah)</option>
                  <option value="N2">N2 (Lanjutan)</option>
                  <option value="N1">N1 (Sangat Ahli)</option>
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

ManageKanji.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
