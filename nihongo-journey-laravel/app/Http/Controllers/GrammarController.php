<?php

namespace App\Http\Controllers;

use App\Models\Grammar;
use Inertia\Inertia;

class GrammarController extends Controller
{
    public function index()
    {
        $grammars = Grammar::all();
        return Inertia::render('Grammar', [
            'grammarData' => $grammars
        ]);
    }
}
