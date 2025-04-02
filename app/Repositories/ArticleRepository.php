<?php 

namespace App\Repositories;

use App\Models\Article;
use App\RepositoryInterfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function getAllArticles()
    {
        return Article::all();
    }

    public function findArticle($id)
    {
        return Article::find($id);
    }

    public function filterArticles($filter)
    {
        return Article::where($filter)->get();
    }

    public function createArticle($createur, $data)
    {
        return $createur->article->create($data);
    }

    public function updateArticle($data, $article)
    {
        return $article->update($data);
    }

    public function deleteArticle($article)
    {
        return $article->delete();
    }

}