<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRoleRequest;
use App\Models\User;
use App\ServiceInterfaces\UserServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
                'message' => 'Aucun utilisateur trouvé avec les critères spécifiés.',
                'role' => $data['role'] ?? '',
                'search' => $data['search'] ?? '',
                'status' => $data['status'] ?? '',
            ], 404);
        }
        
        return response()->json([
            'message' => 'utilisateurs trouvés avec succès.',
            'users' => $users,
            'role' => $data['role'] ?? '',
            'search' => $data['search'] ?? '',
            'status' => $data['status'] ?? '',
        ], 200);
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
        $status = $request->status;
        $result = $this->userService->update($status, $user);

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

    public function updateUserRole(UpdateUserRoleRequest $request, User $user)
    {
        $event = $request->event;
        if ($event) {
            
            $result = $this->userService->updateUserRole($event, $user);

            if ($result['validation']) {
                return response()->json([
                    'message' => $result['message'],
                    'user' => $result['user'],
                ], $result['status']);
            }

            return response()->json([
                'message' => $result['message'],
                'user' => $user,
            ], $result['status']);
        }

        return response()->json([
            'message' => 'Échec de la mise à jour du role de ' . $user->getFullName(),
        ], 500);

    }
}
