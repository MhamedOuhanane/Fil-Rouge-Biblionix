<?php

namespace App\ServiceInterfaces;

use App\Models\Livre;

interface LivreServiceInterface 
{
    public function getLivres($data);
    public function getUserLivres($user);
    public function findLivre($id);
    public function insertLivre($data);
    public function updateLivre(Livre $Livre, $data);
    public function deleteLivre(Livre $Livre);
}