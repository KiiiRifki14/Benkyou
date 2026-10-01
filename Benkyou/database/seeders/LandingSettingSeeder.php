<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LandingSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Announcement & Logo
            ['key' => 'announcement_text', 'value' => 'Platform Belajar Bahasa Jepang Mandiri & Interaktif~'],
            ['key' => 'site_logo_sub', 'value' => 'Belajar Bahasa Jepang'],
            ['key' => 'nav_link1', 'value' => 'Program Belajar'],
            ['key' => 'nav_link2', 'value' => 'Keunggulan'],
            ['key' => 'nav_link3', 'value' => 'Materi Modul'],
            ['key' => 'nav_link4', 'value' => 'Catatan & Tips'],
            ['key' => 'nav_link5', 'value' => 'Roadmap & Info'],

            // Hero
            ['key' => 'hero_badge', 'value' => 'Platform Belajar Bahasa Jepang'],
            ['key' => 'hero_title', 'value' => 'Mulai perjalanan bahasamu hari ini, <span class="text-[var(--color-japan-red)] font-bold">lebih mudah & seru!</span>'],
            ['key' => 'hero_subtitle', 'value' => 'Kuasai Hiragana, Katakana, Kanji, dan tata bahasa Jepang secara interaktif, terstruktur, dan menyenangkan.'],
            ['key' => 'hero_cta_text', 'value' => 'Mulai Belajar'],
            ['key' => 'hero_image', 'value' => '/images/benkyou_hero.png'],
            ['key' => 'hero_stat_badge', 'value' => 'Pemula s/d Mahir'],
            ['key' => 'hero_info_badge', 'value' => '100% Digital Mandiri'],
            ['key' => 'hero_doc_text', 'value' => 'Unduh Buklet Panduan Belajar Mandiri Benkyou (PDF)'],
            ['key' => 'hero_doc_link', 'value' => '#'],

            // Program Tabs
            ['key' => 'program_title', 'value' => 'Apa Saja yang Bisa Kita Pelajari?'],
            ['key' => 'program_subtitle', 'value' => 'Metode belajar santai, bertahap, dan menyenangkan untuk semua kalangan.'],

            ['key' => 'tab1_name', 'value' => 'Tahap Awal'],
            ['key' => 'tab1_title', 'value' => 'Dasar yang Kokoh'],
            ['key' => 'tab1_subtitle', 'value' => 'Mulai dari nol dengan metode terstruktur.'],
            ['key' => 'tab1_desc1', 'value' => 'Kita bakal belajar huruf Hiragana dan Katakana pelan-pelan. Gak usah buru-buru, yang penting kamu paham fondasinya.'],
            ['key' => 'tab1_desc2', 'value' => 'Lengkap dengan latihan kosakata dasar yang sering dipakai sehari-hari.'],
            ['key' => 'tab1_stats', 'value' => 'Huruf Dasar • Kosakata Harian • Terstruktur'],
            ['key' => 'tab1_badge', 'value' => 'Kohai 🌱'],
            ['key' => 'tab1_image', 'value' => '/images/benkyou_tab1.png'],

            ['key' => 'tab2_name', 'value' => 'Tahap Menengah'],
            ['key' => 'tab2_title', 'value' => 'Mulai Percakapan'],
            ['key' => 'tab2_subtitle', 'value' => 'Pahami pola kalimat dan percakapan nyata.'],
            ['key' => 'tab2_desc1', 'value' => 'Di sini kita akan merangkai kalimat jadi lebih panjang dan bermakna sesuai kaidah tata bahasa.'],
            ['key' => 'tab2_desc2', 'value' => 'Kamu bakal bisa memahami dialog anime, lagu J-Pop, dan teks bacaan bertahap!'],
            ['key' => 'tab2_stats', 'value' => 'Percakapan • Media Jepang • Tata Bahasa'],
            ['key' => 'tab2_badge', 'value' => 'Senpai ⚡'],
            ['key' => 'tab2_image', 'value' => '/images/benkyou_tab2.png'],

            ['key' => 'tab3_name', 'value' => 'Tahap Mahir'],
            ['key' => 'tab3_title', 'value' => 'Komunikasi Lancar'],
            ['key' => 'tab3_subtitle', 'value' => 'Siap berkomunikasi dan memahami bahasa asli.'],
            ['key' => 'tab3_desc1', 'value' => 'Tahap mahir untuk memperdalam kanji kompleks, idiom, dan nuansa ekspresi penutur asli.'],
            ['key' => 'tab3_desc2', 'value' => 'Latihan membaca komprehensif dan pemahaman audio untuk persiapan JLPT dan karier.'],
            ['key' => 'tab3_stats', 'value' => 'Lancar • Percaya Diri • Standar JLPT'],
            ['key' => 'tab3_badge', 'value' => 'Shogun 👑'],
            ['key' => 'tab3_image', 'value' => '/images/benkyou_tab3.png'],

            // Modul Cards
            ['key' => 'modul_title', 'value' => 'Modul Pembelajaran Benkyou'],
            ['key' => 'modul_subtitle', 'value' => 'Pilih materi yang ingin kamu kuasai, dari huruf dasar hingga tata bahasa.'],
            
            ['key' => 'prog1_title', 'value' => 'Huruf & Kanji'],
            ['key' => 'prog1_subtitle', 'value' => 'Kana, Kanji & Cara Menulis'],
            ['key' => 'prog1_desc', 'value' => 'Belajar coretan huruf Hiragana, Katakana, dan Kanji dengan cara yang seru dan visualisasi interaktif!'],
            ['key' => 'prog1_badge', 'value' => 'Menulis & Kanji'],

            ['key' => 'prog2_title', 'value' => 'Tata Bahasa'],
            ['key' => 'prog2_subtitle', 'value' => 'Pola Kalimat & Konjugasi'],
            ['key' => 'prog2_desc', 'value' => 'Pelajari struktur pola kalimat bahasa Jepang dari partikel dasar hingga pola percakapan alami.'],
            ['key' => 'prog2_badge', 'value' => 'Grammar & Percakapan'],

            ['key' => 'prog3_title', 'value' => 'My Journey'],
            ['key' => 'prog3_subtitle', 'value' => 'Tantangan Naik Level'],
            ['key' => 'prog3_desc', 'value' => 'Dari Kohai sampai Shogun — setiap tantangan yang kamu selesaikan membuka gelar baru dan menguji pemahamanmu secara terstruktur!'],
            ['key' => 'prog3_badge', 'value' => 'Gelar & Reward'],

            // Methods (Aspects)
            ['key' => 'method_title', 'value' => 'Cara Belajar Asyik'],
            ['key' => 'method_subtitle', 'value' => 'Metode modern yang dirancang untuk pembelajaran mandiri efektif.'],

            ['key' => 'aspect1_title', 'value' => 'Mulai dari yang Mudah Dulu~'],
            ['key' => 'aspect1_desc', 'value' => 'Nggak perlu langsung jago! Kita mulai dari huruf paling dasar, pelan-pelan aja. Yang penting kamu enjoy dan proses belajarmu konsisten.'],
            ['key' => 'aspect1_point1', 'value' => 'Nggak ada tes masuk'],
            ['key' => 'aspect1_point2', 'value' => 'Mulai dari nol pun bisa'],
            ['key' => 'aspect1_point3', 'value' => 'Progress sesuai kecepatanmu sendiri'],

            ['key' => 'aspect2_title', 'value' => 'Belajar Kapan Aja, di Mana Aja'],
            ['key' => 'aspect2_desc', 'value' => 'Buka HP atau laptop, langsung bisa belajar. Fleksibel tanpa jadwal kaku — kamu yang tentukan kapan mau latihan.'],
            ['key' => 'aspect2_point1', 'value' => 'Akses 24/7 dari mana aja'],
            ['key' => 'aspect2_point2', 'value' => 'Kuis acak biar nggak bosen'],
            ['key' => 'aspect2_point3', 'value' => 'Bebas atur target harian'],

            ['key' => 'aspect3_title', 'value' => 'Sistem Gamifikasi & Pencapaian'],
            ['key' => 'aspect3_desc', 'value' => 'Setiap latihan yang kamu selesaikan meningkatkan levelmu dari Kohai hingga Shogun dengan pencapaian yang terukur.'],
            ['key' => 'aspect3_point1', 'value' => 'Naik gelar: Kohai → Senpai → Shogun'],
            ['key' => 'aspect3_point2', 'value' => 'Buka tema tampilan belajar eksklusif'],
            ['key' => 'aspect3_point3', 'value' => 'Lencana sertifikasi & progres belajar'],

            ['key' => 'aspect4_title', 'value' => 'Evaluasi Instan & Penjelasan Mudah'],
            ['key' => 'aspect4_desc', 'value' => 'Setiap jawaban langsung dievaluasi otomatis lengkap dengan penjelasan yang jelas dan mudah dipahami.'],
            ['key' => 'aspect4_point1', 'value' => 'Nilai langsung muncul'],
            ['key' => 'aspect4_point2', 'value' => 'Penjelasan ramah dan aplikatif'],
            ['key' => 'aspect4_point3', 'value' => 'Statistik akurasi dan riwayat latihan'],

            // Roadmap
            ['key' => 'roadmap_title', 'value' => 'Roadmap Perjalanan Belajar'],
            ['key' => 'roadmap_subtitle', 'value' => 'Dari Kohai sampai Shogun 🇯🇵'],
            ['key' => 'roadmap1_title', 'value' => 'Fondasi Huruf & Pola Dasar'],
            ['key' => 'roadmap1_desc', 'value' => 'Hiragana, Katakana, dan Kanji dasar.'],
            ['key' => 'roadmap2_title', 'value' => 'Latihan Interaktif Harian'],
            ['key' => 'roadmap2_desc', 'value' => 'Kuis kosakata, tata bahasa, dan audio.'],
            ['key' => 'roadmap3_title', 'value' => 'Tantangan Sertifikasi Misi'],
            ['key' => 'roadmap3_desc', 'value' => 'Uji kompetensi bertingkat dan raih gelar kehormatan.'],

            // News
            ['key' => 'news1_title', 'value' => '📚 Modul kosakata N5 & N4 baru telah ditambahkan — mulai latihan sekarang!'],
            ['key' => 'news1_date', 'value' => 'Update'],
            ['key' => 'news1_type', 'value' => 'UPDATE'],
            ['key' => 'news2_title', 'value' => '🎧 Audio pelafalan native speaker kini tersedia di seluruh modul huruf & kata!'],
            ['key' => 'news2_date', 'value' => 'Fitur'],
            ['key' => 'news2_type', 'value' => 'FITUR'],
            ['key' => 'news3_title', 'value' => '🏆 Selesaikan seluruh misi dan raih sertifikat gelar Shogun!'],
            ['key' => 'news3_date', 'value' => 'Roadmap'],
            ['key' => 'news3_type', 'value' => 'CHALLENGE'],

            // Testimonials / Catatan Belajar
            ['key' => 'testi_title', 'value' => 'Catatan & Tips Belajar'],
            ['key' => 'testi_subtitle', 'value' => 'Kumpulan panduan, tips praktis, dan motivasi belajar bahasa Jepang dari tim Benkyou.'],

            // CTA Bottom
            ['key' => 'cta_title', 'value' => 'Siap Menguasai <span class="text-[var(--color-sakura)] font-bold">Bahasa Jepang</span>?'],
            ['key' => 'cta_desc', 'value' => 'Mulai langkah pertamamu dari huruf paling dasar hingga percakapan lancar bersama Benkyou. Akses materi kapan saja dan di mana saja! 🌸'],
            ['key' => 'cta_button_text', 'value' => 'Mulai Belajar Sekarang'],
            ['key' => 'cta_button_sub', 'value' => 'Masuk ke Dashboard'],

            // Footer
            ['key' => 'footer_desc', 'value' => 'Platform pembelajaran bahasa Jepang mandiri yang modern, interaktif, dan terstruktur untuk semua kalangan pembelajar.'],
            ['key' => 'footer_love_text', 'value' => 'Platform Belajar Bahasa Jepang Interaktif © 2026 Benkyou'],
            ['key' => 'footer_about', 'value' => 'Benkyou dirancang untuk membantu siapa saja mempelajari bahasa Jepang secara mandiri dengan metode bertahap yang menyenangkan dan mudah dipahami.'],

            // Header / Auth links
            ['key' => 'header_dashboard_text', 'value' => 'Dasbor Belajar'],
            ['key' => 'header_login_text', 'value' => 'Masuk'],
            ['key' => 'header_register_text', 'value' => 'Daftar Sekarang'],

            // Hero Video Modal
            ['key' => 'hero_video_btn_text', 'value' => 'Tonton Video Intro'],
            ['key' => 'hero_video_url', 'value' => 'https://id.kumonglobal.com/wp-content/uploads/2024/01/video-intro-kumon.mp4'],
            ['key' => 'hero_video_label', 'value' => 'Video Pengenalan Benkyou — Belajar Bahasa Jepang'],
            ['key' => 'hero_video_duration', 'value' => 'Durasi: 2 Menit'],

            // Tab CTA
            ['key' => 'tab_cta_text', 'value' => 'Daftar Program Ini'],
            ['key' => 'tab_cta_sub', 'value' => 'Tersedia coba gratis 7 hari'],

            // Modul Card Details
            ['key' => 'modul_detail_text', 'value' => 'Lihat Detail Program'],
            ['key' => 'modul_curriculum_text', 'value' => 'Detail Kurikulum'],
            ['key' => 'modul_register_text', 'value' => 'Daftar Sekarang'],
            ['key' => 'modul_point1', 'value' => 'Materi Interaktif Mudah Diakses'],
            ['key' => 'modul_point2', 'value' => 'Audio Penutur Asli Jepang'],
            ['key' => 'modul_point3', 'value' => 'Evaluasi Kemajuan Realtime'],

            // Aspect Details
            ['key' => 'aspect_badge_text', 'value' => 'Aspek Metode Benkyou'],

            // Fallback testimonials & links
            ['key' => 'testi_fallback', 'value' => 'Catatan dan tips belajar akan muncul di sini~ ✨'],
            ['key' => 'roadmap_link_text', 'value' => 'Lihat perjalanan lengkap yang menunggumu'],
            ['key' => 'news_link_text', 'value' => 'Baca artikel'],

            // Footer labels
            ['key' => 'footer_nav_header', 'value' => 'Navigasi'],
            ['key' => 'footer_creator_header', 'value' => 'Tentang Benkyou'],
            ['key' => 'footer_copy_text', 'value' => '© 2026 Benkyou — Platform Belajar Bahasa Jepang Interaktif.'],
            ['key' => 'footer_made_with', 'value' => 'Didedikasikan untuk'],
            ['key' => 'footer_for_learners', 'value' => 'seluruh pembelajar Bahasa Jepang.'],

            // Branding, Meta & Additional Links
            ['key' => 'site_title', 'value' => 'Benkyou — Platform Belajar Bahasa Jepang Interaktif 🇯🇵'],
            ['key' => 'site_meta_desc', 'value' => 'Platform belajar bahasa Jepang mandiri yang interaktif, terstruktur, dan mudah dipahami dari tingkat pemula hingga mahir.'],
            ['key' => 'site_brand_name', 'value' => 'Benkyou'],
            ['key' => 'site_logo_char', 'value' => '日'],
            ['key' => 'hero_doc_link_text', 'value' => 'Unduh'],
            ['key' => 'hero_stat_label', 'value' => 'Cocok Buat'],
            ['key' => 'prog1_link', 'value' => '/register'],
            ['key' => 'prog2_link', 'value' => '/register'],
            ['key' => 'prog3_link', 'value' => '/register'],
            ['key' => 'news1_link', 'value' => '#'],
            ['key' => 'news2_link', 'value' => '#'],
            ['key' => 'news3_link', 'value' => '#'],
            ['key' => 'back_to_top_title', 'value' => 'Kembali ke atas'],

            // ── Section Visibility Toggles ('1' = visible, '0' = hidden) ──
            ['key' => 'section_program_visible',  'value' => '1'],
            ['key' => 'section_modul_visible',    'value' => '1'],
            ['key' => 'section_method_visible',   'value' => '1'],
            ['key' => 'section_testi_visible',    'value' => '1'],
            ['key' => 'section_berita_visible',   'value' => '1'],
            ['key' => 'section_cta_visible',      'value' => '1'],
        ];

        foreach ($settings as $setting) {
            \App\Models\LandingSetting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
