<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'payement_id',
        'status',
        'amount',
        'currency',
    ];

    public function transactiontable()
    {
        return $this->morphTo();
    }

}
