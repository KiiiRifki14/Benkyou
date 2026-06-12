import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, PenTool, Languages, CheckCircle, GraduationCap, ArrowRight, Star, Heart, Cat, Sparkles, Volume2, ChevronDown, Zap, Trophy, Users, Play } from 'lucide-react';

// ── Custom hook: fade-in when element enters viewport ──────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ── Reusable animated section wrapper ──────────────────────────────────────
function RevealSection({ children, delay = 0, className = '', direction = 'up' }) {
  const [ref, visible] = useReveal();
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ── Floating kanji particle ────────────────────────────────────────────────
function FloatingKanji({ char, style }) {
  return (
    <motion.span
      className="absolute font-jp font-bold select-none pointer-events-none opacity-[0.06] text-[var(--color-ink)]"
      style={style}
      animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {char}
    </motion.span>
  );
}

export default function Welcome({ auth }) {
  const [flippedCard, setFlippedCard] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const heroRef = useRef(null);

  // Parallax for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-cycle testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(prev => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const features = [
    {
      title: 'Kana (Hiragana & Katakana)',
      desc: 'Pondasi utama membaca tulisan Jepang. Dilengkapi panduan coretan dan cara baca yang tepat.',
      icon: PenTool,
      kanji: 'あ',
      color: 'text-[var(--color-sakura-dark)] bg-[var(--color-sakura)]/20 border-[var(--color-sakura)]',
      accentColor: 'var(--color-sakura-dark)',
    },
    {
      title: 'Kanji Master N5 - N1',
      desc: 'Kuasai ribuan karakter Kanji dengan metode mnemonik, radikal, Onyomi, dan Kunyomi secara terstruktur.',
      icon: Languages,
      kanji: '漢',
      color: 'text-amber-700 bg-amber-100 border-amber-300',
      accentColor: '#b45309',
    },
    {
      title: 'Tata Bahasa & Kosakata',
      desc: 'Modul komprehensif dengan contoh kalimat aplikatif dalam kehidupan sehari-hari di Jepang.',
      icon: BookOpen,
      kanji: '語',
      color: 'text-blue-700 bg-blue-100 border-blue-300',
      accentColor: '#1d4ed8',
    },
    {
      title: 'Simulasi Sertifikasi JLPT',
      desc: 'Uji kemampuanmu dengan sistem ujian interaktif berbatas waktu untuk meraih sertifikat kelulusan.',
      icon: GraduationCap,
      kanji: '験',
      color: 'text-[var(--color-japan-red)] bg-[var(--color-japan-red)]/10 border-[var(--color-japan-red)]/30',
      accentColor: 'var(--color-japan-red)',
    },
  ];

  const testimonials = [
    {
      name: 'Kenji Pratama',
      role: 'Lulus N3 JLPT',
      content: 'Tampilan webnya sangat premium dan bersih! Belajar Kanji yang biasanya membosankan jadi sangat seru karena ada kuis interaktifnya.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji',
    },
    {
      name: 'Aiko Maharani',
      role: 'Mahasiswa Sastra Jepang',
      content: 'Suka banget sama tema desain washi papernya. Terasa seperti membaca buku teks Jepang eksklusif. Fitur sertifikasinya juga sangat memotivasi!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiko',
    },
    {
      name: 'Bima Sakti',
      role: 'Pekerja Magang di Tokyo',
      content: 'Sangat terbantu dengan modul tata bahasa dan kosakatanya yang praktis. Dasbor adminnya juga rapi untuk memantau progres belajar harian.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bima',
    },
  ];

  const stats = [
    { value: 12500, suffix: '+', label: 'Pelajar Aktif', icon: Users },
    { value: 98, suffix: '%', label: 'Tingkat Kepuasan', icon: Trophy },
    { value: 4800, suffix: '+', label: 'Karakter Kanji', icon: Zap },
  ];

  const kanjiAccents = [
    { char: '日', style: { top: '10%', left: '5%', fontSize: '8rem' } },
    { char: '本', style: { top: '60%', right: '3%', fontSize: '10rem' } },
    { char: '語', style: { bottom: '15%', left: '8%', fontSize: '6rem' } },
    { char: '学', style: { top: '30%', right: '10%', fontSize: '7rem' } },
  ];

  return (
    <>
      <Head title="Benkyou - Platform Belajar Bahasa Jepang Premium" />

      <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-japan-red)] selection:text-white relative overflow-hidden">

        {/* ── Ambient background blobs ── */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[var(--color-sakura)]/15 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40 z-0" />
        <div className="fixed bottom-1/3 left-0 w-[500px] h-[500px] bg-[var(--color-matcha)]/10 rounded-full blur-[100px] pointer-events-none -ml-32 z-0" />
        <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-200/10 rounded-full blur-[100px] pointer-events-none z-0" />

        {/* ── Floating Kanji Particles (background) ── */}
        {kanjiAccents.map((k, i) => <FloatingKanji key={i} {...k} />)}

        {/* ════════════════════════════════════════════
            NAVIGATION
        ════════════════════════════════════════════ */}
        <motion.header
          className={`sticky top-0 z-50 transition-all duration-300 px-6 py-4 ${
            navScrolled
              ? 'backdrop-blur-xl bg-[var(--color-washi)]/90 border-b border-[#E5E5E5] shadow-sm'
              : 'bg-transparent'
          }`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-md"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                日
              </motion.div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl leading-tight group-hover:text-[var(--color-japan-red)] transition-colors duration-300">
                  Benkyou
                </h1>
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Cat className="text-[var(--color-japan-red)] opacity-80" size={22} />
                </motion.div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-ink-light)]">
              {['#fitur', '#demo', '#testimoni'].map((href, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className="relative hover:text-[var(--color-ink)] transition-colors group"
                  whileHover={{ y: -1 }}
                >
                  {['Modul Belajar', 'Demo Interaktif', 'Kata Mereka'][i]}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[var(--color-japan-red)] group-hover:w-full transition-all duration-300 rounded-full" />
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {auth?.user ? (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/dashboard"
                    className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:opacity-90 transition-all shadow-md flex items-center gap-2"
                  >
                    Dasbor Belajar <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/login" className="px-5 py-2 rounded-full text-[var(--color-ink)] text-sm font-bold hover:bg-black/5 transition-colors">
                      Masuk
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/register"
                      className="px-6 py-2 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:opacity-90 transition-all shadow-md flex items-center gap-2"
                    >
                      Mulai Belajar <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </motion.header>

        {/* ════════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative pt-16 pb-28 md:pt-24 md:pb-40 px-6 max-w-7xl mx-auto text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="space-y-8 max-w-4xl mx-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold uppercase tracking-widest text-[var(--color-japan-red)] shadow-sm"
            >
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <Sparkles size={14} />
              </motion.div>
              Platform Pembelajaran Generasi Baru
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-[var(--color-ink)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Kuasai Bahasa Jepang{' '}
              <span className="font-bold block md:inline relative">
                dengan{' '}
                <span className="text-[var(--color-japan-red)] relative">
                  Estetika Premium
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-[var(--color-japan-red)]/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-[var(--color-ink-light)] max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Platform interaktif bergaya khas Jepang yang dirancang khusus untuk memanjakan mata sekaligus mempercepat pemahaman Anda dari level dasar (N5) hingga mahir (N1).
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={auth?.user ? '/dashboard' : '/register'}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base shadow-lg flex items-center justify-center gap-3 group"
                  style={{ boxShadow: '0 8px 30px rgba(188, 0, 45, 0.25)' }}
                >
                  Mulai Petualanganmu
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#demo"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#E5E5E5] text-[var(--color-ink)] font-bold text-base hover:bg-gray-50 hover:border-[var(--color-japan-red)]/30 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Play size={18} className="text-[var(--color-japan-red)]" /> Lihat Demo
                </a>
              </motion.div>
            </motion.div>

            {/* Kanji showcase cards */}
            <motion.div
              className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { char: '旅', reading: 'Tabi', meaning: 'Perjalanan', color: 'hover:border-[var(--color-sakura)] hover:shadow-[0_8px_20px_rgba(244,194,194,0.4)]' },
                { char: '学', reading: 'Manabu', meaning: 'Belajar', color: 'hover:border-amber-300 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)]' },
                { char: '美', reading: 'Bi', meaning: 'Keindahan', color: 'hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(147,197,253,0.3)]' },
                { char: '心', reading: 'Kokoro', meaning: 'Hati', color: 'hover:border-purple-300 hover:shadow-[0_8px_20px_rgba(196,181,253,0.3)]' },
              ].map((k, i) => (
                <motion.div
                  key={k.char}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className={`p-5 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col items-center cursor-default transition-all duration-300 ${k.color}`}
                >
                  <span className="text-3xl font-jp font-bold text-[var(--color-ink)]">{k.char}</span>
                  <span className="text-[10px] text-[var(--color-japan-red)] mt-1.5 font-bold tracking-widest uppercase font-mono">{k.reading}</span>
                  <span className="text-[10px] text-[var(--color-ink-light)] font-mono">{k.meaning}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              className="flex flex-col items-center gap-2 pt-4 text-[var(--color-ink-light)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-xs font-medium tracking-widest uppercase">Gulir ke bawah</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════
            STATS SECTION
        ════════════════════════════════════════════ */}
        <section className="py-12 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <RevealSection>
              <div className="grid grid-cols-3 gap-4 p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-lg">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      className="flex flex-col items-center text-center p-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-2xl bg-[var(--color-japan-red)]/10 flex items-center justify-center mb-3"
                        whileHover={{ rotate: 10 }}
                      >
                        <Icon size={20} className="text-[var(--color-japan-red)]" />
                      </motion.div>
                      <span className="font-serif text-3xl font-bold text-[var(--color-ink)]">
                        <AnimatedCounter target={s.value} suffix={s.suffix} />
                      </span>
                      <span className="text-xs text-[var(--color-ink-light)] mt-1 font-medium">{s.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FEATURES SECTION
        ════════════════════════════════════════════ */}
        <section id="fitur" className="py-24 bg-white border-y border-[#E5E5E5] px-6 relative z-10">
          <div className="max-w-7xl mx-auto space-y-16">
            <RevealSection className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-japan-red)]/10 text-[var(--color-japan-red)] text-xs font-bold uppercase tracking-widest">
                Modul Pembelajaran
              </div>
              <h2 className="font-serif text-4xl font-bold">Kurikulum Terstruktur & Mendalam</h2>
              <p className="text-[var(--color-ink-light)]">
                Setiap modul dirancang dengan cermat untuk memastikan pemahaman konsep yang kokoh dan retensi memori jangka panjang.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <RevealSection key={idx} delay={idx * 0.1} direction={idx % 2 === 0 ? 'left' : 'right'}>
                    <motion.div
                      className="p-8 rounded-3xl border border-[#E5E5E5] bg-[var(--color-washi)]/40 flex gap-6 items-start cursor-default relative overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ '--accent': feat.accentColor }}
                    >
                      {/* Hover shine */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 50%, ${feat.accentColor}08 0%, transparent 70%)` }}
                      />

                      <motion.div
                        className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-jp text-2xl font-bold shrink-0 shadow-sm ${feat.color}`}
                        whileHover={{ rotate: -8, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {feat.kanji}
                      </motion.div>
                      <div className="space-y-3 relative z-10">
                        <h3 className="font-serif text-2xl font-bold group-hover:text-[var(--color-japan-red)] transition-colors duration-300 flex items-center gap-2">
                          <Icon size={22} className="text-[var(--color-ink-light)] group-hover:text-[var(--color-japan-red)] transition-colors" />
                          {feat.title}
                        </h3>
                        <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{feat.desc}</p>
                        <motion.div
                          className="pt-2 flex items-center gap-1 text-xs font-bold text-[var(--color-ink)] group-hover:text-[var(--color-japan-red)] transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          Pelajari Modul <ArrowRight size={14} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </RevealSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            INTERACTIVE DEMO SECTION
        ════════════════════════════════════════════ */}
        <section id="demo" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-2xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">

            {/* Background kanji watermark */}
            <motion.div
              className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-[var(--color-washi)] font-jp font-bold text-[200px] pointer-events-none select-none"
              style={{ opacity: 0.5 }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              猫
            </motion.div>

            {/* Left column */}
            <RevealSection direction="right" className="space-y-6 z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-matcha)]/20 text-green-800 text-xs font-bold uppercase tracking-wider border border-[var(--color-matcha)]">
                Cobalah Sekarang
              </div>
              <h2 className="font-serif text-4xl font-bold leading-tight">Metode Kartu Pintar Interaktif</h2>
              <p className="text-[var(--color-ink-light)] leading-relaxed">
                Rasakan pengalaman belajar Kanji yang menyenangkan. Klik kartu di samping untuk membalik dan melihat arti, cara baca (Romaji), serta contoh penggunaannya.
              </p>
              <div className="space-y-3 pt-4">
                {[
                  'Dilengkapi Audio Pelafalan Asli',
                  'Ilustrasi Mnemonik Memudahkan Ingatan',
                  'Otomatis Menyimpan Riwayat Kuis',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                      <CheckCircle className="text-green-600 shrink-0" size={20} />
                    </motion.div>
                    {item}
                  </motion.div>
                ))}
              </div>
            </RevealSection>

            {/* Flip Card */}
            <RevealSection direction="left" className="flex items-center justify-center z-10">
              <div style={{ perspective: '1200px' }} className="w-full max-w-sm">
                <motion.div
                  onClick={() => setFlippedCard(!flippedCard)}
                  className="relative w-full h-80 cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: flippedCard ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-[var(--color-washi)] rounded-3xl border-2 border-[#E5E5E5] shadow-xl p-8 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-light)] bg-white px-3 py-1 rounded-full shadow-sm border border-[#E5E5E5]">
                        JLPT N5 • Kanji
                      </span>
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Volume2 className="text-[var(--color-japan-red)] opacity-60" size={24} />
                      </motion.div>
                    </div>
                    <div className="text-center my-auto space-y-4">
                      <motion.h3
                        className="text-8xl font-jp font-bold text-[var(--color-ink)]"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        猫
                      </motion.h3>
                      <motion.p
                        className="text-xs font-bold text-[var(--color-japan-red)] tracking-widest uppercase"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Klik untuk Membalik ↺
                      </motion.p>
                    </div>
                    <div className="text-center text-[10px] text-[var(--color-ink-light)] tracking-widest uppercase">
                      Kartu Pintar Benkyou
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-white rounded-3xl border-2 border-[var(--color-japan-red)]/30 shadow-xl p-8 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-japan-red)] bg-[var(--color-japan-red)]/10 px-3 py-1 rounded-full">
                        JLPT N5 • Kanji
                      </span>
                    </div>
                    <div className="text-center my-auto space-y-3">
                      <h4 className="text-4xl font-serif font-bold text-[var(--color-japan-red)]">Kucing</h4>
                      <div className="text-lg font-mono font-medium text-gray-700">neko • ねこ</div>
                      <div className="text-sm text-[var(--color-ink-light)] bg-[var(--color-washi)] rounded-2xl px-4 py-3 mt-3">
                        Contoh: <span className="font-jp font-bold text-[var(--color-ink)]">白い猫</span>
                        <br />
                        <span className="text-xs italic">(shiroi neko) — Kucing putih</span>
                      </div>
                    </div>
                    <div className="text-center text-[10px] text-[var(--color-ink-light)] tracking-widest uppercase">
                      Klik lagi untuk kembali ↺
                    </div>
                  </div>
                </motion.div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TESTIMONIALS SECTION
        ════════════════════════════════════════════ */}
        <section id="testimoni" className="py-24 bg-white border-t border-[#E5E5E5] px-6 relative z-10">
          <div className="max-w-7xl mx-auto space-y-16">
            <RevealSection className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest border border-amber-200">
                ★ Kata Mereka
              </div>
              <h2 className="font-serif text-4xl font-bold">Kisah Sukses Pejuang JLPT</h2>
              <p className="text-[var(--color-ink-light)]">Ribuan pelajar telah membuktikan keefektifan metode belajar Benkyou.</p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testi, idx) => (
                <RevealSection key={idx} delay={idx * 0.12}>
                  <motion.div
                    className="p-8 rounded-3xl border border-[#E5E5E5] bg-[var(--color-washi)]/30 flex flex-col justify-between space-y-6 h-full"
                    whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + i * 0.06 }}
                          >
                            <Star size={16} className="text-amber-400" fill="currentColor" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-sm text-[var(--color-ink)] leading-relaxed italic">"{testi.content}"</p>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
                      <motion.img
                        src={testi.avatar}
                        alt={testi.name}
                        className="w-12 h-12 rounded-full bg-gray-100 border-2 border-[#E5E5E5]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[var(--color-ink)]">{testi.name}</h4>
                        <p className="text-xs text-[var(--color-japan-red)] font-medium">{testi.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CALL TO ACTION SECTION
        ════════════════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
          <RevealSection>
            <div className="p-12 md:p-20 rounded-3xl bg-[var(--color-ink)] text-white space-y-8 relative overflow-hidden shadow-2xl">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] font-jp font-bold text-[220px] pointer-events-none select-none leading-none">
                日本
              </div>
              <motion.div
                className="absolute -bottom-20 -left-20 w-96 h-96 bg-[var(--color-japan-red)]/20 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center">
                <RevealSection>
                  <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight">
                    Siap Memulai Perjalanan{' '}
                    <span className="font-bold text-[var(--color-sakura)]">Bahasa Jepangmu?</span>
                  </h2>
                </RevealSection>
                <RevealSection delay={0.15}>
                  <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Bergabunglah sekarang dan rasakan kemudahan belajar dengan antarmuka premium, kuis harian interaktif, dan pelacakan progres otomatis.
                  </p>
                </RevealSection>
                <RevealSection delay={0.25}>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href={auth?.user ? '/dashboard' : '/register'}
                        className="px-8 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base flex items-center justify-center gap-2"
                        style={{ boxShadow: '0 8px 30px rgba(188, 0, 45, 0.4)' }}
                      >
                        Daftar Gratis Sekarang <ArrowRight size={20} />
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/login"
                        className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center"
                      >
                        Masuk ke Akun
                      </Link>
                    </motion.div>
                  </div>
                </RevealSection>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════ */}
        <footer className="bg-white border-t border-[#E5E5E5] py-12 px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <motion.div
              className="flex items-center gap-3 justify-center md:justify-start"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-base shadow-sm">
                日
              </div>
              <span className="font-serif font-bold text-lg">Benkyou</span>
              <Cat size={18} className="text-[var(--color-japan-red)] opacity-70" />
            </motion.div>

            <p className="text-xs text-[var(--color-ink-light)] flex items-center justify-center gap-1.5">
              Dibuat dengan{' '}
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Heart size={14} className="text-[var(--color-japan-red)]" fill="currentColor" />
              </motion.span>{' '}
              untuk pembelajar Bahasa Jepang di seluruh Indonesia. © 2026.
            </p>

            <div className="flex gap-6 text-xs font-bold text-[var(--color-ink-light)] justify-center">
              {[
                { href: '/login', label: 'Masuk' },
                { href: '/register', label: 'Daftar' },
                { href: '/home', label: 'Dasbor' },
              ].map(link => (
                <motion.div key={link.href} whileHover={{ y: -2 }}>
                  <Link href={link.href} className="hover:text-[var(--color-japan-red)] transition-colors">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
