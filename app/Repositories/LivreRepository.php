<?php

namespace App\Repositories;

use App\Models\Livre;
use App\RepositoryInterfaces\LivreRepositoryInterface;

class LivreRepository implements LivreRepositoryInterface
{
    public function getAllLivres()
    {
        return Livre::with(['articletable', 'categorie', 'tags'])
                    ->paginate(9);
    }

    public function findLivre($id)
    {
        return Livre::find($id);
    }

    public function filterLivres($filter, $paginate = 9)
    {
        return Livre::with(['articletable', 'categorie', 'tags'])
                    ->where($filter[1])
                    ->orWhere($filter[2])
                    ->paginate($paginate);
    }

    public function createLivre($createur, $data)
    {
        return $createur->livres()->create($data);
    }

    public function updateLivre($data, $livre)
    {
        return $livre->update($data);
    }

    public function deleteLivre($livre)
    {
        return $livre->delete();
    }

    public function linkTags($livre, $tag_id)
    {
        return $livre->tags()->attach($tag_id);
    }

    public function deleteLinkTags($livre)
    {
        return $livre->tags()->detach();
    }
}