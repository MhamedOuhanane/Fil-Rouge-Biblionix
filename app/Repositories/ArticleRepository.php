<?php 

namespace App\Repositories;

use App\Models\Article;
use App\RepositoryInterfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function getAllArticles($paginate)
    {
        return Article::with('tags')
                        ->with('categories')
                        ->with('auteurs')
                        ->with('librarians')
                        ->paginate($paginate)
                        ->get();
    }

    public function findArticle($id)
    {
        return Article::find($id);
    }

    public function filterArticles($filter, $paginate)
    {
        return Article::with('tags')
                        ->with('categories')
                        ->with('auteurs')
                        ->with('librarians')
                        ->where($filter)
                        ->paginate($paginate)
                        ->get();
    }

    public function createArticle($createur, $data)
    {
        return $createur->articles()->create($data);
    }

    public function updateArticle($data, $article)
    {
        return $article->update($data);
    }

    public function deleteArticle($article)
    {
        return $article->delete();
    }

    public function linkTags($article, $tag_id)
    {
        return $article->tags()->attach($tag_id);
    }

    public function deleteLinkTags($article)
    {
        return $article->tags()->detach();
    }

}