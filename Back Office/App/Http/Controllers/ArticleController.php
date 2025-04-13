<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterArticleRequest;
use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Requests\UpdateStatusArticleRequest;
use App\ServiceInterfaces\ArticleServiceInterface;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    protected $articleService;

    public function __construct(ArticleServiceInterface $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = $request->only('search', 'tag', 'categorie', 'date', 'status', 'pageArticles');

        $result = $this->articleService->getArticles($data);

        return response()->json([
            'message' => $result['message'],
            'Articles' => $result['Articles'],
            'search' => $data['search'], 
            'tag' => $data['tag'], 
            'categorie' => $data['categorie'], 
            'date' => $data['date'], 
            'status' => $data['status'], 
            'pageArticles' => $data['pageArticles'],
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $data['article'] = $request->only('title', 'description', 'content', 'categorie_id');
        $data['tags'] = $request->only('tags');
        $result = $this->articleService->insertArticle($data);

        return response()->json([
            'message' => $result['message'],
            'Article' => $result['Article'] ?? null,
        ], $result['statusData']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return response()->json([
            'message' => 'L\'Article est trouvé : ',
            'Article' => $article,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $data['article'] = $request->only('title', 'description', 'content', 'categorie_id', 'status');
        $data['tags'] = $request->only('tags');
        $result = $this->articleService->updateArticle($article ,$data);
        $article = $this->articleService->findArticles($article->id);

        return response()->json([
            'message' => $result['message'],
            'Article' => $article,
        ], $result['statusData']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $result = $this->articleService->deleteArticle($article);

        return response()->json([
            'message' => $result['message'],
        ], $result['statusData']);
    }
}
