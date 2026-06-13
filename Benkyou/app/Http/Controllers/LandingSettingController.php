<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LandingSetting;
use Inertia\Inertia;

class LandingSettingController extends Controller
{
    public function edit()
    {
        $settings = LandingSetting::pluck('value', 'key')->toArray();
        return Inertia::render('Admin/ManageLanding', [
            'landingSettings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        
        foreach ($data as $key => $value) {
            LandingSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return back()->with('success', 'Landing page content updated successfully.');
    }
}
