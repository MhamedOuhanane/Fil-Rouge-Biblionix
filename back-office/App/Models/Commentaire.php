<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    /** @use HasFactory<\Database\Factories\CommentaireFactory> */
    use HasFactory;

    protected $fillable = [
        'content',
        'article_id',
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function commentairetable()
    {
        return $this->morphTo();
    }
}
