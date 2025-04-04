<?php

namespace App\RepositoryInterfaces;

interface LivreRepositoryInterface
{
    public function getAllLivres($paginate);
    public function findLivre($id);
    public function filterLivres($filter, $paginate);
    public function createLivre($createur, $data);
    public function updateLivre($data, $livre);
    public function deleteLivre($livre);
    public function linkTags($livre, $tag_id);
    public function deleteLinkTags($livre);

}