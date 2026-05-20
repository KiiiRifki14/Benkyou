import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { BookOpen, PenTool, Languages, CheckCircle, GraduationCap, ArrowRight, Star, Heart, Cat, Sparkles, Volume2 } from 'lucide-react';

export default function Welcome({ auth }) {
  const [flippedCard, setFlippedCard] = useState(false);

  const features = [
    {
      title: 'Kana (Hiragana & Katakana)',
      desc: 'Pondasi utama membaca tulisan Jepang. Dilengkapi panduan coretan dan cara baca yang tepat.',
      icon: PenTool,
      kanji: 'あ',
      color: 'text-[var(--color-sakura-dark)] bg-[var(--color-sakura)]/20 border-[var(--color-sakura)]'
    },
    {
      title: 'Kanji Master N5 - N1',
      desc: 'Kuasai ribuan karakter Kanji dengan metode mnemonik, radikal, Onyomi, dan Kunyomi secara terstruktur.',
      icon: Languages,
      kanji: '漢',
      color: 'text-amber-700 bg-amber-100 border-amber-300'
    },
    {
      title: 'Tata Bahasa & Kosakata',
      desc: 'Modul komprehensif dengan contoh kalimat aplikatif dalam kehidupan sehari-hari di Jepang.',
      icon: BookOpen,
      kanji: '語',
      color: 'text-blue-700 bg-blue-100 border-blue-300'
    },
    {
      title: 'Simulasi Sertifikasi JLPT',
      desc: 'Uji kemampuanmu dengan sistem ujian interaktif berbatas waktu untuk meraih sertifikat kelulusan.',
      icon: GraduationCap,
      kanji: '験',
      color: 'text-[var(--color-japan-red)] bg-[var(--color-japan-red)]/10 border-[var(--color-japan-red)]/30'
    },
  ];

  const testimonials = [
    {
      name: 'Kenji Pratama',
      role: 'Lulus N3 JLPT',
      content: 'Tampilan webnya sangat premium dan bersih! Belajar Kanji yang biasanya membosankan jadi sangat seru karena ada kuis interaktifnya.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji'
    },
    {
      name: 'Aiko Maharani',
      role: 'Mahasiswa Sastra Jepang',
      content: 'Suka banget sama tema desain washi papernya. Terasa seperti membaca buku teks Jepang eksklusif. Fitur sertifikasinya juga sangat memotivasi!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiko'
    },
    {
      name: 'Bima Sakti',
      role: 'Pekerja Magang di Tokyo',
      content: 'Sangat terbantu dengan modul tata bahasa dan kosakatanya yang praktis. Dasbor adminnya juga rapi untuk memantau progres belajar harian.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bima'
    },
  ];

  return (
    <>
      <Head title="Benkyou - Platform Belajar Bahasa Jepang Premium" />

      <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-japan-red)] selection:text-white relative overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-sakura)]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-[var(--color-matcha)]/20 rounded-full blur-3xl pointer-events-none -ml-20" />

        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-washi)]/80 border-b border-[#E5E5E5] px-6 py-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-sm group-hover:opacity-90 transition-opacity">
                日
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <h1 className="font-serif font-bold text-xl leading-tight group-hover:text-[var(--color-japan-red)] transition-colors">
                    Benkyou
                  </h1>
                </div>
                <Cat className="text-[var(--color-japan-red)] opacity-80 group-hover:scale-110 transition-transform" size={22} />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-ink-light)]">
              <a href="#fitur" className="hover:text-[var(--color-ink)] transition-colors">Modul Belajar</a>
              <a href="#demo" className="hover:text-[var(--color-ink)] transition-colors">Demo Interaktif</a>
              <a href="#testimoni" className="hover:text-[var(--color-ink)] transition-colors">Kata Mereka</a>
            </nav>

            <div className="flex items-center gap-3">
              {auth?.user ? (
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:opacity-90 transition-all shadow-md hover:shadow-[var(--color-japan-red)]/20 flex items-center gap-2"
                >
                  Dasbor Belajar <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-full text-[var(--color-ink)] text-sm font-bold hover:bg-black/5 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:opacity-90 transition-all shadow-md hover:shadow-[var(--color-japan-red)]/20 flex items-center gap-2"
                  >
                    Mulai Belajar <ArrowRight size={16} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-6 max-w-7xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold uppercase tracking-widest text-[var(--color-japan-red)] shadow-sm">
              <Sparkles size={14} /> Platform Pembelajaran Generasi Baru
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-[var(--color-ink)]">
              Kuasai Bahasa Jepang dengan <span className="font-bold block md:inline text-[var(--color-japan-red)]">Estetika Premium</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-ink-light)] max-w-2xl mx-auto leading-relaxed">
              Platform interaktif bergaya khas Jepang yang dirancang khusus untuk memanjakan mata sekaligus mempercepat pemahaman Anda dari level dasar (N5) hingga mahir (N1).
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={auth?.user ? "/dashboard" : "/register"}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-[var(--color-japan-red)]/30 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                Mulai Petualanganmu <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <a
                href="#fitur"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#E5E5E5] text-[var(--color-ink)] font-bold text-base hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Jelajahi Modul
              </a>
            </div>

            {/* Floating Kanji Accents */}
            <div className="pt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto opacity-80">
              <div className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col items-center hover:border-[var(--color-sakura)] transition-colors">
                <span className="text-3xl font-jp font-bold text-[var(--color-japan-red)]">旅</span>
                <span className="text-xs text-[var(--color-ink-light)] mt-2 font-mono">Tabi (Perjalanan)</span>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col items-center hover:border-[var(--color-matcha)] transition-colors">
                <span className="text-3xl font-jp font-bold text-amber-600">学</span>
                <span className="text-xs text-[var(--color-ink-light)] mt-2 font-mono">Manabu (Belajar)</span>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col items-center hover:border-blue-300 transition-colors">
                <span className="text-3xl font-jp font-bold text-blue-600">美</span>
                <span className="text-xs text-[var(--color-ink-light)] mt-2 font-mono">Bi (Keindahan)</span>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col items-center hover:border-purple-300 transition-colors">
                <span className="text-3xl font-jp font-bold text-purple-600">心</span>
                <span className="text-xs text-[var(--color-ink-light)] mt-2 font-mono">Kokoro (Hati)</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-20 bg-white border-y border-[#E5E5E5] px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl font-bold">Kurikulum Terstruktur & Mendalam</h2>
              <p className="text-[var(--color-ink-light)]">Setiap modul dirancang dengan cermat untuk memastikan pemahaman konsep yang kokoh dan retensi memori jangka panjang.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-8 rounded-3xl border border-[#E5E5E5] bg-[var(--color-washi)]/30 hover:bg-white hover:shadow-xl transition-all duration-300 group flex gap-6 items-start">
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-jp text-2xl font-bold shrink-0 shadow-sm ${feat.color}`}>
                      {feat.kanji}
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl font-bold group-hover:text-[var(--color-japan-red)] transition-colors flex items-center gap-2">
                        <Icon size={22} className="text-[var(--color-ink-light)] group-hover:text-[var(--color-japan-red)] transition-colors" /> {feat.title}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">
                        {feat.desc}
                      </p>
                      <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[var(--color-ink)] group-hover:text-[var(--color-japan-red)] transition-colors">
                        Pelajari Modul <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-2xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
            <div className="space-y-6 z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-matcha)]/20 text-green-800 text-xs font-bold uppercase tracking-wider border border-[var(--color-matcha)]">
                Cobalah Sekarang
              </div>
              <h2 className="font-serif text-4xl font-bold leading-tight">Metode Kartu Pintar Interaktif</h2>
              <p className="text-[var(--color-ink-light)] leading-relaxed">
                Rasakan pengalaman belajar Kanji yang menyenangkan. Klik kartu di samping untuk membalik dan melihat arti, cara baca (Romaji), serta contoh penggunaannya.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle className="text-green-600" size={20} /> Dilengkapi Audio Pelafalan Asli
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle className="text-green-600" size={20} /> Ilustrasi Mnemonik Memudahkan Ingatan
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle className="text-green-600" size={20} /> Otomatis Menyimpan Riwayat Kuis
                </div>
              </div>
            </div>

            {/* Interactive Flip Card */}
            <div className="flex items-center justify-center z-10">
              <div 
                onClick={() => setFlippedCard(!flippedCard)}
                className="w-full max-w-sm h-80 bg-[var(--color-washi)] rounded-3xl border-2 border-[#E5E5E5] shadow-lg hover:border-[var(--color-japan-red)] transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between relative group transform perspective-1000"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-light)] bg-white px-3 py-1 rounded-full shadow-sm border border-[#E5E5E5]">
                    JLPT N5 • Kanji
                  </span>
                  <Volume2 className="text-[var(--color-japan-red)] opacity-60 group-hover:opacity-100 transition-opacity" size={24} />
                </div>

                <div className="text-center my-auto space-y-4">
                  {!flippedCard ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <h3 className="text-7xl font-jp font-bold text-[var(--color-ink)] mb-4">猫</h3>
                      <p className="text-sm font-bold text-[var(--color-japan-red)] tracking-widest uppercase animate-pulse">Klik untuk Membalik Kartu</p>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-3">
                      <h4 className="text-3xl font-serif font-bold text-[var(--color-japan-red)]">Kucing</h4>
                      <div className="text-lg font-mono font-medium text-gray-700">neko • ねこ</div>
                      <p className="text-xs text-[var(--color-ink-light)] border-t border-[#E5E5E5] pt-3 mt-2">
                        Contoh: <span className="font-jp font-bold text-[var(--color-ink)]">白い猫</span> (shiroi neko) - Kucing putih
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="text-center text-[10px] text-[var(--color-ink-light)] tracking-widest uppercase">
                  Kartu Pintar Benkyou
                </div>
              </div>
            </div>

            {/* Decorative watermark */}
            <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-[var(--color-washi)] opacity-40 font-jp font-bold text-[200px] pointer-events-none select-none">
              猫
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimoni" className="py-20 bg-white border-t border-[#E5E5E5] px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl font-bold">Kisah Sukses Pejuang JLPT</h2>
              <p className="text-[var(--color-ink-light)]">Ribuan pelajar telah membuktikan keefektifan metode belajar Benkyou.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testi, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-[#E5E5E5] bg-[var(--color-washi)]/20 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-[var(--color-ink)] leading-relaxed italic">
                      "{testi.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
                    <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full bg-gray-100 border border-[#E5E5E5]" />
                    <div>
                      <h4 className="font-bold text-sm text-[var(--color-ink)]">{testi.name}</h4>
                      <p className="text-xs text-[var(--color-japan-red)] font-medium">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
          <div className="p-12 md:p-20 rounded-3xl bg-[var(--color-ink)] text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 font-jp font-bold text-[180px] pointer-events-none select-none">
              日本
            </div>

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight">
                Siap Memulai Perjalanan Bahasa Jepangmu?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Bergabunglah sekarang dan rasakan kemudahan belajar dengan antarmuka premium, kuis harian interaktif, dan pelacakan progres otomatis.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={auth?.user ? "/dashboard" : "/register"}
                  className="px-8 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-[var(--color-japan-red)]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Daftar Gratis Sekarang <ArrowRight size={20} />
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  Masuk ke Akun
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-[#E5E5E5] py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-base shadow-sm">
                日
              </div>
              <span className="font-serif font-bold text-lg">Benkyou</span>
            </div>

            <p className="text-xs text-[var(--color-ink-light)] flex items-center justify-center gap-1.5">
              Dibuat dengan <Heart size={14} className="text-[var(--color-japan-red)]" fill="currentColor" /> untuk pembelajar Bahasa Jepang di seluruh dunia. © 2026.
            </p>

            <div className="flex gap-6 text-xs font-bold text-[var(--color-ink-light)] justify-center">
              <Link href="/login" className="hover:text-[var(--color-japan-red)] transition-colors">Masuk</Link>
              <Link href="/register" className="hover:text-[var(--color-japan-red)] transition-colors">Daftar</Link>
              <Link href="/home" className="hover:text-[var(--color-japan-red)] transition-colors">Dasbor</Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
