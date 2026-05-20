<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KanaController;
use App\Http\Controllers\KanjiController;
use App\Http\Controllers\VocabularyController;
use App\Http\Controllers\GrammarController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('welcome');

Route::get('/home', function () {
    return redirect()->route('student.home');
})->name('home');

Route::get('/dashboard', function () {
    if (auth()->user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('student.home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Student Prefixed Routes
Route::prefix('student')->middleware(['auth'])->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Student/Home');
    })->name('student.home');
    
    Route::get('/kana', [KanaController::class, 'index'])->name('student.kana');
    Route::get('/kanji', [KanjiController::class, 'index'])->name('student.kanji');
    Route::get('/vocabulary', [VocabularyController::class, 'index'])->name('student.vocabulary');
    Route::get('/grammar', [GrammarController::class, 'index'])->name('student.grammar');
    
    Route::get('/quiz', function () {
        return Inertia::render('Student/Quiz', [
            'questionsData' => \App\Models\Question::where('type', 'quiz')->get()
        ]);
    })->name('student.quiz');

    Route::get('/certification', function () {
        return Inertia::render('Student/Certification', [
            'questionsData' => \App\Models\Question::whereIn('type', ['n5', 'n4', 'n3', 'n2', 'n1'])->get()
        ]);
    })->name('student.certification');

    Route::get('/notes', function () {
        return Inertia::render('Student/Notes');
    })->name('student.notes');

    Route::get('/themes', function () {
        return Inertia::render('Student/Themes');
    })->name('student.themes');
});

// Admin Prefixed Routes & CRUD Operations
Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    
    Route::get('/kana', [AdminController::class, 'kanaView'])->name('admin.kana');
    Route::get('/kanji', [AdminController::class, 'kanjiView'])->name('admin.kanji');
    Route::get('/vocabulary', [AdminController::class, 'vocabularyView'])->name('admin.vocabulary');
    Route::get('/grammar', [AdminController::class, 'grammarView'])->name('admin.grammar');
    Route::get('/question', [AdminController::class, 'questionView'])->name('admin.question');
    
    // Kana CRUD
    Route::post('/kana', [AdminController::class, 'storeKana'])->name('admin.kana.store');
    Route::put('/kana/{id}', [AdminController::class, 'updateKana'])->name('admin.kana.update');
    Route::delete('/kana/{id}', [AdminController::class, 'deleteKana'])->name('admin.kana.delete');

    // Kanji CRUD
    Route::post('/kanji', [AdminController::class, 'storeKanji'])->name('admin.kanji.store');
    Route::put('/kanji/{id}', [AdminController::class, 'updateKanji'])->name('admin.kanji.update');
    Route::delete('/kanji/{id}', [AdminController::class, 'deleteKanji'])->name('admin.kanji.delete');

    // Vocabulary CRUD
    Route::post('/vocabulary', [AdminController::class, 'storeVocabulary'])->name('admin.vocabulary.store');
    Route::put('/vocabulary/{id}', [AdminController::class, 'updateVocabulary'])->name('admin.vocabulary.update');
    Route::delete('/vocabulary/{id}', [AdminController::class, 'deleteVocabulary'])->name('admin.vocabulary.delete');

    // Grammar CRUD
    Route::post('/grammar', [AdminController::class, 'storeGrammar'])->name('admin.grammar.store');
    Route::put('/grammar/{id}', [AdminController::class, 'updateGrammar'])->name('admin.grammar.update');
    Route::delete('/grammar/{id}', [AdminController::class, 'deleteGrammar'])->name('admin.grammar.delete');

    // Question (Quiz & Certification) CRUD
    Route::post('/question', [AdminController::class, 'storeQuestion'])->name('admin.question.store');
    Route::put('/question/{id}', [AdminController::class, 'updateQuestion'])->name('admin.question.update');
    Route::delete('/question/{id}', [AdminController::class, 'deleteQuestion'])->name('admin.question.delete');
});
