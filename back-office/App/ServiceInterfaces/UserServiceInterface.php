<?php

namespace App\ServiceInterfaces;

interface UserServiceInterface
{
    public function register($data);
    public function loginUser($data);
    public function logoutUser();

    public function getAllUser($filter);    
    public function update($status, $user);
    public function findUserEmail($element);
    public function findUser($Id);
    public function updateUserRole($event, $user);

}