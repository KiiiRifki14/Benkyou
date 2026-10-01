<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserPreference;
use App\Services\ActivityLogger;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google OAuth consent screen.
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback returned by Google.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            Log::error('Google OAuth Callback Error: ' . $e->getMessage());
            return redirect()->route('login')->withErrors([
                'email' => 'Gagal masuk menggunakan Google. Silakan coba lagi.',
            ]);
        }

        try {
            $user = DB::transaction(function () use ($googleUser) {
                // 1. Check if user with this google_id already exists
                $user = User::where('google_id', $googleUser->getId())->first();

                if ($user) {
                    $user->update([
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                    return $user;
                }

                // 2. Check if user with this email already exists
                $user = User::where('email', $googleUser->getEmail())->first();

                if ($user) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar'    => $googleUser->getAvatar() ?? $user->avatar,
                    ]);
                    return $user;
                }

                // 3. Create new user with role 'student'
                $newUser = User::create([
                    'name'              => $googleUser->getName() ?? 'Pelajar Benkyou',
                    'email'             => $googleUser->getEmail(),
                    'google_id'         => $googleUser->getId(),
                    'avatar'            => $googleUser->getAvatar(),
                    'password'          => null,
                    'role'              => 'student',
                    'email_verified_at' => now(),
                ]);

                // Initialize default user preference (theme default)
                UserPreference::firstOrCreate(
                    ['user_id' => $newUser->id],
                    ['theme_id' => 'default']
                );

                return $newUser;
            });

            Auth::login($user, remember: true);

            ActivityLogger::loggedIn();

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Throwable $e) {
            Log::error('Google User Provisioning Error: ' . $e->getMessage());
            return redirect()->route('login')->withErrors([
                'email' => 'Terjadi kesalahan saat memproses akun. Silakan coba lagi.',
            ]);
        }
    }
}
