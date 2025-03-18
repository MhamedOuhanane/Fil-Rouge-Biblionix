<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Badge;
use App\Models\Lecteur;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $transactiontableType = $this->faker->randomElement(['App\Models\Lecteur', 'App\Models\Auteur']);
        if ($transactiontableType == 'App\Models\Lecteur') {
            $transactiontableId = Lecteur::factory(); 
        } else {
            $transactiontableId = Auteur::factory();  
        }
        
        return [
            'payment_id' => Str::random(20),
            'status' => $this->faker->randomElement(['success', 'failed', 'pending']),
            'amount' => $this->faker->randomFloat(2, 1, 1000),
            'currency' => $this->faker->randomElement(['MAD']),
            'created_at' => Carbon::now()->subDays(rand(1, 90)),
            'transactiontable_type' => $transactiontableType,
            'transactiontable_id' => $transactiontableId,
            'badge_id' => Badge::factory(),
        ];
    }
}
