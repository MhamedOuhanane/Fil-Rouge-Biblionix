<?php

namespace App\Http\Controllers;

use App\Http\Requests\filterReservationRequest;
use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Http\Requests\UpdateStatusReservationRequest;
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
        $pagination = $request->pagination;

        $result = $this->reservationService->getReservation($data, $pagination);

        return response()->json([
            'message' => $result['message'],
            'Reservation' => $result['Reservation'] ?? null,
            'pagination' => $pagination,
            'status_Res' => $data['status_Res'] ?? '',
            'status_Pro' => $data['status_Pro'] ?? '',
            'date_filter' => $data['date_filter'] ?? null,
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $data = $request->validated();

        $result = $this->reservationService->cra;
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
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }

    public function updateStatusReservation(UpdateStatusReservationRequest $request, Reservation $reservation)
    {
        $status = $request->only('status_Res', 'status_Pro', 'returned_at');

        $result = $this->reservationService->updateReservation($reservation, $status);

        return response()->json([
            'message' => $result['message'],
            'Reservation' => $result['Reservation'] ?? $reservation,
            'status_Res' => $status['status_Res'] ?? "",
            'status_Pro' => $status['status_Pro'] ?? "",
        ], $result['statusData']);
    }

}
