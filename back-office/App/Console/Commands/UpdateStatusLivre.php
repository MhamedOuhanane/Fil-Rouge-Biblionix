<?php

namespace App\Console\Commands;

use App\Models\Livre;
use Illuminate\Console\Command;

class UpdateStatusLivre extends Command
{
    protected $signature = 'app:update-status-livre';
    protected $description = 'Changer le statut des réservations selont la quantity des livre';

    public function handle()
    {
        Livre::query()->where('quantity', '>=', 0)
                    ->where('disponibilite', 'Disponible')
                    ->update(['quantity' => 0]);

        Livre::query()->where('quantity', '<', 0)
                    ->where('disponibilite', 'Rupture de stock')
                    ->update(['disponibilite' => 'Disponible']);


        $this->info("le status des livres est modifier avec success.");
    }

}
