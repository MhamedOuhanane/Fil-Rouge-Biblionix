<?php 

namespace App\RepositoryInterfaces;

use App\Models\Auteur;

interface AuteurRepositoryInterface 
{
    public function findAuteur($Auteur_id);
    public function deleteAuteur(Auteur $Auteur); 
    public function saveAuteur(Auteur $Auteur);
    public function getAuteur($search = "", $pagination = 7);
}