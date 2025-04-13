<?php

namespace Database\Seeders;

use App\Models\Lecteur;
use Illuminate\Database\Seeder;

class LecteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lecteur::factory(10)->create();
    }
}
