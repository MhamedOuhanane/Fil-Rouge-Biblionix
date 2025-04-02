<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\ServiceInterfaces\ArticleServiceInterface;

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
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $data['article'] = $request->only('title', 'description', 'content', 'categorie_id');
        $data['tags'] = $request->only('tags');
        $result = $this->articleService->insertArticles($data);

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
