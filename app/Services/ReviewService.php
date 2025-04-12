<?php

namespace App\Services;

use App\Models\Review;
use App\RepositoryInterfaces\ReviewRepositoryInterface;
use App\ServiceInterfaces\ReviewServiceInterface;

class ReviewService implements ReviewServiceInterface
{
    protected $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function getReviews($filter = null, $pagination = 30)
    {

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