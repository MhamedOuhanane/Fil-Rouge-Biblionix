<?php

namespace App\Providers;

use App\Repositories\ArticleRepository;
use App\Repositories\AuteurRepository;
use App\Repositories\BadgeRepository;
use App\Repositories\CategorieRepository;
use App\Repositories\LecteurRepository;
use App\Repositories\LibrarianRepository;
use App\Repositories\RoleRepository;
use App\Repositories\TagRepository;
use App\Repositories\TransactionRepository;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\RepositoryInterfaces\ArticleRepositoryInterface;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\RepositoryInterfaces\CategorieRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\RepositoryInterfaces\RoleRepositoryInterface;
use App\RepositoryInterfaces\TagRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\ServiceInterfaces\ArticleServiceInterface;
use App\ServiceInterfaces\BadgeServiceInterface;
use App\ServiceInterfaces\CategorieServiceInterface;
use App\ServiceInterfaces\TagServiceInterface;
use App\ServiceInterfaces\TransactionServiceInteface;
use App\ServiceInterfaces\UserServiceInterface;
use App\Services\ArticleService;
use App\Services\BadgeService;
use App\Services\CategorieService;
use App\Services\TagService;
use App\Services\TransactionService;
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
        $this->app->bind(TagRepositoryInterface::class, TagRepository::class);
        $this->app->bind(CategorieRepositoryInterface::class, CategorieRepository::class);
        $this->app->bind(ArticleRepositoryInterface::class, ArticleRepository::class);
        $this->app->bind(AuteurRepositoryInterface::class, AuteurRepository::class);
        $this->app->bind(LibrarianRepositoryInterface::class, LibrarianRepository::class);
        $this->app->bind(LecteurRepositoryInterface::class, LecteurRepository::class);
        
        
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(TagServiceInterface::class, TagService::class);
        $this->app->bind(BadgeServiceInterface::class, BadgeService::class);
        $this->app->bind(CategorieServiceInterface::class, CategorieService::class);
        $this->app->bind(TransactionServiceInteface::class, TransactionService::class);
        $this->app->bind(ArticleServiceInterface::class, ArticleService::class);
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
