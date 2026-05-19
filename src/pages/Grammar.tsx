import React from 'react';
import { motion } from 'motion/react';
import { grammar } from '../data/grammar';

export default function Grammar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header className="border-b border-[#E5E5E5] pb-6">
        <h1 className="font-serif text-4xl font-light mb-2">Pelajaran Tata Bahasa</h1>
        <p className="text-[var(--color-ink-light)]">Kuasai struktur bahasa Jepang.</p>
      </header>

      <div className="space-y-8">
        {grammar.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full flex-shrink-0 bg-[var(--color-washi)] flex items-center justify-center font-serif text-xl text-[var(--color-matcha-dark)]">
                {lesson.id}
              </div>
              <h2 className="text-xl sm:text-2xl font-medium">{lesson.title}</h2>
            </div>
            
            <p className="text-[var(--color-ink-light)] mb-8 text-base sm:text-lg leading-relaxed">
              {lesson.description}
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink-light)]">Contoh</h3>
              {lesson.examples.map((ex, idx) => (
                <div key={idx} className="bg-[var(--color-washi)] p-4 sm:p-6 rounded-2xl border-l-4 border-[var(--color-matcha)]">
                  <p className="font-jp text-lg sm:text-xl mb-2 break-words">{ex.jp}</p>
                  <p className="text-sm text-[var(--color-ink-light)] mb-1 break-words">{ex.romaji}</p>
                  <p className="text-sm font-medium">{ex.en}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#FFF9E6] p-4 rounded-xl flex gap-3">
              <span className="text-xl">💡</span>
              <p className="text-sm text-[#8C6D1F] leading-relaxed">{lesson.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
