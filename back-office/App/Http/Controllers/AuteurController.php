<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use App\Http\Requests\StoreAuteurRequest;
use App\Http\Requests\UpdateAuteurRequest;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use Illuminate\Http\Request;

class AuteurController extends Controller
{
    protected $auteurRepository;

    public function __construct(AuteurRepositoryInterface $auteurRepository)
    {
        $this->auteurRepository =$auteurRepository;        
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? '';
        $pagination = $request->pagination ?? 7; 

        $result = $this->auteurRepository->getAuteur($search, $pagination);

        if (!$result) {
            $message = "Erreur lours de la recupération des auteurs. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result && $result->isEmpty()) {
            $message = "Il n'existe actuellement aucun auteur.";
            $statusData = 404;
        } else {
            $message = "Les Auteurs trouvés avec succès.";
            $statusData = 200;
        }

        return response()->json([
            'message' => $message,
            'Auteurs' => $result,
        ], $statusData);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuteurRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Auteur $auteur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuteurRequest $request, Auteur $auteur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Auteur $auteur)
    {
        //
    }
}
