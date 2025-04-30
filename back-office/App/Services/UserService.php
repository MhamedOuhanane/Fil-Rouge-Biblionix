<?php 

namespace App\Services;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Librarian;
use App\Models\User;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\BadgeRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\RepositoryInterfaces\RoleRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\ServiceInterfaces\UserServiceInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

use function PHPSTORM_META\map;

class UserService implements UserServiceInterface
{
    protected $userRepository;
    protected $roleRepository;
    protected $transactionRepository;
    protected $badgeRepository;
    protected $librarianRepository;
    protected $auteurRepository;

    public function __construct(UserRepositoryInterface $userRepository,
                                RoleRepositoryInterface $roleRepository,
                                BadgeRepositoryInterface $badgeRepository,
                                TransactionRepositoryInterface $transactionRepository,
                                LibrarianRepositoryInterface $librarianRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                )
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
        $this->badgeRepository = $badgeRepository;
        $this->transactionRepository = $transactionRepository;
        $this->librarianRepository = $librarianRepository;
        $this->auteurRepository = $auteurRepository;
    }

    public function register($data)
    {
        $role = $this->roleRepository->findRoleByName($data['role']);
        $badge = $this->badgeRepository->findBadgeByTitle('Gratuit');
        $data['badge_id'] = $badge->id;

        unset($data['role']);
        $data['role_id'] = $role->id;
        
        
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

    public function loginUser($data)
    {
        if (Auth::attempt($data)) {
            $user = Auth::user();
            $role = $user->role;
            $status = $user->status;
            
            if ($role->name == 'auteur' && $status == 'En Attente') {

                return response()->json([
                    'message' => 'Vous devez vous abonner au badge VIP pour accéder à votre compte.',
                ], 401);

            }

            if ($status == 'Suspendu') {

                return response()->json([
                    'error' => 'Votre compte est suspendu. Veuillez attendre que votre compte soit activé par l\'administration.'
                ], 403);

            } elseif ($status == 'Ban') {

                return response()->json([
                    'error' => 'Votre compte a été banni. Vous ne pouvez pas vous connecter.'
                ], 403);

            } else {

                try {
                    $token = JWTAuth::fromUser($user);
    
                    return response()->json([
                        'message' => 'Connexion réussie.',
                        'token' => $token,
                        'user' => $user
                    ], 200);
    
                } catch (JWTException $jwte) {

                    return response()->json([
                        'error' => 'Une erreur est survenue lors de la création du token: ' .$jwte
                    ], 500);
                }
            }

        }

        return response()->json([
            'error' => 'Les informations d\'identification sont incorrectes. Veuillez vérifier votre email et mot de passe.'
        ], 400);
    }

    
    public function findUser($Id) {
        $result = $this->userRepository->findUser($Id);

        if (!$result) {
            $message = "Erreur lours de la recupération de l'utilisateur. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif (!isset($result)) {
            $message = "Il n'existe actuellement utilisateurs avec ce id.";
            $statusData = 404;
        } else {
            $message = "L'utilisateur trouvés avec succès.";
            $statusData = 200;
            $user = $result;
        }

        return [
            'message' => $message,
            'user' => $user ?? null,
            'statusData' => $statusData,
        ];

    }

    public function logoutUser()
    {
        try {

            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json(['message' => 'Déconnexion réussie.']);
        } catch (JWTException $jwte) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard.'
            ], 500);
        }
    }

    public function getAllUser($data)
    {
        $filter = [];
        
        if (isset($data['status'])) {
            $filter[] = ['status', '=', $data['status']];
        }

        if (isset($data['search'])) {
            $filter[] = [DB::raw("CONCAT(first_name, ' ', last_name)"), 'ILIKE', '%' . $data['search'] . '%'];
        }

        if (isset($data['role'])) {
            $role = $this->roleRepository->findRoleByName($data['role']);
            $filter[] = ['role_id', '=', $role->id];
        }

        return $this->userRepository->getUsers($filter);
    }

    public function update($status, $user)
    {
        $statusArray = ['En Attente', 'Active', 'Suspendu', 'Ban'];
        if (!in_array($status['status'], $statusArray)) {
            return [
                'message' => "Les information entrer est inccorect",
                'statusData' => 400,
            ];
        }

        $result = $this->userRepository->updateStatus($status['status'], $user);

        if (!$result) {
            $message = "Erreur lours de la modification du status. Veuillez réessayer plus tard.";
            $statusData = 500;
        } {
            $message = "Le status modifié avec succès.";
            $statusData = 200;
        }


        return [
            'message' => $message,
            'statusData' => $statusData,
        ];
    }

    public function updateBadge(User $user, $badge_id)
    {
        $result = $this->userRepository->updateUser($user, ['badge_id' => $badge_id]);

        if (!$result) {
            $message = "Erreur lours de la recupération de l'utilisateur. Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "Le badge d'utilisateur est modifié avec succès.";
            $statusData = 200;
            $user = $result;
        }

        return [
            'message' => $message,
            'user' => $user ?? null,
            'statusData' => $statusData,
        ];
    }

    public function updateUserRole($event, $user)
    {
        if ($event == 'Promotion') {
            if (!$user->isAuteur()) {
                $validation = false;
                $message = "L'utilisateur doit être un auteur pour être promu.";
                $status = 400;
            } elseif ($user->status != 'Active') {
                $validation = false;
                $message = "Le compte de ce auteur n'est active pour promotionné";
                $status = 400;
            } else {
                $role = $this->roleRepository->findRoleByName('librarian');
                $validation = true;
                $message = "L'utilisateur a été promontionné avec succès et est maintenant un auteur.";
                $status = 200;
            }
            
        } elseif ($event == 'Démotion') {
            if (!$user->isLibrarian()) {
                $validation = false;
                $message = "Le rôle de l'utilisateur ne peut pas être modifié, car il ne possède pas le rôle 'bibliothécaire'.";
                $status = 400;
            } else {
                $role = $this->roleRepository->findRoleByName('auteur');
                $validation = true;
                $message = "L'utilisateur a été démotionné avec succès et est maintenant un auteur.";
                $status = 200;
            }
        } else {
            $message = "Le compte de cet utitilisateur ne remplit pas les conditions nécessaires pour être promu.";
            $validation = false;
            $status = 400;
        }
        if($validation) {
            $result = $this->userRepository->toggleUserRole($role->id, $user);
            if ($result) {
                
                if ($role->name === 'librarian') $newUser = new Librarian();
                if ($role->name === 'auteur') $newUser = new Auteur();
                
                $newUser->fill($user->toArray());
                $newUser->id = $user->id;
                $newUser->password = $user->password;
                $newUser->remember_token = $user->remember_token;

                $deleteUser = $this->userRepository->deleteUser($user);
                
                if ($deleteUser) {
                    if ($role->name === 'librarian') $user = $this->librarianRepository->saveLibrarian($newUser);
                    if ($role->name === 'auteur') $user = $this->auteurRepository->saveAuteur($newUser);
                }
            } else {
                $message = 'Certaines erreurs sont survenues lors du modification.';
                $validation = false;
                $status = 400;
            } 
        }

        
        return [
            'message' => $message,
            'user' => $user,
            'validation' => $validation,
            'status' => $status,
        ];
    }

    public function findUserEmail($element) {
        $result = $this->userRepository->findUserByEmail($element);

        
        if (!$result) {
            $message = "Erreur lours de la recupération de l'utilisateur. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif (!isset($result)) {
            $message = "Il n'existe actuellement utilisateurs avec ce email.";
            $statusData = 404;
        } else {
            $message = "L'utilisateur trouvés avec succès.";
            $statusData = 200;
            $user = $result;
        }

        return [
            'message' => $message,
            'user' => $user ?? null,
            'statusData' => $statusData,
        ];
    }
}