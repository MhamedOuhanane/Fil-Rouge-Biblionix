<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Librarian;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commentaire>
 */
class CommentaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createur = $this->faker->randomElement([Librarian::factory(), Auteur::factory(), Lecteur::factory()])->create();
        return [
            'content' => $this->faker->paragraph(),
            'article_id' => Article::factory(),
            'commentairetable_type' => "App\\Models\\" . class_basename($createur),
            'commentairetable_id' => $createur,

        ];
    }
}
