<?php 

namespace App\Services;

use App\RepositoryInterfaces\TagRepositoryInterface;
use App\ServiceInterfaces\TagServiceInterface;

class TagService implements TagServiceInterface
{
    protected $tagRepoqitory;

    public function __construct(TagRepositoryInterface $tagRepoqitory)
    {
        $this->tagRepoqitory = $tagRepoqitory;
    }

    public function getTags($search)
    {
        if (empty($search)) {
            $tags = $this->tagRepoqitory->getAllTags();
        } else {
            $tags = $this->tagRepoqitory->searchTags($search);
        }

        if ($tags->isEmpty()) {
            if (empty($search)) {
                $message = "Il n'existe actuellement aucun tag associé à notre site.";
            } else {
                $message = 'Aucun tag trouvé avec le nom ' . $search . '.';
            }
            
            return [
                'status' => 404,
                'message' => $message,
                'tags' => []
            ];
        } else {
            return [
                'status' => 200,
                'message' => 'Tags trouvés avec succès.',
                'tags' => $tags
            ];
        }
        
    }

    public function insertMulTags($names)
    {
        $erreurs = [];
        $createTags = [];
        foreach ($names as $name) {
            $data = ['name' => $name];
            $result = $this->tagRepoqitory->createTag($data);

            if (!$result) {
                $erreurs[] = "Le tag '$name' n'a pas pu être créé.";
            } else {
                $createTags[] = $name;
            }
        }

        if (!empty($erreurs)) {
            return [
                'message' => 'Certaines erreurs sont survenues lors de la création des tags.',
                'result' => $erreurs,
                'status' => 400
            ];
        }

        return [
            'message' => 'Tags créés avec succès.',
            'result' => $createTags,
            'status' => 200
        ];
    }

}