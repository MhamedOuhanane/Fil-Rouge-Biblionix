<?php

namespace App\Console\Commands;

use App\Models\Livre;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class UpdateStatusLivre extends Command
{
    protected $signature = 'app:update-status-livre';
    protected $description = 'Changer le statut des réservations selont la quantity des livre';

    public function handle()
    {
        Livre::where('quantity', '<=', 0)
            ->where('status_livre', 'Accepter')
            ->where('disponibilite', 'Disponible')
            ->update(['disponibilite' => 'Rupture de stock']);

        Livre::where('quantity', '>', 0)
            ->where('status_livre', 'Accepter')
            ->where('disponibilite', 'Rupture de stock')
            ->update(['disponibilite' => 'Disponible']);
        
        Livre::where('status_livre', '!=', 'Accepter')
            ->update(['disponibilite' => 'Indisponible']);

        $this->info("Statut des livres mis à jour avec succès.");
        Log::info("app:update-status-livre executed at " . now());
    }

}
