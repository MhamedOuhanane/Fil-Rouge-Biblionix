<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auteur extends User
{
    /** @use HasFactory<\Database\Factories\AuteurFactory> */
    use HasFactory;

    protected $fillable = [
        'certificate',
        'country',
    ];

    public function livres()
    {
        return $this->hasMany(Livre::class, 'auteur_id');
    }
}
