<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    /** @use HasFactory<\Database\Factories\LivreFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'summary',
        'photo',
        'author',
        'status_livre',
        'disponiblite',
        'quantity',
    ];

    public function auteur()
    {
        return $this->belongsTo(Auteur::class, 'auteur_id');
    }
}
