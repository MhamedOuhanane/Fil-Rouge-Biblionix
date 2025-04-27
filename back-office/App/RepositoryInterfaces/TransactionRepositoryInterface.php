<?php 

namespace App\RepositoryInterfaces;

use App\Models\Transaction;

interface TransactionRepositoryInterface
{
    public function findUserTransaction($user_id, $badge_id);
    public function getAllTransaction();
    public function getFilterTransaction($filter, $data);
    public function insertTransaction($user, $data);
    public function findTransaction($condition);
    public function modifyTransaction(Transaction $transaction, $data);

    public function CountSubscription();
    public function SumAmountTransaction();
}