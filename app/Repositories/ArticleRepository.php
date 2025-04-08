<?php 

namespace App\Repositories;

use App\Models\Article;
use App\RepositoryInterfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function getAllArticles($paginate = 9)
    {
        return Article::with(['articletable', 'categories', 'tags'])
                        ->paginate($paginate);
    }

    public function findArticle($id)
    {
        return Article::find($id);
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