<?php

namespace App\Services;

use App\RepositoryInterfaces\ArticleRepositoryInterface;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\RepositoryInterfaces\TagRepositoryInterface;
use App\ServiceInterfaces\ArticleServiceInterface;
use Illuminate\Support\Facades\Auth;

class ArticleService implements ArticleServiceInterface
{
    protected $articleRepository;
    protected $auteurRepository;
    protected $librarianRepository;
    protected $tagRepository;

    public function __construct(ArticleRepositoryInterface $articleRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                LibrarianRepositoryInterface $librarianRepository,
                                TagRepositoryInterface $tagRepository
                                )
    {
        $this->articleRepository = $articleRepository;
        $this->librarianRepository = $librarianRepository;
        $this->auteurRepository = $auteurRepository;
        $this->tagRepository = $tagRepository;
    }

    public function getArticles()
    {

    }

    public function getUserArticles($user)
    {

    }

    public function findArticles($id)
    {

    }

    public function insertArticles($data)
    {
        $user = Auth::user();
        
        switch ($user->role->name) {
            case 'auteur':
                $user = $this->auteurRepository->findAuteur($user->id);
                break;
                
            case 'librarian':
                $user = $this->librarianRepository->findLibrarian($user->id);
                break;

            default:
                return [
                    'message' => 'Vous n\'avez pas les permissions nécessaires pour accéder à cette fonctionnalité.',
                    'statusData' => 403,
                ];
                break;
        }

        $data['content'] = $data['content']->store('photos', 'public');

        $result = $this->articleRepository->createArticle($user, $data['article']);

        if ($result) {
            if (isset($data['tags'])) {
                foreach ($data['tags'] as $tagId) {
                    $this->articleRepository->linkTags($result, $tagId);
                }
            }
            $message = 'L\'article ' . $data['title'] . ' créés avec succès.';
            $statusData = 201;
        } else {
            $message = 'L\'article ' . $data['title'] . ' n\'a pas pu être créé.';
            $statusData = 400;
        }

        return [
            'message' => $message,
            'Article' => $result,
            'statusData' => $statusData,
        ];
        
    }

    public function updateArticles($article, $data)
    {

    }

    public function deleteArticles($article)
    {

    }

}