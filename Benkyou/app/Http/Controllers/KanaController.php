<?php

namespace App\Http\Controllers;

use App\Models\Kana;
use App\Services\ActivityLogger;
use Inertia\Inertia;

class KanaController extends Controller
{
    public function index()
    {
        ActivityLogger::learningPageViewed('kana');
        $kanas = Kana::all();
        return Inertia::render('Student/Kana', [
            'kanaData' => $kanas
        ]);
    }
}
