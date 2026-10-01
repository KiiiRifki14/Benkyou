# Google OAuth Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement one-click Google OAuth authentication (login and registration) for the Benkyou platform using Laravel Socialite, connecting student progress directly to their Google accounts.

**Architecture:** Laravel Socialite driver for Google OAuth with standard OAuth2 authorization code flow. Seamless account resolution by `google_id` and `email`, database transaction for user and default preference creation, and activity logging via `ActivityLogger`.

**Tech Stack:** Laravel 12, PHP 8.2+, Laravel Socialite, Supabase (PostgreSQL), React 18, Inertia.js v2, Tailwind CSS v4, Lucide React.

---

### Task 1: Install Laravel Socialite

**Files:**
- Modify: `Benkyou/composer.json`
- Modify: `Benkyou/composer.lock`

- [ ] **Step 1: Install package via Composer**
Run:
```bash
composer require laravel/socialite
```
Expected: `laravel/socialite` added to dependencies.

- [ ] **Step 2: Verify package discovery**
Run:
```bash
php artisan package:discover
```
Expected: `Discovered Package: laravel/socialite`.

- [ ] **Step 3: Commit**
```bash
git add composer.json composer.lock
git commit -m "chore(deps): install laravel/socialite"
```

---

### Task 2: Database Migration for Google Auth

**Files:**
- Create: `Benkyou/database/migrations/2026_10_01_000001_add_google_auth_to_users_table.php`
- Modify: `Benkyou/app/Models/User.php:21-27`

- [ ] **Step 1: Create migration file**
Create `Benkyou/database/migrations/2026_10_01_000001_add_google_auth_to_users_table.php`:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('google_id')->nullable()->unique()->after('email');
            $table->string('avatar')->nullable()->after('google_id');
            $table->string('password')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'avatar']);
            $table->string('password')->nullable(false)->change();
        });
    }
};
```

- [ ] **Step 2: Update User model fillable attributes**
In `Benkyou/app/Models/User.php`, add `'google_id'` and `'avatar'` to `$fillable`:
```php
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
        'avatar',
    ];
```

- [ ] **Step 3: Run migration against Supabase**
Run:
```bash
php artisan migrate --force
```
Expected: `2026_10_01_000001_add_google_auth_to_users_table ... DONE`.

- [ ] **Step 4: Commit**
```bash
git add database/migrations/ app/Models/User.php
git commit -m "feat(auth): add google_id and avatar to users table"
```

---

### Task 3: Configure Services & Environment

**Files:**
- Modify: `Benkyou/config/services.php:30-40`
- Modify: `Benkyou/.env`
- Modify: `Benkyou/.env.example`

- [ ] **Step 1: Add Google configuration in `config/services.php`**
In `Benkyou/config/services.php`, add the `google` array to the return array:
```php
    'google' => [
        'client_id'     => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect'      => env('GOOGLE_REDIRECT_URI', env('APP_URL') . '/auth/google/callback'),
    ],
```

- [ ] **Step 2: Update `.env` and `.env.example`**
Add to `.env` and `.env.example`:
```dotenv
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```

- [ ] **Step 3: Commit**
```bash
git add config/services.php .env.example
git commit -m "config: add google oauth service configuration"
```

---

### Task 4: Implement GoogleAuthController & Routing

**Files:**
- Create: `Benkyou/app/Http/Controllers/Auth/GoogleAuthController.php`
- Modify: `Benkyou/routes/auth.php`
- Create: `Benkyou/tests/Feature/Auth/GoogleAuthTest.php`

- [ ] **Step 1: Create GoogleAuthController**
Create `Benkyou/app/Http/Controllers/Auth/GoogleAuthController.php`:
```php
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
```

- [ ] **Step 2: Register routes in `routes/auth.php`**
In `Benkyou/routes/auth.php`, inside `Route::middleware('guest')->group(...)`, add:
```php
    Route::get('auth/google', [App\Http\Controllers\Auth\GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('auth/google/callback', [App\Http\Controllers\Auth\GoogleAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
```

- [ ] **Step 3: Write test for Google redirect and callback**
Create `Benkyou/tests/Feature/Auth/GoogleAuthTest.php`:
```php
<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleAuthTest extends TestCase
{
    public function test_google_redirect_returns_redirect_response(): void
    {
        $response = $this->get(route('auth.google'));
        $response->assertRedirect();
    }

    public function test_google_callback_creates_and_authenticates_new_user(): void
    {
        $mockUser = Mockery::mock(SocialiteUser::class);
        $mockUser->shouldReceive('getId')->andReturn('google-test-id-12345');
        $mockUser->shouldReceive('getName')->andReturn('Test Google User');
        $mockUser->shouldReceive('getEmail')->andReturn('google.student@example.com');
        $mockUser->shouldReceive('getAvatar')->andReturn('https://example.com/avatar.jpg');

        Socialite::shouldReceive('driver->user')->andReturn($mockUser);

        $response = $this->get(route('auth.google.callback'));

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'google.student@example.com',
            'google_id' => 'google-test-id-12345',
            'role' => 'student',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
```

- [ ] **Step 4: Run the test to verify**
Run:
```bash
php artisan test --filter=GoogleAuthTest
```
Expected: PASS.

- [ ] **Step 5: Commit**
```bash
git add app/Http/Controllers/Auth/GoogleAuthController.php routes/auth.php tests/Feature/Auth/GoogleAuthTest.php
git commit -m "feat(auth): implement GoogleAuthController and oauth routes with tests"
```

---

### Task 5: Update Login & Register UI

**Files:**
- Modify: `Benkyou/resources/js/Pages/Auth/Login.jsx:45-120`
- Modify: `Benkyou/resources/js/Pages/Auth/Register.jsx:45-120`

- [ ] **Step 1: Add Google Button and Divider to `Login.jsx`**
In `Benkyou/resources/js/Pages/Auth/Login.jsx`, above the email form or below the title, add:
```jsx
            {/* Google Login Button */}
            <div className="mb-6">
                <a
                    href={route('auth.google')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm shadow-sm transition-all hover:shadow hover:border-gray-400 cursor-pointer"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>Masuk dengan Google</span>
                </a>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="bg-white px-3 text-gray-400">atau dengan email</span>
                    </div>
                </div>
            </div>
```

- [ ] **Step 2: Add Google Button and Divider to `Register.jsx`**
In `Benkyou/resources/js/Pages/Auth/Register.jsx`, add identical Google button with label:
`<span>Daftar dengan Google</span>`.

- [ ] **Step 3: Build frontend assets**
Run:
```bash
npm run build
```
Expected: `✓ built in ...` with no errors.

- [ ] **Step 4: Commit**
```bash
git add resources/js/Pages/Auth/Login.jsx resources/js/Pages/Auth/Register.jsx
git commit -m "feat(ui): add modern Google OAuth button to Login and Register pages"
```

---

### Task 6: Deploy & Verify in Production

**Files:**
- Modify: Git commits pushed to `origin main`

- [ ] **Step 1: Push changes to GitHub**
Run:
```bash
git push origin main
```
Expected: Render triggers automated Docker build.

- [ ] **Step 2: Add Environment Variables in Render Dashboard**
Go to Render Dashboard ➔ Benkyou Service ➔ Environment:
- `GOOGLE_CLIENT_ID` = `[client_id_dari_user]`
- `GOOGLE_CLIENT_SECRET` = `[client_secret_dari_user]`
- `GOOGLE_REDIRECT_URI` = `https://benkyou-3c8h.onrender.com/auth/google/callback`

- [ ] **Step 3: Verification**
Open `https://benkyou-3c8h.onrender.com/login` and click **"Masuk dengan Google"**. Complete the login flow and verify student profile and progress storage.
