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
use Inertia\Inertia;

class AdminController extends Controller
{
    private function checkAdmin()
    {
        if (!auth()->check() || auth()->user()->role !== 'admin') {
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

    public function updateKana(Request $request, $id)
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

    public function deleteKana($id)
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

    public function updateKanji(Request $request, $id)
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

    public function deleteKanji($id)
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

    public function updateVocabulary(Request $request, $id)
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

    public function deleteVocabulary($id)
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

    public function updateGrammar(Request $request, $id)
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

    public function deleteGrammar($id)
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
            'context' => 'nullable|string',
            'spokenText' => 'nullable|string',
            'speechLang' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'level_id' => 'nullable|integer',
        ]);
        \App\Models\Question::create($validated);
        return back();
    }

    public function updateQuestion(Request $request, $id)
    {
        $this->checkAdmin();
        $validated = $request->validate([
            'type' => 'required|string',
            'question_type' => 'required|string',
            'question' => 'required|string',
            'options' => 'nullable|array',
            'answer' => 'required',
            'explanation' => 'nullable|string',
            'context' => 'nullable|string',
            'spokenText' => 'nullable|string',
            'speechLang' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'level_id' => 'nullable|integer',
        ]);
        \App\Models\Question::findOrFail($id)->update($validated);
        return back();
    }

    public function deleteQuestion($id)
    {
        $this->checkAdmin();
        \App\Models\Question::findOrFail($id)->delete();
        return back();
    }
}
