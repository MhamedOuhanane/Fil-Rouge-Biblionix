<?php

namespace App\ServiceInterfaces;

use App\Models\Article;
use App\Models\Commentaire;

interface CommentaireServiceInterface
{
    public function getCommentaires(Article $article);
    public function findCommentaire($id);
    public function insertCommentaire(Article $article, $data);
    public function updateCommentaire(Commentaire $Commentaire, $data);
    public function deleteCommentaires(Commentaire $Commentaire);
}