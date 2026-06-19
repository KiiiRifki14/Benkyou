<?php

namespace App\Http\Controllers;

use App\Models\UserNote;
use App\Services\ActivityLogger;
use Illuminate\Support\Facades\Auth;

class UserNoteController extends Controller
{
    /**
     * GET /student/notes/api
     *
     * Student reads all notes addressed to her — including those written by admin.
     * Returns notes in descending date order (newest first).
     */
    public function index()
    {
        ActivityLogger::notesViewed();

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $notes = $user->notes()
            ->with('author:id,name')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (UserNote $note) => [
                'id'        => $note->id,
                'title'     => $note->title,
                'content'   => $note->content,
                'date'      => $note->date,
                'fromAdmin' => $note->author_id !== null,
                'authorName' => $note->author?->name,
            ]);

        return response()->json($notes);
    }
}
