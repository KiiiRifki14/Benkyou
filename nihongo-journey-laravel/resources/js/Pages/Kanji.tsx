import React from 'react';
import { motion } from 'motion/react';
interface KanjiType {
  id?: number;
  kanji: string;
  romaji: string;
  meaning: string;
  level: string;
}

export default function Kanji({ kanjiData = [] }: { kanjiData: KanjiType[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="border-b border-[#E5E5E5] pb-6">
        <h1 className="font-serif text-4xl font-light mb-2">Kanji N5</h1>
        <p className="text-[var(--color-ink-light)]">Karakter dasar untuk JLPT level N5.</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {kanjiData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[var(--color-japan-red)] text-center flex flex-col justify-center"
          >
            <span className="font-jp text-4xl sm:text-5xl text-[var(--color-ink)] mb-3 sm:mb-4 block">{item.kanji}</span>
            <span className="text-xs sm:text-sm text-[var(--color-japan-red)] font-semibold block mb-1 truncate">{item.romaji}</span>
            <span className="text-[10px] sm:text-xs text-[var(--color-ink-light)] font-medium uppercase tracking-tight line-clamp-1">{item.meaning}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
