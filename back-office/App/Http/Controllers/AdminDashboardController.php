<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\ServiceInterfaces\AdmineServiceInterface;
use App\Services\AdmineService;

class AdminDashboardController extends Controller
{
    protected $admineService;

    public function __construct(AdmineServiceInterface $admineService)
    {
        $this->admineService = $admineService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $result = $this->admineService->StatistiqueDashboard();
        } catch (\Throwable $th) {
            $result = [
                'message' => "Erreur lours de la récuperation des statistiques:" . $th->getMessage(),
                'statusData' => 500,
            ];
        }

        return response()->json([
            'message' => $result['message'] ,
            'statistique' => $result['statistique'] ?? null,
        ], $result['statusData']);

    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
