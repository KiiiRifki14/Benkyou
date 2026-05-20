import React, { useState } from 'react';
import { motion } from 'motion/react';
import Layout from '@/Components/Layout';
interface KanaCharacter {
  id?: number;
  category: string;
  romaji: string;
  kana: string;
}

export default function Kana({ kanaData = [] }: { kanaData: KanaCharacter[] }) {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
  
  const basicData = kanaData.filter(k => k.category === (activeTab === 'hiragana' ? 'hiragana' : 'katakana'));
  const dakutenData = kanaData.filter(k => k.category === (activeTab === 'hiragana' ? 'dakuten' : 'katakana-dakuten'));
  const yoonData = kanaData.filter(k => k.category === (activeTab === 'hiragana' ? 'yoon' : 'katakana-yoon'));

  const renderGrid = (data: KanaCharacter[], cols: number = 5) => (
    <div className={`grid ${cols === 3 ? 'grid-cols-3 sm:grid-cols-6 md:grid-cols-9' : 'grid-cols-5 md:grid-cols-10'} gap-2 sm:gap-3 lg:gap-4`}>
      {data.map((item, index) => (
        <div 
          key={index} 
          className={`h-16 sm:h-20 lg:h-24 rounded-xl lg:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
            item.kana 
              ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[var(--color-sakura)]' 
              : 'bg-[var(--color-washi)]/50 opacity-60 border border-[#E5E5E5]/50'
          }`}
        >
          {item.kana ? (
            <>
              <span className="font-jp text-2xl sm:text-3xl lg:text-4xl text-[var(--color-ink)] mb-0.5 lg:mb-1 block text-center leading-none">{item.kana}</span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-[var(--color-ink-light)] font-medium text-center">{item.romaji}</span>
            </>
          ) : (
            <span className="text-lg lg:text-2xl text-[#d0d0d0]">-</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-12"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E5E5E5] pb-6">
        <div className="space-y-4">
          <h1 className="font-serif text-4xl font-light">Tabel Kana</h1>
          <p className="text-[var(--color-ink-light)] max-w-lg leading-relaxed text-sm">
            Dalam bahasa Jepang modern, huruf untuk <i>yi, ye, wi, wu,</i> dan <i>we</i> sudah tidak digunakan lagi, 
            sehingga bagian halamannya dibiarkan kosong agar susunan strukturnya (kolom A-I-U-E-O) tetap sejajar dan rapi dibaca.
          </p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-full shadow-sm border border-[#E5E5E5] shrink-0">
          <button
            onClick={() => setActiveTab('hiragana')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'hiragana' 
                ? 'bg-[var(--color-japan-red)] text-white' 
                : 'text-[var(--color-ink-light)] hover:bg-[var(--color-washi)]'
            }`}
          >
            Hiragana
          </button>
          <button
            onClick={() => setActiveTab('katakana')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'katakana' 
                ? 'bg-[var(--color-japan-red)] text-white' 
                : 'text-[var(--color-ink-light)] hover:bg-[var(--color-washi)]'
            }`}
          >
            Katakana
          </button>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-medium">Bentuk Dasar (Gojūon)</h2>
        {renderGrid(basicData)}
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-medium">Tanda Titik & Lingkaran (Dakuten & Handakuten)</h2>
        <p className="text-sm text-[var(--color-ink-light)] -mt-4">Huruf dasar yang ditambahkan titik dua/tanda kutip (") menjadi suara keruh, atau lingkaran kecil (°) menjadi suara p.</p>
        {renderGrid(dakutenData)}
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-medium">Huruf Gabungan (Yōon)</h2>
        <p className="text-sm text-[var(--color-ink-light)] -mt-4">Dibuat dengan menambahkan ya, yu, dan yo yang ditulis lebih kecil.</p>
        {renderGrid(yoonData, 3)}
      </section>
    </motion.div>
  );
}

Kana.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
