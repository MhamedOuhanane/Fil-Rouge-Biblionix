<?php

namespace App\Services;

use App\Models\Badge;
use App\ServiceInterfaces\PaypalServiceInterface;
use GuzzleHttp\Client;

class PayPalService implements PaypalServiceInterface
{
    protected $client;
    protected $baseUrl;
    protected $clientId;
    protected $secret;

    public function __construct()
    {
        $this->clientId = env('PAYPAL_CLIENT_ID');
        $this->secret = env('PAYPAL_SECRET');
        $this->baseUrl = env('PAYPAL_MODE') == 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';

        $this->client = new Client();
    }
    

    public function getAccessToken()
    {
        $response = $this->client->post("$this->baseUrl/v1/oauth2/token", [
            'auth' => [$this->clientId, $this->secret],
            'form_params' => ['grant_type' => 'client_credentials'],
        ]);

        return json_decode($response->getBody(), true)['access_token'];
    }
    

    public function createProduct($name)
    {
        $token = $this->getAccessToken();

        $response = $this->client->post("$this->baseUrl/v1/catalogs/products", [
            'headers' => ['Authorization' => "Bearer $token"],
            'json' => [
                'name' => $name,
                'type' => 'SERVICE',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }
    

    public function createPlan($productId,Badge $badge)
    {
        $token = $this->getAccessToken();
        $prix = number_format($badge->prix, 2, '.', '');
        $setup_fee = number_format($badge->prix * 0.2, 2, '.', '');

        $response = $this->client->post("$this->baseUrl/v1/billing/plans", [
            'headers' => ['Authorization' => "Bearer $token"],
            'json' => [
                'product_id' => $productId,
                'name' => $badge->title,
                'billing_cycles' => [[
                    'frequency' => ['interval_unit' => 'MONTH', 'interval_count' => 1],
                    'tenure_type' => 'REGULAR',
                    'sequence' => 1,
                    'total_cycles' => 0,
                    'pricing_scheme' => ['fixed_price' => ['value' => $prix, 'currency_code' => 'EUR']]
                ]],
                'payment_preferences' => [
                    'auto_bill_outstanding' => true,
                    'setup_fee' => ['value' => $setup_fee, 'currency_code' => 'EUR'],
                    'setup_fee_failure_action' => 'CONTINUE',
                    'payment_failure_threshold' => 1,
                ],
            ]
        ]);

        return json_decode($response->getBody(), true);
    }

    public function createSubscription($planId, $user)
    {
        $token = $this->getAccessToken();

        $response = $this->client->post("$this->baseUrl/v1/billing/subscriptions", [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'plan_id' => $planId,
                'subscriber' => [
                    'name' => [
                        'given_name' => $user->name,
                    ],
                    'email_address' => $user->email,
                ],
                'application_context' => [
                    'brand_name' => 'Biblionix',
                    'locale' => 'fr-FR',
                    'shipping_preference' => 'NO_SHIPPING',
                    'user_action' => 'SUBSCRIBE_NOW',
                    'return_url' => env('APP_URL') . '/subscription/success',
                    'cancel_url' => env('APP_URL') . '/subscription/cancel',
                ],
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getTransactionDetails($subscriptionId)
    {
        $token = $this->getAccessToken();

        $response = $this->client->get("$this->baseUrl/v1/billing/subscriptions/$subscriptionId", [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }
}
