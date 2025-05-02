<?php 

namespace App\Repositories;

use App\Models\Auteur;
use App\Models\Livre;
use App\Models\Review;
use App\RepositoryInterfaces\ReviewRepositoryInterface;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function getAllReview($pagination = 10)
    {
        return Review::with(['reviewtable1', 'reviewtable2'])
                        ->orderBy('created_at', 'DESC')
                        ->paginate($pagination);
    }
    
    public function filterReviews($filter, $pagination = 10)
    {
        return Review::with(['reviewtable1', 'reviewtable2'])
                        ->where($filter)
                        ->orderBy('created_at', 'DESC')
                        ->paginate($pagination);
    }

    public function SVGReviewLivres() {
        $ratingAvg = Review::where('reviewtable2_type', 'App\\Models\\Livre')
                    ->avg('rating', 3, 2);

        return $ratingAvg ? round($ratingAvg, 2) : 0;
    }

    public function SVGReviewAuteurs() {
        $ratingAvg = Review::where('reviewtable2_type', 'App\Models\Auteur')
                    ->avg('rating', 3, 2);
        return $ratingAvg ? round($ratingAvg, 2): 0;
    }
    
    public function getUserReviews($user, $filter = null, $pagination = 6)
    {
        if ($filter) {
            return $user->reviewsBy()
                    ->with('reviewtable2')
                    ->where($filter)
                    ->orderBy('created_at', 'DESC')
                    ->paginate(6);
        } else {
            return $user->reviewsBy()
                    ->with('reviewtable2')
                    ->orderBy('created_at', 'DESC')
                    ->paginate(6);
        }
        
    }
    
    public function getAuteurReviews(Auteur $Auteur, $filter = null, $pagination = 6)
    {
        if ($filter) {
            return Review::where('reviewtable2_type', 'App\\Model\\Auteur')
                            ->with('reviewtable1')
                            ->where($filter)
                            ->paginate($pagination);
        } else {
            return Review::where('reviewtable2_type', 'App\\Model\\Auteur')
                            ->with('reviewtable1')
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
        }
    }
    
    public function getLivreReviews(Livre $Livre, $filter = null)
    {
        $Reviews = Review::where('reviewtable2_type', 'App\\Model\\Livre')
                    ->with('reviewtable1');
        if ($filter) {
            $Reviews->where($filter);
        }
            return $Reviews->orderBy('created_at', 'DESC');
    }
    
    public function findReview($Review_id)
    {
        return Review::with(['reviewtable1', 'reviewtable2'])
                        ->find($Review_id);
    }
    
    public function createReview($user, $review_On, $data)
    {
        $Review = new Review();

        $Review->fill([
            'content' => $data['content'],
            'rating' => $data['rating'],
        ]);

        $Review->reviewtable1()->associate($user);
        $Review->reviewtable2()->associate($review_On);

        return $Review->save();
    }
    
    public function updateReview(Review $Review, $data)
    {
        return $Review->update($data);
    }
    
    public function deleteReview(Review $Review)
    {
        return $Review->delete();
    }
    
}