<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends UserFactory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => "M'hamed",
            'last_name' => "Ouhanane",
            'email' => "mhmdeouhnane60@gmail.com",
            'password' => "mhmdemhmde1234",
            'photo' => "profile/default.jpg",
            'phone' => "0617060324",
            'role_id' => 1,
        ];
    }
}
