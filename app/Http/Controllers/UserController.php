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
        $result = $this->userService->update($request->status, $user);

        if ($result) {
            return response()->json([
                'message' => 'Le compte de ' . $user->getFullName() . 'a étè ' . $request->status,
            ], 200);
        }

        return response()->json([
            'message' => 'Échec de la mise à jour du compte de ' . $user->getFullName(),
        ], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function updateUserRole(Request $request, User $user)
    {
        $event = $request->event;
        if ($event) {
            
            $result = $this->userService->updateUserRole($event, $user);

            if ($result) {
                return response()->json([
                    'message' => $user->getFullName() . ' a étè ' . $event,
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Échec de la mise à jour du compte de ' . $user->getFullName(),
        ], 400);
    }
}
