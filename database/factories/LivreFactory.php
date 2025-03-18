<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Livre>
 */
class LivreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(20), 
            'summary' => $this->faker->paragraph, 
            'photo' => $this->faker->imageUrl(), 
            'author' => $this->faker->name(), 
            'status_livre' => $this->faker->randomElement(['En Attente', 'Accepter', 'Refuser']),
            'disponibilite' => $this->faker->randomElement(['Disponible', 'Rupture de stock', 'Indisponible']),
            'quantity' => $this->faker->numberBetween(1, 100),

            'categorie_id' => Categorie::factory(),
            'auteur_id' => Auteur::factory(),
        ];
    }
}
