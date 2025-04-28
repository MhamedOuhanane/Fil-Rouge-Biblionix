<?php

namespace App\Repositories;

use App\Models\Livre;
use App\RepositoryInterfaces\LivreRepositoryInterface;

class LivreRepository implements LivreRepositoryInterface
{
    public function getAllLivres($paginate = 9)
    {
        $livres = Livre::with(['categorie', 'tags'])
                    ->paginate(9);

        $livres->getCollection()->transform(function ($livre) {
            $livre->average_rating = $livre->getAverageRating();
            return $livre;
        });
    
        return $livres;
                
    }

    public function findLivre($id)
    {
        return Livre::with(['categorie', 'tags'])
                    ->find($id)
                    ->tap(function ($livre) {
                        $livre->average_rating = $livre->getAverageRating();
                        
                    });;
    }

    public function filterLivres($filter, $tags, $paginate = 9)
    {
        $livres = Livre::with(['categorie', 'tags'])
                        ->where($filter[1])
                        ->orWhere($filter[2]);
            
        if (!empty($tags)) {
            $livres->whereHas('tags', function($query) use ($tags) {
                $query->whereIn('tags.id', $tags);
            });
        }

        $livres = $livres->paginate($paginate);

        $livres->getCollection()->transform(function ($livre) {
            $livre->average_rating = $livre->getAverageRating();
            return $livre;
        });
    

        return $livres;    
    }

    public function createLivre($createur, $data)
    {
        if ($createur->role->name == 'auteur') {
            return $createur->livres()->create($data);
        }

        return Livre::create($data);
    }

    public function CountLivre() {
        return Livre::count();
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