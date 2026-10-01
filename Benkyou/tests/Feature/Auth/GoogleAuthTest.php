<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_google_redirect_returns_redirect_response(): void
    {
        $response = $this->get(route('auth.google'));
        $response->assertRedirect();
    }

    public function test_google_callback_creates_and_authenticates_new_user(): void
    {
        $abstractUser = Mockery::mock(SocialiteUser::class);
        $abstractUser->shouldReceive('getId')->andReturn('google-test-id-12345');
        $abstractUser->shouldReceive('getName')->andReturn('Test Google User');
        $abstractUser->shouldReceive('getEmail')->andReturn('google.student@example.com');
        $abstractUser->shouldReceive('getAvatar')->andReturn('https://example.com/avatar.jpg');

        $provider = Mockery::mock('Laravel\Socialite\Two\GoogleProvider');
        $provider->shouldReceive('user')->andReturn($abstractUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get(route('auth.google.callback'));

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'google.student@example.com',
            'google_id' => 'google-test-id-12345',
            'role' => 'student',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_google_callback_links_existing_user_by_email(): void
    {
        $existingUser = User::factory()->create([
            'email' => 'existing.student@example.com',
            'google_id' => null,
            'role' => 'student',
        ]);

        $abstractUser = Mockery::mock(SocialiteUser::class);
        $abstractUser->shouldReceive('getId')->andReturn('google-linked-id-67890');
        $abstractUser->shouldReceive('getName')->andReturn('Existing Student');
        $abstractUser->shouldReceive('getEmail')->andReturn('existing.student@example.com');
        $abstractUser->shouldReceive('getAvatar')->andReturn('https://example.com/new-avatar.jpg');

        $provider = Mockery::mock('Laravel\Socialite\Two\GoogleProvider');
        $provider->shouldReceive('user')->andReturn($abstractUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get(route('auth.google.callback'));

        $this->assertAuthenticatedAs($existingUser);
        $this->assertDatabaseHas('users', [
            'id' => $existingUser->id,
            'email' => 'existing.student@example.com',
            'google_id' => 'google-linked-id-67890',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
