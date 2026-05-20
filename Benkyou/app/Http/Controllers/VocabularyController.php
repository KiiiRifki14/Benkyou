<?php

namespace App\Http\Controllers;

use App\Models\Vocabulary;
use Inertia\Inertia;

class VocabularyController extends Controller
{
    public function index()
    {
        $vocabularies = Vocabulary::all();
        return Inertia::render('Student/Vocabulary', [
            'vocabularyData' => $vocabularies
        ]);
    }
}
