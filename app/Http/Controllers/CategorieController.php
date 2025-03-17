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
        $data = $request->only('title', 'logo', 'content');
        $result = $this->categorieService->ajouterCategorie($data);

        return response()->json([
            'message' => $result['message'],
            'categorie' => $result['categorie'],
        ], $result['status']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $categorie)
    {
        return response()->json([
            'message' => 'Categorie trouvés avec succès.',
            'categorie' => $categorie,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $data = $request->only('title', 'logo', 'content');
        $result = $this->categorieService->updateCategories($data, $categorie);

        return response()->json([
            'message' => $result['message'],
            'categorie' => $result['categorie'],
        ], $result['status']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        $result = $this->categorieService->deleteCateg($categorie);

        return response()->json([
            'message' => $result['message'],
            'categorie' => $categorie,
        ], $result['status']);
    }
}
