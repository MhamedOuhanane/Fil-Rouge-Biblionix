<?php 

namespace App\Repositories;

use App\Models\Reservation;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReservationRepository implements ReservationRepositoryInterface
{
    public function getAllReservation($pagination = 30)
    {
        return Reservation::with('reservationtable')
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
    }
    
    public function filterReservation($filter, $pagination = 30)
    {
        return Reservation::with('reservationtable')
                            ->where($filter)
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
    }
    
    public function getUserReservation($filter = null, $pagination = 6)
    {
        return Reservation::where('reservationtable_id', Auth::user()->id)
                            ->where($filter)
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
    }
    
    public function findReservation($reservation_id)
    {
        return Reservation::with(['reservationtable', 'livres'])
                            ->find($reservation_id);
    }

    public function StatiqueReservation() {
        return Reservation::select(
            DB::raw('YEAR(created_at) as year'), 
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total_reservations') 
        )
        ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)')) 
        ->get();
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