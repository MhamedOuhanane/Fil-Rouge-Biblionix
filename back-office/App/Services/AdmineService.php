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
        try {
            $users = $this->userRepositorie->CountUser();
            $userRole = $this->userRepositorie->CountUserRole();
            $transactionCount = $this->transactionRepositorie->CountSubscription();
            $reviewLivre = $this->reviewRepositorie->SVGReviewLivres();
            $livreCount = $this->livreRepositorie->CountLivre();

            return [
                'userCount' => $users,
                'userRole' => $userRole,
                'LivreCount' => $livreCount,
                'ReviewLivreCount' => $reviewLivre,
                'transactionCount' => $transactionCount,
                'statusData' => 200
            ];
        } catch (\Throwable $th) {
            return [
                'message' => "Erreur lours de la récuperation des statistiques:" . $th->message,
                'statusData' => 500,
            ];
        }
        
    }
}