import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Search, CheckCircle2 } from 'lucide-react';
import Layout from '@/Components/Layout';
import { router } from '@inertiajs/react';

interface Question {
  id: number;
  type: string;
  question_type: string;
  question: string;
  options: string[] | string;
  answer: string | string[];
  explanation?: string;
  context?: string;
  spokenText?: string;
  speechLang?: string;
  imageUrl?: string;
  level_id?: number;
}

interface ManageQuestionProps {
  questionsData: Question[];
}

export default function ManageQuestion({ questionsData = [] }: ManageQuestionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(false);
  const [crudModal, setCrudModal] = useState<{ mode: 'add' | 'edit'; item?: Question } | null>(null);
  const [questionForm, setQuestionForm] = useState({
    type: 'quiz',
    question_type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    answer: '',
    explanation: '',
    context: '',
    spokenText: '',
    speechLang: 'ja-JP',
    imageUrl: '',
    level_id: 1
  });

  const filteredQuestions = questionsData.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.question_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCrud = (mode: 'add' | 'edit', item?: Question) => {
    let parsedOptions = ['', '', '', ''];
    let parsedAnswer = '';
    
    if (mode === 'edit' && item) {
      try {
        parsedOptions = typeof item.options === 'string' ? JSON.parse(item.options) : (item.options || ['', '', '', '']);
      } catch(e) {
        parsedOptions = item.options as string[] || ['', '', '', ''];
      }
      
      try {
        const rawAns = typeof item.answer === 'string' ? JSON.parse(item.answer) : item.answer;
        parsedAnswer = Array.isArray(rawAns) ? rawAns.join(', ') : (rawAns || '');
      } catch(e) {
        parsedAnswer = (item.answer as string) || '';
      }
      
      setQuestionForm({
        type: item.type,
        question_type: item.question_type,
        question: item.question,
        options: parsedOptions,
        answer: parsedAnswer,
        explanation: item.explanation || '',
        context: item.context || '',
        spokenText: item.spokenText || '',
        speechLang: item.speechLang || 'ja-JP',
        imageUrl: item.imageUrl || '',
        level_id: item.level_id || 1
      });
    } else {
      setQuestionForm({
        type: 'quiz',
        question_type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        answer: '',
        explanation: '',
        context: '',
        spokenText: '',
        speechLang: 'ja-JP',
        imageUrl: '',
        level_id: 1
      });
    }
    setCrudModal({ mode, item });
  };

  const handleCrudSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crudModal) return;
    setProcessing(true);

    let cleanOptions = questionForm.options;
    let cleanAnswer: string | string[] = questionForm.answer;

    if (questionForm.question_type !== 'typing') {
      cleanOptions = questionForm.options.filter(o => o.trim() !== '');
    } else {
      cleanOptions = [];
    }

    if (questionForm.question_type === 'typing') {
      cleanAnswer = questionForm.answer.split(',').map(s => s.trim());
    }

    const data = {
      ...questionForm,
      options: cleanOptions,
      answer: cleanAnswer
    };

    if (crudModal.mode === 'edit' && crudModal.item) {
      router.put(`/admin/question/${crudModal.item.id}`, data, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    } else {
      router.post('/admin/question', data, {
        onSuccess: () => { setCrudModal(null); setProcessing(false); },
        onError: () => setProcessing(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini secara permanen?')) {
      router.delete(`/admin/question/${id}`);
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
            <CheckCircle2 className="text-[var(--color-japan-red)]" size={36} />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-ink)]">Kelola Kuis & Sertifikasi</h1>
          </div>
          <p className="text-[var(--color-ink-light)]">Tambah, ubah, dan hapus pertanyaan kuis latihan harian dan ujian sertifikasi JLPT.</p>
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
                <th className="py-4 px-6 w-1/4">Pertanyaan</th>
                <th className="py-4 px-6">Tipe Soal</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6 text-center">Level / Tahap</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-sm">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium">
                    <div className="text-gray-800 line-clamp-2">{q.question}</div>
                    {q.explanation && <div className="text-xs text-gray-400 mt-1 truncate">💡 {q.explanation}</div>}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs">{q.question_type}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      q.type === 'quiz' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {q.type === 'quiz' ? 'Latihan' : `Sertif ${q.type.toUpperCase()}`}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-bold font-mono">
                    {q.type === 'quiz' ? '-' : `Level ${q.level_id}`}
                  </td>
                  <td className="py-4 px-6 text-center space-x-2">
                    <button onClick={() => openCrud('edit', q)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(q.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} /></button>
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
                {crudModal.mode === 'add' ? 'Tambah' : 'Edit'} Soal Pertanyaan
              </h3>
              <button onClick={() => setCrudModal(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCrudSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Kategori</label>
                  <select 
                    value={questionForm.type} 
                    onChange={(e) => setQuestionForm({ ...questionForm, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                  >
                    <option value="quiz">Latihan Harian (Quiz)</option>
                    <option value="n5">Sertifikasi N5</option>
                    <option value="n4">Sertifikasi N4</option>
                    <option value="n3">Sertifikasi N3</option>
                    <option value="n2">Sertifikasi N2</option>
                    <option value="n1">Sertifikasi N1</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Tipe Soal</label>
                  <select 
                    value={questionForm.question_type} 
                    onChange={(e) => setQuestionForm({ ...questionForm, question_type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                  >
                    <option value="multiple-choice">Pilihan Ganda (multiple-choice)</option>
                    <option value="typing">Ketik Jawaban (typing)</option>
                    <option value="reading">Membaca (reading)</option>
                    <option value="listening">Mendengar (listening)</option>
                    <option value="image">Gambar (image)</option>
                  </select>
                </div>
              </div>

              {questionForm.type !== 'quiz' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Level / Tahap (Ujian)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="20"
                    required
                    value={questionForm.level_id} 
                    onChange={(e) => setQuestionForm({ ...questionForm, level_id: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Pertanyaan</label>
                <textarea 
                  required
                  rows={2}
                  value={questionForm.question} 
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  placeholder="Masukkan teks pertanyaan atau instruksi..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                />
              </div>

              {questionForm.question_type === 'reading' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Konteks / Paragraf Bacaan</label>
                  <textarea 
                    rows={3}
                    value={questionForm.context} 
                    onChange={(e) => setQuestionForm({ ...questionForm, context: e.target.value })}
                    placeholder="Paragraf bacaan dalam bahasa Jepang..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                  />
                </div>
              )}

              {questionForm.question_type === 'listening' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Spoken Text (Suara TTS)</label>
                    <input 
                      type="text"
                      value={questionForm.spokenText} 
                      onChange={(e) => setQuestionForm({ ...questionForm, spokenText: e.target.value })}
                      placeholder="Teks Jepang untuk disuarakan..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Bahasa TTS</label>
                    <input 
                      type="text"
                      value={questionForm.speechLang} 
                      onChange={(e) => setQuestionForm({ ...questionForm, speechLang: e.target.value })}
                      placeholder="ja-JP"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              {questionForm.question_type === 'image' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">URL Gambar</label>
                  <input 
                    type="text"
                    value={questionForm.imageUrl} 
                    onChange={(e) => setQuestionForm({ ...questionForm, imageUrl: e.target.value })}
                    placeholder="Contoh: https://example.com/image.png"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                  />
                </div>
              )}

              {questionForm.question_type !== 'typing' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block">Pilihan Jawaban</label>
                  {questionForm.options.map((option, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <span className="w-6 text-xs font-bold text-gray-400">#{idx + 1}</span>
                      <input 
                        type="text"
                        required={idx < 2}
                        value={option} 
                        onChange={(e) => {
                          const newOpts = [...questionForm.options];
                          newOpts[idx] = e.target.value;
                          setQuestionForm({ ...questionForm, options: newOpts });
                        }}
                        placeholder={`Pilihan ${idx + 1}`}
                        className="flex-1 px-3 py-2 rounded-lg border text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">
                  {questionForm.question_type === 'typing' ? 'Jawaban Benar (Gunakan koma jika ada beberapa kemungkinan)' : 'Jawaban Benar (Harus persis sama dengan salah satu pilihan)'}
                </label>
                <input 
                  type="text" 
                  required
                  value={questionForm.answer} 
                  onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                  placeholder={questionForm.question_type === 'typing' ? 'Contoh: neko, ねこ' : 'Contoh: 猫'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-light)] block mb-1">Penjelasan (Opsional)</label>
                <textarea 
                  rows={2}
                  value={questionForm.explanation} 
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  placeholder="Mengapa jawaban ini benar..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] outline-none text-sm"
                />
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

ManageQuestion.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
