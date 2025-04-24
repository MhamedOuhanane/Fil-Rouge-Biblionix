<?php

namespace App\ServiceInterfaces;

use App\Models\Transaction;
use App\Models\User;

interface TransactionServiceInteface 
{
    public function getTransaction($filter);
    public function createTransaction(User $user, $data);
    public function findTransaction($transactionId);
    public function updateTransaction(Transaction $transaction, $data);
}