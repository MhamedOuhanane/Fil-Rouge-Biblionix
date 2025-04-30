<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Livre;
use Carbon\Carbon;
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
        $created_at = Carbon::instance($this->faker->dateTimeBetween('-1 week', now()));

        return [
            'content' => $this->faker->paragraph(), 
            'rating' => $this->faker->numberBetween(1, 4) + $this->faker->randomFloat(1, 0, 0.9),
            'reviewtable1_id' => $reviewtable1->id,
            'reviewtable1_type' => 'App\\Models\\' . class_basename($reviewtable1),
            'reviewtable2_id' => 73,
            'reviewtable2_type' => 'App\\Models\\' . class_basename($reviewtable2),  
            'created_at' => $created_at,
            'updated_at' => $created_at,
        ];
    }
}
