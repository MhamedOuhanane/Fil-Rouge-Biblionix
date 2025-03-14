<?php

namespace App\Http\Controllers;

use App\Models\Acteur;
use App\Http\Requests\StoreActeurRequest;
use App\Http\Requests\UpdateActeurRequest;

class ActeurController extends Controller
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
    public function store(StoreActeurRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Acteur $acteur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActeurRequest $request, Acteur $acteur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Acteur $acteur)
    {
        //
    }
}
