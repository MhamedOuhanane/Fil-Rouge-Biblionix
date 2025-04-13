<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    /** @use HasFactory<\Database\Factories\BadgeFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'prix',
        'reservation',
        'duration',
        'prolongation',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
