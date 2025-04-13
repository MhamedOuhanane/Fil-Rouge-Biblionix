<?php

namespace App\RepositoryInterfaces;

use App\Models\Role;

interface UserRepositoryInterface 
{

    public function findUser($id);
    public function createUser($user, $data);
    public function getUsers($filter);
    public function updateUser($utilisateur, $data);
    public function updateStatus($status, $user);
    public function toggleUserRole($roleId, $user);
    public function deleteUser($user);
}