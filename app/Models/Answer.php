<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\MockObject\ReturnValueNotConfiguredException;

class Answer extends Model
{
    /** @use HasFactory<\Database\Factories\AnswerFactory> */
    use HasFactory;

    protected $fillable = [
        'content',
        'message_id',
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

}
