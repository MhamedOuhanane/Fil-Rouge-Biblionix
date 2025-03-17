<?php 

namespace App\Services;

use App\RepositoryInterfaces\CategorieRepositoryInterface;
use App\ServiceInterfaces\CategorieServiceInterface;

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
            $message = empty($result)  ? 'Categories trouvés avec succès.' : "Il n'existe actuellement aucun categorie associé à notre site.";
            $status = empty($result)  ? 200 : 404;
        } else {
            $result = $this->categorieRepository->searchCategories($search);
            $message = empty($result)  ? 'Categories trouvés avec succès.' : 'Aucun tag trouvé avec le nom ' . $search . '.';
            $status = empty($result)  ? 200 : 404;
        }

        if (!$result) {
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
        $data['logo'] = $data['logo']->store('photos', 'public');
        $result = $this->categorieRepository->createCategorie($data);

        $message = $result ? "Categorie '$result->title' créés avec succès." : "Certaines erreurs sont survenues lors de la création de '$result->title'.";
        $status = $result ? 200 : 500;

        return [
            'message' => $message,
            'categorie' => $result,
            'status' => $status,
        ];
    }

    public function deleteCateg()
    {

    }

    public function updateCategories($data, $categorie)
    {

    }
}