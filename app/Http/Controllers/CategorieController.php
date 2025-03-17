<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\ServiceInterfaces\CategorieServiceInterface;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    protected $categorieService;

    public function __construct(CategorieServiceInterface $categorieService)
    {
        $this->categorieService = $categorieService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? null;
        $result = $this->categorieService->getCategories($search);

        return response()->json([
            'message' => $result['message'],
            'categories' => $result['categories'],
            'search' => $search,
        ], $result['status']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $categorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        //
    }
}
