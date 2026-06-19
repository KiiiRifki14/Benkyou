<?php

namespace App\Services;

use App\Models\UserActivity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogger
{
    /**
     * Log an activity for the currently authenticated user.
     */
    public static function log(
        string $action,
        string $category,
        string $description,
        ?array $meta = null
    ): void {
        $user = Auth::user();
        if (!$user) return;

        UserActivity::create([
            'user_id'     => $user->id,
            'action'      => $action,
            'category'    => $category,
            'description' => $description,
            'meta'        => $meta,
            'ip_address'  => Request::ip(),
        ]);
    }

    /**
     * Log a quiz completion.
     */
    public static function quizCompleted(int $score, int $total, string $categoryLabel): void
    {
        self::log(
            'quiz_completed',
            'quiz',
            "Menyelesaikan Latihan Harian — Skor {$score}/{$total} ({$categoryLabel})",
            ['score' => $score, 'total' => $total, 'quiz_category' => $categoryLabel]
        );
    }

    /**
     * Log a mission/challenge start.
     */
    public static function missionStarted(string $level, int $subLevel): void
    {
        self::log(
            'mission_started',
            'mission',
            "Memulai tantangan {$level} — Tahap {$subLevel}",
            ['level' => $level, 'sub_level' => $subLevel]
        );
    }

    /**
     * Log a mission completion.
     */
    public static function missionCompleted(string $level, int $subLevel, int $score, int $total, bool $passed): void
    {
        $status = $passed ? 'LULUS ✨' : 'belum lulus';
        self::log(
            'mission_completed',
            'mission',
            "Selesai tantangan {$level} Tahap {$subLevel} — {$status} ({$score}/{$total})",
            ['level' => $level, 'sub_level' => $subLevel, 'score' => $score, 'total' => $total, 'passed' => $passed]
        );
    }

    /**
     * Log a notes page view.
     */
    public static function notesViewed(): void
    {
        self::log(
            'notes_viewed',
            'notes',
            'Membaca Catatan Kecil 💌',
        );
    }

    /**
     * Log a learning page visit (kana/kanji/vocab/grammar).
     */
    public static function learningPageViewed(string $page): void
    {
        $labels = [
            'kana'       => 'Huruf Kana',
            'kanji'      => 'Karakter Kanji',
            'vocabulary' => 'Kosakata',
            'grammar'    => 'Tata Bahasa',
        ];
        $label = $labels[$page] ?? $page;

        self::log(
            'page_viewed',
            'learning',
            "Mengunjungi halaman {$label}",
            ['page' => $page]
        );
    }

    /**
     * Log general page views.
     */
    public static function pageViewed(string $page, ?string $label = null): void
    {
        self::log(
            'page_viewed',
            'general',
            $label ?? "Mengunjungi halaman {$page}",
            ['page' => $page]
        );
    }

    /**
     * Log login activity.
     */
    public static function loggedIn(): void
    {
        self::log(
            'login',
            'general',
            'Login ke aplikasi',
        );
    }
}
