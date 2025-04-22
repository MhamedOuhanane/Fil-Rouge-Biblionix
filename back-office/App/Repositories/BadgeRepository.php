<?php

namespace App\Repositories;

use App\Models\Badge;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\ServiceInterfaces\PaypalServiceInterface;
use Illuminate\Support\Facades\Auth;

class BadgeRepository implements BadgeRepositoryInterface
{
    protected $paypalService;

    public function __construct(PaypalServiceInterface $paypalService)
    {
        $this->paypalService = $paypalService;
    }

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
        $badge = Badge::create($data);
        if ($badge) {
            if ($badge->prix > 0) {
                $product = $this->paypalService->createProduct($badge->title);
                $plan = $this->paypalService->createPlan($product['id'], $badge);
                $badge->paypal_plan_id = $plan['id'];
                $badge->save();
            }
        }
        
        return $badge;
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