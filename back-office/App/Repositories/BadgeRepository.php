<?php

namespace App\Repositories;

use App\Models\Badge;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use Illuminate\Support\Facades\Auth;

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
        $badge = Badge::query();
        if (Auth::user() && Auth::user()->role->name == 'admin') {
            $badge->whereNotNull('deleted_at');
        }
        return $badge->get();
    }

    public function searchBadges($data)
    {
        $badge = Badge::query();
        if (Auth::user() && Auth::user()->role->name != 'admin') {
            $badge->whereNotNull('deleted_at');
        }
        return $badge->where('title', 'ILIKE', '%' . $data . '%')
                    ->get();
    }

    public function create($data)
    {
        return Badge::create($data);
    }

    public function update($data, $badge)
    {
        return $badge->update($data);
    }

    public function deleteBadge($badge)
    {
        $badge->deleted_at = now();
        return $badge->save();
    }
    
    public function restaureBadge($badge)
    {
        $badge->deleted_at = null;
        return $badge->save();
    }

}