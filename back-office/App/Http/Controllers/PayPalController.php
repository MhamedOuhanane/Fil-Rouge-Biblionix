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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
    protected $payPalService;
    protected $transactionService;
    protected $userService;

    public function __construct(PaypalServiceInterface $payPalService,
                                TransactionServiceInteface $transactionService,
                                UserServiceInterface $userService)
    {
        $this->payPalService = $payPalService;
        $this->transactionService = $transactionService;
        $this->userService = $userService;
    }

    
    public function createSubscription(User $user,Badge $badge)
    {
        try {
            $subscription = $this->payPalService->createSubscription($badge->paypal_plan_id , $user);
            if ($user->role->name == 'auteur') {
                $model = Auteur::class;
            } elseif ($user->role->name == 'lecteur') {
                $model = Lecteur::class;
            }

            return $this->transactionService->;
            
            Transaction::create([
                'payment_id' => $subscription['id'],
                'status' => $subscription['status'],
                'amount' => $badge->prix,
                'currency' => 'EUR',
                'transactiontable_type' => $model,
                'transactiontable_id' => $user->id,
                'badge_id' => $badge->id,
            ]);

            
            $approvalUrl = collect($subscription['links'])
                ->where('rel', 'approve')
                ->first()['href'];

            return response()->json([
                'success' => true,
                'approval_url' => $approvalUrl
            ]);

        } catch (\Exception $e) {
            Log::error('Subscription creation failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create subscription'
            ], 500);
        }
    }

    
    public function success(Request $request)
    {
        try {
            $subscriptionId = $request->input('subscription_id');
            $details = $this->payPalService->getTransactionDetails($subscriptionId);
            $transaction = Transaction::where('payment_id', $subscriptionId)->first();
            if ($transaction) {
                $transaction->update([
                    'status' => $details['status'],
                    'amount' => $details['plan']['billing_cycles'][0]['pricing_scheme']['fixed_price']['value']
                ]);
            }

            return redirect()->route('subscription.success')->with('success', 'Subscription activated successfully');

        } catch (\Exception $e) {
            Log::error('Subscription success handling failed: ' . $e->getMessage());
            return redirect()->route('subscription.error')->with('error', 'Failed to process subscription');
        }
    }

    public function cancel(Request $request)
    {
        try {
            $subscriptionId = $request->input('subscription_id');
            $transaction = Transaction::where('payment_id', $subscriptionId)->first();
            if ($transaction) {
                $transaction->update(['status' => 'CANCELLED']);
            }

            return redirect()->route('subscription.cancel')->with('message', 'Subscription cancelled');

        } catch (\Exception $e) {
            Log::error('Subscription cancellation failed: ' . $e->getMessage());
            return redirect()->route('subscription.error')->with('error', 'Failed to process cancellation');
        }
    }
}