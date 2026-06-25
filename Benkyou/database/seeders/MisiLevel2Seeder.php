<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class MisiLevel2Seeder extends Seeder
{
    public function run()
    {
        $filePath = base_path('Bank Soal/Soal/Bank_Soal_Level2_MyJourney_N4.md');
        
        if (!File::exists($filePath)) {
            $this->command->error("File soal tidak ditemukan di: {$filePath}");
            return;
        }

        $content = File::get($filePath);
        
        // Hapus soal N4 lama agar tidak duplikat jika dijalankan berkali-kali
        Question::where('type', 'n4')->delete();

        // Pisahkan teks per soal berdasarkan kata "Soal "
        $blocks = preg_split('/^Soal\s+\d+\.\d+\s*$/m', $content, -1, PREG_SPLIT_NO_EMPTY);
        
        $inserted = 0;

        foreach ($blocks as $block) {
            $block = trim($block);
            if (empty($block)) continue;
            if (str_starts_with($block, '##')) continue; // Skip storyline markers

            $data = [
                'type' => 'n4',
                'question_type' => 'multiple-choice',
                'question' => '',
                'options' => [],
                'answer' => '',
                'explanation' => null,
                'context' => null,
                'spokenText' => null,
                'speechLang' => null,
                'imageUrl' => null,
                'level_id' => 1,
                'extra_attributes' => null,
            ];

            // Parsing baris per baris
            preg_match('/Tahap:\s*(\d+)/', $block, $m);
            if(isset($m[1])) $data['level_id'] = (int) $m[1];

            preg_match('/Type:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1])) $data['type'] = trim($m[1]);

            preg_match('/Question Type:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1])) $data['question_type'] = trim($m[1]);

            preg_match('/Question:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1])) $data['question'] = trim($m[1]);

            preg_match('/Answer:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1]) && trim($m[1]) !== 'null') $data['answer'] = trim($m[1]);

            preg_match('/Explanation:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1]) && trim($m[1]) !== 'null') $data['explanation'] = trim($m[1]);

            preg_match('/Context:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1]) && trim($m[1]) !== 'null') $data['context'] = trim($m[1]);

            preg_match('/Spoken Text:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1]) && trim($m[1]) !== 'null') $data['spokenText'] = trim($m[1]);

            preg_match('/Speech Lang:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1]) && trim($m[1]) !== 'null') $data['speechLang'] = trim($m[1]);

            // Untuk Image URL, abaikan backticks ` jika ada
            preg_match('/Image URL:\s*([^\r\n]+)/', $block, $m);
            if(isset($m[1]) && trim($m[1]) !== 'null') {
                $data['imageUrl'] = str_replace('`', '', trim($m[1]));
            }

            // Parsing Options jika ada
            if (preg_match('/Options:\s*(.*?)(?=Answer:)/s', $block, $m)) {
                $optionsText = trim($m[1]);
                if ($optionsText !== 'null' && !empty($optionsText)) {
                    preg_match_all('/-\s*(?:[A-D]\)\s*)?([^\r\n]+)/', $optionsText, $optM);
                    if (!empty($optM[1])) {
                        $optionsArr = array_map('trim', $optM[1]);
                        $data['options'] = $optionsArr;
                    }
                }
            }

            // Parsing Extra Attributes (JSON blocks)
            if (preg_match('/Extra Attributes:\s*(.*?)$/s', $block, $m)) {
                $extraText = trim($m[1]);
                if ($extraText !== 'null') {
                    // Coba cari blok json di dalamnya
                    if (preg_match('/```json\s*(.*?)\s*```/s', $extraText, $jsonM)) {
                        $jsonStr = $jsonM[1];
                        $data['extra_attributes'] = json_decode($jsonStr, true);
                    }
                }
            }

            // Jika context kosong tapi ada multiline bacaan (karena format custom), kita cek manual
            if (preg_match('/Context:\s*```(.*?)```\s*Options/s', $block, $ctxM)) {
                $data['context'] = trim($ctxM[1]);
            }

            // Simpan ke DB jika valid (ada soal dan jawabannya/essay keyword)
            if (!empty($data['question'])) {
                Question::create($data);
                $inserted++;
            }
        }

        $this->command->info("Berhasil mengimpor {$inserted} soal Misi Level 2!");
    }
}
