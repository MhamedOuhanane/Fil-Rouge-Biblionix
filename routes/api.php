<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api', 'role:admin')->group(function() {
    Route::apiResource('user', UserController::class);
});








require __DIR__.'/auth.php';