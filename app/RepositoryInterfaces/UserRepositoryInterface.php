<?php

namespace App\RepositoryInterfaces;

use App\Models\Role;

interface UserRepositoryInterface 
{
    public function createUser($user, $data);
    public function getUsers($filter);
    public function updateStatus($status, $user);
    public function toggleUserRole($roleId, $user);
}