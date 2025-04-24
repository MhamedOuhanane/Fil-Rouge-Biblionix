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

        
        Route::post('/categorie', [CategorieController::class, 'store']);
        Route::put('/categorie/{categorie}', [CategorieController::class, 'update']);
        Route::delete('/categorie/{categorie}', [CategorieController::class, 'destroy']);

        Route::post('/badge', [BadgeController::class, 'store']);
        Route::patch('/badge/{badge}', [BadgeController::class, 'update']);
        Route::delete('/badge/{badge}', [BadgeController::class, 'destroy']);

    });

    Route::middleware('role:librarian')->group(function() {

        Route::patch('/livre/status/{livre}', [LivreController::class, 'updateStatus']);
        Route::patch('/livre/quantity/{livre}', [LivreController::class, 'updateQuantity']);
        Route::patch('/reservation/status/{reservation}', [ReservationController::class, 'updateStatusReservation']);
    });
        
        Route::apiResource('/tag', TagController::class);
        Route::apiResource('/livre', LivreController::class);
        Route::apiResource('/review', ReviewController::class);
        Route::apiResource('/article', ArticleController::class);
        Route::apiResource('/message', MessageController::class);
        Route::apiResource('/reservation', ReservationController::class);
        Route::apiResource('/transaction', TransactionController::class);
        Route::apiResource('/message/{message}/answer', AnswerController::class);
        Route::apiResource('/article/{article}/commentaire', CommentaireController::class);
});

Route::middleware('jwt.optional')->group(function() {
    
    Route::get('/categorie', [CategorieController::class, 'index']);
    Route::get('/categorie/{categorie}', [CategorieController::class, 'show']);
    
    Route::get('/sub', [CategorieController::class, 'show']);
    
    Route::get('/badge', [BadgeController::class, 'index']);
    Route::get('/badge/{badge}', [BadgeController::class, 'show']);
});

Route::get('/utilisateur/findEmail', [UserController::class, 'findEmail']);
// Route::




require __DIR__.'/auth.php';