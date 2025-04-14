<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Commentaire;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\CommentaireRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\ServiceInterfaces\CommentaireServiceInterface;
use Illuminate\Support\Facades\Auth;

class CommentaireService implements CommentaireServiceInterface
{
    protected $commentaireRepository;
    protected $librarainRepository;
    protected $auteurRepository;
    protected $lecteurRepository;

    public function __construct(CommentaireRepositoryInterface $commentaireRepository,
                                LibrarianRepositoryInterface $librarainRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                LecteurRepositoryInterface $lecteurRepository,
                                )
    {
        $this->commentaireRepository = $commentaireRepository;
        $this->librarainRepository = $librarainRepository;
        $this->auteurRepository = $auteurRepository;
        $this->lecteurRepository = $lecteurRepository;
    }

    public function getCommentaires(Article $article)
    {
        $result = $this->commentaireRepository->getArticleCommentaires($article);

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
        $user = Auth::user();
        $data['article_id'] = $article->id;
        switch ($user->role->name) {
            case 'librarian':
                $createur = $this->librarainRepository->findLibrarian($user->id);
                break;

            case 'auteur':
                $createur = $this->auteurRepository->findAuteur($user->id);
                break;

            case 'lecteur':
                $createur = $this->lecteurRepository->findLecteur($user->id);
                break;
            
            default:
                return [
                    'message' => "Vous n\'avez pas les permissions nécessaires pour faire un commentaire",
                    'statusData' => 401,
                ];
                break;
        }
        
        $result = $this->commentaireRepository->createCommentaire($createur, $data);
        if (!$result) {
            $message = "Erreur lours de la creation de Commentaire. Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "Le Commentaire crée avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Commentaire' => $result,
            'statusData' => $statusData,
        ];
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

        $result = $this->commentaireRepository->deleteCommentaires($Commentaire);

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