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
        $data = $request->all();
        $result = $this->badgeService->createBadge($data);

        return response()->json([
            'message' => $result['message'],
            'badge' => $result['badge'],
        ], $result['status']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Badge $badge)
    {
        return response()->json([
            'message' => 'Badge trouvé avec succès.',
            'badge' => $badge
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBadgeRequest $request, Badge $badge)
    {
        $data = $request->all();
        $result = $this->badgeService->updateBadge($data, $badge);

        return response()->json([
            'message' => $result['message'],
            'badge' => $result['badge'],
        ], $result['status']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Badge $badge)
    {
        $result = $this->badgeService->softDeleteBadge($badge);

        return response()->json([
            'message' => $result['message'],
        ], $result['status']);
    }
}
