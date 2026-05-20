<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kanji extends Model
{
    protected $fillable = ['kanji', 'romaji', 'meaning', 'level'];
}
