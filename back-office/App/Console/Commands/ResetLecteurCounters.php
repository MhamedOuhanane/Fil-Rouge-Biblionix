<?php

namespace App\Console\Commands;

use App\Models\Lecteur;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ResetLecteurCounters extends Command
{
    protected $signature = 'reset:lecteur-counters';
    protected $description = 'Réinitialiser les compteurs de réservation et de prolongement des lecteurs';

    public function handle()
    {
        Lecteur::query()->update([
            'reserve_number' => 0,
            'prolongement_number' => 0,
        ]);

        $this->info("Tous les compteurs ont été réinitialisés avec succès.");
        Log::info("reset:lecteur-counters executed at " . now());
    }
}
