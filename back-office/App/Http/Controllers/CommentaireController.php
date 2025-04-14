<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use App\Http\Requests\StoreCommentaireRequest;
use App\Http\Requests\UpdateCommentaireRequest;
use App\Models\Article;
use App\ServiceInterfaces\CommentaireServiceInterface;

class CommentaireController extends Controller
{
    protected $commentairService;

    public function __construct(CommentaireServiceInterface $commentaireService)
    {
        $this->commentairService = $commentaireService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Article $Article)
    {
        $result = $this->commentairService->getCommentaires($Article);

        return response()->json([
            'message' => $result['message'],
            'Article' => $Article,
            'Commentaires' => $result['Commentaires'],
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentaireRequest $request, Article $Article)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $Article, Commentaire $commentaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentaireRequest $request,Article $Article, Commentaire $commentaire)
    {
        $data = $request->validate();


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $Article, Commentaire $commentaire)
    {
        $result = $this->commentairService->deleteCommentaires($commentaire);

        return response()->json([
            'message' => $result['message'],
            'Article' => $Article,
            'Commentaires' => $commentaire,
        ], $result['statusData']);
    }
}
