<?php

namespace App\Repositories;

use App\Models\Lecteur;
use App\RepositoryInterfaces\LecteurRepositoryInterface;

class LecteurRepository implements LecteurRepositoryInterface
{
    public function findLecteur($Lecteur_id)
    {
        return Lecteur::find($Lecteur_id);
    }
}