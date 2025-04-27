<?php

namespace App\RepositoryInterfaces;


interface RoleRepositoryInterface
{
    public function findRoleById($roleId);
    public function findRoleByName($roleName);

    
    public function CountUserRole();
}