<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterLivreRequest;
use App\Models\Livre;
use App\Http\Requests\StoreLivreRequest;
use App\Http\Requests\UpdateLivreRequest;
use App\Http\Requests\UpdateQunantityLivreRequest;
use App\Http\Requests\UpdateStatusLivreRequest;
use App\ServiceInterfaces\LivreServiceInterface;

class LivreController extends Controller
{
    protected $livreService;

    public function __construct(LivreServiceInterface $livreService)
    {
        $this->livreService = $livreService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(FilterLivreRequest $request)
    {
        $data = $request->only('search', 'tag', 'categorie', 'disponibilite', 'status_livre', 'pageLivres');

        $result = $this->livreService->getLivres($data);

        return response()->json([
            'message' => $result['message'],
            'Livres' => $result['Livres'],
            'search' => $data['search'] ?? "", 
            'tag' => $data['tag'] ?? "", 
            'categorie' => $data['categorie'] ?? "", 
            'disponibilite' => $data['disponibilite'] ?? "", 
            'status_livre' => $data['status_livre'] ?? "", 
            'pageLivres' => $data['pageLivres'] ?? 9,
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLivreRequest $request)
    {
        $data['livre'] = $request->only('title', 'summary', 'photo', 'author', 'quantity', 'categorie_id', 'disponibilite');
        $data['tags'] = $request->only('tags');

        $result = $this->livreService->insertLivre($data);

        return response()->json([
            'message' => $result['message'],
            'Livre' => $result['Livre'] ?? null,
        ], $result['statusData']);
     }

    /**
     * Display the specified resource.
     */
    public function show(Livre $livre)
    {
        return response()->json([
            'message' => "Livre est trouvé avec succès : ",
            'Livre' => $livre,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLivreRequest $request, Livre $livre)
    {
        $data['livre'] = $request->validated();
        
        $result = $result = $this->livreService->updateLivre($livre, $data);

        return response()->json([
            'message' => $result['message'],
            'Livre' => $result['Livre'] ?? $livre,
        ], $result['statusData']);        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livre $livre)
    {
        //
    }

    public function updateStatus(UpdateStatusLivreRequest $request, Livre $livre) {
        $data['livre'] = $request->validated();
        
        $result = $result = $this->livreService->updateLivre($livre, $data);

        return response()->json([
            'message' => $result['message'],
            'Livre' => $result['Livre'] ?? $livre,
        ], $result['statusData']);
    }

    public function updateQuantity(UpdateQunantityLivreRequest $request, Livre $livre) {
        $data['livre'] = $request->validated();
        
        $result = $result = $this->livreService->updateLivre($livre, $data);
        dd($result['Livre']);
        return response()->json([
            'message' => $result['message'],
            'Livre' => $result['Livre'] ?? $livre,
        ], $result['statusData']);
    }
}
