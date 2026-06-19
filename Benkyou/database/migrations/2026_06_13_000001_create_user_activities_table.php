<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('action');       // e.g. 'quiz_completed', 'mission_started', 'note_read', 'page_viewed'
            $table->string('category');     // e.g. 'quiz', 'mission', 'notes', 'learning', 'general'
            $table->text('description');    // Human-readable description
            $table->json('meta')->nullable(); // Extra data (score, level, etc.)
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_activities');
    }
};
