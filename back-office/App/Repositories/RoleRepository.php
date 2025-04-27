<?php

namespace App\Repositories;

use App\Models\Role;
use App\RepositoryInterfaces\RoleRepositoryInterface;
use Illuminate\Support\Facades\DB;

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

    public function CountUserRole() {
        return Role::select('roles.id', 'roles.name as title', DB::raw('count(users.id) as total'))
                ->leftJoin('users', 'users.role_id', '=', 'roles.id') 
                ->groupBy('roles.id', 'roles.name') 
                ->get();
    }
}