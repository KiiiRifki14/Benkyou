<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('student'); // 'student' or 'admin'
        });

        Schema::create('user_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('date');
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('user_quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('score');
            $table->integer('total');
            $table->string('category');
            $table->timestamps();
        });

        Schema::create('user_certifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('category'); // e.g. 'n5'
            $table->integer('level'); // e.g. 1
            $table->boolean('passed')->default(false);
            $table->integer('score')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_certifications');
        Schema::dropIfExists('user_quizzes');
        Schema::dropIfExists('user_notes');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
