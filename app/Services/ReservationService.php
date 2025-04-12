<?php

namespace App\Services;

use App\Models\Reservation;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use App\ServiceInterfaces\ReservationServiceInterface;

class ReservationService implements ReservationServiceInterface
{
    protected $reservationRepository;

    public function __construct(ReservationRepositoryInterface $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function getReservation($filter = null, $pagination = 30)
    {
        
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