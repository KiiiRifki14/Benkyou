<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserNote;
use App\Models\UserQuiz;
use App\Models\UserCertification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Ensure user is admin
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            return redirect('/');
        }

        $users = User::with(['quizzes', 'notes', 'certifications'])->get();
        $totalUsers = User::count();
        $totalQuizzes = UserQuiz::count();
        $totalNotes = UserNote::count();
        $totalCertifications = UserCertification::where('passed', true)->count();

        return Inertia::render('AdminDashboard', [
            'usersData' => $users,
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalQuizzes' => $totalQuizzes,
                'totalNotes' => $totalNotes,
                'totalCertifications' => $totalCertifications,
            ]
        ]);
    }
}
