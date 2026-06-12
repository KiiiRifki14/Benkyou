<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class JLPTN5QuestionsSeeder extends Seeder
{
    public function run(): void
    {
        // ---------- 1️⃣ Parsing Typing & Reading ----------
        $reTyPath = base_path('Bank Soal/Database Bank Soal JLPT N5 - RE&TY.md');
        if (file_exists($reTyPath)) {
            $reTyContent = file_get_contents($reTyPath);
            $blocks = preg_split('/(?=Soal\s+\d+)/i', $reTyContent);
            array_shift($blocks);               // buang header

            $typingCount = 0;
            $readingCount = 0;
            $failedCount = 0;

            foreach ($blocks as $block) {
                $block = trim($block);
                if (empty($block)) continue;

                // Tipe soal
                if (!preg_match('/Tipe\s+Soal:\s*(.*?)(?=Level\s*\/)/is', $block, $typeMatch)) {
                    $this->command->warn('Tidak dapat menemukan Tipe Soal pada blok: '.substr($block,0,80));
                    $failedCount++;
                    continue;
                }
                $tipeSoal = strtolower(trim($typeMatch[1]));

                // ---------------- Typing ----------------
                if (stripos($tipeSoal, 'typing') !== false || stripos($tipeSoal, 'ketik') !== false) {
                    $pattern = '/Soal\s+(\d+)\s*'
                             . 'Kategori:\s*(.*?)\s*'
                             . 'Tipe\s+Soal:\s*(.*?)\s*'
                             . 'Level\s*\/\s*Tahap\s*\(Ujian\):\s*(\d+)\s*'
                             . 'Pertanyaan:\s*(.*?)\s*'
                             . 'Jawaban\s+Benar\s*(?:\(Gunakan\s+koma\s+jika\s+ada\s+beberapa\s+kemungkinan\))?:\s*(.*?)\s*'
                             . 'Penjelasan:\s*(.*)$/s';
                    if (preg_match($pattern, $block, $m)) {
                        $answers = array_values(array_filter(array_map('trim', explode(',', $m[6]))));
                        Question::create([
                            'type'          => 'n5',
                            'question_type' => 'typing',
                            'level_id'      => (int) $m[4],
                            'question'      => trim($m[5]),
                            'answer'        => $answers,
                            'explanation'   => trim($m[7]),
                            'options'       => null,
                            'context'       => null,
                        ]);
                        $typingCount++;
                    } else {
                        $this->command->warn('Parse Typing gagal: '.substr($block,0,100));
                        $failedCount++;
                    }
                    continue;
                }

                // ---------------- Reading ----------------
                if (stripos($tipeSoal, 'reading') !== false || stripos($tipeSoal, 'membaca') !== false) {
                    $pattern = '/Soal\s+(\d+)\s*'
                             . 'Kategori:\s*(.*?)\s*'
                             . 'Tipe\s+Soal:\s*(.*?)\s*'
                             . 'Level\s*\/\s*Tahap\s*\(Ujian\):\s*(\d+)\s*'
                             . 'Pertanyaan:\s*(.*?)\s*'
                             . 'Konteks\s*\/\s*Paragraf\s*Bacaan:\s*(.*?)\s*'
                             . 'Pilihan\s*1:\s*(.*?)\s*'
                             . 'Pilihan\s*2:\s*(.*?)\s*'
                             . 'Pilihan\s*3:\s*(.*?)\s*'
                             . 'Pilihan\s*4:\s*(.*?)\s*'
                             . 'Jawaban\s+Benar\s*:\s*(.*?)\s*'
                             . 'Penjelasan:\s*(.*?)$/s';
                    if (preg_match($pattern, $block, $m)) {
                        $options = [trim($m[7]), trim($m[8]), trim($m[9]), trim($m[10])];
                        Question::create([
                            'type'          => 'n5',
                            'question_type' => 'reading',
                            'level_id'      => (int) $m[4],
                            'question'      => trim($m[5]),
                            'context'       => trim($m[6]),
                            'options'       => $options,
                            'answer'        => trim($m[11]),
                            'explanation'   => trim($m[12]),
                        ]);
                        $readingCount++;
                    } else {
                        $this->command->warn('Parse Reading gagal: '.substr($block,0,100));
                        $failedCount++;
                    }
                    continue;
                }

                // ---------------- Unknown ----------------
                $this->command->warn("Tipe tidak dikenali: '{$tipeSoal}'");
                $failedCount++;
            }

            $this->command->info('--- Typing & Reading selesai ---');
            $this->command->info("✔ Typing  : {$typingCount}");
            $this->command->info("✔ Reading : {$readingCount}");
        }

        // ---------- 2️⃣ Parsing Pilihan Ganda (PG) ----------
        $pgPath = base_path('Bank Soal/Database Bank Soal JLPT N5.md');
        if (!file_exists($pgPath)) {
            $this->command->error("File PG tidak ditemukan: {$pgPath}");
            return;
        }

        $pgContent = file_get_contents($pgPath);
        $pgBlocks = preg_split('/(?=Soal\s+\d+)/i', $pgContent);
        array_shift($pgBlocks); // buang header

        $pgCount = 0;
        foreach ($pgBlocks as $block) {
            $block = trim($block);
            if (empty($block)) continue;

            // Pola umum PG – gunakan contoh level‑1 yang ada di file
            $pattern = '/Soal\s+(\d+)\s*'
                     . 'Kategori:\s*(.*?)\s*'
                     . 'Level\s*\/\s*Tahap\s*\(Ujian\):\s*(\d+)\s*'
                     . 'Pertanyaan:\s*(.*?)\s*'
                     . 'Pilihan\s*1:\s*(.*?)\s*'
                     . 'Pilihan\s*2:\s*(.*?)\s*'
                     . 'Pilihan\s*3:\s*(.*?)\s*'
                     . 'Pilihan\s*4:\s*(.*?)\s*'
                     . 'Jawaban\s+Benar:\s*(.*?)\s*'
                     . 'Penjelasan:\s*(.*)$/s';

            if (preg_match($pattern, $block, $m)) {
                $options = [trim($m[5]), trim($m[6]), trim($m[7]), trim($m[8])];
                Question::create([
                    'type'          => 'n5',
                    'question_type' => 'pg',
                    'level_id'      => (int) $m[3],
                    'question'      => trim($m[4]),
                    'options'       => $options,
                    'answer'        => trim($m[9]),
                    'explanation'   => trim($m[10]),
                    'context'       => null,
                ]);
                $pgCount++;
            } else {
                $this->command->warn('Parse PG gagal: '.substr($block,0,80));
            }
        }

        // ---------- Ringkasan ----------
        $total = $typingCount + $readingCount + $pgCount;
        $this->command->info('─────────────────────────────────────────────');
        $this->command->info('Selesai! Berhasil insert:');
        $this->command->info("  ✔ Typing  : {$typingCount} soal");
        $this->command->info("  ✔ Reading : {$readingCount} soal");
        $this->command->info("  ✔ PG      : {$pgCount} soal");
        $this->command->info("  Total    : {$total} soal");
        $this->command->info('─────────────────────────────────────────────');
    }
}
