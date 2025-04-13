<?php

namespace App\Repositories;

use App\Models\Auteur;
use App\RepositoryInterfaces\AuteurRepositoryInterface;

class AuteurRepository implements AuteurRepositoryInterface
{
    public function findAuteur($Auteur_id)
    {
        return Auteur::find($Auteur_id);
    }
}