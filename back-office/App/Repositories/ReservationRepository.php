<?php 

namespace App\Repositories;

use App\Models\Reservation;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReservationRepository implements ReservationRepositoryInterface
{
    public function getAllReservation($pagination = 7)
    {
        return Reservation::with('reservationtable')
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
    }
    
    public function filterReservation($filter, $pagination = 7)
    {
        return Reservation::with('reservationtable')
                            ->where($filter)
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
    }
    
    public function getUserReservation($filter = null, $pagination = 3)
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
                            DB::raw("EXTRACT(YEAR FROM created_at) as year"),
                            DB::raw("EXTRACT(MONTH FROM created_at) as month"),
                            DB::raw("COUNT(*) as total")
                        )
                        ->groupBy(DB::raw("EXTRACT(YEAR FROM created_at)"), DB::raw("EXTRACT(MONTH FROM created_at)"))
                        ->get();
    }

    public function getReservationUserMonth($user, $filter1 = null, $filter2 = null) 
    {
        $reservation = $user->reservations()
                            ->whereMonth('start_date', now()->month)
                            ->whereYear('start_date', now()->year);
        if (is_array($filter1)) {
            $reservation->where($filter1)
                        ->orWhere($filter2);
        }

        return $reservation->get();
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