<?php

namespace Database\Factories;

use App\Models\Auteur;
use App\Models\Categorie;
use App\Models\Librarian;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createur = $this->faker->randomElement([Librarian::factory(), Auteur::factory()])->create();
        return [
            'title' => $this->faker->title(),
            'description' => $this->faker->paragraph(5),
            'content' => $this->faker->imageUrl(), 
            'articletable_type' => 'App\\Models\\' . class_basename($createur),
            'articletable_id' => $createur->id,
            'categorie_id' => Categorie::factory(),
        ];
    }
}
