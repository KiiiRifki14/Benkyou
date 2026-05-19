import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, PenTool, List } from 'lucide-react';

export default function Home({ setPage }: { setPage: (page: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header className="space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-ink)]">
          Selamat datang kembali, <span className="text-[var(--color-japan-red)] block sm:inline mt-2 sm:mt-0">RANI HAYATI</span>
        </h1>
        <p className="text-base md:text-lg text-[var(--color-ink-light)] max-w-2xl">
          Lanjutkan perjalananmu menguasai bahasa Jepang. Konsistensi adalah kunci kefasihan.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setPage('kana')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[var(--color-sakura)]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <span className="text-[var(--color-japan-red)] font-jp font-bold text-xl">あ</span>
          </div>
          <h3 className="font-serif text-xl mb-2">Kana</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Kuasai alfabet dasar: Hiragana dan Katakana.</p>
        </div>

        <div 
          onClick={() => setPage('kanji')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[#F5A623]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <span className="text-[#F5A623] font-jp font-bold text-xl">漢</span>
          </div>
          <h3 className="font-serif text-xl mb-2">Kanji</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Pelajari karakter Kanji dari level dasar ke tingkat lanjut.</p>
        </div>

        <div 
          onClick={() => setPage('vocabulary')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[var(--color-matcha)]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <List className="text-[var(--color-matcha)]" size={24} />
          </div>
          <h3 className="font-serif text-xl mb-2">Kosakata</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Perbanyak perbendaharaan kata dengan kosakata esensial.</p>
        </div>

        <div 
          onClick={() => setPage('grammar')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[#4A90E2]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <BookOpen className="text-[#4A90E2]" size={24} />
          </div>
          <h3 className="font-serif text-xl mb-2">Tata Bahasa</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Pelajari struktur kalimat, tata bahasa, dan partikel.</p>
        </div>

        <div 
          onClick={() => setPage('quiz')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[#9B51E0]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <span className="text-[#9B51E0] font-bold text-xl">?</span>
          </div>
          <h3 className="font-serif text-xl mb-2">Kuis Singkat</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Uji seberapa jauh kemampuan bahasa Jepang kamu.</p>
        </div>

        <div 
          onClick={() => setPage('certification')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[var(--color-japan-red)]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <span className="text-[var(--color-japan-red)] font-bold text-xl">★</span>
          </div>
          <h3 className="font-serif text-xl mb-2">Sertifikasi</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Ikuti ujian level N5 hingga N1 untuk menguji dirimu.</p>
        </div>

        <div 
          onClick={() => setPage('notes')}
          className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-[#50E3C2]"
        >
          <div className="w-12 h-12 bg-[var(--color-washi)] rounded-full flex items-center justify-center mb-4">
            <PenTool className="text-[#50E3C2]" size={24} />
          </div>
          <h3 className="font-serif text-xl mb-2">Catatan</h3>
          <p className="text-[var(--color-ink-light)] text-sm">Catat poin penting dari pelajaran yang sedang disimak.</p>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-[10rem] sm:text-[12rem] font-jp opacity-5 select-none pointer-events-none">
          日本
        </div>
        <div className="relative z-10">
          <h2 className="font-serif text-2xl sm:text-3xl mb-4">Kata Hari Ini</h2>
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 mb-6">
            <span className="font-jp text-5xl sm:text-6xl font-bold">桜</span>
            <div className="pb-2">
              <span className="text-lg sm:text-xl text-[var(--color-sakura)] block">sakura</span>
              <span className="text-base sm:text-lg text-gray-300">bunga sakura</span>
            </div>
          </div>
          <button 
            onClick={() => setPage('vocabulary')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[var(--color-ink)] font-medium text-sm hover:bg-[var(--color-washi)] transition-colors"
          >
            Lihat lebih banyak kata
          </button>
        </div>
      </section>
    </motion.div>
  );
}
