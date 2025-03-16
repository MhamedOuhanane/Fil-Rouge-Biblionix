<?php

use App\Http\Controllers\Auth\RegisterUserControler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [RegisterUserControler::class, 'register']);
