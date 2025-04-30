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
use Error;
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
            $transaction = $this->transactionService->findTransaction(['payment_id' => $subscriptionId]);
            
            if ($transaction) {
                $transaction = $transaction['Transaction'];
                $data = [
                    'amount' => $details['billing_info']['last_payment']['amount']['value'] ?? null,
                    'status' => $details['status'] ?? null,
                ];
                $result = $this->transactionService->updateTransaction($transaction, $data);

                if (!$result) {
                    return [
                        'message' => 'Erreur lors du traitement du succès de l\'abonnement',
                        'status' => 'erreur',
                        'transaction' => $transaction,
                    ];
                }
                $user = $transaction->transactiontable;
                if ($user) {
                    $updateBadeg = $this->userService->updateBadge($user, $transaction->badge_id);
                    if ( $transaction->transactiontable_type === "App\\Models\\Auteur") {

                        if (!in_array($user->status, ['En Attente', 'Active'])) {
                            throw new Error('Votre compte est en attente d\'activation par un administrateur. Veuillez patienter.');
                        }
                    } else {
                        if ($user->status != 'Active') {
                            throw new Error('Votre compte est en attente d\'activation par un administrateur. Veuillez patienter.');
                        }
                    }  
                    $udateStatusUser = $this->userService->update(['status' => "Active"], $user);
                    
                    if ($udateStatusUser['statusData'] !== 200) {
                        throw new Error($udateStatusUser['message']);
                    }

                    if (!$updateBadeg['user']) {
                        throw new Error($updateBadeg['message']);
                    }
                }
            } else {
                throw new Error($transaction['message']);
            }

            return response()->json([
                'message' => 'L\'abonnement a été activé avec succès.',
                'status' => 'success',
                'transaction' => $transaction,
            ], 200);

        } catch (Exception $e) {
            Log::error('Erreur lors du traitement du succès de l\'abonnement : ' . $e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 'error',
            ], 500);
        }
    }

    public function cancel(Request $request)
    {
        try {
            $subscriptionId = $request->input('subscription_id');
            $transaction = $this->transactionService->findTransaction(['payment_id' => $subscriptionId]);
            if ($transaction['Transaction']) {
                $transaction = $transaction['Transaction'];
                
                
                $data = [
                    'status' => 'CANCELLED',
                ];
                
                $result = $this->transactionService->updateTransaction($transaction, $data);
                
                
                if (!$result) {
                    return [
                        'message' => 'Erreur lors du traitement d\'annulation de l\'abonnement',
                        'status' => 'erreur',
                        'transaction' => $transaction,
                    ];
                }
                $user = $this->userService->findUser($transaction->transactiontable_id);
                if ($user) {
                    $user = $user['user'];
                    $updateBadeg = $this->userService->updateBadge($user, 1);
                    if (!$updateBadeg['user']) {
                        throw new Error($updateBadeg['message']);
                    }
                } else {
                    throw new Error($user['message']);
                }

            } else {
                throw new Error($transaction['message']);
            }

            return response()->json([
                'message' => 'L\'abonnement a été annulé avec succès.',
                'status' => 'cancelled',
            ], 200);
        } catch (Exception $e) {
            Log::error('Erreur lors de l\'annulation de l\'abonnement : ' . $e->getMessage());
            return response()->json([
                'message' => 'Échec du traitement de l\'annulation: ' . $e->getMessage(),
                'status' => 'error',
            ], 500);
        }
    }
}