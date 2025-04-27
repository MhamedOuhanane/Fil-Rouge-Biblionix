<?php

namespace App\Services;

use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\RepositoryInterfaces\ReviewRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\ServiceInterfaces\AdmineServiceInterface;

class AdmineService implements AdmineServiceInterface
{
    protected $userRepositorie;
    protected $transactionRepositorie;
    protected $livreRepositorie;
    protected $reviewRepositorie;

    public function __construct(UserRepositoryInterface $userRepositorie,
                                TransactionRepositoryInterface $transactionRepositorie,
                                LivreRepositoryInterface $livreRepositorie,
                                ReviewRepositoryInterface $reviewRepositorie)
    {
        $this->userRepositorie = $userRepositorie;
        $this->transactionRepositorie = $transactionRepositorie;        
        $this->livreRepositorie = $livreRepositorie;
        $this->reviewRepositorie = $reviewRepositorie;        
    }

    public function StatistiqueDashbord()
    {
        $users = $this->userRepositorie->CountU;
    }
}