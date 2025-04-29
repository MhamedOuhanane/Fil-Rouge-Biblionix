<?php

namespace App\RepositoryInterfaces;

use App\Models\Auteur;
use App\Models\Livre;
use App\Models\Review;

interface ReviewRepositoryInterface
{
    public function getAllReview($pagination = 30);
    public function filterReviews($filter, $pagination = 30);
    public function getUserReviews($user, $filter = null, $pagination = 6);
    public function getAuteurReviews(Auteur $Auteur, $filter = null, $pagination = 6);
    public function getLivreReviews(Livre $Livre, $filter = null);
    public function findReview($Review_id);
    public function createReview($user, $review_On, $data);
    public function updateReview(Review $Review, $data);
    public function deleteReview(Review $Review);

    public function SVGReviewLivres();
    public function SVGReviewAuteurs();
}