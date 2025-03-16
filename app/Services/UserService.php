<?php 

namespace App\Services;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\RepositoryInterfaces\RoleRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\ServiceInterfaces\UserServiceInterface;

class UserService implements UserServiceInterface
{
    protected $userRepository;
    protected $roleRepository;
    protected $transactionRepository;
    protected $badgeRepository;

    public function __construct(UserRepositoryInterface $userRepository,
                                RoleRepositoryInterface $roleRepository,
                                BadgeRepositoryInterface $badgeRepository,
                                TransactionRepositoryInterface $transactionRepository,
                                )
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
        $this->badgeRepository = $badgeRepository;
        $this->transactionRepository = $transactionRepository;
    }

    public function register($data)
    {
        $role = $this->roleRepository->findRoleById($data['role_id']);
        $badge = $this->badgeRepository->findBadgeByTitle('Gratuit');
        $data['badge_id'] = $badge->id;
        $data['photo'] = 'profile/default.jpg';
        
        switch ($role->name) {
            case 'lecteur':
                $user = new Lecteur();
                break;
                
            case 'auteur':
                $user = new Auteur();
                $data['status'] = 'En Attente';
                break;
                
            default:
                return ['message' => "Vous n'avez pas l'accès pour vous inscrire avec ce rôle"];
        }

        return $this->userRepository->createUser($user, $data);
    }
}