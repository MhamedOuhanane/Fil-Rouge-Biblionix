<?php

namespace App\Repositories;

use App\Models\Auteur;
use App\Models\Lecteur;
use App\Models\Message;
use App\RepositoryInterfaces\MessageRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class MessageRepository implements MessageRepositoryInterface
{
    public function getAllMessages($pagination = 30)
    {
        return Message::with(['messagetable', 'answers'])
                        ->orderBy('created_at', 'DESC')
                        ->paginate($pagination);
    }
    
    public function getUserMessages($user, $pagination = 6)
    {
        return Message::with('answers')
                        ->where('messagetable_id', Auth::user()->id)
                        ->orderBy('created_at', 'DESC')
                        ->paginate($pagination);
    }
    
    public function findMessage($Message_id)
    {
        return Message::with(['messagetable', 'answers'])
                        ->find($Message_id);
    }
    
    public function createMessage($User, $data)
    {
        return $User->messages()->create($data);
    }
    
    public function updateMessage(Message $Message, $data)
    {
        return $Message->updated($data);
    }
    
    public function deleteMessage(Message $Message)
    {
        return $Message->delete();
    }
    
}