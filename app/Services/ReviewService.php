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

    public function getReviews($filter = null, $pagination = 30)
    {
        $user = Auth::user();
        if ($user->role->name == 'lecteur') {
            $user = $this->lecteurRepository->findLecteur($user->id);
        } elseif ($user->role->name == 'auteur') {
            $user = $this->autuerRepository->findAuteur($user->id);
        }
        
        if (empty($filter)) {
            if ($user->role->name == 'librarian' || $user->role->name == 'admin') {
                $result = $this->reviewRepository->getAllReview();
            } else {
                $result = $this->reviewRepository->getUserReviews($user);
            }
        } else {
            if (isset($filter['created_at'])) {
                $filter['created_at'] = Carbon::now()->subDays($filter['created_at']);
                $filter[] = ['status_Pro', '>=', $filter['status_Pro']];
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

    }
    
}