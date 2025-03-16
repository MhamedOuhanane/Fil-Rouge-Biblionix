<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Admin = Role::firstOrCreate(['id' => 1, 'name' => 'admin']);
        $Librarin = Role::firstOrCreate(['id' => 2, 'name' => 'librarin']);
        $Auteur = Role::firstOrCreate(['id' => 3, 'name' => 'auteur']);
        $Lecteur = Role::firstOrCreate(['id' => 4, 'name' => 'lecteur']);
    }
}
