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
        'disponibilite',
        'quantity',
        'categorie_id',
        'auteur_id',
    ];

    public function auteur()
    {
        return $this->belongsTo(Auteur::class, 'auteur_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    
    public function reviewOnLivre()
    {
        return $this->morphMany(Review::class, 'reviewtable2');
    }

    public function getAverageRating()
    {
        return $this->reviewOnLivre()->avg('rating'); 
    }
}
