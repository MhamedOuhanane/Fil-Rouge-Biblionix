<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->group(function() {

    Route::middleware('role:admin')->group(function() {

        Route::get('/admin/statistiques', [AdminDashboardController::class, 'index']);

        Route::apiResource('/users', UserController::class);
        Route::patch('/user.role/{user}', [UserController::class, 'updateUserRole']);

        
        Route::post('/categorie', [CategorieController::class, 'store']);
        Route::put('/categorie/{categorie}', [CategorieController::class, 'update']);
        Route::delete('/categorie/{categorie}', [CategorieController::class, 'destroy']);

        Route::post('/badge', [BadgeController::class, 'store']);
        Route::patch('/badge/{badge}', [BadgeController::class, 'update']);
        Route::delete('/badge/{badge}', [BadgeController::class, 'destroy']);

        
        Route::apiResource('/transaction', TransactionController::class);

        
        Route::post('/tag', [TagController::class, 'store']);
        Route::put('/tag/{tag}', [TagController::class, 'update']);
        Route::delete('/tag/{tag}', [TagController::class, 'destroy']);

    });

    Route::middleware('role:librarian')->group(function() {
        Route::patch('/livre/status/{livre}', [LivreController::class, 'updateStatus']);
        Route::patch('/livre/quantity/{livre}', [LivreController::class, 'updateQuantity']);
        Route::patch('/reservation/status/{reservation}', [ReservationController::class, 'updateStatusReservation']);
    });
        
        Route::get('/tag/{tag}', [TagController::class, 'show']);
        
        Route::get('/livre/{livre}', [LivreController::class, 'show']);
        Route::post('/livre', [LivreController::class, 'store']);
        Route::put('/livre/{livre}', [LivreController::class, 'update']);
        Route::delete('/livre/{livre}', [LivreController::class, 'destroy']);

        Route::apiResource('/review', ReviewController::class);
        Route::apiResource('/article', ArticleController::class);
        Route::apiResource('/message', MessageController::class);
        Route::apiResource('/reservation', ReservationController::class);
        Route::apiResource('/message/{message}/answer', AnswerController::class);
        Route::apiResource('/article/{article}/commentaire', CommentaireController::class);
});


Route::middleware('jwt.optional')->group(function() {
    Route::get('/categorie', [CategorieController::class, 'index']);
    Route::get('/categorie/{categorie}', [CategorieController::class, 'show']);

    Route::get('/tag', [TagController::class, 'index']);
    
    Route::get('/livre', [LivreController::class, 'index']);

    Route::get('/subscription/user/{user}/badge/{badge}/', [PayPalController::class, 'createSubscription'])->name('subscription.create');
    
    Route::get('/badge', [BadgeController::class, 'index']);
    Route::get('/badge/{badge}', [BadgeController::class, 'show']);
});

Route::get('/utilisateur/findEmail/{badge}', [UserController::class, 'findEmail']);
Route::get('/subscription/success', [PayPalController::class, 'success']);
Route::get('/subscription/cancel', [PayPalController::class, 'cancel']);




require __DIR__.'/auth.php';