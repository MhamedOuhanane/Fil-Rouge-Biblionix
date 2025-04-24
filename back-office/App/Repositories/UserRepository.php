<?php

namespace App\Repositories;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Librarian;
use App\Models\User;
use App\RepositoryInterfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function findUser($id)
    {
        return User::find($id);
    }

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

    public function updateStatus($status, $user)
    {
        return $user->update(['status' => $status]);
    }

    public function updateUser($utilisateur, $data)
    {
        return $utilisateur->update($data);
    }

    public function toggleUserRole($roleId, $user)
    {
        return $user->update(['role_id' => $roleId]);
    }

    public function deleteUser($user)
    {
        return $user->delete();
    }

    
    public function findUserByEmail($email){
        return User::where('email', $email)->first();
    }
}