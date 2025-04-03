<?php 

namespace App\RepositoryInterfaces;

interface ArticleRepositoryInterface
{
    public function getAllArticles($paginate);
    public function findArticle($id);
    public function filterArticles($data, $paginate);
    public function createArticle($createur, $data);
    public function linkTags($article, $idTag);
    public function deleteLinkTags($article);
    public function updateArticle($data, $article);
    public function deleteArticle($article);
}