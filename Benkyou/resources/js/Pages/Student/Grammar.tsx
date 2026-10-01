import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from '@/Components/Layout';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Volume2 } from 'lucide-react';

interface ExampleType {
  jp: string;
  romaji: string;
  en: string;
}

interface GrammarType {
  id?: number;
  title: string;
  description: string;
  examples: ExampleType[];
  notes: string;
}

export default function Grammar({ grammarData = [] }: { grammarData: GrammarType[] }) {
  const [expanded, setExpanded] = useState<number | null>(grammarData[0]?.id ?? null);

  const speak = (text: string) => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ja-JP';
    window.speechSynthesis.speak(utt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5 sm:space-y-8 pb-12"
    >
      {/* ── Header Banner ── */}
      <div className="relative bg-gradient-to-br from-blue-800 to-indigo-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-10 overflow-hidden">
        <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 font-jp text-[4.5rem] sm:text-[6.5rem] md:text-[9rem] font-bold opacity-[0.07] select-none pointer-events-none leading-none">
          文法
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/15 rounded-full border border-white/10">
              Pelajaran
            </span>
            <h1 className="font-fredoka text-xl sm:text-3xl md:text-4xl font-bold mt-2 mb-1 sm:mt-3 sm:mb-2">
              Tata Bahasa Jepang 📝
            </h1>
            <p className="text-white/70 text-xs sm:text-sm max-w-md leading-relaxed">
              Kuasai struktur kalimat bahasa Jepang dari pola dasar hingga yang lebih kompleks~
            </p>
          </div>
          <div className="shrink-0 bg-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center border border-white/10 min-w-[70px] self-start sm:self-auto">
            <p className="text-lg sm:text-2xl font-bold font-fredoka">{grammarData.length}</p>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 mt-0.5 sm:mt-1">Pola</p>
          </div>
        </div>
      </div>

      {/* ── Grammar Accordion ── */}
      {grammarData.length > 0 ? (
        <div className="space-y-2.5 sm:space-y-3">
          {grammarData.map((lesson, idx) => {
            const isOpen = expanded === (lesson.id ?? idx);
            return (
              <motion.div
                key={lesson.id ?? idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className={`bg-white rounded-xl sm:rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-blue-300 shadow-md shadow-blue-50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : (lesson.id ?? idx))}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 md:p-6 text-left transition-colors hover:bg-gray-50/50"
                >
                  {/* Number badge */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm transition-colors ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-[var(--color-washi)] text-[var(--color-ink-light)]'
                  }`}>
                    {(lesson.id ?? idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={`font-bold text-sm sm:text-lg truncate transition-colors ${
                      isOpen ? 'text-blue-700' : 'text-[var(--color-ink)]'
                    }`}>
                      {lesson.title}
                    </h2>
                    {!isOpen && (
                      <p className="text-[11px] sm:text-xs text-[var(--color-ink-light)] mt-0.5 truncate">
                        {lesson.description}
                      </p>
                    )}
                  </div>
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>

                {/* Accordion content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 space-y-6">
                        {/* Description */}
                        <p className="text-[var(--color-ink-light)] text-sm sm:text-base leading-relaxed border-l-4 border-blue-200 pl-4 py-1 bg-blue-50/40 rounded-r-xl">
                          {lesson.description}
                        </p>

                        {/* Examples */}
                        {lesson.examples?.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <BookOpen size={14} className="text-blue-500" />
                              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-light)]">
                                Contoh Kalimat
                              </h3>
                            </div>
                            <div className="space-y-2.5">
                              {lesson.examples.map((ex, exIdx) => (
                                <div
                                  key={exIdx}
                                  className="group bg-[var(--color-washi)] rounded-2xl p-4 border border-gray-100 hover:border-blue-200 transition-colors"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 space-y-1">
                                      <p className="font-jp text-lg sm:text-xl leading-relaxed text-[var(--color-ink)] break-words">
                                        {ex.jp}
                                      </p>
                                      <p className="text-sm text-blue-600 font-medium italic break-words">
                                        {ex.romaji}
                                      </p>
                                      <p className="text-sm text-[var(--color-ink-light)] font-medium break-words">
                                        {ex.en}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => speak(ex.jp)}
                                      className="shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all"
                                      title="Dengarkan"
                                    >
                                      <Volume2 size={14} className="text-[var(--color-ink-light)]" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {lesson.notes && (
                          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                            <Lightbulb size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-sm text-amber-800 leading-relaxed">
                              {lesson.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">📖</div>
          <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">Belum ada pelajaran</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Admin sedang menyiapkan materi tata bahasa~ ✨</p>
        </div>
      )}
    </motion.div>
  );
}

Grammar.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
