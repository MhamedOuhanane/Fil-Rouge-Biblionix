<?php

namespace App\Services;

use App\RepositoryInterfaces\ArticleRepositoryInterface;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\ServiceInterfaces\ArticleServiceInterface;
use Illuminate\Support\Facades\Auth;

class ArticleService implements ArticleServiceInterface
{
    protected $articleRepository;
    protected $auteurRepository;
    protected $librarianRepository;

    public function __construct(ArticleRepositoryInterface $articleRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                LibrarianRepositoryInterface $librarianRepository
                                )
    {
        $this->articleRepository = $articleRepository;
        $this->librarianRepository = $librarianRepository;
        $this->auteurRepository = $auteurRepository;
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

        $result = $this->articleRepository->createArticle($user, $data);

        if ($result) {
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