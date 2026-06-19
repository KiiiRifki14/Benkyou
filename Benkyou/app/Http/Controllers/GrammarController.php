<?php

namespace App\Http\Controllers;

use App\Models\Grammar;
use App\Services\ActivityLogger;
use Inertia\Inertia;

class GrammarController extends Controller
{
    public function index()
    {
        ActivityLogger::learningPageViewed('grammar');
        $grammars = Grammar::all();
        return Inertia::render('Student/Grammar', [
            'grammarData' => $grammars
        ]);
    }
}
