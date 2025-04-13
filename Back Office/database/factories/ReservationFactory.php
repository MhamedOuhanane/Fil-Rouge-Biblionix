<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Livre;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    $reservation = $this->faker->randomElement([Lecteur::factory(), Auteur::factory()])->create();
    
    $startDate = Carbon::instance($this->faker->dateTimeBetween('+1 week', '+2 weeks'));
    $endDate = $startDate->copy()->addDays(7);

    $prolongement = $this->faker->optional()->date();
    $statusPro = $this->faker->randomElement(['En Attente', 'Accepter', 'Refuser', 'En Cours', 'Terminer']);

    if (!$prolongement) {
        $statusPro = 'Pas de Prolengement';
    }

    if ($startDate > $endDate) {
        $date = $startDate;
        $startDate = $endDate;
        $endDate = $date;
    }

    return [
        'start_date' => $startDate,
        'end_date' => $endDate,
        'status_Res' => $this->faker->randomElement([
            'En Attente', 'Accepter', 'Refuser', 'En Cours', 'Terminer'
        ]),
        'prolongement' => $prolongement,
        'status_Pro' => $statusPro,
        'reservationtable_type' => "App\\Models\\" . class_basename($reservation),
        'reservationtable_id' => $reservation->id,
        'returned_at' => $this->faker->optional()->dateTimeBetween($endDate, '+2 days'),
        'livre_id' => Livre::factory(),
    ];
}
}
