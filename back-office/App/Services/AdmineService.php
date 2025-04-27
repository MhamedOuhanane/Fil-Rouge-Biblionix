<?php

namespace App\Services;

use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\RepositoryInterfaces\CategorieRepositoryInterface;
use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
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
    protected $categorieRepositorie;
    protected $reservationRepositorie;
    protected $badgeRepositorie;

    public function __construct(UserRepositoryInterface $userRepositorie,
                                TransactionRepositoryInterface $transactionRepositorie,
                                LivreRepositoryInterface $livreRepositorie,
                                ReviewRepositoryInterface $reviewRepositorie,
                                CategorieRepositoryInterface $categorieRepositorie,
                                ReservationRepositoryInterface $reservationRepositorie,
                                BadgeRepositoryInterface $badgeRepositorie)
    {
        $this->userRepositorie = $userRepositorie;
        $this->transactionRepositorie = $transactionRepositorie;        
        $this->livreRepositorie = $livreRepositorie;
        $this->reviewRepositorie = $reviewRepositorie;        
        $this->categorieRepositorie = $categorieRepositorie;        
        $this->reservationRepositorie = $reservationRepositorie;        
        $this->badgeRepositorie = $badgeRepositorie;        
    }

    public function StatistiqueDashboard()
    {
        try {
            $users = $this->userRepositorie->CountUser();
            $userRole = $this->userRepositorie->CountUserRole();
            $transactionCount = $this->transactionRepositorie->CountSubscription();
            $reviewLivre = $this->reviewRepositorie->SVGReviewLivres();
            $livreCount = $this->livreRepositorie->CountLivre();
            $categorie = $this->categorieRepositorie->CategoriesLivre();
            $badges = $this->badgeRepositorie->BadgeUsers();
            $reservation = $this->reservationRepositorie->StatiqueReservation();

            return [
                'message' => 'Les statistiques trouvé avec succé',
                'statistique' => [
                    'userCount' => $users,
                    'userRole' => $userRole,
                    'LivreCount' => $livreCount,
                    'ReviewLivreCount' => $reviewLivre,
                    'transactionCount' => $transactionCount,
                    'categories' => $categorie,
                    'badges' => $badges,
                    'reservation' => $reservation,
                ],
                'statusData' => 200,
            ];
        } catch (\Throwable $th) {
            return [
                'message' => "Erreur lours de la récuperation des statistiques:" . $th->getMessage(),
                'statusData' => 500,
            ];
        }
        
    }
}