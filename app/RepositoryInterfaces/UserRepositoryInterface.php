<?php

namespace App\RepositoryInterfaces;

use App\Models\Role;

interface UserRepositoryInterface 
{
    public function createUser($user, $data);
}