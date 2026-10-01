# Mobile Responsive Experience & User Brand Header Design Specification

## 1. Overview
Enhance the Benkyou application so that:
1. The authenticated user's name is dynamically displayed directly under the "Benkyou" brand logo in both desktop sidebar and mobile headers.
2. The entire platform delivers a fluid, responsive, app-like mobile experience (smartphones 320px–480px, tablets 768px–1024px, and desktop 1280px+), including a modern Mobile Bottom Navigation Bar, enhanced drawer navigation, and responsive typography/grids across all learning and auth pages.

---

## 2. User Name Under Brand Logo

### 2.1 Sidebar Header (`Sidebar.tsx`)
In the student and admin sidebar headers:
- Below `Benkyou` title:
  - Display `{user.name}` directly with `text-xs font-semibold text-[var(--color-ink-light)] truncate max-w-[140px]`.
  - Fallback if not authenticated: `"Platform Belajar"`.
  - Tooltip (`title={user?.name}`) to show full name on hover if truncated.

### 2.2 Mobile Header (`Layout.tsx`)
In the sticky mobile top bar:
- Left brand cluster:
  - Red circular Kanji icon (`日`).
  - Column with `Benkyou` (`font-serif font-bold text-base sm:text-lg`).
  - Directly underneath: `{user.name}` (`text-[11px] font-semibold truncate max-w-[140px] sm:max-w-[200px]`).
- Right cluster:
  - Theme toggle indicator or active status.
  - Hamburger Menu button (`Menu`) to toggle full drawer.

---

## 3. Mobile Responsiveness & Dynamic Multi-Device Architecture

### 3.1 Layout & Viewport (`Layout.tsx`)
- **Viewport Height:** Replace rigid `h-screen` with `h-[100dvh]` to avoid mobile browser address bar jump on iOS Safari and Android Chrome.
- **Drawer Overlay & Close Button:**
  - Close button in mobile sidebar drawer: Change from low-contrast `text-gray-400 hover:text-white` to a circular, accessible button (`w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center shadow-sm`).
  - Smooth backdrop blur overlay (`bg-black/60 backdrop-blur-sm`).
- **Main Container Padding:**
  - On mobile: add `pb-24 lg:pb-0` to prevent content from getting cut off behind the bottom navigation bar.

### 3.2 Mobile Bottom Navigation Bar (`Components/MobileBottomNav.tsx`)
For logged-in students on mobile screens (`lg:hidden`):
- Sticky bottom tab bar with 4 primary destinations + Menu drawer toggle:
  1. **Beranda** (`/dashboard` or `/student`) — `Home` icon
  2. **Materi** (`/student/kana`) — `BookOpen` icon
  3. **Latihan / Kuis** (`/student/quiz`) — `Sparkles` icon
  4. **Catatan** (`/student/notes`) — `Heart` icon
  5. **Menu** (opens drawer) — `Menu` icon
- Design: Frosted glass (`bg-white/95 backdrop-blur-md border-t border-[#E5E5E5]`), active tab highlight in `var(--color-japan-red)`, 48px tap targets.

### 3.3 Learning Pages Mobile Optimization
- **`Student/Home.tsx`:**
  - Hero header: Hero stats wrap gracefully on small screens (`flex-wrap sm:flex-nowrap`).
  - Feature cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with touch-friendly paddings.
- **`Student/Kana.tsx` & `Kanji.tsx`:**
  - Grids: adjust column breakpoints (`grid-cols-5` with proportional sizing `h-16 sm:h-20`) so kana characters fit comfortably on 360px screens without horizontal scroll.
- **`Student/Quiz.tsx` & `MissionPlay.tsx`:**
  - Choice options: Flex layout with auto-wrapping text so long Indonesian explanations or Japanese sentences never overflow container boundaries.
  - Action buttons: full-width on mobile for easy one-hand thumb tapping.
- **`Welcome.jsx` (Landing Page):**
  - Mobile header: Compact auth buttons on small screens (`px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm`).
  - Body: Prevent horizontal scrolling (`overflow-x-hidden`).
- **`GuestLayout.jsx` (Auth Pages):**
  - Form card padding scaled: `p-6 sm:p-10 rounded-2xl sm:rounded-3xl`.

---

## 4. Testing & Verification Plan
1. **Frontend Asset Build:** Run `npm run build` to ensure all JSX/TSX changes compile cleanly.
2. **Automated Feature Tests:** Run `php artisan test` to verify zero regression across existing auth and feature tests.
3. **Visual Verification across Breakpoints:**
   - Mobile: 360px (Small Android), 390px (iPhone 12/13/14/15/16).
   - Tablet: 768px (iPad Mini/Air).
   - Desktop: 1280px+.
4. **Git Commit & Deployment:** Commit and push to `origin main` to trigger Render deployment.
