<?php

use App\Http\Controllers\BadgeController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api', 'role:admin')->group(function() {
    Route::apiResource('user', UserController::class);
    Route::patch('user.role/{user}', [UserController::class, 'updateUserRole']);

    Route::apiResource('tag', TagController::class);
    Route::apiResource('badge', BadgeController::class);
    Route::apiResource('categorie', CategorieController::class);
    Route::apiResource('transaction', TransactionController::class);
});








require __DIR__.'/auth.php';