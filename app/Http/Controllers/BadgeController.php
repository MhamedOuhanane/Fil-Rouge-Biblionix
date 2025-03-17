<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Http\Requests\StoreBadgeRequest;
use App\Http\Requests\UpdateBadgeRequest;
use App\ServiceInterfaces\BadgeServiceInterface;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    protected $badgeService;

    public function __construct(BadgeServiceInterface $badgeService)
    {
        $this->badgeService = $badgeService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? null;

        $result = $this->badgeService->getBadges($search);

        return response()->json([
            'message' => $result['message'],
            'badges' => $result['badges'],
        ], $result['status']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBadgeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Badge $badge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBadgeRequest $request, Badge $badge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Badge $badge)
    {
        //
    }
}
