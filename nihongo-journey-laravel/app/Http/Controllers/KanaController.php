<?php

namespace App\Http\Controllers;

use App\Models\Kana;
use Inertia\Inertia;

class KanaController extends Controller
{
    public function index()
    {
        $kanas = Kana::all();
        return Inertia::render('Student/Kana', [
            'kanaData' => $kanas
        ]);
    }
}
