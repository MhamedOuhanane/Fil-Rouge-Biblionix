<?php

namespace App\Services;

use App\RepositoryInterfaces\TransactionRepositoryInterface;
use App\ServiceInterfaces\TransactionServiceInteface;
use Carbon\Carbon;

use function Laravel\Prompts\search;

class TransactionService implements TransactionServiceInteface
{
    protected $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function getTransaction($filter)
    {
        $data = [];
        if (isset($filter['search'])) {
            $data[] = ['status', $filter['search']];
        }


        if (isset($filter['month']) && isset($filter['year'])) {
            $month = $filter['month'];
            $year = $filter['year'];

            $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
            $endDate = Carbon::createFromDate($year, $month, 1)->endOfMonth();

            $duration = [$startDate, $endDate];
            $result = $this->transactionRepository->getFilterTeransaction($duration, $data);
            $message = empty($result) ? 'Transactions trouvés avec succès.' : "Il n'existe actuellement aucun transaction crée entre $startDate et $endDate";
        
        } else {
            $result = $this->transactionRepository->getAllTransaction();
            $message = empty($result) ? 'Transactions trouvés avec succès.' : "Il n'existe actuellement aucun transaction associé à notre site.";
        }

        $status = empty($result) ? 200 : 404;

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
}