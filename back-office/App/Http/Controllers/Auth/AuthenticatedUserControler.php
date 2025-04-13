<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthenticateUserRequest;
use App\ServiceInterfaces\UserServiceInterface;
use Illuminate\Http\Request;

class AuthenticatedUserControler extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;        
    }

    public function login(AuthenticateUserRequest $request)
    {
        $data = $request->only('email', 'password');
        return $this->userService->loginUser($data);
    }

    public function logout()
    {
        return $this->userService->logoutUser();
    }
}
