<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use App\ServiceInterfaces\UserServiceInterface;
use Illuminate\Http\Request;

class RegisterUserControler extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterUserRequest $request)
    {
        return $request->all();
        // $result = $this->userService->register($request->all());

        // if (is_array($result) && isset($result['message'])) {
        //     return response()->json([
        //         'message' => $result['message']
        //     ], 400);
        // }
        

        // return response()->json([
        //     'message' => 'Utilisateur enregistré avec succès'
        // ], 200);
    }
}
