<?php

namespace App\ServiceInterfaces;

interface UserServiceInterface
{
    public function register($data);
    public function loginUser($data);
    public function logoutUser();

    public function getAllUser($filter);
}