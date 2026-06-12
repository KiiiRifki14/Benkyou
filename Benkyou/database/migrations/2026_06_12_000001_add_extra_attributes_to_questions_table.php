<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds a flexible JSON column to store dynamic attributes per question type
     * without bloating the schema with nullable columns (e.g. essay_keywords,
     * essay_rubric, essay_min_length, essay_max_length, etc.).
     */
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->json('extra_attributes')->nullable()->after('imageUrl');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('extra_attributes');
        });
    }
};
