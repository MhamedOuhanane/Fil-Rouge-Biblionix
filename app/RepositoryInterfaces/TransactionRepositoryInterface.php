<?php 

namespace App\RepositoryInterfaces;

interface TransactionRepositoryInterface
{
    public function findUserTransaction($user_id, $badge_id);
}