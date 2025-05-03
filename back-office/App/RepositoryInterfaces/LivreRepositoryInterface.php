<?php

namespace App\RepositoryInterfaces;

use App\Models\Livre;

interface LivreRepositoryInterface
{
    public function getAllLivres();
    public function findLivre($id);
    public function filterLivres($filter, $tag, $paginate);
    public function createLivre($createur, $data);
    public function updateLivre(Livre $livre, $data);
    public function deleteLivre(Livre $livre);
    public function linkTags(Livre $livre, $tag_id);
    public function deleteLinkTags(Livre $livre);
    public function saveLivre(Livre $livre);

    public function CountLivre();

}