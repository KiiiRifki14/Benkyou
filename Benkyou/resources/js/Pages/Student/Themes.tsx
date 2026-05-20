import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Palette, Lock, CheckCircle2, Cat } from 'lucide-react';
import { certificationCategories } from '../../data/certification';
import Layout from '@/Components/Layout';

export const THEMES = {
  default: { id: 'default', name: 'Original (Klasik)', props: { '--color-washi': '#F5F2EB', '--color-ink': '#1C1C1C', '--color-ink-light': '#4A4A4A', '--color-japan-red': '#BE0029', '--color-sakura': '#FFB7C5', '--color-matcha': '#C5E1A5' } },
  sakura: { id: 'sakura', name: 'Mekar Sakura (N5)', props: { '--color-washi': '#FFF0F5', '--color-ink': '#2D1B2E', '--color-ink-light': '#5A465B', '--color-japan-red': '#D87093', '--color-sakura': '#FFB7C5', '--color-matcha': '#C5E1A5' } },
  matcha: { id: 'matcha', name: 'Hijau Matcha (N4)', props: { '--color-washi': '#F1F8E9', '--color-ink': '#1B2E1C', '--color-ink-light': '#465B47', '--color-japan-red': '#689F38', '--color-sakura': '#FFB7C5', '--color-matcha': '#AED581' } },
  fuji: { id: 'fuji', name: 'Gunung Fuji (N3)', props: { '--color-washi': '#E3F2FD', '--color-ink': '#0D47A1', '--color-ink-light': '#42A5F5', '--color-japan-red': '#1565C0', '--color-sakura': '#BBDEFB', '--color-matcha': '#81D4FA' } },
  autumn: { id: 'autumn', name: 'Musim Gugur (N2)', props: { '--color-washi': '#FFF3E0', '--color-ink': '#3E2723', '--color-ink-light': '#795548', '--color-japan-red': '#E64A19', '--color-sakura': '#FFCC80', '--color-matcha': '#FFAB91' } },
  midnight: { id: 'midnight', name: 'Malam Tokyo (N1)', props: { '--color-washi': '#1F2229', '--color-ink': '#FFFFFF', '--color-ink-light': '#B3B3B3', '--color-japan-red': '#BB86FC', '--color-sakura': '#CE93D8', '--color-matcha': '#90CAF9' } }
};

export const applyTheme = (themeId: string) => {
  const root = document.documentElement;
  // @ts-ignore
  const t = THEMES[themeId] || THEMES.default;
  Object.entries(t.props).forEach(([key, value]) => {
    root.style.setProperty(key, value as string);
  });
  localStorage.setItem('benkyou_theme', themeId);
};

import { usePage } from '@inertiajs/react';

export default function Themes() {
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const [activeTheme, setActiveTheme] = useState('default');
  const [unlocked, setUnlocked] = useState<string[]>(['default']);

  useEffect(() => {
    const savedTheme = localStorage.getItem('benkyou_theme') || 'default';
    setActiveTheme(savedTheme);

    if (user?.role === 'admin') {
      setUnlocked(Object.keys(THEMES));
      return;
    }

    let unlockedKeys = ['default'];
    let progress: Record<string, number[]> = {n5:[1],n4:[1],n3:[1],n2:[1],n1:[1]};
    try {
      progress = JSON.parse(localStorage.getItem('unlockedCertificationLevels') || '{"n5":[1],"n4":[1],"n3":[1],"n2":[1],"n1":[1]}');
    } catch (e) {
      console.error('Failed to parse progress from local storage:', e);
    }
    
    certificationCategories.forEach(cat => {
      const catProgress = progress[cat.id] || [];
      // Theme unlocks when you finish the final level (its ID + 1 gets added to progress array length)
      if (catProgress.includes(cat.levels.length + 1)) {
        if (cat.id === 'n5') unlockedKeys.push('sakura');
        if (cat.id === 'n4') unlockedKeys.push('matcha');
        if (cat.id === 'n3') unlockedKeys.push('fuji');
        if (cat.id === 'n2') unlockedKeys.push('autumn');
        if (cat.id === 'n1') unlockedKeys.push('midnight');
      }
    });
    setUnlocked(unlockedKeys);
  }, [user]);

  const handleSelectTheme = (themeId: string) => {
    if (unlocked.includes(themeId)) {
      setActiveTheme(themeId);
      applyTheme(themeId);
    }
  };

  const getThemeLevelText = (id: string) => {
    switch (id) {
      case 'sakura': return 'Selesaikan Sertifikasi N5 untuk membuka tema ini.';
      case 'matcha': return 'Selesaikan Sertifikasi N4 untuk membuka tema ini.';
      case 'fuji': return 'Selesaikan Sertifikasi N3 untuk membuka tema ini.';
      case 'autumn': return 'Selesaikan Sertifikasi N2 untuk membuka tema ini.';
      case 'midnight': return 'Selesaikan Sertifikasi N1 untuk membuka tema ini.';
      default: return 'Tersedia sejak awal.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 pb-12 px-2 sm:px-4"
    >
      <header className="text-center space-y-4 mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-[var(--color-ink)] flex items-center justify-center gap-3">
          <Palette className="text-[var(--color-japan-red)]" size={32} />
          Tema Aplikasi
        </h1>
        <p className="text-[var(--color-ink-light)] text-sm sm:text-base">
          Sesuaikan tampilan aplikasi dengan tema-tema yang kamu dapatkan dengan menyelesaikan tingkatan sertifikasi.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(THEMES).map((theme) => {
          const isUnlocked = unlocked.includes(theme.id);
          const isActive = activeTheme === theme.id;
          
          return (
            <button
              key={theme.id}
              onClick={() => handleSelectTheme(theme.id)}
              disabled={!isUnlocked}
              className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col gap-4 ${
                isActive 
                  ? 'border-[var(--color-japan-red)] shadow-md bg-white' 
                  : isUnlocked 
                    ? 'border-[#E5E5E5] hover:border-black bg-white opacity-100 hover:shadow-md' 
                    : 'border-transparent bg-gray-100 opacity-60 cursor-not-allowed'
              }`}
            >
              <div 
                className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-md relative overflow-hidden" 
                style={{ backgroundColor: theme.props['--color-japan-red'] }}
              >
                {isActive ? <Cat size={32} /> : <Cat size={32} opacity={0.7} />}
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold mb-1 flex items-center gap-2">
                  {theme.name}
                  {!isUnlocked && <Lock size={16} className="text-gray-500" />}
                </h3>
                <p className="text-xs text-gray-500">{getThemeLevelText(theme.id)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

Themes.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
