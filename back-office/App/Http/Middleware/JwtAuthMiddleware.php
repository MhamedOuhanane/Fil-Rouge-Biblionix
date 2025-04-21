<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = $request->bearerToken();

        if ($token) {
            try {
                $user = JWTAuth::setToken($token)->authenticate();
                
                if ($user) {
                    Auth::setUser($user);
                }

            } catch (\Throwable $th) {
                return response()->json(['message' => 'Token is invalid or expired'], 401);
            }
        }

        return $next($request);
    }
}
