<?php 

namespace App\RepositoryInterfaces;

interface ArticleRepositoryInterface
{
    public function getAllArticles();
    public function findArticle($id);
    public function filterArticles($data);
    public function createArticle($createur, $data);
    public function updateArticle($data, $article);
    public function deleteArticle($article);
}