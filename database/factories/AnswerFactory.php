<?php

namespace Database\Factories;

use App\Models\Librarian;
use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $Message = Message::factory()->create();
        $Librarian = Librarian::factory()->create();
        return [
            'content' => $this->faker->name,
            'message_id' => $Message->id,
            'librarian_id' => $Librarian->id,
        ];
    }
}
