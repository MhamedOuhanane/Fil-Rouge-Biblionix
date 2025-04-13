<?php 

namespace App\RepositoryInterfaces;

interface CategorieRepositoryInterface
{
    public function getAllCategories();
    public function searchCategories($search);
    public function findCategorie($id);
    public function createCategorie($data);
    public function updateCategorie($data, $categorie);
    public function deleteCategories($categorie);

}