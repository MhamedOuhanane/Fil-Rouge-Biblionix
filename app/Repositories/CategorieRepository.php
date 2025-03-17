<?php

namespace App\Repositories;

use App\Models\Categorie;
use App\RepositoryInterfaces\CategorieRepositoryInterface;

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
        
    }
    
    public function createCategorie($data)
    {
        
    }
    
    public function updateCategorie($data, $categorie)
    {
        
    }
    
    public function deleteCategories($categorie)
    {
        
    }

}