<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KanaController;
use App\Http\Controllers\KanjiController;
use App\Http\Controllers\VocabularyController;
use App\Http\Controllers\GrammarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Nihongo Journey Routes
Route::redirect('/home', '/');

Route::get('/kana', [KanaController::class, 'index'])->name('kana.index');
Route::get('/kanji', [KanjiController::class, 'index'])->name('kanji.index');
Route::get('/vocabulary', [VocabularyController::class, 'index'])->name('vocabulary.index');
Route::get('/grammar', [GrammarController::class, 'index'])->name('grammar.index');

Route::get('/quiz', function () {
    return Inertia::render('Quiz');
})->name('quiz');

Route::get('/certification', function () {
    return Inertia::render('Certification');
})->name('certification');

Route::get('/notes', function () {
    return Inertia::render('Notes');
})->name('notes');

Route::get('/themes', function () {
    return Inertia::render('Themes');
})->name('themes');
