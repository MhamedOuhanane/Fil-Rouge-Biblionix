<?php

namespace App\Repositories;

use App\Models\Badge;
use App\RepositoryInterfaces\BadgeRepositoryInterface;

class BadgeRepository implements BadgeRepositoryInterface
{
    public function findBadgeById($badgeId)
    {
        return Badge::find($badgeId);
    }

    public function findBadgeByTitle($badgeTitle)
    {
        return Badge::where('title', $badgeTitle)->first();
    }

    
    public function getAllBadges()
    {
        return Badge::all();
    }

    public function searchBadges($data)
    {
        return Badge::where('title', 'ILIKE', '%' . $data . '%')->get();
    }

    public function create($data)
    {
        return Badge::create($data);
    }

    public function update($data, $badge)
    {
        return $badge->update($data);
    }

    public function delete($badge)
    {

    }
}