<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\ServiceInterfaces\UserServiceInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = $request->only('search', 'role', 'status');
        $users = $this->userService->getAllUser($data);
        
        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'Aucun utilisateur trouvé avec les critères spécifiés.'
            ], 404);
        }
        
        return response()->json(compact('users'), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
