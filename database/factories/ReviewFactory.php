<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Livre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reviewtable1 = $this->faker->randomElement([Lecteur::factory(), Auteur::factory()])->create();
        $reviewtable2 = $this->faker->randomElement([Livre::factory(), Auteur::factory()])->create();
        return [
            'content' => $this->faker->paragraph(), 
            'rating' => $this->faker->numberBetween(1, 5) + $this->faker->randomFloat(1, 0, 0.9),
            'reviewtable1_id' => $reviewtable1->id,
            'reviewtable1_type' => 'App\\Models\\' . class_basename($reviewtable1),
            'reviewtable2_id' => $reviewtable2->id,
            'reviewtable2_type' => 'App\\Models\\' . class_basename($reviewtable2),   
        ];
    }
}
