<?php 

namespace App\Services;

use App\RepositoryInterfaces\CategorieRepositoryInterface;
use App\ServiceInterfaces\CategorieServiceInterface;

use function Laravel\Prompts\search;

class CategorieService implements CategorieServiceInterface
{
    protected $categorieRepository;

    public function __construct(CategorieRepositoryInterface $categorieRepository)
    {
        $this->categorieRepository = $categorieRepository;
    }
    
    public function getCategories($search)
    {
        if (empty($search)) {
            $result = $this->categorieRepository->getAllCategories();
            
            if (empty($result)) {
                $message = "Il n'existe actuellement aucun categorie associé à notre site.";
                $status = 404;
            }
            
        } else {
            $result = $this->categorieRepository->searchCategories($search);

            if (empty($result)) {
                $message = 'Aucun tag trouvé avec le nom ' . $search . '.';
                $status = 404;
            }
        }
        if (!empty($result)) {
            $message = 'Categories trouvés avec succès.';
            $status = 200;
        } elseif (!$result) {
            $message = 'Certaines erreurs sont survenues lors du returne des catégorie.';
            $status = 400;
        }

        return [
            'message' => $message,
            'categories' => $result,
            'status' => $status,
        ];
    }

    public function ajouterCategorie($data)
    {

    }

    public function deleteCateg()
    {

    }

    public function updateCategories($data, $categorie)
    {

    }
}