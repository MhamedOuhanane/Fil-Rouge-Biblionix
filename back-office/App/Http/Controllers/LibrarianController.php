<?php

namespace App\Http\Controllers;

use App\Models\Librarian;
use App\Http\Requests\StoreLibrarianRequest;
use App\Http\Requests\UpdateLibrarianRequest;
use App\ServiceInterfaces\LibrarianServiceInterface;

class LibrarianController extends Controller
{
    protected $librarianService;

    public function __construct(LibrarianServiceInterface $librarianService)
    {
        $this->librarianService = $librarianService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $result = $this->librarianService->StatistiqueDashboard();
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
    public function store(StoreLibrarianRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Librarian $librarian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLibrarianRequest $request, Librarian $librarian)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Librarian $librarian)
    {
        //
    }
}
