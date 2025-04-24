<?php 

namespace App\RepositoryInterfaces;

interface TransactionRepositoryInterface
{
    public function findUserTransaction($user_id, $badge_id);
    public function getAllTransaction();
    public function getFilterTransaction($filter, $data);
    public function insertTransaction($user, $data);
}