<?php 

namespace App\Repositories;

use App\Models\Transaction;
use App\RepositoryInterfaces\TransactionRepositoryInterface;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function findUserTransaction($user_id, $badge_id)
    {
        return Transaction::where('status' ,'Terminée')
                            ->where('user_id', $user_id)
                            ->where('badge_id', $badge_id)
                            ->first();
    }
}