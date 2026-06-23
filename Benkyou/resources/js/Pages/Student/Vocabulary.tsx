import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import Layout from '@/Components/Layout';

interface VocabularyType {
  id?: number;
  word: string;
  romaji: string;
  meaning: string;
  type: string;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  noun:        { bg: 'bg-blue-100',    text: 'text-blue-700'    },
  verb:        { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  adjective:   { bg: 'bg-amber-100',  text: 'text-amber-700'   },
  adverb:      { bg: 'bg-purple-100', text: 'text-purple-700'  },
  particle:    { bg: 'bg-rose-100',   text: 'text-rose-700'    },
  expression:  { bg: 'bg-orange-100', text: 'text-orange-700'  },
};

export default function Vocabulary({ vocabularyData = [] }: { vocabularyData: VocabularyType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped]       = useState(false);
  const [direction, setDirection]       = useState<1 | -1>(1);

  if (vocabularyData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4"
      >
        <div className="text-6xl">📚</div>
        <h2 className="font-serif text-2xl text-[var(--color-ink)]">Belum ada kosakata</h2>
        <p className="text-[var(--color-ink-light)] text-sm">Admin belum menambahkan kosakata~ Nantikan ya! ✨</p>
      </motion.div>
    );
  }

  const currentWord = vocabularyData[currentIndex];
  const typeColor   = typeColors[currentWord?.type?.toLowerCase()] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };

  const go = (delta: 1 | -1) => {
    setIsFlipped(false);
    setDirection(delta);
    setTimeout(() => {
      setCurrentIndex(prev =>
        (prev + delta + vocabularyData.length) % vocabularyData.length
      );
    }, 150);
  };

  const speak = () => {
    const utt = new SpeechSynthesisUtterance(currentWord.word);
    utt.lang  = 'ja-JP';
    window.speechSynthesis.speak(utt);
  };

  const pct = Math.round(((currentIndex + 1) / vocabularyData.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8 pb-12"
    >
      {/* ── Header ── */}
      <div className="relative bg-gradient-to-br from-[var(--color-matcha)] to-teal-700 text-white rounded-3xl p-7 md:p-9 overflow-hidden">
        <div className="absolute -right-4 -top-4 font-jp text-[8rem] font-bold opacity-[0.07] select-none pointer-events-none leading-none">
          語
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/15 rounded-full">
              Kartu Pintar
            </span>
            <h1 className="font-fredoka text-3xl font-bold mt-3 mb-1 leading-tight">
              Kosakata Jepang 📖
            </h1>
            <p className="text-white/70 text-sm">
              Klik kartu untuk membalik dan melihat artinya~
            </p>
          </div>
          {/* Progress */}
          <div className="shrink-0 bg-white/10 rounded-2xl p-4 text-center border border-white/10 min-w-[100px]">
            <p className="text-2xl font-bold font-fredoka">
              {currentIndex + 1}
              <span className="text-base text-white/50">/{vocabularyData.length}</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">Kata</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/60 rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* ── Flashcard ── */}
      <div className="relative h-80 md:h-96 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped ? 'back' : 'front'}`}
            initial={{ rotateX: direction > 0 ? 60 : -60, opacity: 0, scale: 0.96 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: direction > 0 ? -60 : 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setIsFlipped(f => !f)}
            className={`absolute inset-0 w-full h-full rounded-3xl shadow-xl cursor-pointer flex flex-col items-center justify-center p-8 md:p-12 select-none border-2 transition-colors ${
              isFlipped
                ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                : 'bg-white border-gray-100 hover:border-[var(--color-matcha)]'
            }`}
          >
            {!isFlipped ? (
              <>
                {/* Front */}
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${typeColor.bg} ${typeColor.text}`}>
                  {currentWord.type}
                </div>
                <h2 className="font-jp text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-ink)] mb-4 text-center leading-tight">
                  {currentWord.word}
                </h2>
                <p className="text-sm text-[var(--color-ink-light)] font-medium text-center">
                  Tap kartu untuk lihat artinya~
                </p>

                {/* Speaker */}
                <button
                  onClick={e => { e.stopPropagation(); speak(); }}
                  className="mt-6 w-11 h-11 rounded-full bg-[var(--color-washi)] border-2 border-gray-200 flex items-center justify-center hover:border-[var(--color-matcha)] hover:bg-[var(--color-matcha)] group transition-all"
                >
                  <Volume2 size={18} className="text-[var(--color-ink-light)] group-hover:text-white transition-colors" />
                </button>
              </>
            ) : (
              <>
                {/* Back */}
                <div className="flex items-center gap-2 mb-6 opacity-60">
                  <Sparkles size={14} className="text-[var(--color-sakura)]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-white/50">Arti</span>
                </div>
                <h3 className="font-fredoka text-3xl sm:text-4xl font-bold text-[var(--color-sakura)] text-center leading-tight mb-3">
                  {currentWord.meaning}
                </h3>
                <p className="text-lg text-white/60 font-medium text-center">
                  {currentWord.romaji}
                </p>
                <p className="mt-6 text-xs text-white/30">Tap lagi untuk balik~</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => go(-1)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-[var(--color-washi)] transition-all font-semibold text-sm text-[var(--color-ink)]"
        >
          <ChevronLeft size={18} />
          Sebelum
        </button>

        <button
          onClick={() => { setIsFlipped(false); setCurrentIndex(0); }}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all text-[var(--color-ink-light)] text-xs font-bold"
          title="Mulai dari awal"
        >
          <RotateCcw size={14} />
          Reset
        </button>

        <button
          onClick={() => go(1)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[var(--color-ink)] text-white hover:bg-black transition-all font-semibold text-sm"
        >
          Lanjut
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ── Word list dots ── */}
      <div className="flex justify-center gap-1.5 flex-wrap max-w-xs mx-auto">
        {vocabularyData.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsFlipped(false); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            className={`rounded-full transition-all ${
              i === currentIndex
                ? 'w-6 h-2 bg-[var(--color-matcha)]'
                : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

Vocabulary.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
