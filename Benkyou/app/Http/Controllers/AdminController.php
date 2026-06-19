<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserNote;
use App\Models\UserQuiz;
use App\Models\UserCertification;
use App\Models\Kana;
use App\Models\Kanji;
use App\Models\Vocabulary;
use App\Models\Grammar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    private function checkAdmin()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403, 'Akses ditolak. Anda bukan Administrator.');
        }
    }

    public function index()
    {
        $this->checkAdmin();

        $users = User::with(['quizzes', 'notes', 'certifications'])->get();
        $totalUsers = User::count();
        $totalQuizzes = UserQuiz::count();
        $totalNotes = UserNote::count();
        $totalCertifications = UserCertification::where('passed', true)->count();

        return Inertia::render('Admin/Dashboard', [
            'usersData' => $users,
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalQuizzes' => $totalQuizzes,
                'totalNotes' => $totalNotes,
                'totalCertifications' => $totalCertifications,
            ]
        ]);
    }

    public function kanaView()
    {
        $this->checkAdmin();
        return Inertia::render('Admin/ManageKana', [
            'kanasData' => Kana::all()
        ]);
    }

    public function kanjiView()
    {
        $this->checkAdmin();
        return Inertia::render('Admin/ManageKanji', [
            'kanjisData' => Kanji::all()
        ]);
    }

    public function vocabularyView()
    {
        $this->checkAdmin();
        return Inertia::render('Admin/ManageVocabulary', [
            'vocabulariesData' => Vocabulary::all()
        ]);
    }

    public function grammarView()
    {
        $this->checkAdmin();
        return Inertia::render('Admin/ManageGrammar', [
            'grammarsData' => Grammar::all()
        ]);
    }

    public function questionView()
    {
        $this->checkAdmin();
        return Inertia::render('Admin/ManageQuestion', [
            'questionsData' => \App\Models\Question::all()
        ]);
    }

    // Kana CRUD
    public function storeKana(Request $request)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'category' => 'required|string',
            'romaji' => 'required|string',
            'kana' => 'required|string',
        ]);
        Kana::create($validated);
        return back();
    }

    public function updateKana(Request $request, int $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'category' => 'required|string',
            'romaji' => 'required|string',
            'kana' => 'required|string',
        ]);
        Kana::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteKana(int $id)
    {
        $this->checkAdmin();
        Kana::findOrFail($id)->delete();
        return back();
    }

    // Kanji CRUD
    public function storeKanji(Request $request)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'kanji' => 'required|string',
            'romaji' => 'required|string',
            'meaning' => 'required|string',
            'level' => 'required|string',
        ]);
        Kanji::create($validated);
        return back();
    }

    public function updateKanji(Request $request, int $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'kanji' => 'required|string',
            'romaji' => 'required|string',
            'meaning' => 'required|string',
            'level' => 'required|string',
        ]);
        Kanji::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteKanji(int $id)
    {
        $this->checkAdmin();
        Kanji::findOrFail($id)->delete();
        return back();
    }

    // Vocabulary CRUD
    public function storeVocabulary(Request $request)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'word' => 'required|string',
            'romaji' => 'required|string',
            'meaning' => 'required|string',
            'type' => 'required|string',
        ]);
        Vocabulary::create($validated);
        return back();
    }

    public function updateVocabulary(Request $request, int $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'word' => 'required|string',
            'romaji' => 'required|string',
            'meaning' => 'required|string',
            'type' => 'required|string',
        ]);
        Vocabulary::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteVocabulary(int $id)
    {
        $this->checkAdmin();
        Vocabulary::findOrFail($id)->delete();
        return back();
    }

    // Grammar CRUD
    public function storeGrammar(Request $request)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'examples' => 'required|array',
            'notes' => 'required|string',
        ]);
        Grammar::create($validated);
        return back();
    }

    public function updateGrammar(Request $request, int $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'examples' => 'required|array',
            'notes' => 'required|string',
        ]);
        Grammar::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteGrammar(int $id)
    {
        $this->checkAdmin();
        Grammar::findOrFail($id)->delete();
        return back();
    }

    // Question CRUD
    public function storeQuestion(Request $request)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'type' => 'required|string',
            'question_type' => 'required|string',
            'question' => 'required|string',
            'options' => 'nullable|array',
            'answer' => 'required',
            'explanation' => 'nullable|string',
            'context' => 'nullable|required_if:question_type,reading|string',
            'spokenText' => 'nullable|string',
            'speechLang' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'level_id' => 'nullable|integer',
            'extra_attributes' => 'nullable|array',
        ]);
        \App\Models\Question::create($validated);
        return back();
    }

    public function updateQuestion(Request $request, int $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'type' => 'required|string',
            'question_type' => 'required|string',
            'question' => 'required|string',
            'options' => 'nullable|array',
            'answer' => 'required',
            'explanation' => 'nullable|string',
            'context' => 'nullable|required_if:question_type,reading|string',
            'spokenText' => 'nullable|string',
            'speechLang' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'level_id' => 'nullable|integer',
            'extra_attributes' => 'nullable|array',
        ]);
        \App\Models\Question::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteQuestion(int $id)
    {
        $this->checkAdmin();
        \App\Models\Question::findOrFail($id)->delete();
        return back();
    }

    // ──────────────────────────────────────────────
    // Notes CRUD (Catatan Kecil — from you to her)
    // ──────────────────────────────────────────────

    public function notesView()
    {
        $this->checkAdmin();

        $student = User::where('role', 'student')->first();

        $notes = $student
            ? UserNote::where('user_id', $student->id)
                ->orderBy('created_at', 'desc')
                ->get()
            : collect();

        return Inertia::render('Admin/ManageNotes', [
            'notesData' => $notes,
        ]);
    }

    public function storeNote(Request $request)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'title'   => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $student = User::where('role', 'student')->first();
        abort_unless($student, 404, 'Student user not found.');

        $dateStr = now()->locale('id')->isoFormat('dddd, D MMMM YYYY');

        UserNote::create([
            'user_id'   => $student->id,
            'title'     => $validated['title'] ?? null,
            'content'   => $validated['content'],
            'date'      => $dateStr,
            'author_id' => Auth::id(),
        ]);

        return back();
    }

    public function updateNote(Request $request, int $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'title'   => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        UserNote::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteNote(int $id)
    {
        $this->checkAdmin();
        UserNote::findOrFail($id)->delete();
        return back();
    }

    // ──────────────────────────────────────────────
    // Activity Monitor (see what she's been up to)
    // ──────────────────────────────────────────────

    public function activityView()
    {
        $this->checkAdmin();

        $student = User::where('role', 'student')->first();

        if (!$student) {
            return Inertia::render('Admin/Activity', [
                'activities' => [],
                'stats'      => [],
                'studentName' => null,
            ]);
        }

        $activities = \App\Models\UserActivity::forUser($student->id)
            ->orderBy('created_at', 'desc')
            ->limit(200)
            ->get()
            ->map(fn ($a) => [
                'id'          => $a->id,
                'action'      => $a->action,
                'category'    => $a->category,
                'description' => $a->description,
                'meta'        => $a->meta,
                'time'        => $a->created_at->diffForHumans(),
                'date'        => $a->created_at->format('d M Y, H:i'),
            ]);

        // Calculate stats
        $totalActions   = \App\Models\UserActivity::forUser($student->id)->count();
        $todayActions   = \App\Models\UserActivity::forUser($student->id)->today()->count();
        $quizCompleted  = \App\Models\UserActivity::forUser($student->id)->where('action', 'quiz_completed')->count();
        $missionsDone   = \App\Models\UserActivity::forUser($student->id)->where('action', 'mission_completed')->count();
        $loginCount     = \App\Models\UserActivity::forUser($student->id)->where('action', 'login')->count();

        // First and last activity
        $firstActivity  = \App\Models\UserActivity::forUser($student->id)->orderBy('created_at', 'asc')->first();
        $lastActivity   = \App\Models\UserActivity::forUser($student->id)->orderBy('created_at', 'desc')->first();

        $daysSinceFirst = $firstActivity
            ? (int) now()->diffInDays($firstActivity->created_at) + 1
            : 0;

        return Inertia::render('Admin/Activity', [
            'activities'  => $activities,
            'stats'       => [
                'totalActions'  => $totalActions,
                'todayActions'  => $todayActions,
                'quizCompleted' => $quizCompleted,
                'missionsDone'  => $missionsDone,
                'loginCount'    => $loginCount,
                'daysActive'    => $daysSinceFirst,
                'firstActivity' => $firstActivity?->created_at?->format('d M Y'),
                'lastActivity'  => $lastActivity?->created_at?->diffForHumans(),
            ],
            'studentName' => $student->name,
        ]);
    }
}
