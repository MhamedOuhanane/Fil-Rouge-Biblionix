<?php 

namespace App\RepositoryInterfaces;

interface TransactionRepositoryInterface
{
    public function findUserTransaction($user_id, $badge_id);
    public function getAllTransaction();
    public function getFilterTeransaction($filter, $data);
}