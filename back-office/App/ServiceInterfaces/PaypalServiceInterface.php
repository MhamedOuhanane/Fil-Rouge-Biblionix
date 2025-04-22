<?php

namespace App\ServiceInterfaces;

use App\Models\Badge;

interface PaypalServiceInterface
{
    public function getAccessToken();
    public function createProduct($name);
    public function createPlan($productId, Badge $badge);
}