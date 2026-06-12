<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuizSistemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = base_path('Bank Soal/50_Soal_Kuis_1_Sistem.md');
        if (!file_exists($filePath)) {
            $this->command->error("File kuis tidak ditemukan di: {$filePath}");
            return;
        }

        $content = file_get_contents($filePath);

        // Split by SOAL block. Each block starts with "### SOAL #"
        $blocks = preg_split('/(?=###\s*SOAL\s*#\d+)/i', $content);
        // The first block is header text, discard it
        array_shift($blocks);

        $insertedCount = 0;
        $skippedCount = 0;

        foreach ($blocks as $block) {
            $block = trim($block);
            if (empty($block)) continue;

            // Extract Pertanyaan
            $question = '';
            if (preg_match('/\*\*PERTANYAAN:\*\*\s*(.*?)\s*(?=\*\*PILIHAN JAWABAN:\*\*)/s', $block, $qMatch)) {
                $question = trim($qMatch[1]);
            }

            // Extract Options
            $options = [];
            if (preg_match('/\*\*PILIHAN JAWABAN:\*\*\s*(.*?)\s*(?=\*\*JAWABAN BENAR:\*\*)/s', $block, $oMatch)) {
                $optionsText = trim($oMatch[1]);
                preg_match_all('/-\s*#\d+\s*(.*)/', $optionsText, $optMatches);
                if (!empty($optMatches[1])) {
                    $options = array_map('trim', $optMatches[1]);
                }
            }

            // Extract Answer
            $answer = '';
            if (preg_match('/\*\*JAWABAN BENAR:\*\*\s*(.*?)\s*(?=\*\*PENJELASAN \(OPSIONAL\):\*\*|---|$)/s', $block, $aMatch)) {
                $answer = trim($aMatch[1]);
            }

            // Extract Explanation
            $explanation = null;
            if (preg_match('/\*\*PENJELASAN \(OPSIONAL\):\*\*\s*(.*?)\s*(?=---|$)/s', $block, $eMatch)) {
                $explanation = trim($eMatch[1]);
            }

            if (empty($question) || count($options) !== 4 || empty($answer)) {
                $this->command->warn("Gagal parse blok kuis: " . substr($block, 0, 100));
                continue;
            }

            // Check if question already exists in DB to prevent duplicates
            $exists = Question::where('question', $question)
                ->where('type', 'quiz')
                ->exists();

            if (!$exists) {
                Question::create([
                    'type' => 'quiz',
                    'question_type' => 'multiple-choice',
                    'question' => $question,
                    'options' => $options,
                    'answer' => $answer,
                    'explanation' => $explanation,
                ]);
                $insertedCount++;
            } else {
                $skippedCount++;
            }
        }

        $this->command->info("Selesai memproses kuis!");
        $this->command->info("✔ Berhasil dimasukkan: {$insertedCount} soal");
        $this->command->info("✔ Dilewati (sudah ada): {$skippedCount} soal");
    }
}
