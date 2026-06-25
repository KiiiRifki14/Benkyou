<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\UserCertification;
use App\Services\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\ConnectionException;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class MissionController extends Controller
{
    // ──────────────────────────────────────────────
    // Title / Gelar Mapping
    // ──────────────────────────────────────────────
    // Backend keeps 'n5'–'n1' as canonical IDs.
    // The mapping below is sent to the frontend for display only.

    public const TITLE_MAP = [
        'n5' => [
            'id'       => 'n5',
            'order'    => 1,
            'title'    => 'Kohai',
            'subtitle' => 'Misi: Lapar di Tokyo',
            'goal'     => 'Bisa pesan Sushi & Ocha hangat 🍣',
            'emoji'    => '🔰',
            'reward'   => 'Tema Sakura + Pesan rahasia #1',
        ],
        'n4' => [
            'id'       => 'n4',
            'order'    => 2,
            'title'    => 'Senpai',
            'subtitle' => 'Misi: Tersesat Menuju Hana di Kyoto',
            'goal'     => 'Menemukan Hana di Kuil Fushimi Inari 🦊',
            'emoji'    => '🌸',
            'reward'   => 'Tema Matcha + Pesan rahasia #2',
        ],
        'n3' => [
            'id'       => 'n3',
            'order'    => 3,
            'title'    => 'Sensei',
            'subtitle' => 'Misi: Bertahan Bersama di Shibuya',
            'goal'     => 'Lulus wawancara magang di Café Shizuku ☕',
            'emoji'    => '⛩️',
            'reward'   => 'Tema Gunung Fuji + Pesan rahasia #3',
        ],
        'n2' => [
            'id'       => 'n2',
            'order'    => 4,
            'title'    => 'Tensai',
            'subtitle' => 'Misi: Kehidupan Bersama di Osaka',
            'goal'     => 'Mengungkapkan perasaan di Natsu Matsuri 🎆',
            'emoji'    => '🦊',
            'reward'   => 'Tema Autumn + Pesan rahasia #4',
        ],
        'n1' => [
            'id'       => 'n1',
            'order'    => 5,
            'title'    => 'Shogun',
            'subtitle' => 'Misi: Puncak Fuji & Surat yang Terkunci',
            'goal'     => 'Membuka surat cinta Hana di puncak Fuji 🗻',
            'emoji'    => '🏯',
            'reward'   => 'Midnight Theme + Surprise terbesar! 🎁',
        ],
    ];

    public const STAGE_MAP = [
        'n5' => [
            1 => 'Membaca Papan Nama 🚪',
            2 => 'Membaca Menu Dinding 📜',
            3 => 'Memesan dengan Sopan 🍣',
            4 => 'Membayar & Pamit 💴',
        ],
        'n4' => [
            1 => 'Salah Naik Bus 🚌',
            2 => 'Bertanya kepada Obaa-san Kimura 👵',
            3 => 'Membeli Tiket Baru 🎫',
            4 => 'Navigasi Terakhir 🗺️',
            5 => 'Janji di Osaka 🌸',
        ],
        'n3' => [
            1 => 'Menulis Surat Lamaran 📝',
            2 => 'Wawancara Kerja 👔',
            3 => 'Hari Pertama Kerja (Hampir Menyerah) 🦊',
            4 => 'Membuktikan Diri ✨',
        ],
        'n2' => [
            1 => 'Adaptasi dengan Kansai-ben 🗣️',
            2 => 'Kehidupan Sehari-hari 🏠',
            3 => 'Persiapan Matsuri 👘',
            4 => 'Malam Festival 🎆',
        ],
        'n1' => [
            1 => 'Membaca Papan & Aturan Pendakian 🗻',
            2 => 'Pengumuman Darurat di Pos 7 ⚠️',
            3 => 'Percakapan dengan Pemandu 🥾',
            4 => 'Langkah Terakhir ke Puncak 🏔️',
        ],
    ];

    // ──────────────────────────────────────────────
    // Routes
    // ──────────────────────────────────────────────

    /**
     * GET /student/missions
     *
     * Overview page — shows all titles/levels with progress.
     */
    public function index(Request $request): InertiaResponse
    {
        $user = $request->user();

        // Gather per-level stats for the current user.
        $levelStats = collect(self::TITLE_MAP)
            ->sortBy('order')
            ->map(function (array $meta, string $levelId) use ($user) {
                $totalQuestions = Question::certification($levelId)->count();

                $userCert = $user
                    ->certifications()
                    ->where('category', $levelId)
                    ->orderByDesc('level')
                    ->first();

                return [
                    ...$meta,
                    'totalQuestions'  => $totalQuestions,
                    'highestCleared'  => $userCert?->level ?? 0,
                    'bestScore'       => $userCert?->score ?? 0,
                    'passed'          => (bool) ($userCert?->passed ?? false),
                ];
            })
            ->values()
            ->all();

        return Inertia::render('Student/Missions', [
            'levels'     => $levelStats,
            'titleMap'   => self::TITLE_MAP,
        ]);
    }

    /**
     * GET /student/missions/{level}
     *
     * Level detail — shows sub-levels (tahap ujian) inside a title.
     * e.g. /student/missions/n5
     */
    public function showLevel(Request $request, string $level): InertiaResponse
    {
        abort_unless(
            array_key_exists($level, self::TITLE_MAP),
            404,
            "Level '{$level}' tidak ditemukan."
        );

        $meta = self::TITLE_MAP[$level];

        $subLevels = Question::certification($level)
            ->selectRaw('level_id, COUNT(*) as question_count')
            ->groupBy('level_id')
            ->orderBy('level_id')
            ->get()
            ->map(function ($row) use ($level) {
                $subId = (int) $row->level_id;
                $title = self::STAGE_MAP[$level][$subId] ?? "Tahap {$subId}";
                return [
                    'id'             => $subId,
                    'title'          => $title,
                    'questionCount'  => (int) $row->question_count,
                ];
            })
            ->all();

        $user = $request->user();
        $userCerts = $user
            ->certifications()
            ->where('category', $level)
            ->get()
            ->keyBy('level')
            ->map(fn ($cert) => [
                'passed' => (bool) $cert->passed,
                'score'  => (int) $cert->score,
            ])
            ->toArray();

        return Inertia::render('Student/MissionLevel', [
            'meta'       => $meta,
            'subLevels'  => $subLevels,
            'userCerts'  => $userCerts,
        ]);
    }

    /**
     * GET /student/missions/{level}/{subLevel}/start
     *
     * Fetch all questions for a sub-level, randomised, mixed types.
     * Returns data to the frontend for dynamic rendering.
     * e.g. /student/missions/n5/1/start
     */
    public function startMission(Request $request, string $level, int $subLevel): InertiaResponse
    {
        abort_unless(
            array_key_exists($level, self::TITLE_MAP),
            404,
            "Level '{$level}' tidak ditemukan."
        );

        $questions = Question::certification($level)
            ->forLevel($subLevel)
            ->orderBy('id', 'asc')
            ->get()
            ->map(fn (Question $q) => $this->formatQuestion($q))
            ->values()
            ->all();

        abort_if(empty($questions), 404, 'Tidak ada soal untuk level ini.');

        // Log activity
        ActivityLogger::missionStarted($level, $subLevel);

        $meta = self::TITLE_MAP[$level];

        return Inertia::render('Student/MissionPlay', [
            'meta' => [
                ...$meta,
                'subLevel' => $subLevel,
            ],
            'questions'    => $questions,
            'totalQuestions' => count($questions),
            'passingScore' => 70,
        ]);
    }

    // ──────────────────────────────────────────────
    // Private Helpers
    // ──────────────────────────────────────────────

    /**
     * Normalise a Question model into a clean array for the frontend.
     * Handles both legacy ('multiple-choice' / 'pg') and new types.
     */
    private function formatQuestion(Question $q): array
    {
        // Unified question_type — frontend sees 'multiple-choice' for both 'pg' and 'multiple-choice'.
        $questionType = in_array($q->question_type, ['pg', 'multiple-choice'], true)
            ? 'multiple-choice'
            : $q->question_type;

        $base = [
            'id'            => $q->id,
            'question_type' => $questionType,
            'question'      => $q->question,
            'answer'        => $q->answer,
            'explanation'   => $q->explanation,
            'extra_attributes' => $q->extra_attributes,
        ];

        return match ($questionType) {
            'multiple-choice' => [
                ...$base,
                'options' => $q->options ?? [],
            ],
            'typing' => [
                ...$base,
                'options' => null,
            ],
            'reading' => [
                ...$base,
                'options' => $q->options ?? [],
                'context' => $q->context,
            ],
            'listening' => [
                ...$base,
                'options'    => $q->options ?? [],
                'spokenText' => $q->spokenText,
                'speechLang' => $q->speechLang ?? 'ja-JP',
            ],
            'image' => [
                ...$base,
                'options'  => $q->options ?? [],
                'imageUrl' => $q->imageUrl,
            ],
            'essay' => [
                ...$base,
                'options' => null,
                // essay-specific fields live inside extra_attributes
                'sample_answer' => $q->extra('sample_answer'),
                'keywords'      => $q->extra('keywords', []),
                'rubric'        => $q->extra('rubric'),
                'max_length'    => $q->extra('max_length'),
                'min_length'    => $q->extra('min_length'),
            ],
            default => $base,
        };
    }

    /**
     * POST /student/missions/{level}/{subLevel}/submit
     * Save the mission score and check for rewards.
     */
    public function submitScore(Request $request, string $level, int $subLevel): JsonResponse
    {
        $request->validate([
            'score' => 'required|numeric|min:0|max:100',
        ]);

        $score = (int) $request->input('score');
        $passed = $score >= 70;
        
        $certification = UserCertification::updateOrCreate(
            ['user_id' => $request->user()->id, 'category' => $level, 'level' => $subLevel],
            ['score' => $score, 'passed' => $passed]
        );

        // Log activity
        ActivityLogger::missionCompleted($level, $subLevel, $score, 100, $passed);

        $rewardData = null;
        if ($passed) {
            $rewardData = [
                'type' => 'voucher',
                'title' => 'Voucher Rahasia Terbuka! 🎉',
                'message' => 'Voucher Gratis Traktir Seblak 1x (Klaim ke Admin ya!)',
                'theme_unlocked' => self::TITLE_MAP[$level]['reward'] ?? 'Tema Spesial'
            ];
        }

        return response()->json([
            'success' => true,
            'passed' => $passed,
            'reward' => $rewardData
        ]);
    }


    /**
     * Menilai jawaban esai pengguna menggunakan kecocokan kata kunci (tanpa AI pihak ketiga).
     */
    public function gradeEssay(Question $question, string $userAnswer): array
    {
        $extra = $question->extra_attributes ?? [];
        $keywords = $extra['essay_keywords'] ?? [];
        
        if (empty($keywords)) {
            return [
                'score' => 100,
                'feedback' => 'Jawaban esaimu telah dikumpulkan dan dicatat! ✨'
            ];
        }

        $matchedCount = 0;
        $cleanUserAnswer = mb_strtolower(trim($userAnswer));

        foreach ($keywords as $keyword) {
            if (str_contains($cleanUserAnswer, mb_strtolower(trim($keyword)))) {
                $matchedCount++;
            }
        }

        $percentage = (int) (($matchedCount / count($keywords)) * 100);
        
        return [
            'score' => $percentage,
            'feedback' => "Kamu berhasil menuliskan {$matchedCount} dari " . count($keywords) . " kata kunci penting yang diharapkan."
        ];
    }

    /**
     * Endpoint for frontend to trigger essay grading.
     */
    public function gradeEssayEndpoint(Request $request, Question $question): JsonResponse
    {
        $request->validate(['answer' => 'required|string']);
        $result = $this->gradeEssay($question, $request->input('answer'));
        return response()->json($result);
    }
}
