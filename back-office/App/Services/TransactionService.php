<?php

namespace App\Services;

use App\Models\User;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\ServiceInterfaces\TransactionServiceInteface;
use Carbon\Carbon;

use function Laravel\Prompts\search;

class TransactionService implements TransactionServiceInteface
{
    protected $transactionRepository;
    protected $auteurRepository;
    protected $lecteurRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                LecteurRepositoryInterface $lecteurRepository)
    {
        $this->transactionRepository = $transactionRepository;
        $this->auteurRepository = $auteurRepository;
        $this->lecteurRepository = $lecteurRepository;
    }

    public function getTransaction($filter)
    {
        $data = [];
        if (isset($filter['status'])) {
            $data[] = ['status', $filter['status']];
        }


        if (isset($filter['month']) && isset($filter['year'])) {
            $month = $filter['month'];
            $year = $filter['year'];

            $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
            $endDate = Carbon::createFromDate($year, $month, 1)->endOfMonth();

            $duration = [$startDate, $endDate];
            $result = $this->transactionRepository->getFilterTeransaction($duration, $data);
            $message = !empty($result) ? 'Transactions trouvés avec succès.' : "Il n'existe actuellement aucun transaction crée entre $startDate et $endDate";
        
        } else {
            $result = $this->transactionRepository->getAllTransaction();
            $message = !empty($result) ? 'Transactions trouvés avec succès.' : "Il n'existe actuellement aucun transaction associé à notre site.";
        }

        $status = !empty($result) ? 200 : 404;

        if (!$result) {
            $message = 'Certaines erreurs sont survenues lors du returne des transactions.';
            $status = 400;
        }

        return [
            'message' => $message,
            'transactions' => $result,
            'status' => $status,
        ];
    }   

    public function createTransaction(User $user, $data) {
        if (!isset($data)) {
            $message => 'Les information de la sup'
            $statusData => 4
        } else {
            if ($user->isAuteur()) {
                $user = $this->auteurRepository->findAuteur($user->id);
            } else {
                $user = $this->lecteurRepository->findLecteur($user->id);
            }

            $result = $this->transactionRepository->insertTransaction($user, $data);

            if (!$result) {
                $message = "Erreur lours de la supscription de l'utilisateur. Veuillez réessayer plus tard.";
                $statusData = 500;
            } else {
                $message = 
                $statusData = 200;
            }    

            return [
                'message' => $message,
                'statusData' => $startDate,
                'Transaction' => $result ?? null,
            ];
        }
    }
}