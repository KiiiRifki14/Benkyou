<?php

namespace App\Http\Controllers;

use App\Models\Kanji;
use App\Services\ActivityLogger;
use Inertia\Inertia;

class KanjiController extends Controller
{
    public function index()
    {
        ActivityLogger::learningPageViewed('kanji');
        $kanjis = Kanji::all();
        return Inertia::render('Student/Kanji', [
            'kanjiData' => $kanjis
        ]);
    }
}
