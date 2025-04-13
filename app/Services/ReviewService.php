<?php

namespace App\Services;

use App\Models\Review;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\ReviewRepositoryInterface;
use App\ServiceInterfaces\ReviewServiceInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReviewService implements ReviewServiceInterface
{
    protected $reviewRepository;
    protected $lecteurRepository;
    protected $autuerRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository,
                                AuteurRepositoryInterface $autuerRepository,
                                LecteurRepositoryInterface $lecteurRepository
                                )
    {
        $this->reviewRepository = $reviewRepository;
        $this->lecteurRepository = $lecteurRepository;
        $this->autuerRepository = $autuerRepository;
    }

    public function getReviews($data = null, $pagination = 30)
    {
        $user = Auth::user();
        if ($user->role->name == 'lecteur') {
            $user = $this->lecteurRepository->findLecteur($user->id);
        } elseif ($user->role->name == 'auteur') {
            $user = $this->autuerRepository->findAuteur($user->id);
        }
        
        if (empty($data)) {
            if ($user->role->name == 'librarian' || $user->role->name == 'admin') {
                $result = $this->reviewRepository->getAllReview();
            } else {
                $result = $this->reviewRepository->getUserReviews($user);
            }
        } else {
            $filter = [];
            if (isset($data['Create_Date'])) {
                $date = Carbon::now()->subDays($data['Create_Date']);
                $filter[] = ['created_at', '>=', $date];
            }

            if (isset($data['Review_By'])) {
                $filter[] = ['reviewtable1_type', $data['Review_By']];
            }

            if (isset($data['Review_On'])) {
                $filter[] = ['reviewtable2_type', $data['Review_On']];
            }

            if ($user->role->name == 'librarian' || $user->role->name == 'admin') {
                $result = $this->reviewRepository->filterReviews($filter);
            } else {
                $result = $this->reviewRepository->getUserReviews($filter);
            }
        }

        if (!$result) {
            $message = "Erreur lours de la recupération des reviews. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun review.";
            $statusData = 404;
        } else {
            $message = "Les Reviews trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Reviews' => $result,
            'statusData' => $statusData,
        ];
    }
    
    public function findReview($Review_id)
    {

    }
    
    public function getUserReview($User, $pagivation = 6)
    {

    }
    
    public function insertReview($data)
    {

    }
    
    public function updateReview(Review $Review, $data)
    {

    }
    
    public function updateEtatReview(Review $Review, $data)   
    {

    }
    
    public function deleteReview(Review $Review)
    {
        $user = Auth::user();
        
        if (!in_array($user->role->name, ['librarian', 'admin']) && $Review->reviewtable1->id != $user->id) {
            return [
                'message' => "Vous n\'avez pas les permissions nécessaires pour supprimé ce review",
                'statusData' => 401,
            ];
        }

        $result = $this->reviewRepository->deleteReview($Review);

        if (!$result) {
            $message = "Erreur lours de la suppression du review . Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "Le Review supprimé avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Reviews' => $result,
            'statusData' => $statusData,
        ];
    }
    
}