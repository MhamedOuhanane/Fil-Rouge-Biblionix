<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PharIo\Manifest\Library;

class Message extends Model
{
    /** @use HasFactory<\Database\Factories\MessageFactory> */
    use HasFactory;

    protected $fillable = [
        'content',
        'librarian_id',
    ];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function messagetable()
    {
        return $this->morphTo();
    }
}
