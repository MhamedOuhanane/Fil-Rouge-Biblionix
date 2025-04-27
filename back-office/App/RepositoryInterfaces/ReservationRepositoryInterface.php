<?php

namespace App\RepositoryInterfaces;

use App\Models\Reservation;

interface ReservationRepositoryInterface
{
    public function getAllReservation($pagination = 30);
    public function filterReservation($filter, $pagination = 30);
    public function getUserReservation($filter = null, $pagination = 6);
    public function findReservation($reservation_id);
    public function createReservation($user, $data);
    public function updateReservation(Reservation $reservation, $data);
    public function deleteReservation(Reservation $reservation);

    public function StatiqueReservation();
}