<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'payment_id',   
        'status',
        'amount',
        'currency',
        'transactiontable_type', 
        'transactiontable_id',
        'badge_id', 
    ];

    protected $table = 'transactions';

    public function transactiontable()
    {
        return $this->morphTo();
    }

    public function badge()
    {
        return $this->belongsTo(Badge::class);
    }

}
