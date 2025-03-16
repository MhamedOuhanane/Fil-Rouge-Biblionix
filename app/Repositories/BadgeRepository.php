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
}