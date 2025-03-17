<?php 

namespace App\Services;

use App\RepositoryInterfaces\CategorieRepositoryInterface;
use App\ServiceInterfaces\CategorieServiceInterface;
use Illuminate\Support\Facades\Storage;

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

        $message = $result ? "Categorie '$result->title' créé avec succès." : "Certaines erreurs sont survenues lors de la création de '$result->title'. Veuillez réessayer plus tard.";
        $status = $result ? 200 : 500;

        return [
            'message' => $message,
            'categorie' => $result,
            'status' => $status,
        ];
    }

    public function updateCategories($data, $categorie)
    {
        $data['logo'] = $data['logo']->store('photos', 'public');
        if (Storage::exists($categorie->logo)) {
            $logo = $data['loogo'] == $categorie->logo ? $data['logo'] : $categorie->logo;
            Storage::delete($logo);
        }
        
        $result = $this->categorieRepository->updateCategorie($data, $categorie);
        $message = $result ? "Categorie '$categorie->title' modifié avec succès." : "Certaines erreurs sont survenues lors de la modification de '$categorie->title'. Veuillez réessayer plus tard.";
        $status = $result ? 200 : 500;

        return [
            'message' => $message,
            'categorie' => $result,
            'status' => $status,
        ];
    }

    public function deleteCateg($categorie)
    {
        $result = $this->categorieRepository->deleteCategories($categorie);
        $message = $result ? "Categorie '$categorie->title' supprimé avec succès." : "Certaines erreurs sont survenues lors de la suppression de '$categorie->title'. Veuillez réessayer plus tard.";
        $status = $result ? 200 : 500;

        return [
            'message' => $message,
            'status' => $status,
        ];
    }

}