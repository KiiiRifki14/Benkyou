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
            ['key' => 'announcement_text', 'value' => 'Dibuat dengan sepenuh hati, khusus untukmu~'],
            ['key' => 'site_logo_sub', 'value' => 'Made for You'],
            ['key' => 'nav_link1', 'value' => 'Perjalananmu'],
            ['key' => 'nav_link2', 'value' => 'Kenapa Beda'],
            ['key' => 'nav_link3', 'value' => 'Yang Bisa Dipelajari'],
            ['key' => 'nav_link4', 'value' => 'Surat Rahasia'],
            ['key' => 'nav_link5', 'value' => 'Kejutan'],

            // Hero
            ['key' => 'hero_badge', 'value' => 'Yuk Belajar Bareng!'],
            ['key' => 'hero_title', 'value' => 'Ayo mulai perjalanan bahasamu hari ini, <span class="text-[var(--color-japan-red)] font-bold">buat kamu!</span>'],
            ['key' => 'hero_subtitle', 'value' => 'Temukan cara paling asyik dan santai buat belajar bahasa Jepang bareng aku.'],
            ['key' => 'hero_cta_text', 'value' => 'Mulai Belajar'],
            ['key' => 'hero_image', 'value' => '/images/benkyou_hero.png'],
            ['key' => 'hero_stat_badge', 'value' => 'Pemula s/d Mahir'],
            ['key' => 'hero_info_badge', 'value' => '100% Digital Mandiri'],
            ['key' => 'hero_doc_text', 'value' => 'Unduh Buklet Panduan Belajar Mandiri Benkyou (PDF)'],
            ['key' => 'hero_doc_link', 'value' => '#'],

            // Program Tabs
            ['key' => 'program_title', 'value' => 'Apa Saja yang Bisa Kita Pelajari?'],
            ['key' => 'program_subtitle', 'value' => 'Metode santai yang disesuaikan khusus buat kamu.'],

            ['key' => 'tab1_name', 'value' => 'Langkah Awal'],
            ['key' => 'tab1_title', 'value' => 'Dasar yang Kokoh'],
            ['key' => 'tab1_subtitle', 'value' => 'Mulai dari nol dengan gembira.'],
            ['key' => 'tab1_desc1', 'value' => 'Kita bakal belajar huruf Hiragana dan Katakana pelan-pelan. Gak usah buru-buru, yang penting kamu ngerti.'],
            ['key' => 'tab1_desc2', 'value' => 'Nanti juga ada latihan kosakata dasar yang sering dipakai sehari-hari.'],
            ['key' => 'tab1_stats', 'value' => 'Huruf Dasar • Kosakata Harian • Santai'],
            ['key' => 'tab1_badge', 'value' => 'Kohai 🌱'],
            ['key' => 'tab1_image', 'value' => '/images/benkyou_tab1.png'],

            ['key' => 'tab2_name', 'value' => 'Langkah Tengah'],
            ['key' => 'tab2_title', 'value' => 'Mulai Percakapan'],
            ['key' => 'tab2_subtitle', 'value' => 'Belajar ngobrol yang asyik.'],
            ['key' => 'tab2_desc1', 'value' => 'Di sini kita akan merangkai kalimat jadi lebih panjang dan bermakna.'],
            ['key' => 'tab2_desc2', 'value' => 'Kamu bakal bisa ngerti anime tanpa subtitle dikit-dikit!'],
            ['key' => 'tab2_stats', 'value' => 'Ngobrol • Nonton Anime • Tata Bahasa'],
            ['key' => 'tab2_badge', 'value' => 'Senpai ⚡'],
            ['key' => 'tab2_image', 'value' => '/images/benkyou_tab2.png'],

            ['key' => 'tab3_name', 'value' => 'Langkah Mahir'],
            ['key' => 'tab3_title', 'value' => 'Lancar Jaya'],
            ['key' => 'tab3_subtitle', 'value' => 'Siap ngobrol sama orang Jepang asli.'],
            ['key' => 'tab3_desc1', 'value' => 'Ini tahap paling keren, bahasamu udah selevel sama native!'],
            ['key' => 'tab3_desc2', 'value' => 'Kita akan banyak latihan nulis dan baca kanji susah bersama-sama.'],
            ['key' => 'tab3_stats', 'value' => 'Lancar • Keren • Percaya Diri'],
            ['key' => 'tab3_badge', 'value' => 'Shogun 👑'],
            ['key' => 'tab3_image', 'value' => '/images/benkyou_tab3.png'],

            // Modul Cards
            ['key' => 'modul_title', 'value' => 'Modul Spesial Buatmu'],
            ['key' => 'modul_subtitle', 'value' => 'Pilih mana aja yang mau kamu pelajari duluan.'],
            
            ['key' => 'prog1_title', 'value' => 'Huruf & Kanji'],
            ['key' => 'prog1_subtitle', 'value' => 'Kana, Kanji & Cara Menulis'],
            ['key' => 'prog1_desc', 'value' => 'Belajar coretan huruf Hiragana, Katakana, dan Kanji dengan cara yang seru — ada visualisasi lucu biar gampang ingat!'],
            ['key' => 'prog1_badge', 'value' => 'Menulis & Kanji'],

            ['key' => 'prog2_title', 'value' => 'Tata Bahasa'],
            ['key' => 'prog2_subtitle', 'value' => 'Pola Kalimat & Konjugasi'],
            ['key' => 'prog2_desc', 'value' => 'Racik kalimatmu sendiri kayak bikin resep rahasia~ Dari partikel dasar sampai pola yang bikin kamu terdengar kayak native!'],
            ['key' => 'prog2_badge', 'value' => 'Grammar & Percakapan'],

            ['key' => 'prog3_title', 'value' => 'My Journey'],
            ['key' => 'prog3_subtitle', 'value' => 'Tantangan Naik Level'],
            ['key' => 'prog3_desc', 'value' => 'Dari Kohai sampai Shogun — setiap tantangan yang kamu selesaikan buka reward spesial. Ada pesan rahasia di setiap level!'],
            ['key' => 'prog3_badge', 'value' => 'Gelar & Reward'],

            // Methods (Aspects)
            ['key' => 'method_title', 'value' => 'Cara Belajar Asyik'],
            ['key' => 'method_subtitle', 'value' => 'Klik kartu buat tahu lebih lanjut ya!'],

            ['key' => 'aspect1_title', 'value' => 'Mulai dari yang Mudah Dulu~'],
            ['key' => 'aspect1_desc', 'value' => 'Nggak perlu langsung jago! Kita mulai dari huruf paling dasar, pelan-pelan aja. Yang penting kamu enjoy dan nggak merasa terbebani.'],
            ['key' => 'aspect1_point1', 'value' => 'Nggak ada tes masuk'],
            ['key' => 'aspect1_point2', 'value' => 'Mulai dari nol pun bisa'],
            ['key' => 'aspect1_point3', 'value' => 'Progress sesuai kecepatanmu sendiri'],

            ['key' => 'aspect2_title', 'value' => 'Belajar Kapan Aja, di Mana Aja'],
            ['key' => 'aspect2_desc', 'value' => 'Buka HP, langsung bisa belajar. Nggak perlu jadwal kaku — kamu yang tentuin kapan mau latihan. Mau tengah malam juga boleh~'],
            ['key' => 'aspect2_point1', 'value' => 'Akses 24/7 dari mana aja'],
            ['key' => 'aspect2_point2', 'value' => 'Kuis acak biar nggak bosen'],
            ['key' => 'aspect2_point3', 'value' => 'Nggak ada deadline yang bikin stres'],

            ['key' => 'aspect3_title', 'value' => 'Setiap Langkah Ada Hadiahnya'],
            ['key' => 'aspect3_desc', 'value' => 'Setiap kali kamu selesai satu tantangan, kamu naik level dan buka reward baru — dari tema cantik sampai pesan rahasia!'],
            ['key' => 'aspect3_point1', 'value' => 'Naik gelar: Kohai → Shogun'],
            ['key' => 'aspect3_point2', 'value' => 'Unlock tema eksklusif'],
            ['key' => 'aspect3_point3', 'value' => 'Pesan surprise di setiap level'],

            ['key' => 'aspect4_title', 'value' => 'Feedback Instan + Kejutan'],
            ['key' => 'aspect4_desc', 'value' => 'Setiap jawaban langsung dikasih tahu bener atau nggak — plus penjelasan yang gampang dimengerti. Kayak punya tutor pribadi 24 jam!'],
            ['key' => 'aspect4_point1', 'value' => 'Nilai langsung muncul'],
            ['key' => 'aspect4_point2', 'value' => 'Penjelasan ramah, bukan textbook'],
            ['key' => 'aspect4_point3', 'value' => 'Ada Easter egg tersembunyi~'],

            // Roadmap
            ['key' => 'roadmap_title', 'value' => 'Roadmap Perjalananmu~'],
            ['key' => 'roadmap_subtitle', 'value' => 'Dari Kohai sampai Shogun 🌸'],
            ['key' => 'roadmap1_title', 'value' => 'Kenalan sama Huruf Jepang'],
            ['key' => 'roadmap1_desc', 'value' => 'Hiragana, Katakana, dan Kanji dasar.'],
            ['key' => 'roadmap2_title', 'value' => 'Latihan Seru Setiap Hari'],
            ['key' => 'roadmap2_desc', 'value' => 'Kuis acak, tantangan naik level~'],
            ['key' => 'roadmap3_title', 'value' => 'Tantangan Seru dengan Reward'],
            ['key' => 'roadmap3_desc', 'value' => 'Setiap level buka hadiah spesial~'],

            // News
            ['key' => 'news1_title', 'value' => '💌 Surat rahasia baru udah ditambahkan di Level 3 — coba selesaikan tantangannya!'],
            ['key' => 'news1_date', 'value' => 'Juli 2026'],
            ['key' => 'news1_type', 'value' => 'SURPRISE'],
            ['key' => 'news2_title', 'value' => '🎵 Challenge baru: Coba terjemahin lirik lagu J-Pop favoritmu!'],
            ['key' => 'news2_date', 'value' => 'Juli 2026'],
            ['key' => 'news2_type', 'value' => 'FUN'],
            ['key' => 'news3_title', 'value' => '✈️ Kalau kamu sampai Level Shogun, ada hadiah spesial menunggumu~'],
            ['key' => 'news3_date', 'value' => 'Rahasia'],
            ['key' => 'news3_type', 'value' => 'MYSTERY'],

            // Testimonials / Catatan Kecil
            ['key' => 'testi_title', 'value' => 'Catatan Kecil'],
            ['key' => 'testi_subtitle', 'value' => 'Sedikit cerita tentang perjalanan kita.'],

            // CTA Bottom
            ['key' => 'cta_title', 'value' => 'Siap Mulai Petualanganmu?'],
            ['key' => 'cta_desc', 'value' => 'Dunia kecil ini udah siap menunggumu. Mulai dari huruf pertama, dan siapa tahu... suatu hari kita ke Jepang bareng~ 🌸'],
            ['key' => 'cta_button_text', 'value' => 'Yuk Mulai! 💕'],
            ['key' => 'cta_button_sub', 'value' => 'Masuk ke Dunia Kecil Kita'],

            // Footer
            ['key' => 'footer_desc', 'value' => 'Sebuah dunia kecil penuh huruf, kata, dan cerita dalam bahasa Jepang — dibuat dengan sepenuh hati untuk seseorang yang spesial.'],
            ['key' => 'footer_love_text', 'value' => 'Dibuat dengan 💕 untuk ulang tahunmu. Juli 2026'],
            ['key' => 'footer_about', 'value' => 'Ini bukan platform belajar biasa. Ini adalah hadiah kecil dari aku untukmu — berisi ratusan jam usaha, coding, dan cinta. Semoga kamu suka ya~ 💕'],

            // Header / Auth links
            ['key' => 'header_dashboard_text', 'value' => 'Dasbor Belajar'],
            ['key' => 'header_login_text', 'value' => 'Masuk'],
            ['key' => 'header_register_text', 'value' => 'Daftar Sekarang'],

            // Hero Video Modal
            ['key' => 'hero_video_btn_text', 'value' => 'Tonton Video Intro'],
            ['key' => 'hero_video_url', 'value' => 'https://id.kumonglobal.com/wp-content/uploads/2024/01/video-intro-kumon.mp4'],
            ['key' => 'hero_video_label', 'value' => 'Video Pengenalan Benkyou — Dunia Kecil Untukmu'],
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
            ['key' => 'testi_fallback', 'value' => 'Catatan-catatan kecil akan muncul di sini~ ✨'],
            ['key' => 'roadmap_link_text', 'value' => 'Lihat perjalanan lengkap yang menunggumu'],
            ['key' => 'news_link_text', 'value' => 'Baca artikel'],

            // Footer labels
            ['key' => 'footer_nav_header', 'value' => 'Navigasi'],
            ['key' => 'footer_creator_header', 'value' => 'Dari Pembuat'],
            ['key' => 'footer_copy_text', 'value' => '© 2026 Benkyou — Made with 💕 for someone special.'],
            ['key' => 'footer_made_with', 'value' => 'Dibuat dengan'],
            ['key' => 'footer_for_learners', 'value' => 'untuk pembelajar Bahasa Jepang.'],

            // Branding, Meta & Additional Links
            ['key' => 'site_title', 'value' => 'Benkyou — Untukmu, yang Spesial 🌸'],
            ['key' => 'site_meta_desc', 'value' => 'Sebuah dunia kecil berisi huruf, kata, dan cerita dalam bahasa Jepang — dibuat khusus untukmu.'],
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
