<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kana extends Model
{
    protected $fillable = ['category', 'romaji', 'kana'];
}
