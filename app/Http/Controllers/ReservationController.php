<?php

namespace App\Http\Controllers;

use App\Http\Requests\filterReservationRequest;
use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\ServiceInterfaces\ReservationServiceInterface;

class ReservationController extends Controller
{
    protected $reservationService;

    public function __construct(ReservationServiceInterface $reservationService)
    {
        $this->reservationService = $reservationService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(filterReservationRequest $request)
    {
        $data = $request->only('status_Res', 'status_Pro', 'date_filter');
        $pagination = $request->only('pagination');

        $result = $this->reservationService->getReservation($data, $pagination);

        return response()->json([
            'message' => $result['message'],
            'Reservation' => $result['Reservation'],
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
