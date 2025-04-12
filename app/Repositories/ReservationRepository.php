<?php 

namespace App\Repositories;

use App\Models\Reservation;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ReservationRepository implements ReservationRepositoryInterface
{
    public function getAllReservation($pagination = 30)
    {
        return Reservation::with('reservationtable')
                            ->paginate($pagination);
    }
    
    public function filterReservation($filter, $pagination = 30)
    {
        return Reservation::with('reservationtable')
                            ->where($filter)
                            ->paginate($pagination);
    }
    
    public function getUserReservation($filter, $pagination = 6)
    {
        return Reservation::where('reservationtable_id', Auth::user()->id)
                            ->where($filter)
                            ->paginate($pagination);
    }
    
    public function findReservation($reservation_id)
    {
        return Reservation::with(['reservationtable', 'livres'])
                            ->find($reservation_id);
    }
    
    public function createReservation($user, $data)
    {
        return $user->reservations()->create($data);
    }
    
    public function updateReservation(Reservation $reservation, $data)
    {
        return $reservation->update($data);
    }
    
    public function deleteReservation(Reservation $reservation)
    {
        return $reservation->delete();
    }
}