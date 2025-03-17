<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use App\Http\Requests\StoreAuteurRequest;
use App\Http\Requests\UpdateAuteurRequest;

class AuteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
