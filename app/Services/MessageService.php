<?php

namespace App\Services;

use App\Models\Message;
use App\RepositoryInterfaces\MessageRepositoryInterface;
use App\ServiceInterfaces\MessageServiceInterface;
use Illuminate\Support\Facades\Auth;

class MessageService implements MessageServiceInterface
{
    protected $messageRepository;

    public function __construct(MessageRepositoryInterface $messageRepository)
    {
        $this->messageRepository = $messageRepository;
    }

    public function getMessages($pagination = 30)
    {
        
    }
    
    public function findMessage($Message_id)
    {

    }
    
    public function insertMessage($data)
    {

    }
    
    public function updateMessage(Message $Message, $data)
    {

    }
    
    public function deleteMessage(Message $Message)
    {

    }
    
}