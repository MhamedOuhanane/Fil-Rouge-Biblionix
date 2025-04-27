<?php

namespace App\Repositories;

use App\Models\Categorie;
use App\RepositoryInterfaces\CategorieRepositoryInterface;
use Illuminate\Support\Facades\DB;

class CategorieRepository implements CategorieRepositoryInterface
{
    
    public function getAllCategories()
    {
        return Categorie::all();
    }
    
    public function searchCategories($search)
    {
        return Categorie::where('title', 'ILIKE', '%' . $search . '%')->get();
    }
    
    public function findCategorie($id)
    {
        return Categorie::find($id);
    }
    
    public function createCategorie($data)
    {
        return Categorie::create($data);
    }
    
    public function updateCategorie($data, $categorie)
    {
        return $categorie->update($data);
    }
    
    public function deleteCategories($categorie)
    {
        return $categorie->delete();
    }

    public function CategoriesLivre()
    {
        return Categorie::select('categories.id', 'categories.title', DB::raw('count(livres.id) as total'))
                        ->join('livres', 'livres.categorie_id' , '=', 'categories.id')
                        ->groupBy('categories.id', 'categories.title')
                        ->get();
    }

    public function CategoriesArticle()
    {
        return Categorie::select('categories.id', 'categories.title', DB::raw('count(articles.id) as total'))
                        ->join('articles', 'articles.categorie_id' , '=', 'categories.id')
                        ->groupBy('categories.id', 'categories.title')
                        ->get();
    }
    
}