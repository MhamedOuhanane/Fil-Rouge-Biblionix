<?php

namespace App\ServiceInterfaces;

interface ArticleServiceInterface
{
    public function getArticles();
    public function getUserArticles($user);
    public function findArticles($id);
    public function insertArticles($data);
    public function updateArticles($article, $data);
    public function deleteArticles($article);
}