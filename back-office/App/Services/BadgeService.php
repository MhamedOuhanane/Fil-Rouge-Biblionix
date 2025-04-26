<?php

namespace App\Services;

use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\ServiceInterfaces\BadgeServiceInterface;
use Illuminate\Support\Facades\Auth;

class BadgeService implements BadgeServiceInterface
{
    protected $badgeRepository;

    public function __construct(BadgeRepositoryInterface $badgeRepository)
    {
        $this->badgeRepository = $badgeRepository;
    }

    public function getBadges($search)
    {
        if (empty($search)) {
            $badges = $this->badgeRepository->getAllBadges();
        } else {

            $badges = $this->badgeRepository->searchBadges($search);
        }

        if ($badges && $badges->isEmpty()) {
            if (empty($search)) {
                $message = "Il n'existe actuellement aucun badge associé à notre site.";
            } else {
                $message = 'Aucun badge trouvé avec le nom ' . $search . '.';
            }
            
            return [
                'status' => 404,
                'message' => $message,
                'badges' => []
            ];
        } else {
            return [
                'status' => 200,
                'message' => 'badges trouvés avec succès.',
                'badges' => $badges
            ];
        }
    }

    public function createBadge($data)
    {
        $result = $this->badgeRepository->create($data);

        if (!$result) {
            $message = "Le badge ". $data['title'] ." n'a pas pu être créé.";
            $status = 400;
        } else {
            $message = "Le badge ". $data['title'] ." créés avec succès.'";
            $status = 201;
        }

        return [
            'message' => $message,
            'badge' => $result,
            'status' => $status,
        ]; 
    }

    public function updateBadge($data, $badge)
    {
        $result = $this->badgeRepository->update($data, $badge);

        if ($result) {
            $message = "Le badge '$badge->title' a étè modifié avec succès";
            $status = "200";
        } else {
            $message = "Une erreur est survenue lors de la modification du badge '$badge->title'. Veuillez réessayer.";
            $status = 500;
        }

        if ($result == $badge) {
            $message = "Aucune modification n'a été effectuée sur le badge '$badge->title'. Les données sont identiques.";
            $status = "200";
        }

        return [
            'message' => $message,
            'badge' => $badge,
            'status' => $status,
        ];
    }

    public function softDeleteBadge($badge)
    {
        if (!$badge->deleted_at) {
            $result = $this->badgeRepository->deleteBadge($badge);
            $message = "Le badge '$badge->title' a été supprimé avec succès.";

        } else {
            $result = $this->badgeRepository->restaureBadge($badge);
            $message = "Le badge '$badge->title' a été restauré avec succès.";
        }
        $status = 200;
        
        if (!$result) {
            $message = $message = "Une erreur est survenue lors de la suppression du badge '$badge->title'. Veuillez réessayer.";
            $status = 500;
        } 

        
        return [
            'message' => $message,
            'status' => $status,
        ];
        
    }
}