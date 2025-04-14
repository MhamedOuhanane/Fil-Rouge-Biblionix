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
        $result = $this->commentairRepository->getArticleCommentaires($article);

        if (!$result) {
            $message = "Erreur lours de la recupération des commentaires d'article '$article->title'. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun commentaire dans l'article '$article->title'.";
            $statusData = 404;
        } else {
            $message = "Les Commentaires trouvés avec succès.";
            $statusData = 200;
        }

        // $result = $result ? $result->items() : null;
        return [
            'message' => $message,
            'Commentaires' => $result,
            'statusData' => $statusData,
        ];

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