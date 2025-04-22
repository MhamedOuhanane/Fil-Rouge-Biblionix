<?php

namespace App\Providers;

use App\Repositories\AnswerRepository;
use App\Repositories\ArticleRepository;
use App\Repositories\AuteurRepository;
use App\Repositories\BadgeRepository;
use App\Repositories\CategorieRepository;
use App\Repositories\CommentaireRepository;
use App\Repositories\LecteurRepository;
use App\Repositories\LibrarianRepository;
use App\Repositories\LivreRepository;
use App\Repositories\MessageRepository;
use App\Repositories\ReservationRepository;
use App\Repositories\ReviewRepository;
use App\Repositories\RoleRepository;
use App\Repositories\TagRepository;
use App\Repositories\TransactionRepository;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\RepositoryInterfaces\AnswerRepositoryInterface;
use App\RepositoryInterfaces\ArticleRepositoryInterface;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\RepositoryInterfaces\CategorieRepositoryInterface;
use App\RepositoryInterfaces\CommentaireRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\RepositoryInterfaces\MessageRepositoryInterface;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use App\RepositoryInterfaces\ReviewRepositoryInterface;
use App\RepositoryInterfaces\RoleRepositoryInterface;
use App\RepositoryInterfaces\TagRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\ServiceInterfaces\AnswerServiceInterface;
use App\ServiceInterfaces\ArticleServiceInterface;
use App\ServiceInterfaces\BadgeServiceInterface;
use App\ServiceInterfaces\CategorieServiceInterface;
use App\ServiceInterfaces\CommentaireServiceInterface;
use App\ServiceInterfaces\LivreServiceInterface;
use App\ServiceInterfaces\MessageServiceInterface;
use App\ServiceInterfaces\PaypalServiceInterface;
use App\ServiceInterfaces\ReservationServiceInterface;
use App\ServiceInterfaces\ReviewServiceInterface;
use App\ServiceInterfaces\TagServiceInterface;
use App\ServiceInterfaces\TransactionServiceInteface;
use App\ServiceInterfaces\UserServiceInterface;
use App\Services\AnswerService;
use App\Services\ArticleService;
use App\Services\BadgeService;
use App\Services\CategorieService;
use App\Services\CommentaireService;
use App\Services\LivreService;
use App\Services\MessageService;
use App\Services\PayPalService;
use App\Services\ReservationService;
use App\Services\ReviewService;
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
        $this->app->bind(LivreRepositoryInterface::class, LivreRepository::class);
        $this->app->bind(ReservationRepositoryInterface::class, ReservationRepository::class);
        $this->app->bind(ReviewRepositoryInterface::class, ReviewRepository::class);
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
        $this->app->bind(AnswerRepositoryInterface::class, AnswerRepository::class);
        $this->app->bind(CommentaireRepositoryInterface::class, CommentaireRepository::class);
        
        
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(TagServiceInterface::class, TagService::class);
        $this->app->bind(BadgeServiceInterface::class, BadgeService::class);
        $this->app->bind(CategorieServiceInterface::class, CategorieService::class);
        $this->app->bind(TransactionServiceInteface::class, TransactionService::class);
        $this->app->bind(ArticleServiceInterface::class, ArticleService::class);
        $this->app->bind(LivreServiceInterface::class, LivreService::class);
        $this->app->bind(ReservationServiceInterface::class, ReservationService::class);
        $this->app->bind(ReviewServiceInterface::class, ReviewService::class);
        $this->app->bind(MessageServiceInterface::class, MessageService::class);
        $this->app->bind(AnswerServiceInterface::class, AnswerService::class);
        $this->app->bind(CommentaireServiceInterface::class, CommentaireService::class);
        $this->app->bind(PaypalServiceInterface::class, PayPalService::class);

    }
    
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
