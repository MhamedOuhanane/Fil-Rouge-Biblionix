<?php

namespace App\Services;

use App\RepositoryInterfaces\ArticleRepositoryInterface;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\RepositoryInterfaces\TagRepositoryInterface;
use App\ServiceInterfaces\ArticleServiceInterface;
use Carbon\Carbon;
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

    public function getArticles($data)
    {
        if (empty($data)) {
            $result = $this->articleRepository->getAllArticles();            
        } else {
            $filter = [];
            if (isset($data['search'])) {
                $filter[] = ['title', 'ILIKE', '%' . $data['search'] . '%'];
            }

            if (isset($data['tag'])) {
                $filter[] = ['tag_id', $data['tag']];
            }

            if (isset($data['categorie'])) {
                $filter[] = ['categorie_id', $data['categorie']];
            }

            if (isset($data['date'])) {
                $date = Carbon::now()->subDays($data['date']);
                $filter[] = ['created_at', '>=', $date];
            }

            if (isset($data['status'])) {
                if (Auth::user()->role->name == 'librarian' || $data['status'] == 'Publié') {
                    $filter[] = ['status', $data['status']];
                } else {
                    return [
                        'message' => "Vous n\'avez pas les permissions nécessaires pour trouvé les articles qui ne sont pas Publié.",
                        'Articles' => null,
                        'statusData' => 401,
                    ];
                }
                
            }

            $result = $this->articleRepository->filterArticles($filter, $data['pageArticles']);
        }
        
        if (!$result) {
            $message = "Erreur lours de la recupération des articles. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun article.";
            $statusData = 404;
        } else {
            $message = "Les articles trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Articles' => $result,
            'statusData' => $statusData,
        ];

    }

    public function getUserArticles($user)
    {

    }

    public function findArticles($id)
    {
        return $this->articleRepository->findArticle($id);
    }

    public function insertArticle($data)
    {
        $user = Auth::user();
        
        switch ($user->role->name) {
            case 'auteur':
                $user = $this->auteurRepository->findAuteur($user->id);
                break;
                
            case 'librarian':
                $user = $this->librarianRepository->findLibrarian($user->id);
                $data['article']['status'] = 'Publié';
                break;

            default:
                return [
                    'message' => 'Vous n\'avez pas les permissions nécessaires pour accéder à cette fonctionnalité.',
                    'statusData' => 403,
                ];
                break;
        }

        $data['article']['content'] = $data['content']->store('photos', 'public');

        $result = $this->articleRepository->createArticle($user, $data['article']);

        if ($result) {
            if (isset($data['tags'])) {
                foreach ($data['tags'] as $tagId) {
                    $this->articleRepository->linkTags($result, $tagId);
                }
            }

            $message = 'L\'article ' . $data['article']['title'] . ' créés avec succès.';
            $statusData = 201;
        } else {
            $message = 'L\'article ' . $data['article']['title'] . ' n\'a pas pu être créé.';
            $statusData = 500;
        }

        return [
            'message' => $message,
            'Article' => $result,
            'statusData' => $statusData,
        ];
        
    }

    public function updateArticle($article, $data)
    {
        if (isset($data['content'])) {
            $data['article']['content'] = $data['article']['content']->store('photos', 'public');
        }

        $result = $this->articleRepository->updateArticle($article, $data['article']);
        
        if (!$result) {
            return [
                'message' => 'Erreur lour de la modification d\'article ' . $article->title,
                'statusData' => 500,
            ];
        }

        if ($data['tags']) {
            if ($article->tags) {
                $this->articleRepository->deleteLinkTags($article);
            }
            foreach ($data['tags'] as $tagId) {
                $this->articleRepository->linkTags($article, $tagId);
            }
        }

        $article = $this->articleRepository->findArticle($article->id);
        return [
            'message' => 'L\'article ' . $data['article']['title'] . ' modifiée avec succès.',
            'Article' => $article,
            'statusData' => 200,
        ];
    }

    public function deleteArticle($article)
    {
        $result = $this->articleRepository->deleteArticle($article);

        if ($result) {
            $message = "L'article $article->title supprimée avec succès.";
            $statusData = 200;
        } else {
            $message = "L'article $article->title n'a pas pu être supprimé. Veuillez réessayer plus tard.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'statusData' => $statusData, 
        ];
    }

}