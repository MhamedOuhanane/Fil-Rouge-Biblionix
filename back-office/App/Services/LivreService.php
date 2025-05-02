<?php

namespace App\Services;

use App\Models\Livre;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\RepositoryInterfaces\ReviewRepositoryInterface;
use App\ServiceInterfaces\LivreServiceInterface;
use Error;
use Illuminate\Support\Facades\Auth;

class LivreService implements LivreServiceInterface
{
    protected $livreRepository;
    protected $auteurRepository;
    protected $reviewRepository;

    public function __construct(LivreRepositoryInterface $livreRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                ReviewRepositoryInterface $reviewRepository
                                )
    {
        $this->livreRepository = $livreRepository;
        $this->auteurRepository = $auteurRepository;
        $this->reviewRepository = $reviewRepository;
    }

    public function getLivres($data)
    {
        if (empty($data)) {
            $result = $this->livreRepository->getAllLivres($data['pageLivres'] ?? 9);            
        } else {
            $filter[0] = [];

            if (isset($data['categorie'])) {
                $filter[0][] = ['categorie_id', $data['categorie']];
            }

            if (isset($data['status_livre'])) {
                if ($data['status_livre'] == 'Accepter' || Auth::user()->role->name == 'librarian') {
                    $filter[0][] = ['status_livre', $data['status_livre']];
                } else {
                    return [
                        'message' => "Vous n\'avez pas les permissions nécessaires pour trouvé les livres qui ne sont pas Publié.",
                        'Livres' => null,
                        'statusData' => 401,
                    ];
                }
                
            } 

            if (isset($data['disponibilite'])) {
                $filter[0][] = ['disponibilite', $data['disponibilite']];
            }

            $filter[1] = $filter[0];
            if (isset($data['search'])) {
                $filter[0][] = ['title', 'ILIKE', '%' . $data['search'] . '%'];
                $filter[1][] = ['author', 'ILIKE', '%' . $data['search'] . '%'];
            }

            $result = $this->livreRepository->filterLivres($filter, $data['tag'], $data['pageLivres'] ?? 9);
        }
        
        if (!$result) {
            $message = "Erreur lours de la recupération des livres. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun livre.";
            $statusData = 404;
        } else {
            $message = "Les livres trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Livres' => $result,
            'statusData' => $statusData,
        ];

    }
    
    public function getUserLivres($user)
    {

    }
    
    public function findLivre($id)
    {
        $result = $this->livreRepository->findLivre($id);

        if (!$result) {
            $message = "Erreur lours de la recupération de livre. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif (is_null($result)) {
            $message = "Il n'existe actuellement aucun livre.";
            $statusData = 404;
        } else {
            $message = "Le livre trouvé avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Livre' => $result,
            'reviews' => $reviewsLivre ?? null,
            'statusData' => $statusData,
        ];
    }
    
    public function insertLivre($data)
    {
        $user = Auth::user();
        
        switch ($user->role->name) {
            case 'auteur':
                $user = $this->auteurRepository->findAuteur($user->id);
                $data['livre']['status_livre'] = 'En Attente';
                $data['livre']['disponibilite'] = 'Indisponible';
                break;
                
            case 'librarian':
                $data['livre']['status_livre'] = 'Accepter';
                if (!isset($data['livre']['disponibilite'])) $data['livre']['disponibilite'] = 'Disponible';
                break;

            default:
                return [
                    'message' => 'Vous n\'avez pas les permissions nécessaires pour ajouter un livre.',
                    'statusData' => 403,
                ];
                break;
        }
        
        $data['livre']['photo'] = $data['livre']['photo']->store('photos/livres', 'public');

        $result = $this->livreRepository->createLivre($user, $data['livre']);

        if ($result) {
            if (isset($data['tags'])) {
                foreach ($data['tags'] as $tagId) {
                    $this->livreRepository->linkTags($result, $tagId);
                }
            }

            $message = 'Le livre ' . $data['livre']['title'] . ' créés avec succès.';
            $statusData = 201;
        } else {
            $message = 'Le livre ' . $data['livre']['title'] . ' n\'a pas pu être créé.';
            $statusData = 500;
        }

        $result = $this->livreRepository->findLivre($result->id);

        return [
            'message' => $message,
            'Livre' => $result,
            'statusData' => $statusData,
        ];
        
    }
    
    public function updateLivre(Livre $Livre, $data)
    {
        if (Auth::user()->role->name != 'librarian' && $Livre->status_livre != 'En Attente') {
            return [
                'message' => "Vous n’avez pas l’autorisation de modifier ce livre. Il doit être en statut 'En Attente' pour être modifié.",
                'statusData' => 403,
            ];
        }

        if (isset($data['livre']['photo'])) {
            $data['livre']['photo'] = $data['livre']['photo']->store('photos/livres', 'public');
        }

        $result = $this->livreRepository->updateLivre($Livre, $data['livre']);

        if (!$result) {
            return [
                'message' => 'Erreur lour de la modification de livre "' . $Livre->title . '".',
                'statusData' => 500,
            ];
        }

        if (isset($data['tags'])) {
            $this->livreRepository->deleteLinkTags($Livre);
            foreach ($data['tags'] as $tag_id) {
                $this->livreRepository->linkTags($Livre, $tag_id);
            }
        }

        $livre = $this->livreRepository->findLivre($Livre->id);
        
        return [
            'message' => 'Le livre "' . $Livre->title . '" modifiée avec succès.',
            'Livre' => $livre,
            'statusData' => 200,
        ];

    }
    
    public function deleteLivre(Livre $Livre)
    {
        if (Auth::user()->role->name != 'librarian' && $Livre->status_livre == 'Accepter') {
            return [
                'message' => "Vous n’avez pas l’autorisation de supprimer ce livre. Il doit être en statut 'En Attente' pour être modifié.",
                'statusData' => 403,
            ];
        }

        $result = $this->livreRepository->deleteLivre($Livre);

        if ($result) {
            $message = "Le livre a été supprimé avec succès.";
            $statusData = 200; 
        } else {
            $message = "Une erreur est survenue lors de la suppression du livre.";
            $statusData = 500;
        }

        return [
            'message' => $message,
            'status' => $statusData,
        ];
    }
    
}