<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory;

    protected $fillable = [
        'content',
        'rating',
    ];

    // le type est reviewtable1 ou reviewtable
    // public function reviewtable($type)
    // {
    //     return $this->morphTo(__FUNCTION__, "{$type}_type", "{$type}_id");
    // }

    public function reviewtable1()
    {
        return $this->morphTo(__FUNCTION__, 'reviewtable1_type', 'reviewtable1_id');
    }

    public function reviewtable2()
    {
        return $this->morphTo(__FUNCTION__, 'reviewtable2_type', 'reviewtable2_id');
    }
}
