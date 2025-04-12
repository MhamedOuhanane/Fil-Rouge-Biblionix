<?php

namespace App\RepositoryInterfaces;

use App\Models\Auteur;
use App\Models\Livre;
use App\Models\Review;

interface ReviewRepositoryInterface
{
    public function getAllReview($pagination = 30);
    public function filterReview($filter, $pagination = 30);
    public function getUserReview($user, $filter, $pagination = 6);
    public function getAuteurReview(Auteur $Auteur, $filter, $pagination = 6);
    public function getLivreReview(Livre $Livre, $filter, $pagination = 6);
    public function findReview($Review_id);
    public function createReview($user, $review_On, $data);
    public function updateReview(Review $Review, $data);
    public function deleteReview(Review $Review);
}