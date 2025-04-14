<?php

namespace App\RepositoryInterfaces;

use App\Models\Article;
use App\Models\Commentaire;

interface CommentaireRepositoryInterface
{
    public function getArticleCommentaires(Article $article);
    public function getCreateurCommentaires($Createur);
    public function findCommentaire($id);
    public function createCommentaire($Createur, $data);
    public function updateCommentaire(Commentaire $Commentaire, $data);
    public function deleteCommentaires(Commentaire $Commentaire);

}