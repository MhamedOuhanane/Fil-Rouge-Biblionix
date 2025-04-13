<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class roleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!Auth::check()) {
            return response()->json([
                "message" => "Unauthenticated."
            ], 401);
        }

        $userRole = Auth::user()->role;
        if ($userRole->name != $role) {
            return response()->json([
                'error' => 'Vous n\'avez pas les permissions nécessaires pour accéder à cette ressource.'
            ], 403); 
        }

        return $next($request);
    }
}
