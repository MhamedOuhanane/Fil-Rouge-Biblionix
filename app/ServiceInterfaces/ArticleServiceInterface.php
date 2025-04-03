<?php

namespace App\ServiceInterfaces;

interface ArticleServiceInterface
{
    public function getArticles();
    public function getUserArticles($user);
    public function findArticles($id);
    public function insertArticle($data);
    public function updateArticle($article, $data);
    public function deleteArticle($article);
}