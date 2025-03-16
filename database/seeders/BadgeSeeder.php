<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Gratuit = Badge::firstOrCreate([
                            'id' => 1, 
                            'title' => 'Gratuit', 
                            'content' => "Le Badge Gratuit vous permet d'accéder aux services de la bibliothèque sans frais. Vous pouvez emprunter des livres pour une durée limitée et profiter de certaines fonctionnalités de base, comme la réservation et la prolongation de vos emprunts.",
                            'prix' => 0.00,
                            'reservation' => 3,
                            'duration' => 14,
                            'prolongation' => 1,
                        ]);
    }
}
