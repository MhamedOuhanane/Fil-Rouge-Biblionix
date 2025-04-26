<?php

namespace App\ServiceInterfaces;

use App\Models\User;

interface UserServiceInterface
{
    public function register($data);
    public function loginUser($data);
    public function logoutUser();

    public function getAllUser($filter);    
    public function update($status, $user);
    public function findUserEmail($element);
    public function updateBadge(User $user, $badge_id);
    public function findUser($Id);
    public function updateUserRole($event, $user);

}