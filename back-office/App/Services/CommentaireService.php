<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Commentaire;
use App\RepositoryInterfaces\CommentaireRepositoryInterface;
use App\ServiceInterfaces\CommentaireServiceInterface;

class CommentaireService implements CommentaireServiceInterface
{
    protected $commentairRepository;

    public function __construct(CommentaireRepositoryInterface $commentaireRepository)
    {
        $this->commentairRepository = $commentaireRepository;
    }

    public function getCommentaires(Article $article)
    {

    }
    
    public function getCreateurCommentaires()
    {

    }
    
    public function findCommentaire($id)
    {

    }
    
    public function insertCommentaire(Article $article, $data)
    {

    }
    
    public function updateCommentaire(Commentaire $Commentaire, $data)
    {

    }
    
    public function deleteCommentaires(Commentaire $Commentaire)
    {

    }
    
}