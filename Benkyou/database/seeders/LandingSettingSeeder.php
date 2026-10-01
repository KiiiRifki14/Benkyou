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
            ['key' => 'announcement_text', 'value' => 'Platform Belajar Bahasa Jepang Mandiri & Interaktif 🇯🇵'],
            ['key' => 'site_logo_sub', 'value' => 'Belajar Bahasa Jepang'],
            ['key' => 'nav_link1', 'value' => 'Program Belajar'],
            ['key' => 'nav_link2', 'value' => 'Keunggulan'],
            ['key' => 'nav_link3', 'value' => 'Materi Modul'],
            ['key' => 'nav_link4', 'value' => 'Catatan & Tips'],
            ['key' => 'nav_link5', 'value' => 'Roadmap & Info'],

            // Hero
            ['key' => 'hero_badge', 'value' => 'Mulai Belajar Hari Ini!'],
            ['key' => 'hero_title', 'value' => 'Ayo mulai perjalanan bahasamu hari ini, <span class="text-[var(--color-japan-red)] font-bold">lebih mudah & seru!</span>'],
            ['key' => 'hero_subtitle', 'value' => 'Kuasai Hiragana, Katakana, Kanji, dan percakapan bahasa Jepang dengan modul interaktif, kuis dinamis, dan petualangan seru.'],
            ['key' => 'hero_cta_text', 'value' => 'Mulai Belajar'],
            ['key' => 'hero_image', 'value' => '/images/benkyou_hero.png'],
            ['key' => 'hero_stat_badge', 'value' => 'Pemula s/d Mahir'],
            ['key' => 'hero_info_badge', 'value' => '100% Digital Mandiri'],
            ['key' => 'hero_doc_text', 'value' => 'Unduh Buklet Panduan Belajar Mandiri Benkyou (PDF)'],
            ['key' => 'hero_doc_link', 'value' => '#'],

            // Program Tabs
            ['key' => 'program_title', 'value' => 'Jalur Belajar Terstruktur'],
            ['key' => 'program_subtitle', 'value' => 'Dari pengenalan huruf dasar sampai percakapan natural — semua dirancang langkah demi langkah.'],

            ['key' => 'tab1_name', 'value' => 'Tahap Pemula'],
            ['key' => 'tab1_title', 'value' => 'Dasar yang Kokoh'],
            ['key' => 'tab1_subtitle', 'value' => 'Mulai dari nol dengan percaya diri.'],
            ['key' => 'tab1_desc1', 'value' => 'Pelajari huruf Hiragana dan Katakana dengan metode visual dan audio yang mudah dipahami.'],
            ['key' => 'tab1_desc2', 'value' => 'Dilengkapi latihan kosakata dasar sehari-hari yang esensial untuk membangun fondasi yang kuat.'],
            ['key' => 'tab1_stats', 'value' => 'Huruf Dasar • Kosakata Harian • Audio Native'],
            ['key' => 'tab1_badge', 'value' => 'Kohai 🌱'],
            ['key' => 'tab1_image', 'value' => '/images/benkyou_tab1.png'],

            ['key' => 'tab2_name', 'value' => 'Tahap Menengah'],
            ['key' => 'tab2_title', 'value' => 'Mulai Percakapan'],
            ['key' => 'tab2_subtitle', 'value' => 'Pahami pola kalimat dan konjugasi.'],
            ['key' => 'tab2_desc1', 'value' => 'Rangkai kalimat sendiri, pelajari partikel penting, dan latih pemahaman mendengar.'],
            ['key' => 'tab2_desc2', 'value' => 'Bisa mulai memahami kalimat dalam anime, manga, dan percakapan sehari-hari.'],
            ['key' => 'tab2_stats', 'value' => 'Percakapan • Tata Bahasa • Pemahaman Mendengar'],
            ['key' => 'tab2_badge', 'value' => 'Senpai ⚡'],
            ['key' => 'tab2_image', 'value' => '/images/benkyou_tab2.png'],

            ['key' => 'tab3_name', 'value' => 'Tahap Mahir'],
            ['key' => 'tab3_title', 'value' => 'Lancar & Mahir'],
            ['key' => 'tab3_subtitle', 'value' => 'Siap berkomunikasi dan hadapi JLPT.'],
            ['key' => 'tab3_desc1', 'value' => 'Kuasai ratusan Kanji lanjutan, pola tata bahasa formal, dan bacaan teks bahasa Jepang autentik.'],
            ['key' => 'tab3_desc2', 'value' => 'Latihan komprehensif untuk menguji kemampuan membaca dan pemahaman tingkat lanjut.'],
            ['key' => 'tab3_stats', 'value' => 'Kanji Mahir • JLPT Preparation • Natural Fluency'],
            ['key' => 'tab3_badge', 'value' => 'Shogun 👑'],
            ['key' => 'tab3_image', 'value' => '/images/benkyou_tab3.png'],

            // Modul Cards
            ['key' => 'modul_title', 'value' => 'Materi Lengkap & Menyeluruh'],
            ['key' => 'modul_subtitle', 'value' => 'Pilih materi yang ingin kamu kuasai hari ini — belajar mandiri dengan ritmemu sendiri.'],
            
            ['key' => 'prog1_title', 'value' => 'Huruf & Kanji'],
            ['key' => 'prog1_subtitle', 'value' => 'Kana, Kanji & Urutan Goresan'],
            ['key' => 'prog1_desc', 'value' => 'Belajar menulis dan mengingat Hiragana, Katakana, serta Kanji bertahap dengan visualisasi jelas dan audio jernih.'],
            ['key' => 'prog1_badge', 'value' => 'Menulis & Kanji'],

            ['key' => 'prog2_title', 'value' => 'Tata Bahasa'],
            ['key' => 'prog2_subtitle', 'value' => 'Pola Kalimat & Konjugasi'],
            ['key' => 'prog2_desc', 'value' => 'Pahami struktur kalimat bahasa Jepang mulai dari partikel dasar hingga pola percakapan yang terdengar natural.'],
            ['key' => 'prog2_badge', 'value' => 'Grammar & Percakapan'],

            ['key' => 'prog3_title', 'value' => 'My Journey'],
            ['key' => 'prog3_subtitle', 'value' => 'Petualangan Naik Level'],
            ['key' => 'prog3_desc', 'value' => 'Dari Kohai sampai Shogun — selesaikan setiap tantangan misi seru di kota-kota Jepang dan raih reward spesial di setiap level!'],
            ['key' => 'prog3_badge', 'value' => 'Gelar & Petualangan'],

            // Methods (Aspects)
            ['key' => 'method_title', 'value' => 'Keunggulan Belajar di Benkyou'],
            ['key' => 'method_subtitle', 'value' => 'Metode belajar mandiri yang efektif dan menyenangkan.'],

            ['key' => 'aspect1_title', 'value' => 'Mulai dari Nol dengan Mudah'],
            ['key' => 'aspect1_desc', 'value' => 'Nggak perlu takut salah atau bingung harus mulai dari mana. Panduan langkah demi langkah memandu belajarmu dari huruf paling dasar.'],
            ['key' => 'aspect1_point1', 'value' => 'Tanpa tes masuk yang rumit'],
            ['key' => 'aspect1_point2', 'value' => 'Ramah pemula total'],
            ['key' => 'aspect1_point3', 'value' => 'Belajar sesuai kecepatan sendiri'],

            ['key' => 'aspect2_title', 'value' => 'Belajar Kapan Saja, di Mana Saja'],
            ['key' => 'aspect2_desc', 'value' => 'Akses materi dan kuis 24/7 dari perangkat ponsel maupun komputer, fleksibel sesuai waktu luangmu.'],
            ['key' => 'aspect2_point1', 'value' => 'Akses 24/7 kapan saja'],
            ['key' => 'aspect2_point2', 'value' => 'Kuis acak dan variatif'],
            ['key' => 'aspect2_point3', 'value' => 'Tampilan ramah mobile'],

            ['key' => 'aspect3_title', 'value' => 'Petualangan & Tantangan Seru'],
            ['key' => 'aspect3_desc', 'value' => 'Tingkatkan level belajarmu dari Kohai hingga Shogun dengan petualangan skenario seru dan reward di setiap level.'],
            ['key' => 'aspect3_point1', 'value' => 'Naik gelar: Kohai → Shogun'],
            ['key' => 'aspect3_point2', 'value' => 'Buka tema eksklusif'],
            ['key' => 'aspect3_point3', 'value' => 'Reward penyelesaian misi'],

            ['key' => 'aspect4_title', 'value' => 'Feedback Instan & Audio Native'],
            ['key' => 'aspect4_desc', 'value' => 'Ketahui langsung kebenaran jawabanmu dengan penjelasan yang mudah dipahami serta pelafalan audio yang akurat.'],
            ['key' => 'aspect4_point1', 'value' => 'Hasil kuis real-time'],
            ['key' => 'aspect4_point2', 'value' => 'Penjelasan ringkas & jelas'],
            ['key' => 'aspect4_point3', 'value' => 'Audio pengucapan asli'],

            // Roadmap
            ['key' => 'roadmap_title', 'value' => 'Roadmap Belajar Terarah'],
            ['key' => 'roadmap_subtitle', 'value' => 'Perjalanan dari Dasar hingga Mahir 🌸'],
            ['key' => 'roadmap1_title', 'value' => 'Dasar Huruf & Pengucapan'],
            ['key' => 'roadmap1_desc', 'value' => 'Kuasai Hiragana, Katakana, dan Kanji dasar.'],
            ['key' => 'roadmap2_title', 'value' => 'Latihan & Kuis Interaktif'],
            ['key' => 'roadmap2_desc', 'value' => 'Latih kosakata, tata bahasa, dan mendengar setiap hari.'],
            ['key' => 'roadmap3_title', 'value' => 'Petualangan Misi & Sertifikasi'],
            ['key' => 'roadmap3_desc', 'value' => 'Selesaikan ujian tingkat untuk membuka gelar dan reward.'],

            // News
            ['key' => 'news1_title', 'value' => '🚀 Fitur Baru: Audio pengucapan interaktif kini tersedia di seluruh modul Kana!'],
            ['key' => 'news1_date', 'value' => 'Terbaru'],
            ['key' => 'news1_type', 'value' => 'UPDATE'],
            ['key' => 'news2_title', 'value' => '📝 Challenge Mingguan: Uji pemahaman kosakata N5 & N4 di kuis harian!'],
            ['key' => 'news2_date', 'value' => 'Challenge'],
            ['key' => 'news2_type', 'value' => 'EVENT'],
            ['key' => 'news3_title', 'value' => '🏆 Capai Level Shogun di My Journey dan raih pencapaian tertinggi!'],
            ['key' => 'news3_date', 'value' => 'Pencapaian'],
            ['key' => 'news3_type', 'value' => 'INFO'],

            // Testimonials / Catatan Belajar
            ['key' => 'testi_title', 'value' => 'Catatan & Tips Belajar'],
            ['key' => 'testi_subtitle', 'value' => 'Kiat sukses, motivasi, dan panduan belajar dari para sensei untuk menemani perjalananmu.'],

            // CTA Bottom
            ['key' => 'cta_title', 'value' => 'Siap Memulai <span class="text-[var(--color-sakura)] font-bold">Perjalanan Bahasa Jepangmu</span>?'],
            ['key' => 'cta_desc', 'value' => 'Bergabunglah sekarang dan rasakan kemudahan belajar bahasa Jepang secara mandiri dengan metode interaktif yang menyenangkan! 🌸'],
            ['key' => 'cta_button_text', 'value' => 'Mulai Belajar Sekarang'],
            ['key' => 'cta_button_sub', 'value' => 'Masuk ke Akunmu'],

            // Footer
            ['key' => 'footer_desc', 'value' => 'Platform edukasi mandiri bahasa Jepang modern yang interaktif, terstruktur, dan menyenangkan untuk siapa saja.'],
            ['key' => 'footer_love_text', 'value' => 'Dirancang untuk mempermudah belajar bahasa Jepang di mana saja.'],
            ['key' => 'footer_about', 'value' => 'Benkyou hadir untuk membantu siapa saja yang ingin mempelajari bahasa dan budaya Jepang secara mandiri dengan kurikulum yang mudah dipahami.'],

            // Header / Auth links
            ['key' => 'header_dashboard_text', 'value' => 'Dasbor Belajar'],
            ['key' => 'header_login_text', 'value' => 'Masuk'],
            ['key' => 'header_register_text', 'value' => 'Daftar Sekarang'],

            // Hero Video Modal
            ['key' => 'hero_video_btn_text', 'value' => 'Tonton Video Intro'],
            ['key' => 'hero_video_url', 'value' => 'https://id.kumonglobal.com/wp-content/uploads/2024/01/video-intro-kumon.mp4'],
            ['key' => 'hero_video_label', 'value' => 'Video Pengenalan Benkyou — Belajar Bahasa Jepang Mandiri'],
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
            ['key' => 'footer_copy_text', 'value' => '© 2026 Benkyou — Platform Belajar Bahasa Jepang Mandiri.'],
            ['key' => 'footer_made_with', 'value' => 'Dibuat dengan dedikasi'],
            ['key' => 'footer_for_learners', 'value' => 'untuk seluruh pembelajar Bahasa Jepang.'],

            // Branding, Meta & Additional Links
            ['key' => 'site_title', 'value' => 'Benkyou — Platform Belajar Bahasa Jepang Interaktif 🇯🇵'],
            ['key' => 'site_meta_desc', 'value' => 'Platform belajar bahasa Jepang mandiri yang interaktif, terstruktur, dan mudah dipahami dari tingkat pemula hingga mahir.'],
            ['key' => 'site_brand_name', 'value' => 'Benkyou'],
            ['key' => 'site_logo_char', 'value' => '日'],
            ['key' => 'hero_doc_link_text', 'value' => 'Unduh'],
            ['key' => 'hero_stat_label', 'value' => 'Cocok Untuk'],
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
