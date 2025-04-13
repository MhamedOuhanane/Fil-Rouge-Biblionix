<?php

namespace App\ServiceInterfaces;

use App\Models\Review;

interface ReviewServiceInterface
{
    public function getReviews($filter = null, $pagination = 30);
    public function findReview($Review_id);
    public function getUserReview($User, $pagivation = 6);
    public function insertReview($data);
    public function updateReview(Review $Review, $data);
    public function updateEtatReview(Review $Review, $data)   ;
    public function deleteReview(Review $Review);
}