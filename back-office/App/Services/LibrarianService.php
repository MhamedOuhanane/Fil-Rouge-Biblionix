<?php

namespace App\Services;

use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use App\RepositoryInterfaces\ReviewRepositoryInterface;
use App\ServiceInterfaces\LibrarianServiceInterface;

class LibrarianService implements LibrarianServiceInterface
{
    protected $livreRepositorie;
    protected $reviewRepositorie;
    protected $reservationRepositorie;

    public function __construct(LivreRepositoryInterface $livreRepositorie,
                                ReviewRepositoryInterface $reviewRepositorie,
                                ReservationRepositoryInterface $reservationRepositorie)
    {  
        $this->livreRepositorie = $livreRepositorie;
        $this->reviewRepositorie = $reviewRepositorie;      
        $this->reservationRepositorie = $reservationRepositorie;      
    }

    public function StatistiqueDashboard()
    {
        try {
            $reviewLivre = $this->reviewRepositorie->SVGReviewLivres();
            $reviewAuteur = $this->reviewRepositorie->SVGReviewAuteurs();
            $livreCount = $this->livreRepositorie->CountLivre();
            $reservation = $this->reservationRepositorie->StatiqueReservation();
            $reservationCount = $this->reservationRepositorie->reservationCount();

            return [
                'message' => 'Les statistiques trouvé avec succé',
                'statistique' => [
                    'LivreCount' => $livreCount,
                    'ReviewLivreCount' => $reviewLivre,
                    'reservation' => $reservation,
                    'reservationCount' => $reservationCount,
                    'ReviewAuteurCount' => $reviewAuteur,
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