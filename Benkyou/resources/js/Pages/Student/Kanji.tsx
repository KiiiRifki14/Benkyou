import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/Components/Layout';
import { Volume2, Search, Filter } from 'lucide-react';

interface KanjiType {
  id?: number;
  kanji: string;
  romaji: string;
  meaning: string;
  level: string;
}

export default function Kanji({ kanjiData = [] }: { kanjiData: KanjiType[] }) {
  const [search, setSearch] = useState('');
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const levels = ['all', ...Array.from(new Set(kanjiData.map(k => k.level).filter(Boolean)))];

  const filtered = kanjiData.filter(k => {
    const matchLevel = activeLevel === 'all' || k.level === activeLevel;
    const matchSearch = !search || k.kanji.includes(search) || k.romaji.toLowerCase().includes(search.toLowerCase()) || k.meaning.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  // Reset page to 1 when search query or filter level changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeLevel]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getVisiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    if (totalPages <= 7) return pages;
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const speakKanji = (kanji: string) => {
    const utt = new SpeechSynthesisUtterance(kanji);
    utt.lang = 'ja-JP';
    window.speechSynthesis.speak(utt);
  };

  // Level badge colors
  const levelColors: Record<string, { bg: string; text: string; border: string }> = {
    N5: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    N4: { bg: 'bg-blue-100',    text: 'text-blue-800',    border: 'border-blue-200'    },
    N3: { bg: 'bg-amber-100',   text: 'text-amber-800',   border: 'border-amber-200'   },
    N2: { bg: 'bg-purple-100',  text: 'text-purple-800',  border: 'border-purple-200'  },
    N1: { bg: 'bg-rose-100',    text: 'text-rose-800',    border: 'border-rose-200'    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      {/* ── Header Banner ── */}
      <div className="relative bg-gradient-to-br from-[var(--color-ink)] to-gray-800 text-white rounded-3xl p-8 md:p-10 overflow-hidden">
        <div className="absolute -right-4 -top-4 font-jp text-[9rem] font-bold opacity-[0.06] select-none pointer-events-none leading-none">
          漢字
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full border border-white/10">
            Kamus Kanji
          </span>
          <h1 className="font-fredoka text-3xl md:text-4xl font-bold mt-3 mb-2">
            Karakter Bahasa Jepang ✍️
          </h1>
          <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
            Kenali karakter-karakter kanji yang akan muncul di misi petualanganmu.
            <strong className="text-white"> Klik kartu</strong> untuk mendengar cara bacanya~
          </p>
        </div>
      </div>

      {/* ── Filter & Search Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-light)]" />
          <input
            type="text"
            placeholder="Cari kanji, romaji, atau arti..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-gray-200 focus:border-[var(--color-japan-red)] focus:outline-none text-sm font-medium text-[var(--color-ink)] transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Level filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-[var(--color-ink-light)] shrink-0" />
          {levels.map(lv => {
            const colors = lv !== 'all' ? (levelColors[lv] ?? { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }) : null;
            return (
              <button
                key={lv}
                onClick={() => setActiveLevel(lv)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border-2 capitalize ${
                  activeLevel === lv
                    ? lv === 'all'
                      ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                      : `${colors!.bg} ${colors!.text} ${colors!.border}`
                    : 'bg-white text-[var(--color-ink-light)] border-gray-200 hover:border-gray-300'
                }`}
              >
                {lv === 'all' ? 'Semua' : lv}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Kanji Grid ── */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {paginated.map((item, index) => {
            const colors = levelColors[item.level] ?? { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
            return (
              <motion.div
                key={item.id ?? index}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(index * 0.02, 0.4), duration: 0.25 }}
                whileHover={{ scale: 1.04, y: -4 }}
                onClick={() => speakKanji(item.kanji)}
                className="group bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg cursor-pointer border-2 border-transparent hover:border-[var(--color-japan-red)] transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 relative overflow-hidden"
              >
                {/* Level badge */}
                {item.level && (
                  <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {item.level}
                  </span>
                )}

                {/* Kanji character */}
                <span className="font-jp text-4xl sm:text-5xl text-[var(--color-ink)] block leading-none group-hover:text-[var(--color-japan-red)] transition-colors">
                  {item.kanji}
                </span>

                {/* Romaji */}
                <span className="text-xs sm:text-sm text-[var(--color-japan-red)] font-bold block truncate w-full text-center">
                  {item.romaji}
                </span>

                {/* Meaning */}
                <span className="text-[10px] sm:text-xs text-[var(--color-ink-light)] font-medium uppercase tracking-tight line-clamp-1 w-full text-center">
                  {item.meaning}
                </span>

                {/* Speaker hint */}
                <div className="mt-1 w-7 h-7 rounded-full bg-[var(--color-washi)] group-hover:bg-[var(--color-japan-red)] flex items-center justify-center transition-colors">
                  <Volume2 size={12} className="text-[var(--color-ink-light)] group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[var(--color-ink-light)] font-medium">
            {kanjiData.length === 0 ? 'Belum ada kanji yang ditambahkan~ ✨' : 'Tidak ditemukan hasil pencarian.'}
          </p>
        </div>
      )}

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          {/* Info */}
          <p className="text-xs text-[var(--color-ink-light)] font-medium order-2 sm:order-1">
            Menampilkan <strong>{Math.min((currentPage - 1) * itemsPerPage + 1, filtered.length)}</strong> - <strong>{Math.min(currentPage * itemsPerPage, filtered.length)}</strong> dari {filtered.length} hasil
          </p>
          
          {/* Buttons */}
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-[var(--color-ink-light)] hover:border-gray-300 hover:text-[var(--color-ink)] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Sebelumnya
            </button>
            
            {getVisiblePages().map((page, i) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${i}`} className="px-2 text-xs text-[var(--color-ink-light)] font-bold">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border-2 cursor-pointer ${
                    currentPage === page
                      ? "bg-[var(--color-japan-red)] text-white border-[var(--color-japan-red)] shadow-sm shadow-red-100"
                      : "bg-white text-[var(--color-ink-light)] border-gray-200 hover:border-gray-300 hover:text-[var(--color-ink)]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-[var(--color-ink-light)] hover:border-gray-300 hover:text-[var(--color-ink)] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}

      {/* General Count for Single Page */}
      {totalPages <= 1 && filtered.length > 0 && (
        <p className="text-center text-xs text-[var(--color-ink-light)] font-medium">
          Menampilkan <strong>{filtered.length}</strong> dari {kanjiData.length} karakter kanji
        </p>
      )}
    </motion.div>
  );
}

Kanji.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
