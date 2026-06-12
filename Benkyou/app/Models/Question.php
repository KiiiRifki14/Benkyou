<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read array|null $extra_attributes
 *
 * @method static Builder|self pg()
 * @method static Builder|self typing()
 * @method static Builder|self reading()
 * @method static Builder|self listening()
 * @method static Builder|self image()
 * @method static Builder|self essay()
 * @method static Builder|self quiz()
 * @method static Builder|self certification(?string $level = null)
 * @method static Builder|self forLevel(int $levelId)
 * @method static Builder|self random(int $limit = 10)
 */
class Question extends Model
{
    // ──────────────────────────────────────────────
    // Fillable
    // ──────────────────────────────────────────────

    protected $fillable = [
        'type',
        'question_type',
        'question',
        'options',
        'answer',
        'explanation',
        'context',
        'spokenText',
        'speechLang',
        'imageUrl',
        'level_id',
        'extra_attributes',
    ];

    // ──────────────────────────────────────────────
    // Casts
    // ──────────────────────────────────────────────

    protected function casts(): array
    {
        return [
            'options'          => 'array',
            'answer'           => 'array',
            'extra_attributes' => 'array',
            'level_id'         => 'integer',
        ];
    }

    // ──────────────────────────────────────────────
    // Constants — Question Types
    // ──────────────────────────────────────────────

    public const TYPE_MULTIPLE_CHOICE = 'multiple-choice';
    public const TYPE_PG              = 'pg';
    public const TYPE_TYPING          = 'typing';
    public const TYPE_READING         = 'reading';
    public const TYPE_LISTENING       = 'listening';
    public const TYPE_IMAGE           = 'image';
    public const TYPE_ESSAY           = 'essay';

    // ──────────────────────────────────────────────
    // Constants — Category (type column)
    // ──────────────────────────────────────────────

    public const CATEGORY_QUIZ = 'quiz';
    public const CERTIFICATION_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];

    // ──────────────────────────────────────────────
    // Local Scopes — By Question Type
    // ──────────────────────────────────────────────

    /** Multiple-choice (alias: pg). */
    public function scopePg(Builder $query): Builder
    {
        return $query->whereIn('question_type', [self::TYPE_MULTIPLE_CHOICE, self::TYPE_PG]);
    }

    /** Typing / ketik. */
    public function scopeTyping(Builder $query): Builder
    {
        return $query->where('question_type', self::TYPE_TYPING);
    }

    /** Reading with context paragraph. */
    public function scopeReading(Builder $query): Builder
    {
        return $query->where('question_type', self::TYPE_READING);
    }

    /** Listening with TTS audio. */
    public function scopeListening(Builder $query): Builder
    {
        return $query->where('question_type', self::TYPE_LISTENING);
    }

    /** Image-based question. */
    public function scopeImage(Builder $query): Builder
    {
        return $query->where('question_type', self::TYPE_IMAGE);
    }

    /** Essay (future). */
    public function scopeEssay(Builder $query): Builder
    {
        return $query->where('question_type', self::TYPE_ESSAY);
    }

    // ──────────────────────────────────────────────
    // Local Scopes — By Category
    // ──────────────────────────────────────────────

    /** Daily quiz questions (type = 'quiz'). */
    public function scopeQuiz(Builder $query): Builder
    {
        return $query->where('type', self::CATEGORY_QUIZ);
    }

    /**
     * Certification questions.
     *
     * @param string|null $level  e.g. 'n5', 'n4' — omit for all levels
     */
    public function scopeCertification(Builder $query, ?string $level = null): Builder
    {
        $q = $query->whereIn('type', self::CERTIFICATION_LEVELS);

        return $level ? $q->where('type', $level) : $q;
    }

    // ──────────────────────────────────────────────
    // Local Scopes — Utility
    // ──────────────────────────────────────────────

    /** Filter by sub-level (level_id). */
    public function scopeForLevel(Builder $query, int $levelId): Builder
    {
        return $query->where('level_id', $levelId);
    }

    /** Randomise order and optionally limit. */
    public function scopeRandom(Builder $query, int $limit = 10): Builder
    {
        return $query->inRandomOrder()->limit($limit);
    }

    // ──────────────────────────────────────────────
    // Helpers — Extra Attributes
    // ──────────────────────────────────────────────

    /**
     * Get a single key from the extra_attributes JSON bag.
     *
     * @param  mixed  $default
     * @return mixed
     */
    public function extra(string $key, $default = null)
    {
        return data_get($this->extra_attributes, $key, $default);
    }

    /**
     * Merge new keys into extra_attributes without overwriting existing ones.
     */
    public function mergeExtra(array $attributes): self
    {
        $this->extra_attributes = array_merge(
            $this->extra_attributes ?? [],
            $attributes,
        );

        return $this;
    }
}
