<?php

namespace App\Repositories;

use App\Models\Livre;
use App\RepositoryInterfaces\LivreRepositoryInterface;

class LivreRepository implements LivreRepositoryInterface
{
    public function getAllLivres($paginate)
    {
        return Livre::with('tags')
                        ->with('categories')
                        ->with('auteurs')
                        ->with('librarians')
                        ->paginate($paginate)
                        ->get();
    }

    public function findLivre($id)
    {
        return Livre::find($id);
    }

    public function filterLivres($filter, $paginate)
    {
        return Livre::with('tags')
                        ->with('categories')
                        ->with('auteurs')
                        ->with('librarians')
                        ->where($filter)
                        ->paginate($paginate)
                        ->get();
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