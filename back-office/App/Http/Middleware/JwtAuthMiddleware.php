<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
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
                } else {
                    return response()->json(['error' => 'Utilisateur non authentifié'], 401);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'Token invalide'], 401);
            }
        }

        return $next($request);
    }
}
