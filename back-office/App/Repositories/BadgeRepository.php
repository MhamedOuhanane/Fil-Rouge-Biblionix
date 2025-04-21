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
        $user = Auth::user();
        $badgeQuery = Badge::query();
        
        if (!$user || $user->role->name != 'admin') {
            $badgeQuery->whereNull('deleted_at');
        }
        
        return $badgeQuery->get();
    }

    public function searchBadges($data)
    {
        $user = Auth::user();
        $badgeQuery = Badge::query();
        if (!$user && Auth::user()->role->name != 'admin') {
            $badgeQuery->where('deleted_at', 'IS', Null);
        }
        $badge = $badgeQuery->where('title', 'ILIKE', '%' . $data . '%')
                    ->get();
        return $badge;
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