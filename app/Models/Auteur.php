<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auteur extends User
{
    /** @use HasFactory<\Database\Factories\AuteurFactory> */
    use HasFactory;

    protected $table = 'auteurs';
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'photo',
        'phone',
        'status',
        'role_id',
        'badge_id',
        'certificate',
        'country',
    ];

    public function livres()
    {
        return $this->hasMany(Livre::class, 'auteur_id');
    }

    public function articles()
    {
        return $this->morphMany(Article::class, 'articletable');
    }

    public function messages()
    {
        return $this->morphMany(Message::class, 'messagetable');
    }

    public function commentaires()
    {
        return $this->morphMany(Commentaire::class, 'commentairetable');
    }

    public function transactions()
    {
        return $this->morphMany(Commentaire::class, 'transactiontable');
    }

    
    public function reviewsByAuthor()
    {
        return $this->morphMany(Commentaire::class, 'reviewtable1');
    }

    
    public function reviewsOnAuthor()
    {
        return $this->morphMany(Commentaire::class, 'reviewtable2');
    }

    public function reservations()
    {
        return $this->morphMany(Commentaire::class, 'reservationtable');
    }
}
