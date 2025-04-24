<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use App\Models\Badge;
use App\Models\Lecteur;
use App\Models\Transaction;
use App\Models\User;
use App\ServiceInterfaces\PaypalServiceInterface;
use App\ServiceInterfaces\TransactionServiceInteface;
use App\ServiceInterfaces\UserServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
    protected $payPalService;
    protected $transactionService;
    protected $userService;

    public function __construct(
        PaypalServiceInterface $payPalService,
        TransactionServiceInteface $transactionService,
        UserServiceInterface $userService
    ) {
        $this->payPalService = $payPalService;
        $this->transactionService = $transactionService;
        $this->userService = $userService;
    }

    public function createSubscription(User $user, Badge $badge)
    {
        try {
            $subscription = $this->payPalService->createSubscription($badge->paypal_plan_id, $user);
            $data = [
                'payment_id' => $subscription['id'],
                'status' => $subscription['status'],
                'amount' => $badge->prix,
                'currency' => 'EUR',
                'badge_id' => $badge->id,
            ];

            
            $transaction = $this->transactionService->createTransaction($user, $data);

            $approvalUrl = collect($subscription['links'])
                ->where('rel', 'approve')
                ->first()['href'] ?? null;

            if (!$approvalUrl) {
                throw new Exception('Approval URL not found in subscription response');
            }

            return response()->json([
                'success' => true,
                'approval_url' => $approvalUrl,
            ], 200);
        } catch (Exception $e) {
            Log::error('Erreur lors de la création de l\'abonnement : ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Échec de la création de l\'abonnement',
            ], 500);
        }
    }

    public function success(Request $request)
    {
        try {
            $subscriptionId = $request->input('subscription_id');
            $details = $this->payPalService->getSubscriptionDetails($subscriptionId);
            $transaction = $this->transactionService->findTransaction(['payment_id', $subscriptionId]);
            

            if ($transaction['Transaction']) {
                $data = [
                    'amount' => $details->amount,
                    'status' => $details['status']
                ];
                $this->transactionService->updateTransaction($transaction, $data);
            }

            return response()->json([
                'message' => 'L\'abonnement a été activé avec succès.',
                'status' => 'success',
                'transaction' => $transaction,
            ], 200);

        } catch (Exception $e) {
            Log::error('Erreur lors du traitement du succès de l\'abonnement : ' . $e->getMessage());
            return response()->json([
                'message' => 'Échec du traitement de l\'abonnement',
                'status' => 'error',
            ], 500);
        }
    }

    public function cancel(Request $request)
    {
        try {
            $subscriptionId = $request->input('subscription_id');
            $transaction = $this->transactionService->findTransaction(['payment_id', $subscriptionId]);
            
            if ($transaction['Transaction']) {
                $data = [
                    'status' => 'CANCELLED'
                ];
                $this->transactionService->updateTransaction($transaction, $data);
            }

            return response()->json([
                'message' => 'L\'abonnement a été annulé avec succès.',
                'status' => 'cancelled',
            ], 200);
        } catch (Exception $e) {
            Log::error('Erreur lors de l\'annulation de l\'abonnement : ' . $e->getMessage());
            return response()->json([
                'message' => 'Échec du traitement de l\'annulation',
                'status' => 'error',
            ], 500);
        }
    }
}