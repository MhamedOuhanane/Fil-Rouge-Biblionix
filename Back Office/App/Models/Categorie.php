<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    /** @use HasFactory<\Database\Factories\CategorieFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'logo',
        'content',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function livres()
    {
        return $this->hasMany(Livre::class);
    }
}
