<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
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
    ];

    protected $casts = [
        'options' => 'array',
        'answer' => 'json', // to support string or string array (e.g. typing options)
    ];
}
