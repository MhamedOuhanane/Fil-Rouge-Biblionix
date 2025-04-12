<?php

namespace App\Services;

use App\Models\Reservation;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use App\ServiceInterfaces\ReservationServiceInterface;
use Carbon\Carbon;

class ReservationService implements ReservationServiceInterface
{
    protected $reservationRepository;

    public function __construct(ReservationRepositoryInterface $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function getReservation($data = null, $pagination = 30)
    {
        if (!$data) {
            $result = $this->reservationRepository->getAllReservation($pagination);
        } else {
            $filter = [];
            if (isset($data['date_filter'])) {
                $date = Carbon::now()->subDays($data['date_filter']);
                $filter[] = ['data_filter', '>=', $date];
            }

            if (isset($data['status_Res'])) {
                $date = Carbon::now()->subDays($data['date_filter']);
                $filter[] = $data['status_Res'];
            }

            if (isset($data['status_Pro'])) {
                $date = Carbon::now()->subDays($data['date_filter']);
                $filter[] = $data['status_Pro'];
            }

            $result = $this->reservationRepository->filterReservation($filter, $pagination);
        }
         
        if (!$result) {
            $message = "Erreur lours de la recupération des réservation. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun réservation.";
            $statusData = 404;
        } else {
            $message = "Les Réservation trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Reservation' => $result,
            'statusData' => $statusData,
        ];
    }

    public function getUserReservation($filter, $pagination = 30)
    {
        
    }

    public function findReservation($reservation_id)
    {

    }

    public function insertReservation($user, $data)
    {

    }

    public function updateReservation(Reservation $reservation, $data)
    {

    }

    public function deleteReservation(Reservation $reservation)
    {

    }

    
}