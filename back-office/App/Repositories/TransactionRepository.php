<?php 

namespace App\Repositories;

use App\Models\Transaction;
use App\RepositoryInterfaces\TransactionRepositoryInterface;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function findUserTransaction($user_id, $badge_id)
    {
        return Transaction::with(['badge', 'transactiontable'])
                            ->where('status' ,'Terminée')
                            ->where('transactiontable_id', $user_id)
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
        $transaction = Transaction::with(['badge', 'transactiontable']);

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

    public function CountSubscription() {
        return Transaction::where('status', 'ACTIVE')
                            ->count();
    }

    public function SumAmountTransaction() {
        return Transaction::where('status', 'ACTIVE')
                            ->sum('amount');
    }

    public function findTransaction($condition) {
        return Transaction::with(['badge', 'transactiontable'])
                        ->where($condition)
                        ->first();
    }

    public function modifyTransaction(Transaction $transaction, $data) {
        return $transaction->update($data);
    }

}