<?php

namespace App\Providers;

use App\Repositories\BadgeRepository;
use App\Repositories\RoleRepository;
use App\Repositories\TransactionRepository;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\RepositoryInterfaces\RoleRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\ServiceInterfaces\UserServiceInterface;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(BadgeRepositoryInterface::class, BadgeRepository::class);
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);



        $this->app->bind(UserServiceInterface::class, UserService::class);
        // $this->app->bind(UserServiceInterface::class, UserService::class);
        // $this->app->bind(UserServiceInterface::class, UserService::class);



    }
    
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
