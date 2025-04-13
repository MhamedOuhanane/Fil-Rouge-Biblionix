<?php

namespace App\ServiceInterfaces;

interface CategorieServiceInterface 
{
    public function getCategories($search);
    public function ajouterCategorie($data);
    public function deleteCateg($categorie);
    public function updateCategories($data, $categorie);
    // public function findCategories($id);
}