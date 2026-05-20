<?php

namespace App\Http\Controllers;

use App\Models\Kanji;
use Inertia\Inertia;

class KanjiController extends Controller
{
    public function index()
    {
        $kanjis = Kanji::all();
        return Inertia::render('Student/Kanji', [
            'kanjiData' => $kanjis
        ]);
    }
}
