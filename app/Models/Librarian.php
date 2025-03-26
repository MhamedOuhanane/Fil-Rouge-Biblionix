<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Librarian extends User
{
    /** @use HasFactory<\Database\Factories\LibrarianFactory> */
    use HasFactory;

    protected $table = 'librarians';
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
    ];
    
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function articles()
    {
        return $this->morphMany(Article::class, 'articletable');
    }
}
