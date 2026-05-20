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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'quiz' or 'n5', 'n4', 'n3', 'n2', 'n1'
            $table->string('question_type'); // 'multiple-choice', 'typing', 'reading', 'listening', 'image'
            $table->text('question');
            $table->text('options')->nullable(); // json options
            $table->text('answer'); // string or json
            $table->text('explanation')->nullable();
            $table->text('context')->nullable();
            $table->string('spokenText')->nullable();
            $table->string('speechLang')->nullable();
            $table->string('imageUrl')->nullable();
            $table->integer('level_id')->nullable(); // sub-level id
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
