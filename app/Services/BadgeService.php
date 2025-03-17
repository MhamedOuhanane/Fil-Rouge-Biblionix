<?php

namespace App\Services;

use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\ServiceInterfaces\BadgeServiceInterface;

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

        if ($badges->isEmpty()) {
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
}