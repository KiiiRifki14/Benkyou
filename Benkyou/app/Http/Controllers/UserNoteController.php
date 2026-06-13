<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserNote;
use Illuminate\Support\Facades\Auth;

class UserNoteController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $notes = $user->notes()->orderBy('created_at', 'desc')->get();
        return response()->json($notes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|string',
            'content' => 'required|string',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $note = $user->notes()->create([
            'date' => $request->date,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Note created successfully', 'note' => $note]);
    }

    public function destroy(UserNote $note)
    {
        if ($note->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $note->delete();

        return response()->json(['message' => 'Note deleted successfully']);
    }
}
