<?php

namespace App\Repositories;

use App\Models\Auteur;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\search;

class AuteurRepository implements AuteurRepositoryInterface
{
    public function findAuteur($Auteur_id)
    {
        return Auteur::find($Auteur_id);
    }

    public function deleteAuteur(Auteur $Auteur) {
        return $Auteur->delete();
    }

    public function saveAuteur(Auteur $Auteur) {
        return $Auteur->save();
    }

    public function getAuteur($search = "", $pagination = 7)
    {
        $user = Auth::user();
        $auteurs = Auteur::with('reviewsOnAuthor')
                        ->where('status', '!=', 'Ban')
                        ->where('id', '!=', $user->id);
        if (!empty($search)) {
            $auteurs->whereRaw("CONCAT(first_name, ' ', last_name) ILIKE ?", ["%$search%"]);
        }

        $auteurs = $auteurs->paginate($pagination);

        $auteurs->getCollection()->transform(function ($auteur) {
            $auteur->average_rating = $auteur->getAvgReviews();
            return $auteur;
        });

        return $auteurs;
    }
}