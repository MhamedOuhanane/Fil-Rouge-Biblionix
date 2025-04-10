<?php

use App\Http\Controllers\Auth\AuthenticatedUserControler;
use App\Http\Controllers\Auth\RegisterUserControler;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterUserControler::class, 'register']);
Route::post('/login', [AuthenticatedUserControler::class, 'login']);
Route::get('/logout', [AuthenticatedUserControler::class, 'logout'])->middleware('auth:api');