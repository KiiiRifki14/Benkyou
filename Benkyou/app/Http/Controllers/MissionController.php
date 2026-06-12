<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\UserCertification;
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
            'subtitle' => 'Junior yang baru belajar',
            'goal'     => 'Bisa baca menu Sushi 🍣',
            'emoji'    => '🌱',
            'reward'   => 'Tema Sakura terbuka!',
        ],
        'n4' => [
            'id'       => 'n4',
            'order'    => 2,
            'title'    => 'Senpai',
            'subtitle' => 'Senior yang mulai jago',
            'goal'     => 'Berani pesen Takoyaki sendiri 🐙',
            'emoji'    => '⚡',
            'reward'   => 'Tema Matcha terbuka!',
        ],
        'n3' => [
            'id'       => 'n3',
            'order'    => 3,
            'title'    => 'Sensei',
            'subtitle' => 'Guru, sudah bisa ngajarin',
            'goal'     => 'Paham lirik lagu J-Pop 🎵',
            'emoji'    => '🎓',
            'reward'   => 'Tema Gunung Fuji terbuka!',
        ],
        'n2' => [
            'id'       => 'n2',
            'order'    => 4,
            'title'    => 'Tensai',
            'subtitle' => 'Jenius!',
            'goal'     => 'Siap nonton Anime tanpa Subtitle 📺',
            'emoji'    => '🧠',
            'reward'   => 'Tema Autumn terbuka!',
        ],
        'n1' => [
            'id'       => 'n1',
            'order'    => 5,
            'title'    => 'Shogun',
            'subtitle' => 'Legend — Penguasa Bahasa Jepang',
            'goal'     => 'Siap diajak jalan-jalan ke Jepang! ✈️',
            'emoji'    => '👑',
            'reward'   => 'Midnight Theme terbuka!',
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

        // Collect all distinct level_ids that exist in DB for this certification tier.
        $subLevels = Question::certification($level)
            ->selectRaw('level_id, COUNT(*) as question_count')
            ->groupBy('level_id')
            ->orderBy('level_id')
            ->get()
            ->map(fn ($row) => [
                'id'             => (int) $row->level_id,
                'title'          => "{$meta['title']} — Tahap {$row->level_id}",
                'questionCount'  => (int) $row->question_count,
            ])
            ->all();

        $user = $request->user();
        $userCerts = $user
            ->certifications()
            ->where('category', $level)
            ->pluck('passed', 'level')
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
            ->inRandomOrder()
            ->get()
            ->map(fn (Question $q) => $this->formatQuestion($q))
            ->values()
            ->all();

        abort_if(empty($questions), 404, 'Tidak ada soal untuk level ini.');

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
        $passed = $score >= 80;
        
        $certification = UserCertification::updateOrCreate(
            ['user_id' => $request->user()->id, 'category' => $level, 'level' => $subLevel],
            ['score' => $score, 'passed' => $passed]
        );

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
     * Menilai jawaban esai pengguna menggunakan Gemini API secara otomatis.
     */
    public function gradeEssay(Question $question, string $userAnswer): array
    {
        $apiKey = env('GEMINI_API_KEY', '');

        // Fallback jika API Key belum dikonfigurasi di file .env
        if (empty($apiKey)) {
            return $this->fallbackKeywordGrading($question, $userAnswer);
        }

        $extra = $question->extra_attributes ?? [];
        $keywords = implode(', ', $extra['essay_keywords'] ?? []);
        $rubric = $extra['essay_rubric'] ?? 'Kesesuaian makna dan tata bahasa Jepang dasar.';

        // Prompt manis agar AI bertindak sebagai dirimu yang ramah, hangat, dan suportif!
        $systemPrompt = "Kamu adalah sistem penilai esai bahasa Jepang otomatis bernama 'Benkyou Assistant'. " .
                         "Tugasmu adalah menilai jawaban esai pengguna dengan penuh kehangatan, ramah, " .
                         "dan selalu berikan pesan penyemangat di bagian feedback.";

        $userQuery = "Pertanyaan Soal: \"{$question->question}\"\n" .
                     "Kriteria Penilaian: {$rubric}\n" .
                     "Kata Kunci Wajib: [{$keywords}]\n" .
                     "Jawaban Pengguna: \"{$userAnswer}\"\n\n" .
                     "Analisis kesesuaian jawaban. Berikan skor numerik (0-100) dan feedback manis dalam format JSON murni " .
                     "seperti ini: { \"score\": 90, \"feedback\": \"Luar biasa! Penulisan partikelmu sudah sangat tepat!\" }";

        try {
            // Memanfaatkan fitur retry Laravel 12 dengan eksponensial backoff
            $response = Http::retry(3, 1000)
                ->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key={$apiKey}", [
                    'contents' => [
                        ['parts' => [['text' => $userQuery]]]
                    ],
                    'systemInstruction' => [
                        'parts' => [['text' => $systemPrompt]]
                    ],
                    'generationConfig' => [
                        'responseMimeType' => 'application/json',
                        'responseSchema' => [
                            'type' => 'OBJECT',
                            'properties' => [
                                'score'    => ['type' => 'INTEGER'],
                                'feedback' => ['type' => 'STRING']
                            ],
                            'required' => ['score', 'feedback']
                        ]
                    ]
                ]);

            if ($response->successful()) {
                $responseBody = $response->json();
                $rawText = $responseBody['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
                return json_decode($rawText, true) ?? ['score' => 0, 'feedback' => 'Gagal mengurai penilaian AI.'];
            }

        } catch (ConnectionException $e) {
            // Tangani error koneksi secara halus
        }

        return $this->fallbackKeywordGrading($question, $userAnswer);
    }

    /**
     * Fallback penilaian berbasis kecocokan kata kunci (jika API bermasalah/offline).
     */
    private function fallbackKeywordGrading(Question $question, string $userAnswer): array
    {
        $extra = $question->extra_attributes ?? [];
        $keywords = $extra['essay_keywords'] ?? [];
        
        if (empty($keywords)) {
            return [
                'score' => 100,
                'feedback' => 'Misi selesai! Terima kasih sudah menuliskan jawaban terbaikmu! ✨'
            ];
        }

        $matchedCount = 0;
        $cleanUserAnswer = mb_strtolower(trim($userAnswer));

        foreach ($keywords as $keyword) {
            if (mb_str_contains($cleanUserAnswer, mb_strtolower(trim($keyword)))) {
                $matchedCount++;
            }
        }

        $percentage = (int) (($matchedCount / count($keywords)) * 100);
        
        return [
            'score' => $percentage,
            'feedback' => "Kamu berhasil menuliskan {$matchedCount} dari " . count($keywords) . " kata kunci penting. Semangat terus belajarnya! 🌟"
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
