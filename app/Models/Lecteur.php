<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecteur extends User
{
    /** @use HasFactory<\Database\Factories\LecteurFactory> */
    use HasFactory;

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
        'city',
        'reserve_numbre',
        'prolongement_numbre',
    ];

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

    public function reviewsBy()
    {
        return $this->morphMany(Commentaire::class, 'reviewtable1');
    }

    public function reservations()
    {
        return $this->morphMany(Commentaire::class, 'reservationtable');
    }
}
