# 🔐 Design Specification: Google OAuth Authentication (Laravel Socialite)

## 1. Overview
Implementasi autentikasi pihak ketiga menggunakan **Google OAuth** melalui paket resmi **Laravel Socialite**. Pengguna (khususnya Hana dan pengguna baru) dapat masuk (*login*) atau mendaftar (*register*) ke platform **Benkyou** hanya dengan satu klik tanpa perlu mengingat email dan kata sandi secara manual. Progres belajar, riwayat kuis, sertifikasi misi, preferensi tema, dan catatan akan langsung tersinkronisasi ke akun pengguna.

---

## 2. Requirements & User Flow

### 2.1 User Stories
- **Sebagai pengguna baru**, saya ingin mendaftar ke Benkyou dengan akun Google agar langsung mendapatkan akun *student* dan dapat mulai belajar seketika.
- **Sebagai pengguna lama**, saya dapat login menggunakan Google jika email Google saya cocok dengan akun yang sudah ada, atau menggunakan `google_id` yang telah terhubung.
- **Sebagai pengguna yang lebih menyukai password**, opsi login dan register biasa menggunakan email/password tetap tersedia.

### 2.2 User Interaction Flow
```
[User on /login or /register]
       │
       ▼ (Clicks "Masuk dengan Google")
[GET /auth/google]
       │
       ▼ (Redirect to Google OAuth Consent Screen)
[Google Consent: accounts.google.com]
       │
       ▼ (User approves and selects Google account)
[GET /auth/google/callback]
       │
       ├─► Google error or user cancels? ──► Redirect to /login with error notification
       │
       ▼ (Retrieve Google User details: id, email, name, avatar)
[Match User in Supabase Database]
       ├── User with google_id found?
       │     └─► Update avatar, Auth::login($user, true)
       │
       ├── User with same email found?
       │     └─► Link google_id, update avatar, Auth::login($user, true)
       │
       └── New User?
             └─► Create user with role='student', nullable password, email_verified_at=now()
                 Create default UserPreference (theme='default')
                 Auth::login($newUser, true)
       │
       ▼ (Log activity: ActivityLogger::loggedIn())
[Redirect to /dashboard] ──► (Redirects to /student/home)
```

---

## 3. Database Schema Changes

File migrasi baru: `database/migrations/YYYY_MM_DD_add_google_auth_to_users_table.php`
- Menambahkan kolom `google_id` (`string`, `nullable`, `unique`, diletakkan setelah `email`).
- Menambahkan kolom `avatar` (`string`, `nullable`, diletakkan setelah `google_id`).
- Mengubah kolom `password` menjadi `nullable()` agar user Google tidak wajib memiliki kata sandi lokal.

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('google_id')->nullable()->unique()->after('email');
    $table->string('avatar')->nullable()->after('google_id');
    $table->string('password')->nullable()->change();
});
```

---

## 4. Backend Implementation Details

### 4.1 Dependency
- `laravel/socialite: ^5.18` (diinstall via Composer).

### 4.2 Configuration: `config/services.php`
```php
'google' => [
    'client_id'     => env('GOOGLE_CLIENT_ID'),
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'redirect'      => env('GOOGLE_REDIRECT_URI', env('APP_URL') . '/auth/google/callback'),
],
```

### 4.3 Controller: `app/Http/Controllers/Auth/GoogleAuthController.php`
- `redirectToGoogle()`:
  Mengembalikan `Socialite::driver('google')->redirect()`.
- `handleGoogleCallback()`:
  - Mengambil objek pengguna Google via `Socialite::driver('google')->user()`.
  - Menggunakan transaksi database (`DB::transaction`) untuk memastikan konsistensi pembuatan user & preferensi awal.
  - Memanggil `ActivityLogger::loggedIn()`.
  - Melakukan `Auth::login($user, remember: true)`.
  - Mengembalikan `redirect()->intended('/dashboard')`.
  - Error handling: Jika proses OAuth dibatalkan atau gagal, tangkap `\Exception` dan redirect ke `/login` dengan flash error message.

### 4.4 Routing: `routes/auth.php`
```php
Route::middleware('guest')->group(function () {
    Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
});
```

---

## 5. Frontend UI Implementation

### 5.1 Komponen Tombol Google
Tombol ditempatkan di halaman:
1. `resources/js/Pages/Auth/Login.jsx`
2. `resources/js/Pages/Auth/Register.jsx`

Desain visual:
- Tampilan modern bergaya kartu washi/minimalis Jepang.
- Menampilkan logo SVG resmi 4-warna Google.
- Teks: **"Masuk dengan Google"** (di Login) / **"Daftar dengan Google"** (di Register).
- Garis pembatas (*divider*) di bawahnya: *"atau gunakan email"*.
- Action: Tautan langsung (`<a href="/auth/google">`) agar browser melakukan navigasi penuh ke Google OAuth.

---

## 6. Environment Variables
Ditambahkan ke `.env` lokal dan Render:
```dotenv
GOOGLE_CLIENT_ID=isi_client_id_dari_google_console
GOOGLE_CLIENT_SECRET=isi_client_secret_dari_google_console
GOOGLE_REDIRECT_URI=https://benkyou-3c8h.onrender.com/auth/google/callback
```
*(Untuk lokal, `GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback` atau fallback otomatis dari `APP_URL`).*

---

## 7. Testing & Verification Plan
1. **Pendaftaran Akun Baru**:
   - Login menggunakan akun Google baru.
   - Verifikasi user masuk ke tabel `users` dengan `role: student`, `google_id`, dan `avatar`.
   - Verifikasi langsung ter-redirect ke Beranda Siswa (`/student/home`).
2. **Pencocokan Akun Lama**:
   - Akun yang sudah punya email sama berhasil menautkan `google_id` tanpa duplikasi user.
3. **Pembatalan / Error Handling**:
   - Menekan tombol "Cancel" di layar Google mengarahkan kembali ke `/login` tanpa crash (500 error).
4. **Verifikasi Produksi**:
   - Test login langsung di URL live Render `https://benkyou-3c8h.onrender.com`.
