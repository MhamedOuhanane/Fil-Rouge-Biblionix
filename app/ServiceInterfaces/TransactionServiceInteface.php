<?php

namespace App\ServiceInterfaces;

interface TransactionServiceInteface 
{
    public function getTransaction($filter);
}