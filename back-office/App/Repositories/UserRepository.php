<?php

namespace App\Repositories;

use App\Models\User;
use App\RepositoryInterfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

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
        $users = User::query();
        if ($filter) {
            $users->where($filter);
        }
        $users = $users->with(['role', 'badge'])
                    ->where('role_id', '!=', 1)
                    ->orderBy('created_at')
                    ->paginate(7);
        return $users;
    }

    public function CountUser() {
        return User::count();
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