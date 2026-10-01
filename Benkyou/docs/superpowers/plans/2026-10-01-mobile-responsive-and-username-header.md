# Mobile Responsive Experience & User Brand Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the user's name directly under the "Benkyou" brand logo, and make the platform completely responsive and dynamic on all device screens (smartphones, tablets, desktop) with a mobile bottom navigation bar and touch optimizations.

**Tech Stack:** React 18, Inertia.js v2, Tailwind CSS v4, Lucide React, TypeScript, Laravel 12.

---

### Task 1: Add User Name Under "Benkyou" Brand Logo
**Files:**
- Modify: `Benkyou/resources/js/Components/Sidebar.tsx`
- Modify: `Benkyou/resources/js/Components/Layout.tsx`

- [ ] **Step 1: Update `Sidebar.tsx` student & admin header**
In `Sidebar.tsx`, under the `Benkyou` title:
```tsx
<div>
    <h1 className="font-serif font-bold text-xl leading-tight group-hover:text-[var(--color-japan-red)] transition-colors">
        Benkyou
    </h1>
    <p className="text-xs font-semibold text-[var(--color-ink-light)] truncate max-w-[130px]" title={user?.name}>
        {user ? user.name : "Platform Belajar"}
    </p>
</div>
```
- [ ] **Step 2: Update `Layout.tsx` mobile header**
In `Layout.tsx`, inside the mobile top bar under `Benkyou`:
```tsx
<div>
    <h1 className={`font-serif font-bold text-base sm:text-lg leading-none ${isAdminRoute ? 'text-white' : 'text-[var(--color-ink)]'}`}>
        Benkyou
    </h1>
    <p className={`text-[11px] font-semibold mt-0.5 truncate max-w-[140px] sm:max-w-[200px] ${isAdminRoute ? 'text-white/60' : 'text-[var(--color-ink-light)]'}`}>
        {user ? user.name : (isAdminRoute ? 'Admin Panel' : 'Platform Belajar')}
    </p>
</div>
```

---

### Task 2: Create Mobile Bottom Navigation Bar & Integrate in `Layout.tsx`
**Files:**
- Create: `Benkyou/resources/js/Components/MobileBottomNav.tsx`
- Modify: `Benkyou/resources/js/Components/Layout.tsx`

- [ ] **Step 1: Create `MobileBottomNav.tsx`**
Create clean sticky bottom tab bar with 5 primary quick actions:
1. Beranda (`/dashboard` or `/student`)
2. Materi (`/student/kana`)
3. Latihan / Kuis (`/student/quiz`)
4. Catatan (`/student/notes`)
5. Menu (triggers drawer toggle)
- [ ] **Step 2: Embed `MobileBottomNav` in `Layout.tsx`**
Mount `MobileBottomNav` inside `Layout.tsx` for non-admin routes on mobile (`lg:hidden`).
Add `pb-20 lg:pb-0` to the main container so content scrolls cleanly without obstruction.

---

### Task 3: Improve Mobile Drawer, Viewport Height & Close Button
**Files:**
- Modify: `Benkyou/resources/js/Components/Layout.tsx`

- [ ] **Step 1: Upgrade viewport height to `h-[100dvh]`**
Replace `h-screen` with `h-[100dvh] min-h-[100dvh]` to eliminate mobile browser URL bar jumps on iOS & Android.
- [ ] **Step 2: Style drawer close button with accessible tap target**
Replace `className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-50"` with a well-contrasted circular button:
`className="lg:hidden absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 flex items-center justify-center transition-all z-50 shadow-sm"`

---

### Task 4: Responsive Polishing for Learning & Landing Pages
**Files:**
- Modify: `Benkyou/resources/js/Pages/Welcome.jsx`
- Modify: `Benkyou/resources/js/Pages/Student/Home.tsx`
- Modify: `Benkyou/resources/js/Layouts/GuestLayout.jsx`

- [ ] **Step 1: Optimize `Welcome.jsx` header buttons on small screens**
Ensure auth buttons scale gracefully (`px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm`) and prevent horizontal scroll.
- [ ] **Step 2: Optimize `Student/Home.tsx` stats on mobile**
Allow stats cards to wrap cleanly on phone screens (`flex-wrap sm:flex-nowrap`).
- [ ] **Step 3: Optimize `GuestLayout.jsx` padding on small screens**
Use `p-6 sm:p-10 rounded-2xl sm:rounded-3xl` for login and register cards.

---

### Task 5: Build & Test Verification
- [ ] **Step 1: Run `npm run build`** to ensure 0 build errors.
- [ ] **Step 2: Run `php artisan test`** to confirm all 28 backend tests pass.

---

### Task 6: Deploy to Render
- [ ] **Step 1: Commit all changes**
- [ ] **Step 2: Run `git push origin main`** to trigger automated Docker deployment on Render.
