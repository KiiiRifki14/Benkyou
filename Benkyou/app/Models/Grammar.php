<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grammar extends Model
{
    protected $fillable = ['title', 'description', 'examples', 'notes'];

    protected $casts = [
        'examples' => 'array',
    ];
}
