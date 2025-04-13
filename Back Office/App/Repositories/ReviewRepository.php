<?php 

namespace App\Repositories;

use App\Models\Auteur;
use App\Models\Livre;
use App\Models\Review;
use App\RepositoryInterfaces\ReviewRepositoryInterface;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function getAllReview($pagination = 30)
    {
        return Review::with(['reviewtable1', 'reviewtable2'])
                        ->orderBy('created_at', 'DESC')
                        ->paginate($pagination);
    }
    
    public function filterReviews($filter, $pagination = 30)
    {
        return Review::with(['reviewtable1', 'reviewtable2'])
                        ->where($filter)
                        ->orderBy('created_at', 'DESC')
                        ->paginate($pagination);
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
    
    public function getLivreReviews(Livre $Livre, $filter = null, $pagination = 6)
    {
        if ($filter) {
            return Review::where('reviewtable2_type', 'App\\Model\\Livre')
                            ->with('reviewtable1')
                            ->where($filter)
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
        } else {
            return Review::where('reviewtable2_type', 'App\\Model\\Livre')
                            ->with('reviewtable1')
                            ->orderBy('created_at', 'DESC')
                            ->paginate($pagination);
        }
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