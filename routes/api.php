<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->group(function() {

Route::middleware('role:admin')->group(function() {
    Route::apiResource('/user', UserController::class);
    Route::patch('/user.role/{user}', [UserController::class, 'updateUserRole']);
});

Route::middleware('role:librarian')->group(function() {
    Route::patch('/livre/status/{livre}', [LivreController::class, 'updateStatus']);
    Route::patch('/livre/quantity/{livre}', [LivreController::class, 'updateQuantity']);
});
    
    Route::apiResource('/tag', TagController::class);
    Route::apiResource('/livre', LivreController::class);
    Route::apiResource('/badge', BadgeController::class);
    Route::apiResource('/article', ArticleController::class);
    Route::apiResource('/categorie', CategorieController::class);
    Route::apiResource('/reservation', ReservationController::class);
    Route::apiResource('/transaction', TransactionController::class);
});





require __DIR__.'/auth.php';