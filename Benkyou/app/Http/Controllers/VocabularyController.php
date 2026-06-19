<?php

namespace App\Http\Controllers;

use App\Models\Vocabulary;
use App\Services\ActivityLogger;
use Inertia\Inertia;

class VocabularyController extends Controller
{
    public function index()
    {
        ActivityLogger::learningPageViewed('vocabulary');
        $vocabularies = Vocabulary::all();
        return Inertia::render('Student/Vocabulary', [
            'vocabularyData' => $vocabularies
        ]);
    }
}
