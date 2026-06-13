<?php
$filePath = 'd:/Benkyou/Benkyou/Bank Soal/Soal/Database Misi Level 1 - Lapar di Tokyo.md';
$content = file_get_contents($filePath);

// Hapus bagian atas sampai sebelum Soal 1.1
$content = preg_replace('/^.*?### Soal 1\.1/s', 'Soal 1.1', $content);

// Hapus footer setelah soal terakhir
$content = preg_replace('/✅ \*\*Total Soal:\*\* 24.*$/s', '', $content);

// Bersihkan bold Markdown
$content = str_replace('**', '', $content);

// Bersihkan heading Markdown untuk soal
$content = str_replace('### Soal ', 'Soal ', $content);

// Ganti Soal X.Y menjadi Soal X.Y dan tambahkan Tahap: X
$content = preg_replace_callback('/Soal (\d+)\.(\d+)/', function($m) {
    return "Soal " . $m[1] . "." . $m[2] . "\nTahap: " . $m[1];
}, $content);

// Bersihkan --- pembatas
$content = preg_replace('/^---\s*$/m', '', $content);

// Hapus spasi berlebih berturut-turut
$content = preg_replace("/\n{3,}/", "\n\n", $content);

// Hapus code block luar untuk json
// Tapi biarkan bentuk json murninya
// karena extra_attributes akan kita parsing dari teks
file_put_contents($filePath, trim($content));
echo "Selesai membersihkan file.";
