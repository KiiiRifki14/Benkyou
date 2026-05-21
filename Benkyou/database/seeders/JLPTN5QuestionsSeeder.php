<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class JLPTN5QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sourceDir = base_path('Bank Soal');
        $sourceFiles = glob($sourceDir . DIRECTORY_SEPARATOR . '*.md');

        if (!$sourceFiles) {
            $this->command->error('No markdown source files found in Bank Soal directory: ' . $sourceDir);
            return;
        }

        $typesToDelete = [];
        $questionsToInsert = [];

        foreach ($sourceFiles as $filePath) {
            $content = file_get_contents($filePath);
            $content = str_replace(["\r\n", "\r"], "\n", $content);
            $chunks = preg_split('/(?=Soal\s+\d+)/i', $content);

            if (!$chunks || count($chunks) === 0) {
                $this->command->error("Failed to split questions from {$filePath}");
                continue;
            }

            foreach ($chunks as $chunk) {
                if (trim($chunk) === '') {
                    continue;
                }

                if (!preg_match('/Soal\s+(\d+)/i', $chunk, $numberMatch)) {
                    continue;
                }

                $category = $this->extractField($chunk, '/Kategori:\s*(.*?)(?:Level\s*\/|Tipe\s*Soal:|Pertanyaan:|$)/is');
                $questionTypeRaw = $this->extractField($chunk, '/Tipe\s*Soal:\s*(.*?)\s*(?:Level\s*\/|Pertanyaan:|$)/is');
                $rawQuestion = $this->extractField($chunk, '/Pertanyaan:\s*(.*?)(?:Konteks\s*\/\s*Paragraf Bacaan:|Konteks:|Pilihan\s*1:|Jawaban\s*Benar:|Penjelasan:|$)/is');
                $context = $this->extractField($chunk, '/Konteks\s*\/\s*Paragraf Bacaan:\s*(.*?)(?:Pilihan\s*1:|Jawaban\s*Benar:|Penjelasan:|$)/is');
                $context = $context ?: $this->extractField($chunk, '/Konteks:\s*(.*?)(?:Pilihan\s*1:|Jawaban\s*Benar:|Penjelasan:|$)/is');
                $answer = $this->extractField($chunk, '/Jawaban\s*Benar(?:\s*\(.*?\))?\s*:\s*(.*?)(?:Penjelasan:|$)/is');
                $explanation = $this->extractField($chunk, '/Penjelasan:\s*(.*?)(?=Soal\s+\d+|LEVEL\s+\d+|$)/is');
                $level = $this->extractField($chunk, '/Level\s*\/\s*Tahap\s*\(Ujian\):\s*(\d+)/i');

                // Fallback: if context label wasn't present, try to detect an unlabeled Japanese paragraph
                if (empty($context)) {
                    // If the extracted rawQuestion contains a newline followed by Japanese text, split there
                    if (preg_match("/^(.*?)(?:\\r?\\n+)([\\p{Hiragana}\\p{Katakana}\\p{Han}].*)$/us", $rawQuestion, $m)) {
                        $rawQuestion = trim($m[1]);
                        $context = trim($m[2]);
                    } else {
                        // Otherwise, look for text after the question inside the chunk before options/answer/explanation
                        if (!empty($rawQuestion) && preg_match('/'.preg_quote($rawQuestion,'/').'(.+?)(?:Pilihan\\s*1:|Pilihan\\s*\\d+:|Jawaban\\s*Benar:|Penjelasan:|$)/isu', $chunk, $mm)) {
                            $possible = trim($mm[1]);
                            if ($possible !== '' && preg_match('/[\\p{Hiragana}\\p{Katakana}\\p{Han}]/u', $possible)) {
                                $context = trim($possible);
                                $rawQuestion = trim($rawQuestion);
                            }
                        }
                    }
                }

                $options = [];
                if (preg_match('/Pilihan\s*1:\s*(.*?)\s*Pilihan\s*2:\s*(.*?)\s*Pilihan\s*3:\s*(.*?)\s*Pilihan\s*4:\s*(.*?)(?:Jawaban\s*Benar:|Penjelasan:|$)/is', $chunk, $optionMatches)) {
                    $options = array_map('trim', array_slice($optionMatches, 1, 4));
                }

                $type = $this->normalizeCategory($category);
                $typesToDelete[] = $type;
                $questionType = $this->normalizeQuestionType($questionTypeRaw, $options);

                if (empty($rawQuestion) || empty($answer)) {
                    continue;
                }

                if ($questionType === 'typing') {
                    $answers = array_filter(array_map('trim', preg_split('/\s*,\s*/', $answer)), fn ($value) => $value !== '');
                    $answer = count($answers) > 1 ? array_values($answers) : ($answers[0] ?? trim($answer));
                } else {
                    $answer = trim($answer);
                }

                $questionsToInsert[] = [
                    'type' => $type,
                    'question_type' => $questionType,
                    'question' => trim($rawQuestion),
                    'options' => $options ?: null,
                    'answer' => $answer,
                    'explanation' => trim($explanation) ?: null,
                    'context' => trim($context) ?: null,
                    'level_id' => is_numeric($level) ? (int)$level : null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        $typesToDelete = array_unique(array_filter($typesToDelete));
        if (!empty($typesToDelete)) {
            $deletedCount = Question::whereIn('type', $typesToDelete)->delete();
            $this->command->info("Deleted {$deletedCount} old questions for types: " . implode(', ', $typesToDelete));
        }

        // Post-process questions before insert:
        // - remove any inline 'Jawaban' fragments from the question text (common in typing items)
        // - shuffle multiple-choice options so the correct answer is not always first
        // - group by level_id and shuffle order within each level

        // clean question text helper
        $cleanQuestions = [];
        foreach ($questionsToInsert as $q) {
            // remove any trailing 'Jawaban' blocks accidentally included in the question
            if (!empty($q['question'])) {
                $q['question'] = preg_replace('/\s*Jawaban(?:\s*Benar)?(?:\s*\(.*?\))?\s*:\s*.*$/is', '', $q['question']);
                $q['question'] = trim($q['question']);
            }

            // if multiple-choice with options, keep options order as in source (no seeder-time shuffling)
            if (!empty($q['options']) && is_array($q['options'])) {
                $originalOptions = $q['options'];
                $correct = is_array($q['answer']) ? $q['answer'][0] ?? null : $q['answer'];

                // normalize whitespace for comparison
                $normalized = fn($s) => mb_strtolower(trim((string)$s));
                // preserve original options order
                $q['options'] = array_values($originalOptions);
                if ($correct !== null) {
                    $q['answer'] = $correct;
                }
            }

            $cleanQuestions[] = $q;
        }

        // group by level_id and shuffle within each group
        $grouped = [];
        foreach ($cleanQuestions as $q) {
            $lvl = isset($q['level_id']) && $q['level_id'] !== null ? (string)$q['level_id'] : '_nolvl_';
            $grouped[$lvl][] = $q;
        }

        $insertedCount = 0;
        foreach ($grouped as $lvl => $questions) {
            // preserve canonical order from source; runtime shuffling happens in the frontend
            foreach ($questions as $questionData) {
                Question::create($questionData);
                $insertedCount++;
            }
        }

        $this->command->info("Successfully inserted {$insertedCount} questions from Bank Soal directory.");
    }

    private function extractField(string $text, string $pattern): string
    {
        if (preg_match($pattern, $text, $matches)) {
            return trim($matches[1]);
        }

        return '';
    }

    private function normalizeQuestionType(string $rawType, array $options): string
    {
        $rawType = strtolower(trim($rawType));

        if (str_contains($rawType, 'ketik') || str_contains($rawType, 'typing')) {
            return 'typing';
        }

        if (str_contains($rawType, 'membaca') || str_contains($rawType, 'reading')) {
            return 'reading';
        }

        if (!empty($options)) {
            return 'multiple-choice';
        }

        return $rawType !== '' ? preg_replace('/[^a-z0-9]+/', '-', $rawType) : 'multiple-choice';
    }

    private function normalizeCategory(string $category): string
    {
        $category = strtolower(trim($category));

        if (preg_match('/\bn5\b|jlpt\s*n5|sertifikasi\s*n5|n5\b/i', $category)) {
            return 'n5';
        }

        if (preg_match('/\bn4\b|jlpt\s*n4|sertifikasi\s*n4|n4\b/i', $category)) {
            return 'n4';
        }

        if (preg_match('/\bn3\b|jlpt\s*n3|sertifikasi\s*n3|n3\b/i', $category)) {
            return 'n3';
        }

        if (preg_match('/\bn2\b|jlpt\s*n2|sertifikasi\s*n2|n2\b/i', $category)) {
            return 'n2';
        }

        if (preg_match('/\bn1\b|jlpt\s*n1|sertifikasi\s*n1|n1\b/i', $category)) {
            return 'n1';
        }

        if (preg_match('/quiz|pilihan ganda|multiple-choice/i', $category)) {
            return 'quiz';
        }

        return 'n5';
    }
}
