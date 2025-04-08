<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content',
        'status',
        'categorie_id',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function commentaires()
    {
        return $this->belongsTo(Commentaire::class);
    }

    public function articletable()
    {
        return $this->morphTo();
    }
}
