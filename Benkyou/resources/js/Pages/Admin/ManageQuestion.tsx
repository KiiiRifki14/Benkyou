import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Search, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
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

const ROWS_PER_PAGE = 20;

export default function ManageQuestion({ questionsData = [] }: ManageQuestionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'semua' | 'quiz' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1'>('semua');
  const [activeQuestionType, setActiveQuestionType] = useState<'semua' | 'multiple-choice' | 'typing' | 'reading' | 'listening' | 'image'>('semua');
  const [currentPage, setCurrentPage] = useState(1);
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
  const [deleteConfirm, setDeleteConfirm] = useState<Question | null>(null);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: typeof activeCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleQuestionTypeChange = (type: typeof activeQuestionType) => {
    setActiveQuestionType(type);
    setCurrentPage(1);
  };

  const filteredQuestions = questionsData.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.question_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.explanation && q.explanation.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'semua' || q.type.toLowerCase() === activeCategory.toLowerCase();
    const matchesQuestionType = activeQuestionType === 'semua' || q.question_type.toLowerCase() === activeQuestionType.toLowerCase();

    return matchesSearch && matchesCategory && matchesQuestionType;
  });

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / ROWS_PER_PAGE));
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

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

    if (questionForm.question_type === 'reading' && questionForm.context.trim() === '') {
      window.alert('Untuk soal reading, isi Konteks / Paragraf Bacaan terlebih dahulu.');
      return;
    }

    if (questionForm.question_type !== 'typing' && cleanOptions.length < 2) {
      window.alert('Masukkan minimal 2 pilihan jawaban untuk soal pilihan ganda atau reading.');
      return;
    }

    const data = {
      ...questionForm,
      options: cleanOptions,
      answer: cleanAnswer
    };

    setProcessing(true);
    const finish = () => setProcessing(false);

    if (crudModal.mode === 'edit' && crudModal.item) {
      router.put(`/admin/question/${crudModal.item.id}`, data, {
        onSuccess: () => { setCrudModal(null); finish(); },
        onError: finish,
        onFinish: finish,
      });
    } else {
      router.post('/admin/question', data, {
        onSuccess: () => { setCrudModal(null); finish(); },
        onError: finish,
        onFinish: finish,
      });
    }
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    router.delete(`/admin/question/${deleteConfirm.id}`, {
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
            <CheckCircle2 className="text-[#bc002d]" size={28} />
            Kelola Kuis & Sertifikasi
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Tambah, ubah, dan hapus pertanyaan kuis latihan harian dan ujian sertifikasi JLPT.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border text-[#bc002d] border-red-100 bg-red-50 shrink-0">
          {questionsData.length} Pertanyaan
        </span>
      </div>

      {/* Toolbar & Dual Row Filter Chips */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Cari teks soal atau penjelasan..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={() => openCrud('add')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#bc002d] hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={16} /> Tambah Soal
          </button>
        </div>

        {/* Filter Row 1: Kategori */}
        <div className="flex flex-col gap-2 border-t border-slate-50 pt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kategori Ujian</span>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: 'semua', label: 'Semua' },
              { id: 'quiz', label: 'Latihan Harian (Quiz)' },
              { id: 'n5', label: 'Sertifikasi N5' },
              { id: 'n4', label: 'Sertifikasi N4' },
              { id: 'n3', label: 'Sertifikasi N3' },
              { id: 'n2', label: 'Sertifikasi N2' },
              { id: 'n1', label: 'Sertifikasi N1' }
            ] as const).map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleCategoryChange(chip.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
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

        {/* Filter Row 2: Tipe Soal */}
        <div className="flex flex-col gap-2 border-t border-slate-50 pt-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipe Pertanyaan</span>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: 'semua', label: 'Semua Tipe' },
              { id: 'multiple-choice', label: 'Pilihan Ganda (Multiple Choice)' },
              { id: 'typing', label: 'Ketik Jawaban (Typing)' },
              { id: 'reading', label: 'Membaca (Reading)' },
              { id: 'listening', label: 'Mendengar (Listening)' },
              { id: 'image', label: 'Gambar (Image)' }
            ] as const).map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleQuestionTypeChange(chip.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeQuestionType === chip.id
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table & Pagination Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6 w-1/2">Pertanyaan & Penjelasan</th>
                <th className="py-3.5 px-6">Tipe Soal</th>
                <th className="py-3.5 px-6">Kategori</th>
                <th className="py-3.5 px-6 text-center">Level / Tahap</th>
                <th className="py-3.5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {paginatedQuestions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <p className="font-jp text-5xl text-slate-200 mb-3">空</p>
                    <p className="text-slate-400 text-sm font-medium">Tidak ada data Pertanyaan yang ditemukan.</p>
                    <button
                      onClick={() => openCrud('add')}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors"
                    >
                      <Plus size={14} /> Tambah Data Pertama
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-700 leading-normal">{q.question}</div>
                      {q.explanation && (
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <span className="shrink-0 text-amber-500">💡</span>
                          <span className="truncate max-w-lg">{q.explanation}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold font-mono uppercase">
                        {q.question_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        q.type.toLowerCase() === 'quiz'
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {q.type.toLowerCase() === 'quiz' ? 'Latihan' : `Sertif ${q.type.toUpperCase()}`}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-500 font-mono">
                      {q.type.toLowerCase() === 'quiz' ? '-' : `Level ${q.level_id}`}
                    </td>
                    <td className="py-4 px-6 text-center space-x-1.5">
                      <button
                        onClick={() => openCrud('edit', q)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-flex items-center"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(q)}
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
              {((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filteredQuestions.length)} dari {filteredQuestions.length}
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
                  {crudModal.mode === 'add' ? 'Tambah' : 'Ubah'} Soal Pertanyaan
                </h3>
                <button
                  onClick={() => setCrudModal(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCrudSubmit} className="p-6 overflow-y-auto space-y-4 bg-white flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Kategori</label>
                    <select 
                      value={questionForm.type} 
                      onChange={(e) => setQuestionForm({ ...questionForm, type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
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
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Tipe Soal</label>
                    <select 
                      value={questionForm.question_type} 
                      onChange={(e) => setQuestionForm({ ...questionForm, question_type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
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
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Level / Tahap (Ujian)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="20"
                      required
                      value={questionForm.level_id} 
                      onChange={(e) => setQuestionForm({ ...questionForm, level_id: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Pertanyaan</label>
                  <textarea 
                    required
                    rows={2}
                    value={questionForm.question} 
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    placeholder="Masukkan teks pertanyaan atau instruksi..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
                </div>

                {questionForm.question_type === 'reading' && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Konteks / Paragraf Bacaan</label>
                    <textarea 
                      rows={3}
                      value={questionForm.context} 
                      onChange={(e) => setQuestionForm({ ...questionForm, context: e.target.value })}
                      placeholder="Paragraf bacaan dalam bahasa Jepang..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                    />
                  </div>
                )}

                {questionForm.question_type === 'listening' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Spoken Text (Suara TTS)</label>
                      <input 
                        type="text"
                        value={questionForm.spokenText} 
                        onChange={(e) => setQuestionForm({ ...questionForm, spokenText: e.target.value })}
                        placeholder="Teks Jepang untuk disuarakan..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Bahasa TTS</label>
                      <input 
                        type="text"
                        value={questionForm.speechLang} 
                        onChange={(e) => setQuestionForm({ ...questionForm, speechLang: e.target.value })}
                        placeholder="ja-JP"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                      />
                    </div>
                  </div>
                )}

                {questionForm.question_type === 'image' && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">URL Gambar</label>
                    <input 
                      type="text"
                      value={questionForm.imageUrl} 
                      onChange={(e) => setQuestionForm({ ...questionForm, imageUrl: e.target.value })}
                      placeholder="Contoh: https://example.com/image.png"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                    />
                  </div>
                )}

                {questionForm.question_type !== 'typing' && (
                  <div className="space-y-2 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Pilihan Jawaban</label>
                    {questionForm.options.map((option, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="w-6 text-xs font-bold text-slate-400">#{idx + 1}</span>
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
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#bc002d]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {questionForm.question_type === 'typing' ? 'Jawaban Benar (Gunakan koma jika ada beberapa kemungkinan)' : 'Jawaban Benar (Harus persis sama dengan salah satu pilihan)'}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={questionForm.answer} 
                    onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                    placeholder={questionForm.question_type === 'typing' ? 'Contoh: neko, ねこ' : 'Contoh: 猫'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bc002d]/30 focus:border-[#bc002d] outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Penjelasan (Opsional)</label>
                  <textarea 
                    rows={2}
                    value={questionForm.explanation} 
                    onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                    placeholder="Mengapa jawaban ini benar..."
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
                  <h3 className="font-bold text-slate-800 text-lg">Hapus Soal Pertanyaan?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Apakah Anda yakin ingin menghapus pertanyaan ini? Tindakan ini tidak dapat dibatalkan.
                  </p>
                  <p className="text-xs text-slate-400 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic line-clamp-2">
                    "{deleteConfirm.question}"
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

ManageQuestion.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
