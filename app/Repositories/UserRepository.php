<?php

namespace App\Repositories;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Librarian;
use App\Models\User;
use App\RepositoryInterfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function createUser($user, $data)
    {
        return $user->create($data);
    }

    public function getUsers($filter)
    {
        if (empty($filter)) {
            return User::where('role_id', '!=', 1)->get();
        }
        
        $users = Librarian::where($filter)->get();
        $users = $users->merge(Auteur::where($filter)->get());
        $users = $users->merge(Lecteur::where($filter)->get());
        return $users;
    }

    public function updateStatus($status)
    {
        return User::updated(['status' => $status]);
    }
}