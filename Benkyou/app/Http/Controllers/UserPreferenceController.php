<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserPreference;
use Illuminate\Support\Facades\Auth;

class UserPreferenceController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'theme_id' => 'required|string',
        ]);

        $user = Auth::user();

        UserPreference::updateOrCreate(
            ['user_id' => $user->id],
            ['theme_id' => $request->theme_id]
        );

        return response()->json(['message' => 'Theme updated successfully']);
    }
}
