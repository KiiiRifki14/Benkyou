<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::firstOrCreate(
            ['email' => 'admin@benkyou.com'],
            [
                'name' => 'Admin Sensei',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        $student = User::firstOrCreate(
            ['email' => 'student@benkyou.com'],
            [
                'name' => 'Budi Pelajar',
                'password' => bcrypt('password'),
                'role' => 'student',
            ]
        );

        // Seed sample progress for student if empty
        if ($student->quizzes()->count() === 0) {
            $student->quizzes()->create(['score' => 8, 'total' => 10, 'category' => 'Vocabulary']);
            $student->quizzes()->create(['score' => 9, 'total' => 10, 'category' => 'Kanji']);
            $student->certifications()->create(['category' => 'n5', 'level' => 1, 'passed' => true, 'score' => 100]);
        }

        // Seed a sample "Catatan & Tips" from admin to student
        if ($student->notes()->count() === 0) {
            \App\Models\UserNote::create([
                'user_id'   => $student->id,
                'title'     => 'Selamat Datang di Benkyou! 🌸',
                'content'   => "Konnichiwa! Selamat datang di platform belajar bahasa Jepang Benkyou.\n\nDi sini kamu bisa mempelajari Hiragana, Katakana, Kanji, dan tata bahasa secara bertahap dan interaktif. Nikmati setiap proses belajarmu dan jangan ragu untuk mengulang materi!\n\nGanbatte kudasai! 🇯🇵✨",
                'date'      => now()->locale('id')->isoFormat('dddd, D MMMM YYYY'),
                'author_id' => $admin->id,
            ]);
        }

        $this->call([
            KanaSeeder::class,
            KanjiSeeder::class,
            VocabularySeeder::class,
            GrammarSeeder::class,
            QuestionSeeder::class,
            MisiLevel1Seeder::class,
            MisiLevel2Seeder::class,
            MisiLevel3Seeder::class,
            MisiLevel4Seeder::class,
            MisiLevel5Seeder::class,
            LandingSettingSeeder::class,
        ]);
    }
}
