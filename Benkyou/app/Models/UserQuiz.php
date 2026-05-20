<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserQuiz extends Model
{
    protected $fillable = ['user_id', 'score', 'total', 'category'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
