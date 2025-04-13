<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Lecteur;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $messagetable = $this->faker->randomElement([Lecteur::factory(), Auteur::factory()])->create();
        return [
            'content' => $this->faker->paragraph,
            'messagetable_type' => 'App\\Models\\' . class_basename($messagetable),
            'messagetable_id' => $messagetable->id,
        ];
    }
}
