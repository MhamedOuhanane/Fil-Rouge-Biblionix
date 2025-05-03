<?php

namespace App\Services;

use App\Models\Lecteur;
use App\Models\Reservation;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\LivreRepositoryInterface;
use App\RepositoryInterfaces\ReservationRepositoryInterface;
use App\RepositoryInterfaces\UserRepositoryInterface;
use App\ServiceInterfaces\ReservationServiceInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReservationService implements ReservationServiceInterface
{
    protected $reservationRepository;
    protected $userRepository;
    protected $lecteurRepository;
    protected $auteurRepository;
    protected $livreRepository;

    public function __construct(ReservationRepositoryInterface $reservationRepository,
                                UserRepositoryInterface $userRepository,
                                LecteurRepositoryInterface $lecteurRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                LivreRepositoryInterface $livreRepository
                                )
    {
        $this->reservationRepository = $reservationRepository;
        $this->userRepository = $userRepository;
        $this->lecteurRepository = $lecteurRepository;
        $this->auteurRepository = $auteurRepository;
        $this->livreRepository = $livreRepository;
    }

    public function getReservation($data = null, $pagination = 30)
    {
        $user = Auth::user();
        
        if (!$data && ($user->role->name == 'librarian' || $user->role->name == 'admin')) {
            // if ($user->role->name != 'librarian' || $user->role->name != 'admin') {
            //     return [
            //         'message' => "Vous n\'avez pas les permissions nécessaires pour trouvé tous les reservations.",
            //         'statusData' => 401,
            //     ];
            // }
            $result = $this->reservationRepository->getAllReservation($pagination);
        } else {
            $filter = [];
            if (isset($data['date_filter'])) {
                $date = Carbon::now()->subDays($data['date_filter']);
                $filter[] = ['start_date', '<=', $date];
            }

            if (isset($data['status_Res'])) {
                $filter['status_Res'] = $data['status_Res'];
            }

            if (isset($data['status_Pro'])) {
                $filter['status_Pro'] = $data['status_Pro'];
            }

            if ($user->role->name == 'librarian' || $user->role->name == 'admin') {
                $result = $this->reservationRepository->filterReservation($filter, $pagination);
            } else {
                $result = $this->reservationRepository->getUserReservation($filter, $pagination);
            }
        }
         
        if (!$result) {
            $message = "Erreur lours de la recupération des réservation. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun réservation.";
            $statusData = 404;
        } else {
            $message = "Les Réservation trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Reservation' => $result,
            'statusData' => $statusData,
        ];
    }

    public function findReservation($reservation_id)
    {

    }

    public function insertReservation($data)
    {
        $user = Auth::user();
        if (empty($data) || !$user) {
            return [
                'message' => 'Les données sont vides, creation impossible.',
                'statusData' => 400,
            ];
        }

        if ($user->isAuteur()) {
            $user = $this->auteurRepository->findAuteur($user->id);
        } else {
            $user = $this->lecteurRepository->findLecteur($user->id);
        }

        if ($user->reserve_numbre >= $user->badge->reservation) {
            return [
                'message' => 'Vous avez atteint le nombre maximal de réservations autorisé par votre badge.',
                'statusData' => 403,
            ];
        }

        $countReservation = $this->reservationRepository->getReservationUserMonth($user, ['status_Res' => 'En Cours'],['status_Res' => 'En Attente']);
        // dd($countReservation, $user);
        if ($countReservation->count() > 0) { 
            return [
                'message' => 'Vous avez déjà une réservation en cours ou en attente.',
                'statusData' => 403, 
            ];
        }

        $result = $this->reservationRepository->createReservation($user, $data);

        if ($result) {
            return [
                'message' => 'Réservation réussie.',
                'statusData' => 200,
            ];
        } else {
            return [
                'message' => 'Erreur lors de la création de la réservation.',
                'statusData' => 500,
            ];
        }
    }

    public function updateReservation(Reservation $reservation, $data)
    {
        $user = Auth::user();
        if (empty($data)) {
            return [
                'message' => 'Les données sont vides, mise à jour impossible.',
                'statusData' => 400,
            ];
        }

        if (isset($data['status_Pro'])) {
            if ($user->role->name === 'lecteur' && $user->prolongement_number >= $user->badge->prolongation) {
                return [
                    'message' => 'Vous avez atteint le nombre maximal de prolongement autorisé par votre badge.',
                    'statusData' => 403,
                ];
            }
        }

        if ($user->isLibrarian()) {
            return $this->updateEtatReservation($reservation, $data);
        }
        $result = $this->reservationRepository->updateReservation($reservation, $data);

        if (!$result) {
            return [
                'message' => 'Erreur lour de la modification de reservation.',
                'statusData' => 500,
            ];
        } 

        return [
            'message' => 'Réservation  modifiée avec succès.',
            'statusData' => 200,
        ];
    }

    public function updateEtatReservation(Reservation $reservation, $data)
    {
        if (isset($data['returned_at']) && $data['returned_at']) {
            $data['returned_at'] = Carbon::now();
            if (!isset($data['status_Res'])) {
                $data['status_Res'] = 'Terminer';
            }
            if (!in_array($reservation->status_Pro, ['Pas de Pro', 'Refuser'])) {
                $data['status_Pro'] = 'Terminer';
            } 
        }

        $result = $this->reservationRepository->updateReservation($reservation, $data);

        if (!$result) {
            return [
                'message' => 'Erreur lour de la modification de reservation.',
                'statusData' => 500,
            ];
        } 

        
        $reservation = $this->reservationRepository->findReservation($reservation->id);
        $user = $reservation->reservationtable;
        $livre = $reservation->livre;
        if ($reservation && isset($data['status_Res']) && $data['status_Res'] == 'Accepter') {
            if ( $user->role->name == 'lecteur') {
                $user->reserve_number = $user->reserve_number + 1;
                $this->userRepository->saveUser($user);
            }
            $livre->quantity = $livre->quantity - 1;
            $this->livreRepository->saveLivre($livre);
        }

        if (isset($data['returned_at']) && $data['returned_at']) {
            $livre->quantity = $livre->quantity + 1;
            $this->livreRepository->saveLivre($livre);
        }

        if ($reservation && isset($data['status_Pro']) && $data['status_Pro'] == 'Accepter' && $user->role->name == 'lecteur') {
            $user->prolongement_number = $user->prolongement_number + 1;
            $this->userRepository->saveUser($user);
        }

        return [
            'message' => 'Réservation  modifiée avec succès.',
            'statusData' => 200,
        ];
    }

    public function destroyReservation(Reservation $reservation)
    {
        $result = $this->reservationRepository->deleteReservation($reservation);

        if (!$result) {
            $message = "Erreur lours de la suppression du rservation . Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "Le Reservation supprimé avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'statusData' => $statusData,
        ];
    }
    
}