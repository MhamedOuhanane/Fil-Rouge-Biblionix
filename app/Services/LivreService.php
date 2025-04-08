<?php

namespace App\Services;

use App\Models\Livre;
use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\ServiceInterfaces\LivreServiceInterface;
use Illuminate\Support\Facades\Auth;

class LivreService implements LivreServiceInterface
{
    protected $livreRepository;

    public function __construct(LivreRepositoryInterface $livreRepository)
    {
        $this->livreRepository = $livreRepository;
    }

    public function getLivres($data)
    {
        if (empty($data)) {
            $result = $this->livreRepository->getAllLivres($data['pageArticles']);            
        } else {
            $filter = [];
            if (isset($data['tag'])) {
                $filter[1][] = ['tag_id', $data['tag']];
            }

            if (isset($data['categorie'])) {
                $filter[1][] = ['categorie_id', $data['categorie']];
            }

            if (isset($data['status_livre']) && $data['status_livre'] != 'Accepter') {
                if (Auth::user()->role->name == 'librarian') {
                    $filter[1][] = ['status_livre', $data['status_livre']];
                } else {
                    return [
                        'message' => "Vous n\'avez pas les permissions nécessaires pour accéder à cette fonctionnalité.",
                        'Articles' => null,
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


            $result = $this->livreRepository->filterLivres($filter, $data['pageArticles']);
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
            'Articles' => $result,
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

    }
    
    public function updateLivre(Livre $Livre, $data)
    {

    }
    
    public function deleteLivre(Livre $Livre)
    {

    }
    
}