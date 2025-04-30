<?php 

namespace App\ServiceInterfaces;

use App\Models\Reservation;

interface ReservationServiceInterface 
{
    public function getReservation($filter = null, $pagination = 30);
    public function findReservation($reservation_id);
    public function insertReservation($data);
    public function updateReservation(Reservation $reservation, $data);
    public function updateEtatReservation(Reservation $reservation, $data);
    public function destroyReservation(Reservation $reservation);
}