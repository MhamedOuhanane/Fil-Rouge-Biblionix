<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationFactory> */
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'status_Res',
        'prolongement',
        'status_Pro',
        'returned_at',
        'livre_id',
    ];

    public function livre()
    {
        return $this->belongsTo(Livre::class);
    }

    public function reservationtable()
    {
        return $this->morphTo();
    }
}
