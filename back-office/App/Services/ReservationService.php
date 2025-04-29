<?php

namespace App\Services;

use App\Models\Lecteur;
use App\Models\Reservation;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
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

    public function __construct(ReservationRepositoryInterface $reservationRepository,
                                UserRepositoryInterface $userRepository,
                                LecteurRepositoryInterface $lecteurRepository,
                                AuteurRepositoryInterface $auteurRepository
                                )
    {
        $this->reservationRepository = $reservationRepository;
        $this->userRepository = $userRepository;
        $this->lecteurRepository = $lecteurRepository;
        $this->auteurRepository = $auteurRepository;
    }

    public function getReservation($data = null, $pagination = 30)
    {
        $user = Auth::user();
        
        if (!$data) {
            if ($user->role->name != 'librarian' || $user->role->name != 'admin') {
                return [
                    'message' => "Vous n\'avez pas les permissions nécessaires pour trouvé tous les reservations.",
                    'statusData' => 401,
                ];
            }
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
        if (empty($data) || $user) {
            return [
                'message' => 'Les données sont vides, mise à jour impossible.',
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

        $countReservation = $this->reservationRepository->getReservationUserMonth($user, ['status_Res', '!=', 'Terminer']);
        if ($countReservation->count() > 0) { 
            return [
                'message' => 'Vous avez déjà une réservation en cours.',
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
        if (empty($data)) {
            return [
                'message' => 'Les données sont vides, mise à jour impossible.',
                'statusData' => 400,
            ];
        }

        $result = $this->reservationRepository->updateReservation($reservation, $data);

        if (!$result) {
            return [
                'message' => 'Erreur lour de la modification de reservation.',
                'statusData' => 500,
            ];
        } 

        $reservation = $this->reservationRepository->findReservation($reservation->id);

        return [
            'message' => 'Réservation  modifiée avec succès.',
            'Reservation' => $reservation,
            'statusData' => 200,
        ];
    }

    public function deleteReservation(Reservation $reservation)
    {

    }

    public function updateEtatReservation(Reservation $reservation, $data)
    {
        if (isset($data['returned_at']) && $data['returned_at']) {
            $data['returned_at'] = Carbon::now();
        }

        $result = $this->reservationRepository->updateReservation($reservation, $data);

        if (!$result) {
            return [
                'message' => 'Erreur lour de la modification de reservation.',
                'statusData' => 500,
            ];
        } 

        
        $reservation = $this->reservationRepository->findReservation($reservation->id);
        // $user = $reservation->reservationtable();
        // if ($reservation && isset($data['status_Res']) && $data['status'] == 'Accepter' && $user->role()->name == 'lecteur') {
        //     $userRes = $user->reserve_numbre + 1;
        //     $this->userRepository->updateUser($user, ['reserve_numbre', $userRes]);
        // }

        return [
            'message' => 'Réservation  modifiée avec succès.',
            'statusData' => 200,
        ];
    }
    
}