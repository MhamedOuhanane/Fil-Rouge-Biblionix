<?php

namespace App\Services;

use App\Models\Livre;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\ServiceInterfaces\LivreServiceInterface;
use Illuminate\Support\Facades\Auth;

class LivreService implements LivreServiceInterface
{
    protected $livreRepository;
    protected $auteurRepository;

    public function __construct(LivreRepositoryInterface $livreRepository,
                                AuteurRepositoryInterface $auteurRepository
                                )
    {
        $this->livreRepository = $livreRepository;
        $this->auteurRepository = $auteurRepository;
    }

    public function getLivres($data)
    {
        if (empty($data)) {
            $result = $this->livreRepository->getAllLivres();            
        } else {
            // $filter = [];
            $filter[1] = [];
            if (isset($data['tag'])) {
                $filter[1][] = ['tag_id', $data['tag']];
            }

            if (isset($data['categorie'])) {
                $filter[1][] = ['categorie_id', $data['categorie']];
            }

            if (isset($data['status_livre'])) {
                if ($data['status_livre'] == 'Accepter' || Auth::user()->role->name == 'librarian' ) {
                    $filter[1][] = ['status_livre', $data['status_livre']];
                } else {
                    return [
                        'message' => "Vous n\'avez pas les permissions nécessaires pour trouvé les livres qui ne sont pas Publié.",
                        'Livres' => null,
                        'statusData' => 401,
                    ];
                }
                
            } 

            if (isset($data['disponibilite'])) {
                $filter[1][] = ['disponibilite', $data['disponibilite']];
            }

            $filter[2] = $filter[1];
            if (isset($data['search'])) {
                $filter[1][] = ['title', 'ILIKE', '%' . $data['search'] . '%'];
                $filter[2][] = ['author', 'ILIKE', '%' . $data['search'] . '%'];
            }

            $result = $this->livreRepository->filterLivres($filter, $data['pageLivres'] ?? 9);
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
    
    public function findLivres($id)
    {
        
    }
    
    public function insertLivre($data)
    {
        $user = Auth::user();
        
        switch ($user->role->name) {
            case 'auteur':
                $user = $this->auteurRepository->findAuteur($user->id);
                break;
                
            case 'librarian':
                $data['livre']['status_livre'] = 'Accepter';
                break;

            default:
                return [
                    'message' => 'Vous n\'avez pas les permissions nécessaires pour ajouter un livre.',
                    'statusData' => 403,
                ];
                break;
        }
        
        $data['livre']['photo'] = $data['livre']['photo']->store('photos', 'public');

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
        if (isset($data['photo'])) {
            $data['livre']['photo'] = $data['livre']['photo']->store('photos', 'public');
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

    }
    
}