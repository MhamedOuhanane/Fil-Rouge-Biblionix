<?php

namespace App\Repositories;

use App\Models\Role;
use App\RepositoryInterfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function createUser($user, $data)
    {
        return $user->create($data);
    }
}