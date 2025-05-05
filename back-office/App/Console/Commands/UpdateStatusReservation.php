<?php

namespace App\Console\Commands;

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class UpdateStatusReservation extends Command
{
    protected $signature = 'reservations:update-status';
    protected $description = 'Changer le statut des réservations selont la date de début, du fin et du prolongement';

    public function handle()
    {
        $now = Carbon::now();

        Reservation::where('start_date', '<=', $now)
            ->where('status_Res', 'En Attente')
            ->update(['status_Res' => 'Refuser']);

        Reservation::where('start_date', '<=', $now)
            ->where('status_Res', 'Accepter')
            ->update(['status_Res' => 'En Cours']);

        Reservation::where('end_date', '<=', $now)
            ->where('status_Res', 'En Cours')
            ->update(['status_Res' => 'Terminer']);

        Reservation::where('start_date', '<=', $now)
            ->where('status_Pro', 'En Attente')
            ->update(['status_Pro' => 'Refuser']);

        Reservation::where('end_date', '<=', $now)
            ->where('status_Pro', 'Accepter')
            ->update(['status_Pro' => 'En Cours']);

        Reservation::where('prolongement', '<=', $now)
            ->where('status_Pro', 'En Cours')
            ->update(['status_Pro' => 'Terminer']);
        

        $this->info("le status des réservations est modifier avec success.");
        Log::info("reservations:update-status executed at " . now());
    }
}
