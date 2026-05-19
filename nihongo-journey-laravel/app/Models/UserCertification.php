<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserCertification extends Model
{
    protected $fillable = ['user_id', 'category', 'level', 'passed', 'score'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
