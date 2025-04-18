<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
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
    Route::patch('/reservation/status/{reservation}', [ReservationController::class, 'updateStatusReservation']);
});
    
    Route::apiResource('/tag', TagController::class);
    Route::apiResource('/badge', BadgeController::class);
    Route::apiResource('/livre', LivreController::class);
    Route::apiResource('/review', ReviewController::class);
    Route::apiResource('/article', ArticleController::class);
    Route::apiResource('/message', MessageController::class);
    Route::apiResource('/categorie', CategorieController::class);
    Route::apiResource('/reservation', ReservationController::class);
    Route::apiResource('/transaction', TransactionController::class);
    Route::apiResource('/message/{message}/answer', AnswerController::class);
    Route::apiResource('/article/{article}/commentaire', CommentaireController::class);
});





require __DIR__.'/auth.php';