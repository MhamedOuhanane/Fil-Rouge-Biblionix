<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterReviewRequest;
use App\Models\Review;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\ServiceInterfaces\ReviewServiceInterface;

class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewServiceInterface $reviewService)
    {
        $this->reviewService = $reviewService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(FilterReviewRequest $request)
    {
        $data = $request->only('Review_By', 'Create_Date', 'Review_On');

        $result = $this->reviewService->getReviews($data);

        return response()->json([
            'message' => $result['message'],
            'Reviews' => $result['Reviews'] ?? null,
            'review_By' => $data['review_By'] ?? '',
            'created_at' => $data['created_at'] ?? '',
            'review_On' => $data['review_On'] ?? '',
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
        $data = $request->validated();
        
        $result = $this->reviewService->insertReview($data);

        return response()->json([
            'message' => $result['message'],
            'Review' => $result['Review'] ?? null,
        ], $result['statusData']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $result = $this->reviewService->deleteReview($review);

        return response()->json([
            'message' => $result['message'],
            'Reviews' => $review,
        ], $result['statusData']);
    }
}
