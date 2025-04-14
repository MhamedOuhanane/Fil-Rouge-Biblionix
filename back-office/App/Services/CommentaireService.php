<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Commentaire;
use App\RepositoryInterfaces\CommentaireRepositoryInterface;
use App\ServiceInterfaces\CommentaireServiceInterface;
use Illuminate\Support\Facades\Auth;

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
        $user = Auth::user();

        if (!in_array($user->role->name, ['librarian']) || $user->id != $Commentaire->commentairetable_id) {
            return [
                'message' => "Vous n\'avez pas les permissions nécessaires pour supprimé ce Commentaire",
                'statusData' => 401,
            ];
        }

        $result = $this->commentairRepository->deleteCommentaires($Commentaire);

        if (!$result) {
            $message = "Erreur lours de la suppression de Commentaire. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun Commentaire.";
            $statusData = 404;
        } else {
            $message = "Les Commentaires trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Commentaires' => $result,
            'statusData' => $statusData,
        ];
    }
    
}