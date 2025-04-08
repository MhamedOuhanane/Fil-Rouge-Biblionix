<?php 

namespace App\RepositoryInterfaces;

use App\Models\Article;

interface ArticleRepositoryInterface
{
    public function getAllArticles($paginate);
    public function findArticle($id);
    public function filterArticles($data, $paginate);
    public function createArticle($createur, $data);
    public function linkTags(Article $article, $idTag);
    public function deleteLinkTags(Article $article);
    public function updateArticle(Article $article, $data);
    public function deleteArticle(Article $article);
}