<?php

namespace App\Http\Controllers;

use App\Models\UserNote;
use App\Services\ActivityLogger;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserNoteController extends Controller
{
    /**
     * GET /student/notes/api
     *
     * Student reads all notes written by herself.
     * Returns notes in descending date order (newest first).
     */
    public function index()
    {
        ActivityLogger::notesViewed();

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $notes = $user->notes()
            ->fromSelf()
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

    /**
     * POST /student/notes/api
     *
     * Student creates a new note.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'   => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $dateStr = now()->locale('id')->isoFormat('dddd, D MMMM YYYY');

        $note = Auth::user()->notes()->create([
            'title'     => $validated['title'] ?? null,
            'content'   => $validated['content'],
            'date'      => $dateStr,
            'author_id' => null, // student themselves
        ]);

        return response()->json([
            'id'         => $note->id,
            'title'      => $note->title,
            'content'    => $note->content,
            'date'       => $note->date,
            'fromAdmin'  => false,
            'authorName' => null,
        ]);
    }

    /**
     * PUT /student/notes/api/{id}
     *
     * Student updates their own note.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title'   => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $note = Auth::user()->notes()
            ->fromSelf()
            ->findOrFail($id);

        $note->update([
            'title'   => $validated['title'] ?? null,
            'content' => $validated['content'],
        ]);

        return response()->json([
            'id'         => $note->id,
            'title'      => $note->title,
            'content'    => $note->content,
            'date'       => $note->date,
            'fromAdmin'  => false,
            'authorName' => null,
        ]);
    }

    /**
     * DELETE /student/notes/api/{id}
     *
     * Student deletes their own note.
     */
    public function destroy($id)
    {
        $note = Auth::user()->notes()
            ->fromSelf()
            ->findOrFail($id);

        $note->delete();

        return response()->json(['success' => true]);
    }
}
