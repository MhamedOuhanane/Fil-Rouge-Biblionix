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

    
    public function getAllTransaction()
    {
        return Transaction::with(['badge', 'transactiontable'])
                            ->paginate(7);
    }

    public function getFilterTransaction($filter = [], $data = [])
    {
        $transaction = Transaction::query();

        if ($filter) {
            $transaction->whereBetween('created_at', $filter);
        } 
        if ($data) {
            $transaction->where($data);
        }
        return $transaction->paginate(7);
    }

    public function insertTransaction($user, $data) {
        
        $transactions = new Transaction();
        $transactions->fill($data);
        $transactions->transactiontable()->associate($user);
        
        return $transactions->save();
    }

    public function findTransaction($condition) {
        return Transaction::where($condition)
                        ->first();
    }

    public function modifyTransaction(Transaction $transaction, $data) {
        return $transaction->update($data);
    }

}