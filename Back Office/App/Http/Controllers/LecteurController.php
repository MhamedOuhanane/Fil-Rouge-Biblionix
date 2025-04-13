<?php

namespace App\Http\Controllers;

use App\Models\Lecteur;
use App\Http\Requests\StoreLecteurRequest;
use App\Http\Requests\UpdateLecteurRequest;

class LecteurController extends Controller
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
    public function store(StoreLecteurRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lecteur $lecteur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLecteurRequest $request, Lecteur $lecteur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lecteur $lecteur)
    {
        //
    }
}
