import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  PenTool, 
  Languages, 
  GraduationCap, 
  ArrowRight, 
  Star, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  FileText, 
  Compass, 
  Award, 
  ShieldCheck,
  Check,
  MapPin,
  Phone,
  Calendar,
  X,
  ExternalLink,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export default function Welcome({ auth, landingSettings = {} }) {
  const [activeTab, setActiveTab] = useState('pemula');
  const [activeAspect, setActiveAspect] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const tabContents = {
    pemula: {
      name: landingSettings['tab1_name'] || 'Tingkat Pemula',
      title: landingSettings['tab1_title'] || 'Pondasi Kokoh Bahasa Jepang (N5 - N4)',
      subtitle: landingSettings['tab1_subtitle'] || 'Bangun rasa percaya diri dari coretan pertama.',
      desc1: landingSettings['tab1_desc1'] || 'Benkyou memperkenalkan keterampilan penting membaca dan menulis Kana (Hiragana & Katakana) serta tata bahasa dasar Jepang secara terstruktur. Metode ini memberikan fondasi yang sangat kuat sebelum siswa melangkah ke tingkat yang lebih rumit.',
      desc2: landingSettings['tab1_desc2'] || 'Program Pemula difokuskan pada penguasaan kosa kata praktis sehari-hari, cara membaca yang tepat dengan panduan audio, serta pengenalan huruf Kanji dasar. Dengan lembar kuis yang dirancang khusus, belajar terasa menyenangkan dan tidak membebani.',
      badge: 'Level Pemula',
      stats: landingSettings['tab1_stats'] || '120 Kanji • 800 Kosakata • 40 Modul Dasar'
    },
    menengah: {
      name: landingSettings['tab2_name'] || 'Tingkat Menengah',
      title: landingSettings['tab2_title'] || 'Kemandirian & Pemecahan Masalah (N3)',
      subtitle: landingSettings['tab2_subtitle'] || 'Mulai memahami bacaan dan percakapan kompleks.',
      desc1: landingSettings['tab2_desc1'] || 'Pada tingkat ini, siswa diajak untuk membaca teks yang lebih panjang dan memahami tata bahasa tingkat menengah. Benkyou melatih siswa agar mampu menganalisis kalimat secara mandiri dan memperluas perbendaharaan Kanji mereka.',
      desc2: landingSettings['tab2_desc2'] || 'Siswa dibekali dengan modul latihan membaca mandiri yang dinamis. Kemampuan berpikir kritis dalam menyusun struktur kalimat akan berkembang pesat, mempersiapkan mereka untuk studi lanjutan maupun kebutuhan dunia kerja profesional.',
      badge: 'Level Menengah',
      stats: landingSettings['tab2_stats'] || '650 Kanji • 3,500 Kosakata • 60 Modul Menengah'
    },
    lanjut: {
      name: landingSettings['tab3_name'] || 'Tingkat Lanjutan',
      title: landingSettings['tab3_title'] || 'Kefasihan Tingkat Tinggi & Profesional (N2 - N1)',
      subtitle: landingSettings['tab3_subtitle'] || 'Kuasai bahasa Jepang tingkat bisnis dan akademis.',
      desc1: landingSettings['tab3_desc1'] || 'Program Lanjutan dirancang untuk mengantarkan siswa pada tingkat kefasihan penuh. Siswa akan mempelajari ribuan Kanji tingkat lanjut, idiom, serta tata bahasa kompleks yang digunakan dalam berita, literatur, dan lingkungan kerja formal.',
      desc2: landingSettings['tab3_desc2'] || 'Melalui stimulasi ujian sertifikasi JLPT tiruan yang interaktif dan berbatas waktu, siswa dilatih untuk memiliki kecepatan dan akurasi tinggi dalam memahami wacana panjang serta audio percakapan bisnis penutur asli.',
      badge: 'Level Lanjutan',
      stats: landingSettings['tab3_stats'] || '2,000 Kanji • 10,000 Kosakata • 80 Ujian Simulasi'
    }
  };

  const programs = [
    {
      title: 'Matematika Kanji & Huruf',
      subtitle: 'Kana, Kanji & Cara Menulis',
      desc: 'Pelajari coretan huruf Hiragana, Katakana, dan ribuan Kanji dengan visualisasi mnemonik yang memudahkan ingatan.',
      link: '/register',
      colorFront: 'from-pink-500/10 to-red-500/5 text-[var(--color-japan-red)] border-red-200/60',
      colorBack: 'bg-[var(--color-japan-red)] text-white',
      badge: 'Menulis & Kanji',
      icon: <PenTool className="w-12 h-12" />
    },
    {
      title: 'Tata Bahasa (Grammar)',
      subtitle: 'Pola Kalimat & Konjugasi',
      desc: 'Pahami logika penyusunan kalimat bahasa Jepang secara mandiri melalui modul terstruktur dan contoh kasus kontekstual.',
      link: '/register',
      colorFront: 'from-emerald-500/10 to-teal-500/5 text-emerald-800 border-emerald-200/60',
      colorBack: 'bg-emerald-800 text-white',
      badge: 'Bunpou & Percakapan',
      icon: <Languages className="w-12 h-12" />
    },
    {
      title: 'Simulasi JLPT (Sertifikasi)',
      subtitle: 'Ujian Uji Coba N5 - N1',
      desc: 'Uji kesiapan akademik Anda dengan bank soal ujian kelulusan yang diperbarui secara berkala sesuai standar JLPT.',
      link: '/register',
      colorFront: 'from-blue-500/10 to-indigo-500/5 text-blue-800 border-blue-200/60',
      colorBack: 'bg-blue-800 text-white',
      badge: 'Kelulusan Sertifikasi',
      icon: <GraduationCap className="w-12 h-12" />
    }
  ];

  const aspects = [
    {
      title: 'Belajar pada Tingkat yang "Tepat"',
      desc: 'Siswa memulai pembelajaran dari level yang paling sesuai dengan kemampuan saat ini melalui tes diagnostik awal. Materi dirancang agar terasa mudah di awal untuk menumbuhkan rasa senang belajar dan memupuk rasa percaya diri yang tinggi.',
      points: ['Tes kemampuan awal gratis', 'Materi berjenjang (small steps)', 'Kemajuan disesuaikan kenyamanan anak'],
      bg: 'bg-rose-50 border-rose-100',
      icon: <Compass className="w-8 h-8 text-[var(--color-japan-red)]" />
    },
    {
      title: 'Belajar Mandiri (Self-Paced)',
      desc: 'Modul digital Benkyou dilengkapi dengan petunjuk visual dan contoh pengerjaan yang jelas. Siswa didorong untuk membaca contoh dan memecahkan soal secara mandiri, mengasah daya analisis dan problem-solving sejak dini.',
      points: ['Latihan mandiri kapan saja', 'Petunjuk pengerjaan yang intuitif', 'Membiasakan berpikir mandiri'],
      bg: 'bg-emerald-50 border-emerald-100',
      icon: <Award className="w-8 h-8 text-emerald-600" />
    },
    {
      title: 'Modul Belajar Terstruktur',
      desc: 'Kurikulum dikembangkan secara sistematis untuk menghubungkan setiap level dengan mulus. Setiap lembar modul fokus pada penguasaan satu topik kecil sebelum melangkah ke topik berikutnya, menghindari kejenuhan belajar.',
      points: ['Modul digital berstandar JLPT', 'Audio native speaker terintegrasi', 'Ribuan bank soal interaktif'],
      bg: 'bg-blue-50 border-blue-100',
      icon: <BookOpen className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Sistem Evaluasi Instan & Tutor',
      desc: 'Setiap latihan yang dikerjakan langsung dinilai secara otomatis oleh kecerdasan sistem Benkyou. Selain itu, tutor online berpengalaman siap memberikan review, umpan balik personal, dan bimbingan berkala.',
      points: ['Penilaian instan 100% akurat', 'Review kesalahan terperinci', 'Konsultasi berkala via dashboard'],
      bg: 'bg-amber-50 border-amber-100',
      icon: <ShieldCheck className="w-8 h-8 text-amber-600" />
    }
  ];

  const testimonials = [
    {
      name: 'Kenji Pratama',
      role: 'Siswa Tingkat Menengah',
      detail: 'Lulus JLPT N3 (17 Tahun)',
      avatar: 'KP',
      color: 'bg-blue-100 text-blue-800',
      quoteTitle: '"Tampilan modul Kanji di Benkyou sangat bersih dan premium. Belajar mandiri jadi jauh lebih mudah tanpa distraksi."',
      quoteText: 'Sebelum bergabung dengan Benkyou, saya kesulitan menghafal Kanji dan pola kalimat N3 yang rumit. Melalui metode belajar mandiri lembar kerja digital Benkyou, saya dilatih belajar konsisten setiap hari. Pembimbing online selalu memberikan evaluasi yang membangun sehingga saya bisa lulus JLPT N3 dalam waktu 8 bulan.'
    },
    {
      name: 'Aiko Maharani',
      role: 'Orang Tua Siswa',
      detail: 'Siswa Sastra Jepang Cilik (12 Tahun)',
      avatar: 'AM',
      color: 'bg-pink-100 text-pink-800',
      quoteTitle: '"Lembar kerja tata bahasanya ringkas, terstruktur, dengan kuis interaktif yang disukai anak."',
      quoteText: 'Metode mandiri Benkyou mengajarkan anak saya cara belajar yang aktif. Anak saya menjadi sangat disiplin dan suka membaca tulisan berbahasa Jepang. Belajar huruf hiragana dan katakana menjadi permainan yang menyenangkan baginya, dan sekarang dia sudah mulai belajar materi kanji dasar setingkat N5 secara antusias.'
    },
    {
      name: 'Bima Sakti',
      role: 'Pekerja Magang',
      detail: 'Pekerja Konstruksi di Tokyo (24 Tahun)',
      avatar: 'BS',
      color: 'bg-emerald-100 text-emerald-800',
      quoteTitle: '"Latihan simulasi ujian JLPT di Benkyou sangat melatih kecepatan pengerjaan soal saya."',
      quoteText: 'Benkyou benar-benar membantu saya mempersiapkan keberangkatan kerja ke Jepang. Bank soal simulasi JLPT interaktifnya dirancang dengan batas waktu persis seperti ujian asli, membuat saya terbiasa membaca cepat (dokkai) dan mendengar percakapan (choukai). Sangat merekomendasikan platform ini bagi pekerja migran!'
    },
    {
      name: 'Brandon James Wen',
      role: 'Orang Tua Siswa',
      detail: 'Membentuk Karakter Belajar Sejak Dini (8 Tahun)',
      avatar: 'BJ',
      color: 'bg-purple-100 text-purple-800',
      quoteTitle: '"Membentuk rutinitas belajar, kemandirian, dan tanggung jawab belajar bahasa sejak dini."',
      quoteText: 'Sebelum daftar Benkyou, Brandon belum memiliki kebiasaan belajar yang baik dan harus selalu diingatkan untuk belajar. Ketika sudah belajar di Benkyou, Brandon menjadi lebih pintar dalam pelajaran bahasa asing, mandiri, dan tanggung jawabnya terbentuk secara alami. Terima kasih Benkyou.'
    }
  ];

  const news = [
    {
      title: '⚠️ Waspada Penyalahgunaan Hak Kekayaan Intelektual Merek, Logo, Lembar Kerja dan Metode Benkyou',
      date: '22 Oktober 2025',
      type: 'PENTING'
    },
    {
      title: 'Anak Usia Berapa yang Bisa Ikut Pembelajaran Bahasa Jepang Benkyou?',
      date: '21 Oktober 2025',
      type: 'TIPS'
    },
    {
      title: 'Mengapa Anda Harus Mencoba Kelas Simulasi Gratis Benkyou Sekarang?',
      date: '10 Juli 2025',
      type: 'EVENT'
    }
  ];

  return (
    <>
      <Head>
        <title>Benkyou - Platform Belajar Bahasa Jepang Mandiri Premium</title>
        <meta name="description" content="Platform Belajar Bahasa Jepang Mandiri Premium untuk anak & dewasa di Indonesia. Tingkatkan kemampuan bahasa Jepang (N5 - N1) dengan metode Benkyou yang terstruktur." />
      </Head>

      <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-japan-red)] selection:text-white relative overflow-hidden">
        
        {/* Top Announcement Bar */}
        <div className="bg-[var(--color-ink)] text-white text-[11px] font-fredoka py-2 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-light tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} className="text-yellow-400" /> Platform Belajar Bahasa Jepang Mandiri Berstandar Premium
            </span>
            <div className="hidden sm:flex gap-5 items-center opacity-90">
              <a href="#kontak" className="hover:text-[var(--color-sakura)] transition-colors">Hubungi Kami</a>
              <span className="opacity-30">|</span>
              <a href="#manfaat" className="hover:text-[var(--color-sakura)] transition-colors">Tingkat Program</a>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-1 font-medium">🇯🇵 Benkyou Indonesia</span>
            </div>
          </div>
        </div>

        {/* Main Header / Navigation */}
        <header className="sticky top-0 z-40 bg-[var(--color-washi)]/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm px-6 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                日
              </div>
              <div>
                <h1 className="font-fredoka font-bold text-2xl tracking-tight text-[var(--color-ink)] leading-none">
                  Benkyou
                </h1>
                <p className="text-[10px] tracking-widest text-[var(--color-japan-red)] uppercase font-extrabold mt-0.5">Indonesia</p>
              </div>
            </Link>

            {/* Navigation links (Kumon Style) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-gray-700">
              <a href="#manfaat" className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200">Program & Manfaat</a>
              <a href="#metode" className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200">Metode Belajar</a>
              <a href="#modul" className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200">Program Benkyou</a>
              <a href="#testimoni" className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200">Kisah Siswa</a>
              <a href="#berita" className="hover:text-[var(--color-japan-red)] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-japan-red)] hover:after:w-full after:transition-all after:duration-200">Berita</a>
            </nav>

            {/* Auth CTA */}
            <div className="flex items-center gap-3">
              {auth?.user ? (
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-red-600/10 flex items-center gap-2"
                >
                  Dasbor Belajar <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 rounded-full bg-[var(--color-japan-red)] text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-red-600/15 flex items-center gap-1.5"
                  >
                    Daftar Sekarang <ChevronRight size={16} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#FDFBF7] via-[#f7f4ed] to-[#F1EDE2] border-b border-gray-200/80 overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[85dvh] lg:min-h-[90dvh] items-center relative pt-20 pb-16 lg:pt-12 lg:pb-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 px-6 sm:px-8 lg:px-16 py-6 lg:py-10 space-y-7 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-japan-red)]/10 text-[var(--color-japan-red)] text-[11px] font-extrabold uppercase tracking-widest border border-red-200/40">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-japan-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-japan-red)]"></span>
                </span>
                {landingSettings['hero_badge'] || 'Yuk Belajar Bareng!'}
              </div>
              
              <h2 
                className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-ink)] leading-[1.1]"
                dangerouslySetInnerHTML={{ 
                  __html: landingSettings['hero_title'] || 'Ayo mulai perjalanan bahasamu hari ini, <br /><span class="text-[var(--color-japan-red)] font-bold">buat kamu!</span>'
                }}
              />
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                {landingSettings['hero_subtitle'] || 'Temukan cara paling asyik dan santai buat belajar bahasa Jepang bareng aku.'}
              </p>
              
              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <Link
                  href={auth?.user ? "/dashboard" : "/register"}
                  className="px-8 py-3.5 rounded-full bg-[var(--color-japan-red)] text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/20 flex items-center gap-2 text-sm"
                >
                  {landingSettings['hero_cta_text'] || 'Mulai Belajar'} <ChevronRight size={18} />
                </Link>
                
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-white border border-gray-300 text-[var(--color-ink)] font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2 text-sm shadow-sm"
                >
                  <Play size={16} className="fill-[var(--color-japan-red)] text-[var(--color-japan-red)]" /> Tonton Video Intro
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200/80 flex items-center gap-3 text-xs text-gray-500 font-medium">
                <FileText size={16} className="text-[var(--color-japan-red)]" />
                <span>Unduh Buklet Panduan Belajar Mandiri Benkyou (PDF) • <a href="#" className="text-[var(--color-japan-red)] font-bold hover:underline">Unduh (5.4 MB)</a></span>
              </div>
            </div>

            {/* Right Banner Image Collage Column */}
            <div className="lg:col-span-6 h-full min-h-[360px] lg:min-h-[580px] w-full relative flex items-center justify-center p-6 lg:p-0">
              <div className="relative w-full max-w-[480px] h-[340px] lg:h-[420px] z-10">
                {/* Collage Layer 1: Background Shape */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-orange-100/60 rounded-3xl transform rotate-3 shadow-sm border border-orange-200/30" />
                
                {/* Collage Layer 2: Main Hero Image */}
                <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/50">
                  <img
                    src="/images/benkyou_hero.png"
                    alt="Benkyou Premium Japanese Learning"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Collage Layer 3: Overlapping Interactive Stat Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-bold">
                    🇯🇵
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Cocok Buat</p>
                    <p className="text-sm font-fredoka font-semibold text-green-800 mt-1">Pemula s/d Mahir</p>
                  </div>
                </div>

                {/* Collage Layer 4: Overlapping Info Badge */}
                <div className="absolute -top-4 -right-4 bg-[var(--color-japan-red)] text-white p-4 rounded-2xl shadow-xl border border-red-500/20 text-center">
                  <p className="text-xl font-bold font-fredoka leading-none">100%</p>
                  <p className="text-[9px] font-extrabold uppercase tracking-widest mt-1 opacity-90">Digital Mandiri</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section: Program & Manfaatnya (Kumon-style Overlapping Tabs) */}
        <section id="manfaat" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
              {landingSettings['program_title'] || 'Program & Manfaatnya'}
            </h2>
            <div className="under-heading-wave" />
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
              {landingSettings['program_subtitle'] || 'Metode Benkyou dirancang untuk membimbing siswa belajar pada tingkatan yang paling tepat berdasarkan kemampuan masing-masing.'}
            </p>
          </div>

          {/* Navigation Tabs (Kumon design style) */}
          <div className="mt-14 flex justify-center border-b border-gray-200">
            <div className="flex flex-wrap -mb-px justify-center gap-2 sm:gap-4">
              {Object.keys(tabContents).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 px-6 sm:px-8 text-sm sm:text-base font-bold font-fredoka border-b-4 transition-all duration-200 ${
                    activeTab === key
                      ? 'border-[var(--color-japan-red)] text-[var(--color-japan-red)] bg-white/50 rounded-t-xl'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {key === 'pemula' && (landingSettings['tab1_name'] || 'Tingkat Pemula')}
                  {key === 'menengah' && (landingSettings['tab2_name'] || 'Tingkat Menengah')}
                  {key === 'lanjut' && (landingSettings['tab3_name'] || 'Tingkat Lanjutan')}
                </button>
              ))}
            </div>
          </div>

          {/* Overlapping layout container */}
          <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-6 sm:p-12 shadow-md hover:shadow-lg transition-shadow duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                
                {/* Collage / Image Layout Left (overlapping like Kumon page) */}
                <div className="lg:col-span-5 flex items-center justify-center p-4">
                  <div className="relative w-full max-w-[340px] h-[300px]">
                    {/* Layer 1: Colored base plate */}
                    <div className="absolute inset-0 bg-rose-50 rounded-2xl transform rotate-6 border border-rose-100" />
                    {/* Layer 2: Secondary plate */}
                    <div className="absolute inset-4 bg-orange-50 rounded-2xl transform -rotate-3 border border-orange-100" />
                    {/* Layer 3: Main photo (using our premium hero image as cover asset) */}
                    <div className="absolute inset-6 bg-white rounded-xl overflow-hidden shadow-md border border-gray-200/60">
                      <img
                        src="/images/benkyou_hero.png"
                        alt={tabContents[activeTab].title}
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    {/* Layer 4: Floating tag */}
                    <div className="absolute -bottom-2 right-2 bg-[var(--color-ink)] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                      🇯🇵 {tabContents[activeTab].stats.split(' • ')[0]}
                    </div>
                  </div>
                </div>

                {/* Text Content Right */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-[var(--color-japan-red)] border border-red-200/50 text-[10px] font-bold uppercase tracking-wider font-fredoka">
                    {tabContents[activeTab].badge}
                  </div>
                  
                  <h3 className="font-fredoka text-2xl sm:text-3xl font-semibold leading-snug text-[var(--color-ink)]">
                    {tabContents[activeTab].title}
                  </h3>
                  
                  <p className="text-base font-serif italic text-gray-500 border-l-4 border-[var(--color-japan-red)]/30 pl-4 py-1 bg-rose-50/20">
                    "{tabContents[activeTab].subtitle}"
                  </p>
                  
                  <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                    <p>{tabContents[activeTab].desc1}</p>
                    <p>{tabContents[activeTab].desc2}</p>
                  </div>

                  {/* Program stats list */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-gray-500">
                    {tabContents[activeTab].stats.split(' • ').map((stat, i) => (
                      <span key={i} className="bg-gray-100/80 border border-gray-200/60 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <Check size={12} className="text-green-600" /> {stat}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center">
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-japan-red)] text-white font-bold hover:bg-red-700 transition-all text-sm shadow-md shadow-red-600/10"
                    >
                      Daftar Program Ini <ArrowRight size={16} />
                    </Link>
                    <span className="text-xs text-gray-400 font-semibold">Tersedia coba gratis 7 hari</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Section: Program Belajar (3D Flip Cards) */}
        <section id="modul" className="py-24 bg-gray-50/60 border-y border-gray-200/60 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                {landingSettings['modul_title'] || 'Program Belajar yang Tersedia'}
              </h2>
              <div className="under-heading-wave" />
              <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                {landingSettings['modul_subtitle'] || 'Pilih fokus program belajar Anda atau ikuti semuanya secara simultan untuk hasil yang komprehensif.'}
              </p>
            </div>

            {/* Flip Cards Grid (Kumon-style 3D flip) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((prog, idx) => (
                <div key={idx} className="group relative h-[380px] w-full perspective-1000">
                  <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 transition-transform">
                    
                    {/* Front Side */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl border p-8 flex flex-col justify-between bg-gradient-to-br bg-white shadow-sm border-gray-200/80`}>
                      <div className="space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-white border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {prog.badge}
                        </div>
                        
                        <div className="text-[var(--color-japan-red)]/85 pt-2">
                          {prog.icon}
                        </div>

                        <h3 className="font-fredoka text-2xl font-bold text-[var(--color-ink)] pt-2">
                          {prog.title}
                        </h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {prog.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs font-bold text-[var(--color-japan-red)]">
                        <span>Lihat Detail Program</span>
                        <div className="w-8 h-8 rounded-full bg-[var(--color-japan-red)]/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-8 flex flex-col justify-between ${prog.colorBack} shadow-xl`}>
                      <div className="space-y-4">
                        <h4 className="font-fredoka text-xl font-bold border-b border-white/20 pb-2">
                          Detail Kurikulum
                        </h4>
                        <p className="text-sm text-white/90 leading-relaxed font-sans">
                          {prog.desc}
                        </p>
                        <ul className="text-xs space-y-2 text-white/80 pt-2 font-medium">
                          <li className="flex items-center gap-1.5">✓ Materi Interaktif Mudah Diakses</li>
                          <li className="flex items-center gap-1.5">✓ Audio Penutur Asli Jepang</li>
                          <li className="flex items-center gap-1.5">✓ Evaluasi Kemajuan Realtime</li>
                        </ul>
                      </div>

                      <div>
                        <Link
                          href={prog.link}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-[var(--color-ink)] font-bold hover:bg-gray-100 transition-colors text-sm shadow-md"
                        >
                          Daftar Sekarang <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: 4 Aspek Penting (Horizontal Expanding Cards Accordion) */}
        <section id="metode" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
              {landingSettings['method_title'] || 'Metode Benkyou Memiliki Empat Aspek Penting'}
            </h2>
            <div className="under-heading-wave" />
            <p className="text-sm text-gray-500 font-medium">
              {landingSettings['method_subtitle'] || 'Klik panel kartu untuk membaca selengkapnya'}
            </p>
          </div>

          {/* Horizontal Expanding Cards */}
          <motion.div layout className="hidden md:flex flex-row gap-4 min-h-[380px] w-full">
            {aspects.map((aspect, idx) => {
              const isActive = activeAspect === idx;
              return (
                <motion.div
                  layout
                  key={idx}
                  onClick={() => setActiveAspect(idx)}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 25,
                  }}
                  className={`relative border rounded-3xl p-8 flex flex-col justify-between cursor-pointer shadow-sm overflow-hidden ${
                    isActive 
                      ? `${aspect.bg} border-gray-300/40` 
                      : 'bg-white hover:bg-gray-50/50 hover:border-gray-300 border-gray-200'
                  }`}
                  style={{
                    flex: isActive ? 3 : 0.8
                  }}
                >
                  {/* Decorative big index number background */}
                  <div className="absolute right-4 top-4 font-fredoka font-black text-6xl opacity-[0.03] pointer-events-none select-none">
                    {`0${idx + 1}`}
                  </div>

                  <motion.div layout className="flex flex-col h-full justify-between">
                    
                    {/* Top element: icon or title depending on active state */}
                    <motion.div layout className="flex flex-col gap-4">
                      <motion.div 
                        layout 
                        className={`flex gap-3 transition-all duration-300 ${
                          isActive ? 'flex-row items-center' : 'flex-col items-center'
                        }`}
                      >
                        {/* Icon Container */}
                        <motion.div 
                          layout
                          className={`rounded-2xl border transition-all duration-300 shrink-0 ${
                            isActive 
                              ? 'p-3 bg-white border-gray-100 shadow-sm' 
                              : 'p-2.5 bg-gray-50 border-gray-100'
                          }`}
                        >
                          {aspect.icon}
                        </motion.div>
                        
                        {/* Title & Badge */}
                        <motion.div 
                          layout 
                          className={`flex flex-col ${!isActive ? 'items-center' : ''}`}
                        >
                          <AnimatePresence mode="wait">
                            {isActive ? (
                              <motion.div
                                key="active-title"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.15 }}
                              >
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-fredoka">Aspek {`0${idx + 1}`}</p>
                                <h3 className="font-fredoka text-lg lg:text-xl font-bold text-[var(--color-ink)] leading-snug">
                                  {aspect.title}
                                </h3>
                              </motion.div>
                            ) : (
                              <motion.span 
                                key="inactive-number"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="font-fredoka font-bold text-sm text-gray-300"
                              >
                                {`0${idx + 1}`}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Middle Section: description + points (active) or vertical text (inactive) */}
                    <div className="flex-1 flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.div
                            key="active-content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="my-4 space-y-4"
                          >
                            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed font-sans">
                              {aspect.desc}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {aspect.points.map((pt, pIdx) => (
                                <div key={pIdx} className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-gray-700 bg-white/70 px-2.5 py-1.5 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
                                  <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                                  <span className="truncate">{pt}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="inactive-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex justify-center w-full py-4"
                          >
                            <span className="writing-vertical font-fredoka font-semibold text-gray-600 tracking-wide text-center uppercase whitespace-nowrap leading-none text-xs">
                              {aspect.title.substring(0, 24)}...
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom: vertical text when collapsed, small link when active */}
                    <motion.div layout className="mt-auto">
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-japan-red)] mt-2"
                          >
                            <span>Aspek Metode Benkyou</span>
                            <Sparkles size={12} className="animate-spin-slow" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Fallback accordion for mobile */}
          <div className="flex md:hidden flex-col gap-4">
            {aspects.map((aspect, idx) => {
              const isActive = activeAspect === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveAspect(idx)}
                  className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                    isActive ? `${aspect.bg} border-gray-300/40 shadow-sm` : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center scale-90">
                        {aspect.icon}
                      </div>
                      <h3 className="font-fredoka text-sm font-bold text-[var(--color-ink)]">
                        {aspect.title}
                      </h3>
                    </div>
                    <span className="font-fredoka font-black text-xs text-gray-300">
                      {`0${idx + 1}`}
                    </span>
                  </div>

                  {isActive && (
                    <div className="mt-4 space-y-4 border-t border-gray-200/50 pt-4">
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">
                        {aspect.desc}
                      </p>
                      <div className="flex flex-col gap-2">
                        {aspect.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2 text-[10px] font-bold text-gray-700 bg-white/70 px-2 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <CheckCircle2 size={12} className="text-green-600" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Testimonials & Kisah Sukses (Kumon Profile Selector Style) */}
        <section id="testimoni" className="py-24 bg-white border-t border-gray-200/80 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                {landingSettings['testi_title'] || 'Kisah Sukses Siswa Benkyou'}
              </h2>
              <div className="under-heading-wave" />
              <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                {landingSettings['testi_subtitle'] || 'Dengarkan cerita langsung dari para pembelajar yang berhasil menguasai bahasa Jepang secara mandiri bersama Benkyou.'}
              </p>
            </div>

            {/* Testimonials Switcher Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Profile Selector Column (4 items) */}
              <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none justify-start">
                {testimonials.map((testi, idx) => {
                  const isActive = activeTestimonial === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left min-w-[240px] lg:min-w-0 w-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-rose-50/50 border-[var(--color-japan-red)]/50 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100/50 border-gray-200/80'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-full ${testi.color} font-fredoka font-semibold flex items-center justify-center text-sm shadow-inner`}>
                        {testi.avatar}
                      </div>
                      <div className="leading-tight">
                        <h4 className="font-fredoka text-sm font-bold text-[var(--color-ink)]">
                          {testi.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-0.5 tracking-wider">{testi.detail}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Main Content Card Column */}
              <div className="lg:col-span-8 bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm relative min-h-[300px] flex flex-col justify-between">
                {/* Decorative Quote Icon Background */}
                <div className="absolute right-8 top-6 font-serif font-black text-9xl text-gray-200/40 pointer-events-none select-none">
                  “
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-1.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>

                    <h3 className="font-fredoka text-xl sm:text-2xl font-bold leading-snug text-[var(--color-ink)] max-w-xl">
                      {testimonials[activeTestimonial].quoteTitle}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                      {testimonials[activeTestimonial].quoteText}
                    </p>

                    <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-fredoka text-base font-bold text-[var(--color-ink)]">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].detail}</p>
                      </div>

                      <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-400 select-none">
                        <span>Verifikasi Cerita</span>
                        <CheckCircle2 size={12} className="text-green-600" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* Section: Berita Terbaru (Kumon News style with timeline illustration) */}
        <section id="berita" className="py-24 bg-gray-50/60 border-t border-gray-200 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="font-fredoka text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                Berita Terbaru
              </h2>
              <div className="under-heading-wave" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Timeline Graphic Card */}
              <div className="lg:col-span-5 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[var(--color-japan-red)] flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <h3 className="font-fredoka text-2xl font-bold text-[var(--color-ink)]">
                    Roadmap Belajar Mandiri Benkyou
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Timeline Kurikulum & Program 2026</p>
                  
                  {/* Timeline Graphic List */}
                  <div className="pt-6 pl-4 space-y-6 timeline-dotted-line">
                    <div className="relative flex gap-4 items-start">
                      <div className="absolute -left-7 w-4 h-4 rounded-full bg-[var(--color-japan-red)] border-4 border-white shadow-sm z-10" />
                      <div className="leading-tight">
                        <p className="text-[10px] font-bold text-[var(--color-japan-red)]">TAHAP 01</p>
                        <h4 className="text-xs font-bold text-gray-800">Coba Gratis Diagnostik Level</h4>
                        <p className="text-[10px] text-gray-500">Mulai dari level yang paling tepat.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 items-start">
                      <div className="absolute -left-7 w-4 h-4 rounded-full bg-orange-400 border-4 border-white shadow-sm z-10" />
                      <div className="leading-tight">
                        <p className="text-[10px] font-bold text-orange-500">TAHAP 02</p>
                        <h4 className="text-xs font-bold text-gray-800">Modul Kerja Mandiri Harian</h4>
                        <p className="text-[10px] text-gray-500">15-30 menit latihan terstruktur tiap hari.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 items-start">
                      <div className="absolute -left-7 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm z-10" />
                      <div className="leading-tight">
                        <p className="text-[10px] font-bold text-green-500">TAHAP 03</p>
                        <h4 className="text-xs font-bold text-gray-800">Simulasi JLPT N5 - N1</h4>
                        <p className="text-[10px] text-gray-500">Ujian uji coba realtime dengan sistem penilaian.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 mt-8">
                  <a
                    href="#manfaat"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-japan-red)] hover:underline"
                  >
                    <span>Pelajari selengkapnya tentang kurikulum kami</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: News Articles List */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {news.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between gap-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${
                          item.type === 'PENTING' ? 'bg-red-100 text-red-800' :
                          item.type === 'TIPS' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.type}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold">
                          <Clock size={12} />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <h3 className="font-fredoka text-base sm:text-lg font-semibold text-gray-800 leading-snug group-hover:text-[var(--color-japan-red)] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-japan-red)] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Baca artikel</span>
                      <ChevronRight size={14} />
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Section: Call to Action (Daftar Gratis) */}
        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <div className="p-10 sm:p-20 rounded-3xl bg-[var(--color-ink)] text-white space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] font-jp font-bold text-[200px] pointer-events-none select-none">
              日本
            </div>
            <div className="absolute bottom-0 left-0 p-8 opacity-[0.03] font-jp font-bold text-[200px] pointer-events-none select-none leading-none">
              勉
            </div>

            <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
              Siap Mengembangkan <span className="text-[var(--color-sakura)] font-bold">Kemampuan Terbaik</span> Anda?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
              Mulailah dari tingkat yang tepat dengan pendaftaran gratis dan rasakan modul belajar mandiri premium sekarang juga.
            </p>
            
            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <Link
                href={auth?.user ? "/dashboard" : "/register"}
                className="px-8 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/20 text-sm"
              >
                Daftar Gratis Sekarang
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all text-sm"
              >
                Masuk ke Akun
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Area (Detailed Multi-column Kumon Style) */}
        <footer className="bg-[#1e1e1e] text-gray-300 border-t border-gray-800 py-16 px-6 relative z-10 font-sans">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Column 1: Brand & Site lists */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-japan-red)] flex items-center justify-center text-white font-jp font-bold text-base shadow-sm">
                  日
                </div>
                <span className="font-fredoka font-bold text-xl text-white">Benkyou Indonesia</span>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Benkyou adalah platform pendidikan bahasa Jepang mandiri yang berdedikasi membangun fondasi akademis yang kokoh serta disiplin belajar mandiri bagi siswa di seluruh Indonesia.
              </p>

              <div className="text-[11px] text-gray-500 space-y-1.5 pt-2 border-t border-gray-800/80">
                <p><a href="#" className="hover:underline">Daftar Perusahaan Benkyou Grup</a> | <a href="#" className="hover:underline">Temukan Kami</a></p>
                <p><a href="#" className="hover:underline">Syarat Penggunaan</a> | <a href="#" className="hover:underline">Kebijakan Perlindungan Data Pribadi</a></p>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-fredoka text-white text-sm font-bold tracking-wider uppercase">Tautan Navigasi</h4>
              <ul className="text-xs space-y-2.5 font-semibold text-gray-400">
                <li><a href="#manfaat" className="hover:text-white transition-colors">Metode Benkyou</a></li>
                <li><a href="#manfaat" className="hover:text-white transition-colors">Tingkat Program & Kurikulum</a></li>
                <li><a href="#modul" className="hover:text-white transition-colors">Program Kursus Bulanan</a></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Daftarkan Diri Saya</Link></li>
                <li><a href="#metode" className="hover:text-white transition-colors">Sistem Pendampingan Online</a></li>
              </ul>
            </div>

            {/* Column 3: Contact & Address Info */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-fredoka text-white text-sm font-bold tracking-wider uppercase">PT Benkyou Kie Indonesia</h4>
              
              <div className="text-xs text-gray-400 space-y-3">
                <div className="flex gap-2 items-start">
                  <MapPin size={16} className="text-[var(--color-japan-red)] shrink-0 mt-0.5" />
                  <p>
                    <strong>Kantor Pusat & Distribusi Digital:</strong><br />
                    Jalan Ahmad Yani No. 37, Utan Kayu Selatan,<br />
                    Jakarta Timur 13120, Indonesia
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <Phone size={14} className="text-[var(--color-japan-red)]" />
                  <p><strong>Tel:</strong> (021) 8590-1772</p>
                </div>

                <div className="flex gap-2 items-center">
                  <ExternalLink size={14} className="text-[var(--color-japan-red)]" />
                  <p><strong>Website:</strong> <a href="#" className="hover:underline text-white">https://benkyou.co.id</a></p>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright bar at the bottom */}
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <p>© 2026 Benkyou Asia Oceania Pte Ltd. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-2 items-center">
              <span>Dibuat dengan</span>
              <Heart size={10} className="text-[var(--color-japan-red)] fill-[var(--color-japan-red)]" />
              <span>untuk pembelajar Bahasa Jepang.</span>
            </div>
          </div>
        </footer>

        {/* Video Introduction Modal (Kumon style responsive modal popup) */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-scale-up">
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Tutup Video"
              >
                <X size={20} />
              </button>

              <div className="aspect-video w-full">
                <video 
                  className="w-full h-full"
                  src="https://id.kumonglobal.com/wp-content/uploads/2024/01/video-intro-kumon.mp4" 
                  controls 
                  autoPlay
                  preload="metadata"
                />
              </div>
              
              <div className="p-4 sm:px-6 bg-[#222] text-xs text-gray-400 flex justify-between items-center">
                <span>Video Pengenalan Metode Belajar Mandiri Kumon / Benkyou</span>
                <span className="flex items-center gap-1"><Info size={12} /> Durasi: 2 Menit</span>
              </div>
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--color-japan-red)] text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors focus:outline-none border border-red-500/20 group cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
