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
            // Hero
            ['key' => 'hero_badge', 'value' => 'Yuk Belajar Bareng!'],
            ['key' => 'hero_title', 'value' => 'Ayo mulai perjalanan bahasamu hari ini, <span class="text-[var(--color-japan-red)] font-bold">buat kamu!</span>'],
            ['key' => 'hero_subtitle', 'value' => 'Temukan cara paling asyik dan santai buat belajar bahasa Jepang bareng aku.'],
            ['key' => 'hero_cta_text', 'value' => 'Mulai Belajar'],

            // Program Tabs
            ['key' => 'program_title', 'value' => 'Apa Saja yang Bisa Kita Pelajari?'],
            ['key' => 'program_subtitle', 'value' => 'Metode santai yang disesuaikan khusus buat kamu.'],

            ['key' => 'tab1_name', 'value' => 'Langkah Awal'],
            ['key' => 'tab1_title', 'value' => 'Dasar yang Kokoh'],
            ['key' => 'tab1_subtitle', 'value' => 'Mulai dari nol dengan gembira.'],
            ['key' => 'tab1_desc1', 'value' => 'Kita bakal belajar huruf Hiragana dan Katakana pelan-pelan. Gak usah buru-buru, yang penting kamu ngerti.'],
            ['key' => 'tab1_desc2', 'value' => 'Nanti juga ada latihan kosakata dasar yang sering dipakai sehari-hari.'],
            ['key' => 'tab1_stats', 'value' => 'Huruf Dasar • Kosakata Harian • Santai'],

            ['key' => 'tab2_name', 'value' => 'Langkah Tengah'],
            ['key' => 'tab2_title', 'value' => 'Mulai Percakapan'],
            ['key' => 'tab2_subtitle', 'value' => 'Belajar ngobrol yang asyik.'],
            ['key' => 'tab2_desc1', 'value' => 'Di sini kita akan merangkai kalimat jadi lebih panjang dan bermakna.'],
            ['key' => 'tab2_desc2', 'value' => 'Kamu bakal bisa ngerti anime tanpa subtitle dikit-dikit!'],
            ['key' => 'tab2_stats', 'value' => 'Ngobrol • Nonton Anime • Tata Bahasa'],

            ['key' => 'tab3_name', 'value' => 'Langkah Mahir'],
            ['key' => 'tab3_title', 'value' => 'Lancar Jaya'],
            ['key' => 'tab3_subtitle', 'value' => 'Siap ngobrol sama orang Jepang asli.'],
            ['key' => 'tab3_desc1', 'value' => 'Ini tahap paling keren, bahasamu udah selevel sama native!'],
            ['key' => 'tab3_desc2', 'value' => 'Kita akan banyak latihan nulis dan baca kanji susah bersama-sama.'],
            ['key' => 'tab3_stats', 'value' => 'Lancar • Keren • Percaya Diri'],

            // Modul Cards
            ['key' => 'modul_title', 'value' => 'Modul Spesial Buatmu'],
            ['key' => 'modul_subtitle', 'value' => 'Pilih mana aja yang mau kamu pelajari duluan.'],

            // Methods
            ['key' => 'method_title', 'value' => 'Cara Belajar Asyik'],
            ['key' => 'method_subtitle', 'value' => 'Klik kartu buat tahu lebih lanjut ya!'],

            // Testimonials / Catatan Kecil
            ['key' => 'testi_title', 'value' => 'Catatan Kecil'],
            ['key' => 'testi_subtitle', 'value' => 'Sedikit cerita tentang perjalanan kita.'],

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
