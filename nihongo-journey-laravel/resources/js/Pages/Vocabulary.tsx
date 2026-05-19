import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2 } from 'lucide-react';

interface VocabularyType {
  id?: number;
  word: string;
  romaji: string;
  meaning: string;
  type: string;
}

export default function Vocabulary({ vocabularyData = [] }: { vocabularyData: VocabularyType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabularyData.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabularyData.length) % vocabularyData.length);
    }, 150);
  };

  const currentWord = vocabularyData[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <header className="text-center space-y-4">
        <h1 className="font-serif text-4xl font-light">Kartu Pintar Kosakata</h1>
        <p className="text-[var(--color-ink-light)]">Klik kartu untuk melihat artinya.</p>
      </header>

      <div className="relative h-80 md:h-96 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '-front')}
            initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.06)] cursor-pointer flex flex-col items-center justify-center p-6 md:p-12 border border-[#E5E5E5]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {!isFlipped ? (
              <>
                <span className="px-4 py-1 rounded-full bg-[var(--color-washi)] text-[var(--color-ink-light)] text-xs uppercase tracking-wider mb-4 md:mb-8 text-center text-wrap">
                  {currentWord.type}
                </span>
                <h2 className="font-jp text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-ink)] mb-4 md:mb-6 text-center leading-tight">
                  {currentWord.word}
                </h2>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const utterance = new SpeechSynthesisUtterance(currentWord.word);
                    utterance.lang = 'ja-JP';
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-washi)] flex items-center justify-center text-[var(--color-ink-light)] hover:text-[var(--color-japan-red)] transition-colors mt-auto relative z-10"
                >
                  <Volume2 size={24} className="scale-75 md:scale-100" />
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--color-japan-red)] mb-3 sm:mb-4 text-center px-4 leading-tight">
                  {currentWord.meaning}
                </h3>
                <p className="text-lg md:text-xl text-[var(--color-ink-light)] font-medium text-center">
                  {currentWord.romaji}
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center px-2 md:px-8 max-w-full">
        <button 
          onClick={prevCard}
          className="px-4 sm:px-8 py-3 rounded-full border border-[#E5E5E5] bg-white hover:bg-[var(--color-washi)] transition-colors text-sm sm:text-base font-medium flex-shrink-0"
        >
          Sebelum
        </button>
        <span className="text-[var(--color-ink-light)] font-medium text-sm sm:text-base px-2 truncate">
          {currentIndex + 1} / {vocabularyData.length}
        </span>
        <button 
          onClick={nextCard}
          className="px-4 sm:px-8 py-3 rounded-full bg-[var(--color-ink)] text-white hover:bg-black transition-colors text-sm sm:text-base font-medium flex-shrink-0"
        >
          Lanjut
        </button>
      </div>
    </motion.div>
  );
}
