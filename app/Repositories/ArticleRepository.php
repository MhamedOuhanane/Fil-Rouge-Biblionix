<?php 

namespace App\Repositories;

use App\Models\Article;
use App\RepositoryInterfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function getAllArticles()
    {
        return Article::with(['articletable', 'categorie', 'tags'])
                        ->paginate(9);
    }

    public function findArticle($id)
    {
        return Article::with(['articletable', 'categorie', 'tags'])->find($id);
    }

    public function filterArticles($filter, $paginate = 9)
    {
        return Article::with(['articletable', 'categorie', 'tags'])
                        ->where($filter)
                        ->paginate($paginate);

    }

    public function createArticle($createur, $data)
    {
        return $createur->articles()->create($data);
    }

    public function updateArticle(Article $article, $data)
    {
        return $article->update($data);
    }

    public function deleteArticle(Article $article)
    {
        return $article->delete();
    }

    public function linkTags(Article $article, $tag_id)
    {
        return $article->tags()->attach($tag_id);
    }

    public function deleteLinkTags(Article $article)
    {
        return $article->tags()->detach();
    }

}