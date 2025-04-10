<?php

namespace App\Repositories;

use App\Models\Livre;
use App\RepositoryInterfaces\LivreRepositoryInterface;

class LivreRepository implements LivreRepositoryInterface
{
    public function getAllLivres()
    {
        return Livre::with(['categorie', 'tags'])
                    ->paginate(9);
    }

    public function findLivre($id)
    {
        return Livre::find($id);
    }

    public function filterLivres($filter, $paginate = 9)
    {
        return Livre::with(['categorie', 'tags'])
                    ->where($filter[1])
                    ->orWhere($filter[2])
                    ->paginate($paginate);
    }

    public function createLivre($createur, $data)
    {
        if ($createur->role->name == 'auteur') {
            return $createur->livres()->create($data);
        }

        return Livre::create($data);
    }

    public function updateLivre(Livre $livre, $data)
    {
        return $livre->update($data);
    }

    public function deleteLivre(Livre $livre)
    {
        return $livre->delete();
    }

    public function linkTags(Livre $livre, $tag_id)
    {
        return $livre->tags()->attach($tag_id);
    }

    public function deleteLinkTags(Livre $livre)
    {
        return $livre->tags()->detach();
    }
}