<?php

namespace App\ServiceInterfaces;

use App\Models\User;

interface TransactionServiceInteface 
{
    public function getTransaction($filter);
    public function createTransaction(User $user, $data);
}