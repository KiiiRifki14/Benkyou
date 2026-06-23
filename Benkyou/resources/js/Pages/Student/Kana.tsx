import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from '@/Components/Layout';
import { Volume2, Info } from 'lucide-react';

interface KanaCharacter {
  id?: number;
  category: string;
  romaji: string;
  kana: string;
}

export default function Kana({ kanaData = [] }: { kanaData: KanaCharacter[] }) {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const [hoveredKana, setHoveredKana] = useState<string | null>(null);

  const isHiragana = activeTab === 'hiragana';
  const basicData    = kanaData.filter(k => k.category === (isHiragana ? 'hiragana'        : 'katakana'));
  const dakutenData  = kanaData.filter(k => k.category === (isHiragana ? 'dakuten'         : 'katakana-dakuten'));
  const yoonData     = kanaData.filter(k => k.category === (isHiragana ? 'yoon'            : 'katakana-yoon'));

  const speakKana = (kana: string) => {
    const utt = new SpeechSynthesisUtterance(kana);
    utt.lang = 'ja-JP';
    window.speechSynthesis.speak(utt);
  };

  const renderGrid = (data: KanaCharacter[], cols: number = 5) => (
    <div className={`grid ${cols === 3 ? 'grid-cols-3 sm:grid-cols-6 md:grid-cols-9' : 'grid-cols-5 md:grid-cols-10'} gap-2 sm:gap-3`}>
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.008, duration: 0.2 }}
          whileHover={item.kana ? { scale: 1.08, y: -3 } : {}}
          onHoverStart={() => item.kana && setHoveredKana(item.kana)}
          onHoverEnd={() => setHoveredKana(null)}
          onClick={() => item.kana && speakKana(item.kana)}
          className={`h-16 sm:h-20 lg:h-24 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 ${
            item.kana
              ? `bg-white shadow-sm hover:shadow-md cursor-pointer border-2 ${
                  isHiragana
                    ? 'border-transparent hover:border-[var(--color-sakura)] hover:shadow-[var(--color-sakura)]/20'
                    : 'border-transparent hover:border-blue-300 hover:shadow-blue-100'
                }`
              : 'bg-[var(--color-washi)]/40 border border-dashed border-gray-200/70 opacity-40'
          }`}
        >
          {item.kana ? (
            <>
              <span className={`font-jp text-2xl sm:text-3xl lg:text-4xl mb-0.5 block text-center leading-none transition-colors ${
                isHiragana ? 'text-[var(--color-ink)]' : 'text-blue-900'
              }`}>
                {item.kana}
              </span>
              <span className="text-[9px] sm:text-xs text-[var(--color-ink-light)] font-medium text-center tracking-wide">
                {item.romaji}
              </span>
              {hoveredKana === item.kana && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--color-japan-red)]/80 flex items-center justify-center"
                >
                  <Volume2 size={8} className="text-white" />
                </motion.div>
              )}
            </>
          ) : (
            <span className="text-lg text-gray-200">—</span>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 pb-12"
    >
      {/* ── Hero Header ── */}
      <div className={`relative rounded-3xl overflow-hidden p-8 md:p-10 ${isHiragana ? 'bg-gradient-to-br from-rose-800 to-[#bc002d]' : 'bg-gradient-to-br from-blue-800 to-indigo-900'}`}>
        <div className="absolute right-8 top-4 font-jp text-[8rem] font-bold opacity-[0.08] select-none pointer-events-none leading-none text-white">
          {isHiragana ? 'あ' : 'ア'}
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/15 rounded-full text-white">
                Huruf Kana
              </span>
            </div>
            <h1 className="font-fredoka text-3xl md:text-4xl font-bold text-white leading-tight">
              Tabel {isHiragana ? 'Hiragana' : 'Katakana'}
            </h1>
            <p className="mt-2 text-white/70 text-sm max-w-md leading-relaxed">
              {isHiragana
                ? 'Hiragana adalah huruf bundar yang dipakai untuk kata-kata asli bahasa Jepang. Klik kartu untuk mendengar pelafalannya~'
                : 'Katakana dipakai untuk kata serapan asing dan efek suara. Bentuknya lebih tegas dan sudut-sudut~'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-2 bg-white/10 p-1 rounded-2xl shrink-0 border border-white/10">
            {(['hiragana', 'katakana'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-white text-[var(--color-ink)] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab === 'hiragana' ? 'あ Hiragana' : 'ア Katakana'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tip ── */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>Tips:</strong> Huruf <em>yi, ye, wi, wu, we</em> sudah tidak digunakan dalam bahasa Jepang modern, sehingga sel tersebut dibiarkan kosong agar kolom A-I-U-E-O tetap sejajar.
          <strong> Klik kartu</strong> untuk mendengar pengucapannya!
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-10"
        >
          {/* Basic grid */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-6 rounded-full ${isHiragana ? 'bg-[var(--color-japan-red)]' : 'bg-blue-500'}`} />
              <h2 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                Bentuk Dasar — Gojūon (五十音)
              </h2>
            </div>
            {renderGrid(basicData)}
          </section>

          {/* Dakuten grid */}
          {dakutenData.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-6 rounded-full ${isHiragana ? 'bg-[var(--color-sakura-dark)]' : 'bg-indigo-500'}`} />
                <h2 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  Dakuten & Handakuten (濁点・半濁点)
                </h2>
              </div>
              <p className="text-sm text-[var(--color-ink-light)] leading-relaxed -mt-2">
                Huruf dasar yang ditambahkan tanda ゛(dua titik) menjadi suara keruh, atau tanda ゜(lingkaran kecil) menjadi suara p-.
              </p>
              {renderGrid(dakutenData)}
            </section>
          )}

          {/* Yoon grid */}
          {yoonData.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full bg-[var(--color-matcha)]" />
                <h2 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  Huruf Gabungan — Yōon (拗音)
                </h2>
              </div>
              <p className="text-sm text-[var(--color-ink-light)] -mt-2">
                Dibentuk dengan menambahkan ya (や), yu (ゆ), atau yo (よ) yang ditulis lebih kecil.
              </p>
              {renderGrid(yoonData, 3)}
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

Kana.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
