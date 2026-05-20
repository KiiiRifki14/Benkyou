<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kanas', function (Blueprint $table) {
            $table->id();
            $table->string('category')->default('hiragana'); // hiragana, dakuten, yoon, katakana, etc.
            $table->string('romaji');
            $table->string('kana');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kanas');
    }
};
