<?php

namespace App\Repositories;

use App\Models\Role;
use App\RepositoryInterfaces\RoleRepositoryInterface;

class RoleRepository implements RoleRepositoryInterface
{
    public function findRoleById($roleId)
    {
        return Role::find($roleId);
    }

    public function findRoleByName($roleName)
    {
        return Role::where('name', $roleName)->first();
    }
}