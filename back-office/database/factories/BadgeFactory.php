<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Badge>
 */
class BadgeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'content' => $this->faker->paragraph(),
            'prix' => $this->faker->randomFloat(2, 60, 300), 
            'reservation' => $this->faker->numberBetween(1, 10), 
            'duration' => $this->faker->numberBetween(1, 30),
            'prolongation' => $this->faker->numberBetween(1, 30),
        ];
    }
}
