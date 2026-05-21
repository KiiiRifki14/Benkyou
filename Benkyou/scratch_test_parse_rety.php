<?php

$filePath = __DIR__ . '/Bank Soal/Database Bank Soal JLPT N5 - RE&TY.md';
if (!file_exists($filePath)) {
    die("File not found: " . $filePath);
}

$content = file_get_contents($filePath);

// Split content by "Soal "
$blocks = preg_split('/(?=Soal\s+\d+)/i', $content);

echo "Found " . (count($blocks) - 1) . " raw blocks.\n";

$typingCount = 0;
$readingCount = 0;
$failedCount = 0;

$parsedQuestions = [];

for ($i = 1; $i < count($blocks); $i++) {
    $block = trim($blocks[$i]);
    
    // Determine type by looking for "Tipe Soal:"
    if (preg_match('/Tipe\s+Soal:\s*(.*?)(?=Level\s*\/)/i', $block, $typeMatch)) {
        $tipeSoal = trim($typeMatch[1]);
    } else {
        echo "Could not find Tipe Soal in block $i:\n" . substr($block, 0, 100) . "...\n";
        $failedCount++;
        continue;
    }

    if (stripos($tipeSoal, 'typing') !== false || stripos($tipeSoal, 'ketik') !== false) {
        // Typing Question Regex
        $pattern = '/Soal\s+(\d+)\s*Kategori:\s*(.*?)\s*Tipe\s+Soal:\s*(.*?)\s*Level\s*\/\s*Tahap\s*\(Ujian\):\s*(\d+)\s*Pertanyaan:\s*(.*?)\s*Jawaban\s+Benar\s*(?:\(Gunakan\s+koma\s+jika\s+ada\s+beberapa\s+kemungkinan\))?:\s*(.*?)\s*Penjelasan:\s*(.*?)$/s';
        
        if (preg_match($pattern, $block, $matches)) {
            $typingCount++;
            $parsedQuestions[] = [
                'soal_num' => $matches[1],
                'kategori' => $matches[2],
                'type' => 'typing',
                'level' => $matches[4],
                'question' => $matches[5],
                'answer' => array_map('trim', explode(',', $matches[6])),
                'explanation' => $matches[7]
            ];
        } else {
            echo "Failed to match typing block $i:\n" . substr($block, 0, 150) . "...\n";
            $failedCount++;
        }
    } else if (stripos($tipeSoal, 'reading') !== false || stripos($tipeSoal, 'membaca') !== false) {
        // Reading Question Regex
        $pattern = '/Soal\s+(\d+)\s*Kategori:\s*(.*?)\s*Tipe\s+Soal:\s*(.*?)\s*Level\s*\/\s*Tahap\s*\(Ujian\):\s*(\d+)\s*Pertanyaan:\s*(.*?)\s*Konteks\s*\/\s*Paragraf\s*Bacaan:\s*(.*?)\s*Pilihan\s*1:\s*(.*?)\s*Pilihan\s*2:\s*(.*?)\s*Pilihan\s*3:\s*(.*?)\s*Pilihan\s*4:\s*(.*?)\s*Jawaban\s+Benar\s*:\s*(.*?)\s*Penjelasan:\s*(.*?)$/s';
        
        if (preg_match($pattern, $block, $matches)) {
            $readingCount++;
            $parsedQuestions[] = [
                'soal_num' => $matches[1],
                'kategori' => $matches[2],
                'type' => 'reading',
                'level' => $matches[4],
                'question' => $matches[5],
                'context' => $matches[6],
                'options' => [trim($matches[7]), trim($matches[8]), trim($matches[9]), trim($matches[10])],
                'answer' => trim($matches[11]),
                'explanation' => $matches[12]
            ];
        } else {
            echo "Failed to match reading block $i:\n" . substr($block, 0, 150) . "...\n";
            $failedCount++;
        }
    } else {
        echo "Unknown Tipe Soal: $tipeSoal in block $i\n";
        $failedCount++;
    }
}

echo "Summary:\n";
echo "Typing: $typingCount\n";
echo "Reading: $readingCount\n";
echo "Failed: $failedCount\n";

if (count($parsedQuestions) > 0) {
    echo "First parsed question:\n";
    print_r($parsedQuestions[0]);
    echo "\nLast parsed question:\n";
    print_r(end($parsedQuestions));
}
