<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Latihan Harian (Daily Quizzes)
        $quizzes = [
            [
                'type' => 'quiz',
                'question_type' => 'multiple-choice',
                'question' => 'Apa arti dari kosakata "ありがとう" (arigatou)?',
                'options' => ['Terima kasih', 'Selamat pagi', 'Selamat tinggal', 'Maaf'],
                'answer' => 'Terima kasih',
                'explanation' => 'Arigatou (ありがとう) adalah ucapan terima kasih informal dalam bahasa Jepang.',
            ],
            [
                'type' => 'quiz',
                'question_type' => 'multiple-choice',
                'question' => 'Manakah huruf Hiragana yang dibaca "su"?',
                'options' => ['す', 'さ', 'し', 'せ'],
                'answer' => 'す',
                'explanation' => 'す dibaca su. さ = sa, し = shi, せ = se.',
            ],
            [
                'type' => 'quiz',
                'question_type' => 'multiple-choice',
                'question' => 'Apa cara baca dari Kanji "猫" (Kucing)?',
                'options' => ['neko', 'inu', 'tori', 'sakana'],
                'answer' => 'neko',
                'explanation' => 'Kanji 猫 artinya kucing dan dibaca "neko".',
            ],
            [
                'type' => 'quiz',
                'question_type' => 'multiple-choice',
                'question' => 'Lengkapi kalimat: "私は学生____。"',
                'options' => ['です', 'ます', 'ください', 'に'],
                'answer' => 'です',
                'explanation' => 'です (desu) digunakan untuk mengakhiri kalimat nominal sopan.',
            ],
            [
                'type' => 'quiz',
                'question_type' => 'multiple-choice',
                'question' => 'Manakah arti dari kosakata "先生" (sensei)?',
                'options' => ['Guru/Dosen', 'Siswa', 'Dokter', 'Karyawan'],
                'answer' => 'Guru/Dosen',
                'explanation' => '先生 (sensei) berarti guru, pengajar, atau dosen.',
            ]
        ];

        foreach ($quizzes as $q) {
            Question::create($q);
        }

        // 2. Seed Certification Questions (N5 to N1)
        // We will seed 3 levels for N5, and 2 levels for N4-N1 to keep it clean and populated,
        // and allow admin to edit/add/delete them!
        $nLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];
        
        // N5 Questions are now seeded via JLPTN5QuestionsSeeder from the Markdown file.


        $n4Questions = [
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Lengkapi kalimat: "写真を_____もいいですか。"',
                'options' => ['撮って', '撮る', '撮った', '撮らない'],
                'answer' => '撮って',
                'explanation' => 'Pola ~te mo ii desu ka digunakan untuk meminta izin.',
            ],
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Apa arti dari Kanji "地震"?',
                'options' => ['Gempa bumi', 'Angin topan', 'Kecelakaan', 'Tsunami'],
                'answer' => 'Gempa bumi',
                'explanation' => '地震 (jishin) artinya gempa bumi.',
            ],
            [
                'level_id' => 2,
                'question_type' => 'multiple-choice',
                'question' => 'Lengkapi kalimat: "雨が_____そうです。"',
                'options' => ['降り', '降る', '降って', '降った'],
                'answer' => '降り',
                'explanation' => 'Pola masu-stem + sou desu digunakan untuk menyatakan nampaknya/kelihatannya.',
            ]
        ];

        foreach ($n4Questions as $q) {
            $q['type'] = 'n4';
            Question::create($q);
        }

        $n3Questions = [
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Lengkapi kalimat: "彼は今、家にいる_____です。"',
                'options' => ['はず', 'べき', 'つもり', 'わけ'],
                'answer' => 'はず',
                'explanation' => 'Pola ~hazu desu menunjukkan keyakinan tinggi atas suatu perkiraan.',
            ],
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Apa arti dari Kanji "kankyou" (環境)?',
                'options' => ['Lingkungan', 'Sumber daya', 'Pengaruh', 'Kondisi'],
                'answer' => 'Lingkungan',
                'explanation' => '環境 (kankyou) artinya lingkungan.',
            ]
        ];

        foreach ($n3Questions as $q) {
            $q['type'] = 'n3';
            Question::create($q);
        }

        $n2Questions = [
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Lengkapi kalimat: "天기에_____、予定を変更します。"',
                'options' => ['よって', 'ついて', '対して', 'とって'],
                'answer' => 'よって',
                'explanation' => 'Pola ~ni yotte berarti tergantung pada.',
            ],
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Apa arti dari Kanji "mujun" (矛盾)?',
                'options' => ['Kontradiksi', 'Kompromi', 'Kontribusi', 'Pengorbanan'],
                'answer' => 'Kontradiksi',
                'explanation' => '矛盾 (mujun) artinya kontradiksi.',
            ]
        ];

        foreach ($n2Questions as $q) {
            $q['type'] = 'n2';
            Question::create($q);
        }

        $n1Questions = [
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Lengkapi kalimat: "これ_____、本日の会議を終了します。"',
                'options' => ['をもちまして', 'にあたって', 'をかわきりに', 'にそくして'],
                'answer' => 'をもちまして',
                'explanation' => 'Pola o mochimashite digunakan dalam situasi sangat formal untuk menandakan penutupan.',
            ],
            [
                'level_id' => 1,
                'question_type' => 'multiple-choice',
                'question' => 'Apa arti dari Kanji "inpei" (隠蔽)?',
                'options' => ['Penyembunyian', 'Menghilangkan', 'Kekhawatiran', 'Penarikan'],
                'answer' => 'Penyembunyian',
                'explanation' => '隠蔽 (inpei) artinya penyembunyian.',
            ]
        ];

        foreach ($n1Questions as $q) {
            $q['type'] = 'n1';
            Question::create($q);
        }
    }
}
