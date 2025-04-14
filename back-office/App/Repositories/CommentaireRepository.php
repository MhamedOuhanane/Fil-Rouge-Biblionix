<?php

namespace App\Repositories;

use App\Models\Article;
use App\Models\Commentaire;
use App\RepositoryInterfaces\CommentaireRepositoryInterface;

class CommentaireRepository implements CommentaireRepositoryInterface
{
    public function getArticleCommentaires(Article $article)
    {
        return Commentaire::with(['article', 'commentairetable'])
                            ->where('article_id', $article->id)
                            ->orderBy('created_at', 'DESC')
                            ->get();
    }
    
    public function getCreateurCommentaires($Createur)
    {
        return Commentaire::with(['article', 'commentairetable'])
                            ->where('commentairetable_id', $Createur->id)
                            ->orderBy('created_at', 'DESC')
                            ->get();
    }
    
    public function findCommentaire($Commentaire_id)
    {
        return Commentaire::with(['article', 'commentairetable'])
                            ->find($Commentaire_id);
    }
    
    public function createCommentaire($Createur, $data)
    {
        return $Createur->commentaires()->create($data);
    }
    
    public function updateCommentaire(Commentaire $Commentaire, $data)
    {
        return $Commentaire->update($data);
    }
    
    public function deleteCommentaires(Commentaire $Commentaire)
    {   
        return $Commentaire->delete();
    }
    
}