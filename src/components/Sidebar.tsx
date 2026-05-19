import React from 'react';
import { BookOpen, Home, List, PenTool, CheckCircle, GraduationCap, Languages, Book, Palette, Cat } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

export default function Sidebar({ currentPage, setPage }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'kana', label: 'Kana', icon: PenTool },
    { id: 'kanji', label: 'Kanji', icon: Languages },
    { id: 'vocabulary', label: 'Kosakata', icon: List },
    { id: 'grammar', label: 'Tata Bahasa', icon: BookOpen },
    { id: 'quiz', label: 'Latihan Harian', icon: CheckCircle },
    { id: 'certification', label: 'Sertifikasi', icon: GraduationCap },
    { id: 'notes', label: 'Catatan Pribadi', icon: Book },
    { id: 'themes', label: 'Tema Aplikasi', icon: Palette },
  ];

  return (
    <>
      <div className="p-6 md:p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-sm shrink-0">
          日
        </div>
        <div className="shrink-0 flex items-center gap-4">
          <div>
            <h1 className="font-serif font-bold text-xl leading-tight">Nihongo</h1>
            <p className="text-xs text-[var(--color-ink-light)] tracking-widest uppercase">Journey</p>
          </div>
          <Cat className="text-[var(--color-japan-red)] opacity-80" size={24} />
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-[var(--color-washi)] text-[var(--color-japan-red)] shadow-sm'
                  : 'text-[var(--color-ink-light)] hover:bg-[var(--color-washi)] hover:text-[var(--color-ink)]'
              }`}
            >
              <Icon size={20} className={isActive ? 'stroke-2' : 'stroke-[1.5]'} />
              <span className="font-medium text-left truncate">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-japan-red)] shrink-0" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
