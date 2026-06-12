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
            $student->notes()->create(['date' => 'Senin, 19 Mei 2026', 'content' => 'Hari ini belajar Hiragana dan Katakana dasar. Sangat menyenangkan!']);
            $student->certifications()->create(['category' => 'n5', 'level' => 1, 'passed' => true, 'score' => 100]);
        }

        $this->call([
            KanaSeeder::class,
            KanjiSeeder::class,
            VocabularySeeder::class,
            GrammarSeeder::class,
            QuestionSeeder::class,
            JLPTN5QuestionsSeeder::class,
            QuizSistemSeeder::class,
        ]);
    }
}
